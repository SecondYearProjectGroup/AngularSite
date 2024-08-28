import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollapsibleSectionService } from '../../services/collapsible-section.service';

@Component({
  selector: 'app-create-collapsible-section',
  templateUrl: './create-collapsible-section.component.html',
  styleUrls: ['./create-collapsible-section.component.css']
})
export class CreateCollapsibleSectionComponent {

  @Input() regNumber: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<{ buttonName: string, tiles: { type: string, title: string, routerLink: string }[] }>();

  buttonName: string = '';
  tiles: { type: string, title: string, routerLink: string }[] = [];

  constructor(private collapsibleSectionService: CollapsibleSectionService) {}

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

  submitSection(): void {
    console.log('Tiles before submission:', this.tiles);

    const tilesArray: { type: string, title: string, routerLink: string }[] = this.tiles;

    const newSection = { 
        regNumber: this.regNumber, 
        buttonName: this.buttonName, 
        tiles: tilesArray 
    };

    console.log('Newsection before submission:', newSection);

    // Emit the event
    this.create.emit(newSection);

    // Call the service to save the section
    this.collapsibleSectionService.saveSection(newSection).subscribe({
      next: (response) => {
        console.log('Section saved successfully', response);
        this.closeModal(); // Optionally close the modal after saving
      },
      error: (error) => {
        console.error('Error saving section', error);
      }
    });
  }

  generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  closeModal(): void {
    this.close.emit();
  }
}
