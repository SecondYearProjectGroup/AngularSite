import { Component } from '@angular/core';
import { ProfilePictureService } from '../../afterlog/services/profile-picture.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class PasswordChangeComponent {

  constructor(private profileService:ProfilePictureService) { }
  
  isUserChecked: boolean = false;

  user = {
    password: '',
    email: ''
  };

  onCheckPresentUser() {
    this.profileService.searchUser(this.user.email).subscribe({
      next: (userExists: boolean) => {
        if (userExists) {
          this.isUserChecked = true;
        } else {
          this.isUserChecked = false;
          window.alert('No user found with the provided email');
        }
      }
    });
  }

  onSubmit() {
    // Call the service to change the password
    this.profileService.changePassword(this.user.email, this.user.password).subscribe({
      next: (response) => {
        window.alert('Password changed successfully!');
        // Reset the form or navigate away
      },
      // error: (error) => {
      //   window.alert('An error occurred while changing the password');
      //   console.error(error);
      // }
    });
  }
  

}
