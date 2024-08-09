import { Component } from '@angular/core';

@Component({
  selector: 'app-student-profile-to-admin',
  templateUrl: './student-profile-to-admin.component.html',
  styleUrl: './student-profile-to-admin.component.css'
})
export class StudentProfileToAdminComponent {

  isModalOpen = false;
  sections: { buttonName: string, tiles: { title: string, link: string }[] }[] = [
    {
      buttonName: 'General2',
      tiles: [
        { title: 'Forum', link: 'https://example.com/forum' },
        { title: 'Announcements', link: 'https://example.com/announcements' }
      ]
    }
  ];

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addNewSection(newSection: { buttonName: string, tiles: { title: string, link: string }[] }): void {
    this.sections.push(newSection);
    this.closeModal();
  }
}
