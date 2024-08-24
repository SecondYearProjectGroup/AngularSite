import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-tile',
  templateUrl: './feedback-tile.component.html',
  styleUrl: './feedback-tile.component.css'
})
export class FeedbackTileComponent {
  @Input() title: string = '';
  @Input() routerLink: string = '';
}
