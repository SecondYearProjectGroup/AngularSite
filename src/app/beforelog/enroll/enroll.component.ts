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

  // Initialize with one default section
  sections = [{
    university: '',
    fromDate: '',
    toDate: '',
    degree: '',
    field: '',
    class: '',
    fileErrorMessage: ''
  }];

  constructor(private enrollService: EnrollService) {}

  // onFileChange(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  onEnrollSubmit(form: NgForm) {
    if (this.selectedFile) {
      this.enrollService.enroll(this.enrollmentData, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Enrollment successful', response);
          window.alert('You enrolled successfully.');

          // Clear the form fields
          form.resetForm();

          this.enrollmentData.email = ''; // Clear the enrollmentData object if needed
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

  // Add a new section
  addSection() {
    this.sections.push({
      university: '',
      fromDate: '',
      toDate: '',
      degree: '',
      field: '',
      class: '',
      fileErrorMessage: ''
    });
  }

  // Remove the last section
  removeSection() {
    if (this.sections.length > 1) {
      this.sections.pop();
    }
  }

  // Handle file changes
  onFileChange(event: any, sectionIndex: number) {
    const file = event.target.files[0];
    if (!file) {
      this.sections[sectionIndex].fileErrorMessage = 'File is required.';
    } else {
      this.sections[sectionIndex].fileErrorMessage = '';  // Clear any previous errors
    }
  }
}

