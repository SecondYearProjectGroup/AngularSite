import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-middle-content',
  templateUrl: './middle-content.component.html',
  styleUrl: './middle-content.component.css'
})
export class MiddleContentComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.adjustContentSize();
  }

  @HostListener('window:middleContentResize', ['$event'])
  onResizeEvent(event: CustomEvent): void {
    this.adjustContentSize(event.detail);
  }

  adjustContentSize(size: 'full' | 'reduced' = 'full'): void {
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
