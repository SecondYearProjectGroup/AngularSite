import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollapsibleSectionService } from '../../services/collapsible-section.service';

@Component({
  selector: 'app-delete-section-popup',
  templateUrl: './delete-section-popup.component.html',
  styleUrl: './delete-section-popup.component.css'
})
export class DeleteSectionPopupComponent {

  @Input() id: number = 0;
  @Input() buttonName: string = '';
  @Output() close = new EventEmitter<void>();

  constructor(private http: HttpClient, private collapsibleSectionService: CollapsibleSectionService) {}

  ngOnInit(): void {
  }

  // Close the modal
  closeDeleteSectionPopup(): void {
    this.close.emit();
  }

  // Method to handle section deletion
  deleteSection(): void {
    console.log('Delete section', this.id, this.buttonName);
    this.collapsibleSectionService.deleteSection(this.id).subscribe({
      next: () => {
        alert('Section deleted successfully.');
        // Optionally, you can emit an event or call a function to update the view
        window.location.reload();
      },
      error: (err) => {
        console.error('Error deleting section', err);
        alert('An error occurred while deleting the section.');
      }
    });
    
  }

}
