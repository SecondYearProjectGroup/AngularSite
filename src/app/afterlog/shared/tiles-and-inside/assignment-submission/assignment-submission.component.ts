import { Component, Input, OnInit } from '@angular/core';
import { SubmissionService } from '../../../../services/submission.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrl: './assignment-submission.component.css'
})
export class AssignmentSubmissionComponent implements OnInit {

  @Input() regNumber : string = '';

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService) { }

  id: number = 0;

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
  
    // Fetch existing submission details if available
    this.submissionService.getSubmissionDetails(this.id).subscribe(details => {
      if (details) {
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

  
  
  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      alert('Please select files to upload.');
      return;
    }
  
    const formData: FormData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });
  
    this.submissionService.uploadFiles(formData, this.id)
  .subscribe({
    next: (response: string) => {
      console.log('Response:', response);
      alert(response);
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error:', error);
      alert(`Error uploading files: ${error.message}`);
    }
  });

  }
  
  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }
  
}