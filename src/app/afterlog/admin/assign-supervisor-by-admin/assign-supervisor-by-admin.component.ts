import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-assign-supervisor-by-admin',
  templateUrl: './assign-supervisor-by-admin.component.html',
  styleUrl: './assign-supervisor-by-admin.component.css'
})
export class AssignSupervisorByAdminComponent {

  @Output() close = new EventEmitter<void>();

  closeAssignSupervisorByAdmin(): void {
    this.close.emit();
  }

  selectedStudent: any;

  students = [
    { id: 1, firstName: 'John', lastName: 'Doe', course: 'Mathematics' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', course: 'Science' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', course: 'History' },
    { id: 4, firstName: 'Bob', lastName: 'Brown', course: 'English' }
  ];

  onSubmit() {
    console.log(this.selectedStudent); // Will contain the data of the selected student
  }
}
