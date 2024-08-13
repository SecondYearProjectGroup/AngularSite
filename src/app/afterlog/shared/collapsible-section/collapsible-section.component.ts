import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible-section',
  templateUrl: './collapsible-section.component.html',
  styleUrl: './collapsible-section.component.css'
})
export class CollapsibleSectionComponent {

  @Input() buttonName: string = '';
  @Input()
  tiles!: { title: string; routerLink: string; }[];

  isCollapsed = false;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
