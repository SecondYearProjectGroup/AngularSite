import { Component } from '@angular/core';
import { EnrollService } from './enroll.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})


export class EnrollComponent {
  //An object to store form data - enrollmentData
  enrollmentData = {
    nameWithInitials: '',
    fullName: '',
    contactNumber: '',
    email: '',
    address: '',
    university: '',
    fromDate: '',
    toDate: '',
    degree: '',
    field: '',
    class: '',
    publications: '',
    programOfStudy: ''
  };
  errorMessage: string = '';
  fileErrorMessage: string = '';

  selectedFile: File | null = null;

  constructor(private enrollService: EnrollService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onEnrollSubmit(form: NgForm) {
    if (this.selectedFile) {
      this.enrollService.enroll(this.enrollmentData, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Enrollment successful', response);
          window.alert('You enrolled successfully.');
        },
        error: (error) => {
          console.error('Enrollment failed', error);
          window.alert('Enrollment failed.');
        },
        complete: () => {
          console.log('Enrollment process completed');
        }
      });
      
    } else {
      // window.alert('Please select a file.');
      this.fileErrorMessage = 'Please select a file.';
    }

    if (form.invalid) {
      this.errorMessage = 'Fill all the fields';
    } else if (form.value.password !== form.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
    } else {
      this.errorMessage = '';
      console.log('Form Submitted', form.value);
    }
  }
}

