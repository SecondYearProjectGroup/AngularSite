import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-collapsible-section',
  templateUrl: './create-collapsible-section.component.html',
  styleUrls: ['./create-collapsible-section.component.css']
})
export class CreateCollapsibleSectionComponent {

  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<{ buttonName: string, tiles: { type: string, title: string, routerLink: string }[] }>();

  buttonName: string = '';
  // tiles: any[] = [];
  tiles: { type: string, title: string, routerLink: string }[] = [];

  // addTile(): void {
  //   this.tiles.push({ title: '', routerLink: '' });
  // }

  addForumTile() {
    const id = this.generateUniqueId();
    this.tiles.push({ type: 'forum', title: '', routerLink: '/afterlog/feedback-page' });
    // this.tiles.push({ type: 'forum', title: '', routerLink: `/forum/${id}` });
  }

  addSubmissionTile() {
    const id = this.generateUniqueId();
    this.tiles.push({ type: 'submission', title: '', routerLink: '/afterlog/assignment-submission' });
    // this.tiles.push({ type: 'submission', title: '', routerLink: `/submission/${id}` });
  }

  removeTile(index: number): void {
    this.tiles.splice(index, 1);
  }

  submit(): void {
    this.create.emit({ buttonName: this.buttonName, tiles: this.tiles });
  }

  generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  closeModal(): void {
    this.close.emit();
  }
}
