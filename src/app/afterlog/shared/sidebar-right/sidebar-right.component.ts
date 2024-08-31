import { AfterViewInit, Component, ElementRef, Renderer2,  } from '@angular/core';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.css'
})
export class SidebarRightComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.initializeSidebar();

    $('#sidebar-calendar').evoCalendar({
      'theme': "Royal Navy",
      'eventDisplayDefault': false,
      'sidebarToggler': false,
      'sidebarDisplayDefault': false,
      'eventListToggler': false,
      calendarEvents: [
        {
            id: 'bHay68s',
            name: "New Year",
            date: "January/1/2020",
            description: "Happy New Year!",
            type: "holiday",
            everyYear: true
        },
        {
            name: "Vacation Leave",
            badge: "02/13 - 02/15",
            date: ["February/13/2020", "February/15/2020"],
            description: "Vacation leave for 3 days.",
            type: "event",
            color: "#63d867"
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

  initializeSidebar(): void {
    const sidebar = this.el.nativeElement.querySelector('#rightSidebar');
    const hideSidebarBtn = this.el.nativeElement.querySelector('#hideSidebarBtn');
    const showSidebarBtn = this.el.nativeElement.querySelector('#showSidebarBtn');

    // Set initial state based on localStorage
    const savedState = localStorage.getItem('sidebarState');

    if (savedState === 'full') {
        this.renderer.addClass(sidebar, 'hidden');
        this.renderer.setStyle(showSidebarBtn, 'display', 'block');
    } else {
        // Default to 'reduced' if no state is saved
        this.renderer.removeClass(sidebar, 'hidden');
        this.renderer.setStyle(showSidebarBtn, 'display', 'none');
    }

    this.renderer.listen(hideSidebarBtn, 'click', () => {
        console.log('Hide button clicked');
        this.renderer.addClass(sidebar, 'hidden');
        this.renderer.setStyle(showSidebarBtn, 'display', 'block');
        localStorage.setItem('sidebarState', 'full');
        this.dispatchResizeEvent('full');
    });

    this.renderer.listen(showSidebarBtn, 'click', () => {
        console.log('Show button clicked');
        this.renderer.removeClass(sidebar, 'hidden');
        this.renderer.setStyle(showSidebarBtn, 'display', 'none');
        localStorage.setItem('sidebarState', 'reduced');
        this.dispatchResizeEvent('reduced');
    });
  }

  private dispatchResizeEvent(size: 'full' | 'reduced'): void {
    const event = new CustomEvent('middleContentResize', { detail: size });
    window.dispatchEvent(event);
  }
}

