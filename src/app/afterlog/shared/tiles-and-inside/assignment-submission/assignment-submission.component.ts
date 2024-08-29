import { Component, Input, OnInit } from '@angular/core';
import { SubmissionService } from '../../../../services/submission.service';

@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrl: './assignment-submission.component.css'
})
export class AssignmentSubmissionComponent implements OnInit {
  
  @Input() regNumber : string = '';

  ngOnInit(): void {
    scrollTo(0,0);
  }

  openedDate: string = ''; // Example value
  dueDate: string = ''; // Example value
  setDueDate: { date: string; time: string } = { date: '', time: '' };
  submissionStatus: string = 'Not Submitted';
  timeRemaining: string = '2 Days';
  lastModified: string = '2 Days ago';
  selectedFile: File | null = null;

  constructor(private submissionService: SubmissionService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.setDueDate.date && this.setDueDate.time) {
      const deadline = new Date(`${this.setDueDate.date}T${this.setDueDate.time}`);
      
      // Call the service to send deadline to the backend
      this.submissionService.setDeadline('studentRegNumber', 1, deadline) // Replace with actual values
        .subscribe(response => {
          this.dueDate = deadline.toLocaleString();  // Display the new deadline
          alert(response);
        }, error => {
          alert('Error setting deadline.');
        });
    }
  }



}
