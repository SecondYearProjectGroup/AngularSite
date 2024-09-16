import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubmissionService } from '../../../services/submission.service';

@Component({
  selector: 'app-set-deadlines-to-examiners',
  templateUrl: './set-deadlines-to-examiners.component.html',
  styleUrl: './set-deadlines-to-examiners.component.css'
})
export class SetDeadlinesToExaminersComponent implements OnInit {

  @Input() id: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() deadlineSet = new EventEmitter<string>();

  assignedExaminers: Array<{ id: number, fullName: string }> = [];
  dueDate: string = ''; // Example value
  setDueDate: { date: string; time: string } = { date: '', time: '' };

  constructor(private http: HttpClient,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.loadAssignedExaminers();
  }

  onSubmit(): void {
    if (this.setDueDate.date && this.setDueDate.time && this.id!=null) {
      const deadline = new Date(`${this.setDueDate.date}T${this.setDueDate.time}`);
    
      // Call the service to send both deadline and opendate to the backend
      this.submissionService.setDeadlineToExaminers(this.id, deadline)
        .subscribe(response => {
          this.dueDate = this.formatDate(deadline.toISOString());
          alert(response);
          // Emit the formatted deadline to the parent component
          this.deadlineSet.emit(this.dueDate);
        }, error => {
          alert('Error setting deadline.');
        });
    }
  }
  // Load previously assigned examiners
  loadAssignedExaminers() {
    if (this.id !== null) {
      const url = `http://localhost:8080/getAssignedExaminers/${this.id}`;
      this.http.get<Array<{ id: number, fullName: string }>>(url)
        .subscribe({
          next: (data) => {
            this.assignedExaminers = data;
          },
          error: (error) => {
            console.error('Error loading assigned examiners', error);
          },
          complete: () => {
            console.log('Assigned examiners data loading complete');
          }
        });
    }
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

  // Close the modal
  closeSetDeadlinesForExaminers(): void {
    this.close.emit();
  }
}
