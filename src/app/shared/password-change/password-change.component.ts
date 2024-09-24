import { Component } from '@angular/core';
import { ProfilePictureService } from '../../afterlog/services/profile-picture.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
        Swal.fire({
          html: '<i class="fas fa-check-circle" style="font-size: 30px; color: green;"></i><br> <b>Password changed successfully!</b>',
          timer: 2000,
          position: 'top',
          customClass: {
            popup: 'custom-popup-class',
            title: 'custom-title-class',
            htmlContainer: 'custom-text-class'
          },
          background: '#fff',
          backdrop: 'rgba(0, 0, 0, 0.4)',
          showConfirmButton: false
        });
        // Reset the form or navigate away
      },
      // error: (error) => {
      //   window.alert('An error occurred while changing the password');
      //   console.error(error);
      // }
    });
  }
  

}
