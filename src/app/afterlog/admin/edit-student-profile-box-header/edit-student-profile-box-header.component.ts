import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-edit-student-profile-box-header',
  templateUrl: './edit-student-profile-box-header.component.html',
  styleUrl: './edit-student-profile-box-header.component.css'
})
export class EditStudentProfileBoxHeaderComponent {

  @Input() regNumber: string | null = null;
  @Output() close = new EventEmitter<void>();

  student: Student = {
    regNumber: '',
    nameWithInitials: '',
    programOfStudy: '',
    status: '',
    contactNumber: '',
    email: '',
    address: '',
    university: ''
  };

  constructor(private http: HttpClient) {}

    // Function to handle form submission
  onSubmit() {
    // const params = new HttpParams()
    //   .set('name', this.staffMember.name)
    //   .set('email', this.staffMember.email)
    //   .set('role', this.staffMember.roles.join(','));
  
    // this.http.post('http://localhost:8080/addStaffMembers', params).subscribe({
    //   next: (response) => {
    //     console.log('Staff member added successfully:', response);
    //     alert('Staff member added successfully!');
    //     // Reset the form fields
    //     this.staffMember = { name: '', email: '', roles: [] };
    //   },
    //   error: (error) => {
    //     console.error('Error adding staff member:', error);
    //     alert('Error adding staff member: ' + error.message);
    //   }
    // });
  }
   

  closeCreateCalendarEvent(): void {
    this.close.emit();
  }
}
