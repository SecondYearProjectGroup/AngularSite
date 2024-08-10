import { AfterViewInit, Component } from '@angular/core';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrl: './main-calendar.component.css'
})
export class MainCalendarComponent implements AfterViewInit {

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
  
}
