// import { AfterViewInit, Component } from '@angular/core';
// import { CalendarService } from '../../../services/calendar.service';
// declare var $: any; // Declare jQuery
// import { Event } from '../../../models/event';

// @Component({
//   selector: 'app-main-calendar',
//   templateUrl: './main-calendar.component.html',
//   styleUrl: './main-calendar.component.css'
// })
// export class MainCalendarComponent implements AfterViewInit {
//   constructor(private calendarService: CalendarService) {}

//   ngAfterViewInit(): void {
//     this.calendarService.getUserEvents().subscribe(events => {
//       const calendarEvents = events.map((event: Event) => ({
//         id: event.id,
//         name: event.name,
//         // date: event.startDate,
//         date: event.endDate ? [event.startDate, event.endDate] : event.startDate,
//         description: event.description,
//         type: event.type,
//         color: event.color,
//         everyYear: event.everyYear
//       }));

//       $('#main-calendar').evoCalendar({
//         theme: "Royal Navy",
//         eventDisplayDefault: true,
//         sidebarToggler: true,
//         sidebarDisplayDefault: false,
//         eventListToggler: true,
//         calendarEvents
//       });
//     });
//   }
// }

  // ngAfterViewInit(): void {
  //   $('#main-calendar').evoCalendar({
  //     'theme': "Royal Navy",
  //     'eventDisplayDefault': true,
  //     'sidebarToggler': true,
  //     'sidebarDisplayDefault': false,
  //     'eventListToggler': true,

      // calendarEvents: [
      // {
      //     id: 'bHay68s', // Event's ID (required)
      //     name: "New Year", // Event name (required)
      //     date: "January/1/2020", // Event date (required)
      //     description: "Happy New Year!", // Event description (optional)
      //     type: "holiday", // Event type (required)
      //     everyYear: true // Same event every year (optional)
      // },
      // {
      //     name: "Vacation Leave",
      //     badge: "02/13 - 02/15", // Event badge (optional)
      //     date: ["February/13/2020", "February/15/2020"], // Date range
      //     description: "Vacation leave for 3 days.", // Event description (optional)
      //     type: "event",
      //     color: "#63d867" // Event custom color (optional)
      // },
      // {
      //     name: "Project Presentation",
      //     date: "July/15/2024", // Date
      //     description: "Second Year Project presentation", // Event description (optional)
      //     type: "event",
      //     color: "red" // Event custom color (optional)
      // }
      // ]
  //   });
  // }
  

import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CalendarService } from '../../../services/calendar.service';
declare var $: any; // Declare jQuery
import { Event } from '../../../models/event';


@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrl: './main-calendar.component.css'
})
export class MainCalendarComponent implements OnInit {

  constructor(
    private calendarService: CalendarService,
    //private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    $('#main-calendar').evoCalendar({
      theme: "Royal Navy",
      eventDisplayDefault: true,
      sidebarToggler: true,
      sidebarDisplayDefault: false,
      eventListToggler: true
    });
    this.loadCalendarEvents();

    // // Subscribe to WebSocket updates
    // this.webSocketService.getEventUpdates().subscribe(newEvent => {
    //   this.addEventToCalendar(newEvent);
    // });
  }

  loadCalendarEvents() {
    this.calendarService.getUserEvents().subscribe(events => {
      const calendarEvents = events.map(event => ({
        id: event.id,
        name: event.name,
        date: event.endDate ? [event.startDate, event.endDate] : event.startDate,
        description: event.description,
        type: event.type,
        color: event.color,
        everyYear: event.everyYear
      }));
  
      console.log('Formatted Events:', calendarEvents);
  
      $('#main-calendar').evoCalendar('addCalendarEvent', calendarEvents);
    });
  }
  

  addEventToCalendar(event : Event) {
    $('#main-calendar').evoCalendar('addCalendarEvent', {
      id: event.id,
      name: event.name,
      date: event.endDate ? [event.startDate, event.endDate] : event.startDate,
      description: event.description,
      type: event.type,
      color: event.color,
      everyYear: event.everyYear
    });
  }
}

