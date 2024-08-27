import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../services/user-role.service';
import { CollapsibleSectionService } from '../../services/collapsible-section.service';
import { Section, Tile } from '../../../models/section.model';

@Component({
  selector: 'app-student-research',
  templateUrl: './student-research.component.html',
  styleUrl: './student-research.component.css'
})
export class StudentResearchComponent implements OnInit{

  section: Section={
    buttonName: '',
    tiles: []
  }

  tile: Tile = {
    type: '',
    title: '',
    routerLink: ''
  }

  constructor(
    private userRoleService : UserRoleService,
    private collapsibleSectionService: CollapsibleSectionService){}

  userId: string | null = null; // Variable of the user ID & Initialize
  sections: { buttonName: string, tiles: { type: string, title: string, routerLink: string }[] }[] = [];

  ngOnInit(){

    this.userRoleService.userId$.subscribe(id => {
      this.userId = id;
    });

    // Check if userId is not null before calling loadSections
    if (this.userId) {
      this.loadSections(this.userId);
    } else {
      console.error('User ID is null, cannot load sections');
    }
  }

  loadSections(regNumber: string): void {
    this.collapsibleSectionService.getSections(regNumber).subscribe({
      next: (data) => {
        this.sections = data.map(section => ({
          buttonName: section.buttonName, // Adjust these field names according to your backend response
          tiles: section.tiles.map((tile: Tile) => ({
            type: tile.type, // Adjust these field names according to your backend response
            title: tile.title, 
            routerLink: tile.routerLink 
          }))
        }));
        console.log('Sections loaded successfully', this.sections);
      },
      error: (error) => {
        console.error('Error loading sections', error);
      }
    });
  }
}
