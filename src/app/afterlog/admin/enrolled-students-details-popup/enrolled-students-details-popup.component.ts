import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-enrolled-students-details-popup',
  templateUrl: './enrolled-students-details-popup.component.html',
  styleUrl: './enrolled-students-details-popup.component.css'
})
export class EnrolledStudentsDetailsPopupComponent implements OnInit {

  @Input() rowId: number | null = null;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    console.log('rowId', this.rowId);
  }

  closePopup() {
    this.close.emit();
  }

  isEnrolledStudentsDetailsPopupOpen: boolean = false;
  openEnrolledStudentsDetailsPopup() {
    this.isEnrolledStudentsDetailsPopupOpen = true;
  }
  closeEnrolledStudentsDetailsPopup() {
    this.isEnrolledStudentsDetailsPopupOpen = false;
    this.closePopup();
  }
}
