import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-set-deadlines-to-examiners',
  templateUrl: './set-deadlines-to-examiners.component.html',
  styleUrl: './set-deadlines-to-examiners.component.css'
})
export class SetDeadlinesToExaminersComponent implements OnInit {

  @Input() id: number | null = null;
  @Output() close = new EventEmitter<void>();

  assignedExaminers: Array<{ id: number, fullName: string }> = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAssignedExaminers();
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

  // Close the modal
  closeSetDeadlinesForExaminers(): void {
    this.close.emit();
  }
}
