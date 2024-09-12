import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-remove-submission-popup',
  templateUrl: './remove-submission-popup.component.html',
  styleUrl: './remove-submission-popup.component.css'
})
export class RemoveSubmissionPopupComponent {

  @Input() id: number | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  // Close the modal
  closeRemoveSubmissionPopup(): void {
    this.close.emit();
  }
  removeFiles(): void {
  }
}
