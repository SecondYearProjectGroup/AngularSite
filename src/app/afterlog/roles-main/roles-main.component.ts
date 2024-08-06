import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-roles-main',
  templateUrl: './roles-main.component.html',
  styleUrl: './roles-main.component.css'
})
export class RolesMainComponent implements OnInit {

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
