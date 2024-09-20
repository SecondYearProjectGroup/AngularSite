import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CollapsibleSectionService } from '../../services/collapsible-section.service';

@Component({
  selector: 'app-create-collapsible-section',
  templateUrl: './create-collapsible-section.component.html',
  styleUrls: ['./create-collapsible-section.component.css']
})
export class CreateCollapsibleSectionComponent implements OnInit {

  @Input() id: number = 0;
  @Input() regNumber: string | null = null;
  @Input() activeTab: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<{ buttonName: string, tiles: { type: string, title: string }[] }>();

  buttonName: string = '';
  tiles: { type: string, title: string }[] = [];

  constructor(private collapsibleSectionService: CollapsibleSectionService) {}

  ngOnInit(): void {
    // Load the section data if an ID is provided
    if (this.id) {
      this.loadSectionById(this.id);
    }
  }

  addVivaTile() {
    this.tiles.push({ type: 'viva', title: 'Viva' });
    // this.tiles.push({ type: 'forum', title: '', routerLink: `/forum/${id}` });
  }

  addForumTile() {
    this.tiles.push({ type: 'forum', title: '' });
    // this.tiles.push({ type: 'forum', title: '', routerLink: `/forum/${id}` });
  }

  addSubmissionTile() {                                                                             
    this.tiles.push({ type: 'submission', title: 'Pre-report-Submission' });
    // this.tiles.push({ type: 'submission', title: '', routerLink: `/submission/${id}` });
    this.tiles.push({ type: 'finalSubmission', title: 'Final-report-Submission' });
  }

  removeTile(index: number): void {
    this.tiles.splice(index, 1);
  }

  submitSection(): void {
    console.log('Tiles before submission:', this.tiles);

    const tilesArray: { type: string, title: string }[] = this.tiles;

    const sectionPayload = { 
        regNumber: this.regNumber, 
        activeTab: this.activeTab,
        buttonName: this.buttonName, 
        tiles: tilesArray 
    };

    // Emit the event
    // this.create.emit(newSection);

    // Call the service to save the section
    // this.collapsibleSectionService.saveSection(newSection).subscribe({
    //   next: (response) => {
    //     console.log('Section saved successfully', response);
    //     this.closeModal(); // Optionally close the modal after saving
    //   },
    //   error: (error) => {
    //     console.error('Error saving section', error);
    //   }
    // });

    if (this.id) {
      // If section ID exists, update the section
      this.updateSection(sectionPayload);
    } else {
      // Else, create a new section
      this.createSection(sectionPayload);
    }

    window.location.reload();
  }

  // Method to create a new section
  createSection(section: any): void {
    this.collapsibleSectionService.saveSection(section).subscribe({
      next: (response) => {
        console.log('Section created successfully', response);
        this.closeModal();  // Optionally close the modal after creating
      },
      error: (error) => {
        console.error('Error creating section', error);
      }
    });
  }

  // Method to update an existing section
  updateSection(section: any): void {
    console.log('Updating section:', section);
    this.collapsibleSectionService.updateSection(this.id, section).subscribe({
      next: (response) => {
        console.log('Section updated successfully', response);
        this.closeModal();  // Optionally close the modal after updating
      },
      error: (error) => {
        console.error('Error updating section', error);
      }
    });
  }

  // Load a single section data by section ID
  loadSectionById(sectionId: number): void {
    this.collapsibleSectionService.getSectionById(sectionId).subscribe({
      next: (section) => {
        // Assuming the section object structure matches what is being received from the backend
        this.id = section.id;  // Set ID
        this.buttonName = section.buttonName;  // Set buttonName
        this.tiles = section.tiles.map((tile: any) => ({
          id: tile.id, 
          type: tile.type,
          title: tile.title
        }));

        // Print the section data
        console.log('Loaded section:', section);

        // Optionally, store this in a specific variable if needed
        // this.selectedSection = loadedSection;
      },
      error: (error) => {
        console.error('Error loading section by ID', error);
      }
    });
  }


  closeModal(): void {
    this.close.emit();
  }
}
