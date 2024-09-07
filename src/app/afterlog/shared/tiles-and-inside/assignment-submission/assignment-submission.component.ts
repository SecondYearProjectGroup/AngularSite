
import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { SubmissionService } from '../../../../services/submission.service';
import { TileIdService } from '../../../services/tile-id.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UploadedFile } from '../../../../models/uploaded-file';
import { FileService } from '../../../../services/file.service';

@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrl: './assignment-submission.component.css'
})
export class AssignmentSubmissionComponent implements OnInit {

  @Input() regNumber : string = '';

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private fileService : FileService) { }

  id: number = 0;
  isUploading: boolean = false;

  title: string = '';
  openedDate: string = ''; // Example value
  dueDate: string = ''; // Example value
  setDueDate: { date: string; time: string } = { date: '', time: '' };
  submissionStatus: string = '';
  timeRemaining: string = '2 Days';
  lastModified: string = '2 Days ago';
  selectedFiles: File[] = [];

  ngOnInit(): void {
    scrollTo(0, 0);

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? parseInt(idParam, 10) : 0; // Default to 0 if idParam is null
    console.log('Retrieved tile id from route params:', this.id);
    this.loadUploadedFiles();

    // Fetch existing submission details if available
    this.submissionService.getSubmissionDetails(this.id).subscribe(details => {
      if (details) {
        this.title = details.title || '';
        this.openedDate = details.openedDate ? this.formatDate(details.openedDate) : ''; // Format openedDate
        this.dueDate = details.dueDate ? this.formatDate(details.dueDate) : ''; // Format dueDate

        // Calculate and set the remaining time
        this.timeRemaining = this.calculateTimeRemaining(details.dueDate);

        // Set the submission status based on the backend response
        this.submissionStatus = details.submissionStatus ? 'Submitted' : 'Not Submitted';
      }
    });

    
  }

  // Helper function to format the date
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
  }

  calculateTimeRemaining(dueDateString: string): string {
    if (!dueDateString) {
      return "Deadline has not been set"; // Handle cases where dueDate is not set
    }

    const now = new Date();
    const dueDate = new Date(dueDateString);

    const timeDiff = dueDate.getTime() - now.getTime(); // Difference in milliseconds
    if (timeDiff <= 0) {
      return "Deadline has passed"; // Handle past deadlines
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days} days and ${hours} hours remaining`;
  }



  onSubmit(): void {
    if (this.setDueDate.date && this.setDueDate.time) {
      const deadline = new Date(`${this.setDueDate.date}T${this.setDueDate.time}`);
      const opendate = new Date(); // Capture the current time

      // Call the service to send both deadline and opendate to the backend
      this.submissionService.setDeadline(this.id, deadline, opendate)
        .subscribe(response => {
          this.dueDate = deadline.toLocaleString();  // Display the new deadline
          this.openedDate= opendate.toLocaleString();
          // Recalculate the time remaining after setting the new deadline
          this.timeRemaining = this.calculateTimeRemaining(deadline.toISOString());
          alert(response);
        }, error => {
          alert('Error setting deadline.');
        });
    }
  }

   // Separate function for file upload - For admin to upload the assignment task
   onFileUpload(): void {
    const formData = new FormData();
    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => formData.append('files', file));
      this.submissionService.uploadFilesbyAdmin(formData, this.id)
        .subscribe(response => {
          alert('Files uploaded successfully!');
        }, (error: HttpErrorResponse) => {
          alert('Error uploading files.');
        });
    } else {
      alert('No files selected.');
    }
  }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }


  // Many Files Upload -------------
  @ViewChild('fileInput') fileInput!: ElementRef;
  files: File[] = [];
  uploadedFiles: UploadedFile[] = []; 
  isDragging = false;
  uploadError: string | null = null;

  


  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.addFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.addFiles(event.target.files);
      event.target.value = null;
    }
  }


  addFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file && !this.files.some(f => f.name === file.name)) {
        this.files.push(file);
  
        // Transform File to UploadedFile
        const uploadedFile: UploadedFile = {
          fileName: file.name,
          originalFileName: file.name, // Assuming the original name is the same
          fileSize: file.size
        };
        this.uploadedFiles.push(uploadedFile);
      }
    }
  }
  


  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  clearFiles() {
    this.files = [];
  }

  uploadFiles() {
    if (this.files.length === 0) return;

    // Simulate upload process
    console.log('Uploading files:', this.files);
    this.isUploading = true;
    this.uploadError = null;

    const formData = new FormData();
    this.files.forEach(file => formData.append('files', file));

    this.submissionService.uploadFiles(formData, this.id).subscribe({
      next: (response) => {
        alert(`${this.files.length} file(s) successfully uploaded.`);
        this.clearFiles();
      },
      error: (error) => {
        this.uploadError = 'Failed to upload files. Please try again.';
        console.error('Upload error:', error);
      }
    });
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  // End of Many Files Upload -------------


  loadUploadedFiles(): void {
    this.submissionService.getUploadedFiles(this.id).subscribe(files => {
      this.uploadedFiles = files;
      console.log('files received');
      console.log(this.isUploading);
      this.isUploading = this.uploadedFiles.length > 0;
      if (this.uploadedFiles.length === 0) {
        this.isUploading = false;
      }
    }, (error) => {
      console.error('Failed to load uploaded files:', error);
    });
  }

  //Method to download the files 
  //To download the uploaded file
  download(uniqueFileName: string, originalFileName: string) {
    this.fileService.downloadFile(uniqueFileName).subscribe(response => {
      const blob = new Blob([response as Blob], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = originalFileName; // Set the original file name for the downloaded file
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('File download failed', error);
    });
  }


  // Method to view the file in a new tab
  viewFile(fileName: string) {
    this.fileService.viewFile(fileName).subscribe((file: Blob) => {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }, error => {
      console.error('Error while viewing the file', error);
    });
  }
  
  showError: boolean = false;

  onChangeDeadline() {
    if (!this.setDueDate.date || !this.setDueDate.time) {
      this.showError = true; // Show error message if inputs are not filled
    } else {
      this.showError = false; // Hide error message when inputs are valid
      // Logic to handle deadline change
      console.log('Deadline changed:', this.setDueDate);
    }
  }
  
}

