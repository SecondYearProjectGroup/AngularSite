import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile-for-staff',
  templateUrl: './edit-profile-for-staff.component.html',
  styleUrl: './edit-profile-for-staff.component.css'
})
export class EditProfileForStaffComponent {

  ngOnInit(): void {
    scrollTo(0,0);
  }

  onEditProfileSubmit() {
  }
}
