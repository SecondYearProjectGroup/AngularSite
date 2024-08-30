
import { Component, Input, OnInit } from '@angular/core';
import { SubmissionService } from '../../../../services/submission.service';

import { TileIdService } from '../../../services/tile-id.service';
import { ActivatedRoute } from '@angular/router';

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

  ngOnInit(): void {
    scrollTo(0, 0);

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? parseInt(idParam, 10) : 0; // Default to 0 if idParam is null
    console.log('Retrieved tile id from route params:', this.id);
  }

  openedDate: string = ''; // Example value
  dueDate: string = ''; // Example value
  setDueDate: { date: string; time: string } = { date: '', time: '' };
  submissionStatus: string = 'Not Submitted';
  timeRemaining: string = '2 Days';
  lastModified: string = '2 Days ago';
  selectedFile: File | null = null;

  // onSubmit(): void {
  //   if (this.setDueDate.date && this.setDueDate.time) {
  //     const deadline = new Date(`${this.setDueDate.date}T${this.setDueDate.time}`);

  //     // Call the service to send deadline to the backend
  //     this.submissionService.setDeadline(this.id, deadline) // Replace with actual values
  //       .subscribe(response => {
  //         this.dueDate = deadline.toLocaleString();  // Display the new deadline
  //         alert(response);
  //       }, error => {
  //         alert('Error setting deadline.');
  //       });
  //   }
  // }

  onSubmit(): void {
    if (this.setDueDate.date && this.setDueDate.time) {
      const deadline = new Date(`${this.setDueDate.date}T${this.setDueDate.time}`);
      const opendate = new Date(); // Capture the current time
  
      // Call the service to send both deadline and opendate to the backend
      this.submissionService.setDeadline(this.id, deadline, opendate)
        .subscribe(response => {
          this.dueDate = deadline.toLocaleString();  // Display the new deadline
          this.openedDate= opendate.toLocaleString();
          alert(response);
        }, error => {
          alert('Error setting deadline.');
        });
    }
  }
  



}
