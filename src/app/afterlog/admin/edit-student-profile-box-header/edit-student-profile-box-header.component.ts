import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-edit-student-profile-box-header',
  templateUrl: './edit-student-profile-box-header.component.html',
  styleUrl: './edit-student-profile-box-header.component.css'
})
export class EditStudentProfileBoxHeaderComponent {

  @Input() regNumber: string | null = null;
  @Input() nameWithInitials: string | null = null;
  @Input() programOfStudy: string | null = null;
  @Output() close = new EventEmitter<void>();

  student: Student = {
    regNumber: '',
    registrationNumber: '',
    nameWithInitials: '',
    programOfStudy: '',
    status: '',
    contactNumber: '',
    email: '',
    address: '',
    university: '',
    registeredDate: undefined
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const updatedFields = {
      status: this.student.status,
      registeredDate: this.student.registeredDate ,// Assume you added this to the model
      registrationNumber: this.student.registrationNumber
    };
  
    // Define the URL for the API request
    const url = `http://localhost:8080/editDetailsByAdmin/${this.regNumber}`;
  
    // Send the updated fields to the backend using the HTTP POST method
    this.http.post(url, updatedFields, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' // Specify that the response type is plain text
    }).subscribe({
      next: (response) => {
        // Log the plain text response
        console.log('Profile updated successfully:', response);
      },
      error: (err) => {
        // Handle any errors that occur
        console.error('Error updating profile:', err);
      }
    });
  }
  

  ngOnInit(): void {
    this.student.nameWithInitials = this.nameWithInitials ?? '';
    this.student.programOfStudy = this.programOfStudy ?? '';
  }
   

  closeCreateCalendarEvent(): void {
    this.close.emit();
  }
}
