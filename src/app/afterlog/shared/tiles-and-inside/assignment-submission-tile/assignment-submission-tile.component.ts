import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignment-submission-tile',
  templateUrl: './assignment-submission-tile.component.html',
  styleUrl: './assignment-submission-tile.component.css'
})
export class AssignmentSubmissionTileComponent {

  @Input() title: string = '';
  @Input() routerLink: string = '';
}
