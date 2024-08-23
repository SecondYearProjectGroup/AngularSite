import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-calendar-event',
  templateUrl: './create-calendar-event.component.html',
  styleUrl: './create-calendar-event.component.css'
})
export class CreateCalendarEventComponent {

  @Output() close = new EventEmitter<void>();

  staffMember = {
    name: '',
    email: '',
    roles: [] as string[]
  };

  constructor(private http: HttpClient) {}

  // Function to handle checkbox changes
  onCheckboxChange(event: any) {
    const roleId = event.target.value; // Convert string value to number
    if (event.target.checked) {
      this.staffMember.roles.push(roleId);
    } else {
      const index = this.staffMember.roles.indexOf(roleId);
      if (index > -1) {
        this.staffMember.roles.splice(index, 1);
      }
    }
  }

  // Function to handle form submission
  onSubmit() {
    const params = new HttpParams()
      .set('name', this.staffMember.name)
      .set('email', this.staffMember.email)
      .set('role', this.staffMember.roles.join(','));
  
    this.http.post('http://localhost:8080/addStaffMembers', params).subscribe({
      next: (response) => {
        console.log('Staff member added successfully:', response);
        alert('Staff member added successfully!');
        // Reset the form fields
        this.staffMember = { name: '', email: '', roles: [] };
      },
      error: (error) => {
        console.error('Error adding staff member:', error);
        alert('Error adding staff member: ' + error.message);
      }
    });
  }
   

  closeCreateCalendarEvent(): void {
    this.close.emit();
  }
}
