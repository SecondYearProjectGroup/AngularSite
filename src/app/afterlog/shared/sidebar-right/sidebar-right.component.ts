import { AfterViewInit, Component, ElementRef, Renderer2,  } from '@angular/core';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.css'
})
export class SidebarRightComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.initializeSidebar();
  }

  initializeSidebar(): void {
    const sidebar = this.el.nativeElement.querySelector('#rightSidebar');
    const hideSidebarBtn = this.el.nativeElement.querySelector('#hideSidebarBtn');
    const showSidebarBtn = this.el.nativeElement.querySelector('#showSidebarBtn');

    this.renderer.listen(hideSidebarBtn, 'click', () => {
      console.log('Hide button clicked');
      this.renderer.addClass(sidebar, 'hidden');
      this.renderer.setStyle(showSidebarBtn, 'display', 'block');
      this.dispatchResizeEvent('full');
    });

    this.renderer.listen(showSidebarBtn, 'click', () => {
      console.log('Show button clicked');
      this.renderer.removeClass(sidebar, 'hidden');
      this.renderer.setStyle(showSidebarBtn, 'display', 'none');
      this.dispatchResizeEvent('reduced');
    });
  }

  private dispatchResizeEvent(size: 'full' | 'reduced'): void {
    const event = new CustomEvent('middleContentResize', { detail: size });
    window.dispatchEvent(event);
  }
}
