import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-calendar-event',
  templateUrl: './create-calendar-event.component.html',
  styleUrl: './create-calendar-event.component.css'
})
export class CreateCalendarEventComponent {

  @Output() close = new EventEmitter<void>();

  event = {
    name: '',
    description: '',
    type: '',
    colour: '',
    startDate: '',
    endDate: '',
    //everyYear: '',
  };

  constructor(private http: HttpClient) {}

  // Function to handle checkbox changes
  // onCheckboxChange(event: any) {
  //   const roleId = event.target.value; // Convert string value to number
  //   if (event.target.checked) {
  //     this.event.roles.push(roleId);
  //   } else {
  //     const index = this.event.roles.indexOf(roleId);
  //     if (index > -1) {
  //       this.event.roles.splice(index, 1);
  //     }
  //   }
  // }


// Function to handle form submission
onSubmit() {
  const eventPayload = {
    name: this.event.name,
    description: this.event.description,
    type: this.event.type,
    colour: this.event.colour,
    startDate: this.event.startDate,
    endDate: this.event.endDate
  };

  this.http.post('http://localhost:8080/create-event', eventPayload, {
    headers: { 'Content-Type': 'application/json' }
  }).subscribe({
    next: (response) => {
      console.log('Event added successfully:', response);
      alert('Event added successfully!');
      // Reset the form fields
      this.event = { name: '', description: '', type: '', colour: '', startDate: '', endDate: '' };
    },
    error: (error) => {
      console.error('Error adding event:', error);
      alert('Error adding event: ' + error.message);
    }
  });
}
  

  closeCreateCalendarEvent(): void {
    this.close.emit();
  }
}
