import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.adjustContentSize();
  }

  @HostListener('window:middleContentResize', ['$event'])
  onResizeEvent(event: CustomEvent): void {
    this.adjustContentSize(event.detail);
  }

  adjustContentSize(size: 'full' | 'reduced' = 'reduced'): void {
    const content = document.querySelector('.middle-content');
    if (size === 'full') {
      this.renderer.addClass(content, 'full-width');
      this.renderer.removeClass(content, 'reduced-width');
    } else {
      this.renderer.addClass(content, 'reduced-width');
      this.renderer.removeClass(content, 'full-width');
    }
  }
}

