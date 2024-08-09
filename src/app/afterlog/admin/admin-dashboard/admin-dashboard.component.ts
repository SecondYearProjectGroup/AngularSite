import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    $('#main-calendar').evoCalendar({
      'theme': "Royal Navy",
      'eventDisplayDefault': true,
      'sidebarToggler': true,
      'sidebarDisplayDefault': false,
      'eventListToggler': true,

      calendarEvents: [
      {
          id: 'bHay68s', // Event's ID (required)
          name: "New Year", // Event name (required)
          date: "January/1/2020", // Event date (required)
          description: "Happy New Year!", // Event description (optional)
          type: "holiday", // Event type (required)
          everyYear: true // Same event every year (optional)
      },
      {
          name: "Vacation Leave",
          badge: "02/13 - 02/15", // Event badge (optional)
          date: ["February/13/2020", "February/15/2020"], // Date range
          description: "Vacation leave for 3 days.", // Event description (optional)
          type: "event",
          color: "#63d867" // Event custom color (optional)
      },
      {
          name: "Project Presentation",
          date: "July/15/2024", // Date
          description: "Second Year Project presentation", // Event description (optional)
          type: "event",
          color: "red" // Event custom color (optional)
      }
      ]
    });
  }
  

  navigateToEnrolledStudents(){
    this.router.navigate(['afterlog/enrolled-students']);
  }

  navigateToStudentsToAdmin(){
    this.router.navigate(['afterlog/students-to-admin']);
  }

  navigateToSupervisorsToAdmin(){
    this.router.navigate(['afterlog/supervisors-to-admin']);
  }

  navigateToExaminersToAdmin(){
    this.router.navigate(['afterlog/examiners-to-admin']);
  }
}
