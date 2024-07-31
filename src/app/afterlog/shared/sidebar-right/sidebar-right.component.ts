import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.css'
})
export class SidebarRightComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.initializeSidebar();
  }

  initializeSidebar(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const sidebar = document.getElementById('rightSidebar');
      const hideSidebarBtn = document.getElementById('hideSidebarBtn');
      const showSidebarBtn = document.getElementById('showSidebarBtn');

      hideSidebarBtn?.addEventListener('click', () => {
        sidebar?.classList.add('hidden');
        showSidebarBtn!.style.display = 'block';
        this.dispatchResizeEvent('full');
      });

      showSidebarBtn?.addEventListener('click', () => {
        sidebar?.classList.remove('hidden');
        showSidebarBtn!.style.display = 'none';
        this.dispatchResizeEvent('reduced');
      });
    });
  }

  private dispatchResizeEvent(size: 'full' | 'reduced'): void {
    const event = new CustomEvent('middleContentResize', { detail: size });
    window.dispatchEvent(event);
  }
}
