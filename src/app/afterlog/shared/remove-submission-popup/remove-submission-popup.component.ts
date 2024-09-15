import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubmissionService } from '../../../services/submission.service';

@Component({
  selector: 'app-remove-submission-popup',
  templateUrl: './remove-submission-popup.component.html',
  styleUrl: './remove-submission-popup.component.css'
})
export class RemoveSubmissionPopupComponent {

  @Input() id: number | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private http: HttpClient, private submissionService: SubmissionService) {}

  ngOnInit(): void {
  }

  // Close the modal
  closeRemoveSubmissionPopup(): void {
    this.close.emit();
  }

  // Method to handle file deletion
  removeFiles(): void {
    if (this.id !== null) {
      this.submissionService.deleteFile(this.id).subscribe({
        next: () => {
          console.log('File deleted successfully');
          this.closeRemoveSubmissionPopup();
        },
        error: (error) => {
          console.error('Error deleting file:', error);
        }
      });
    }
  }
}
