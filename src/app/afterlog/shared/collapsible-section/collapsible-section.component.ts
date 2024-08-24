import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-collapsible-section',
  templateUrl: './collapsible-section.component.html',
  styleUrls: ['./collapsible-section.component.css']
})
export class CollapsibleSectionComponent {

  @Input() buttonName: string = '';
  @Input() tiles!: { type: string, title: string; routerLink: string; }[];
  @Output() editSection = new EventEmitter<{ buttonName: string, tiles: { type: string, title: string, routerLink: string }[] }>();

  isCollapsed: boolean = false;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  openEditSection(): void {
    this.editSection.emit({
      buttonName: this.buttonName,
      tiles: this.tiles
    });
  }
}
