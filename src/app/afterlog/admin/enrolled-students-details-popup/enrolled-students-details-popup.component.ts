import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EnrolledStudentService } from '../../services/enrolled-student.service';
import { EnrolledStudent } from '../../../models/enrolled-studnet';
import { FileService } from '../../../services/file.service';


@Component({
  selector: 'app-enrolled-students-details-popup',
  templateUrl: './enrolled-students-details-popup.component.html',
  styleUrls: ['./enrolled-students-details-popup.component.css'] // Corrected property name
})
export class EnrolledStudentsDetailsPopupComponent implements OnInit {
  student: EnrolledStudent | undefined;
  errorMessage: string | undefined;
  isLoading: boolean = false; // Added loading state

  @Input() studentId: number | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(
    private enrolledStudentService: EnrolledStudentService,
    private fileService : FileService
  ) { }

  ngOnInit(): void {
    console.log('studentId', this.studentId);
    this.getStudent(); // Corrected the method call
  }

  getStudent(): void {
    if (this.studentId !== null) {
      this.isLoading = true; // Start loading
      this.enrolledStudentService.getStudentById(this.studentId).subscribe(
        (data: EnrolledStudent) => {
          this.student = data;
          this.isLoading = false; // End loading
        },
        (error) => {
          console.error('Error fetching student:', error);
          this.errorMessage = 'Student not found or an error occurred.';
          this.isLoading = false; // End loading
        }
      );
    } else {
      this.errorMessage = 'Invalid student ID.';
    }
  }

  closePopup() {
    this.close.emit();
  }

  // These methods seem to control the popup state, ensure they are used appropriately
  isEnrolledStudentsDetailsPopupOpen: boolean = false;

  openEnrolledStudentsDetailsPopup() {
    this.isEnrolledStudentsDetailsPopupOpen = true;
  }

  closeEnrolledStudentsDetailsPopup() {
    this.isEnrolledStudentsDetailsPopupOpen = false;
    this.closePopup();
  }

  //To download the uploaded file
  download(uniqueFileName: string, originalFileName: string) {
    this.fileService.downloadFileFromEnrolldStu(uniqueFileName).subscribe(response => {
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
}
