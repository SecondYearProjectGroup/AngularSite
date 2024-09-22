// import { Component } from '@angular/core';
// import { EnrollService } from './enroll.service';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-enroll',
//   templateUrl: './enroll.component.html',
//   styleUrls: ['./enroll.component.css']
// })


// export class EnrollComponent {
//   //An object to store form data - enrollmentData
//   enrollmentData = {
//     nameWithInitials: '',
//     fullName: '',
//     contactNumber: '',
//     email: '',
//     address: '',
//     university: '',
//     fromDate: '',
//     toDate: '',
//     degree: '',
//     field: '',
//     class: '',
//     publications: '',
//     programOfStudy: ''
//   };
//   errorMessage: string = '';
//   fileErrorMessage: string = '';

//   selectedFile: File | null = null;

//   // Initialize with one default section
//   sections = [{
//     university: '',
//     fromDate: '',
//     toDate: '',
//     degree: '',
//     field: '',
//     class: '',
//     fileErrorMessage: '',
//   }];

//   constructor(private enrollService: EnrollService) {}

//   // onFileChange(event: any) {
//   //   this.selectedFile = event.target.files[0];
//   // }

//   onFileChange(event: any, sectionIndex: number) {
//     const file = event.target.files[0];
//     if (file) {
//       this.sections[sectionIndex].selectedFile = file; // Store file per section
//       this.sections[sectionIndex].fileErrorMessage = '';
//     } else {
//       this.sections[sectionIndex].fileErrorMessage = 'Please select a file.';
//     }
//   }
  

//   onEnrollSubmit(form: NgForm) {
//     if (this.selectedFile) {
//       this.enrollService.enroll(this.enrollmentData, this.selectedFile).subscribe({
//         next: (response) => {
//           console.log('Enrollment successful', response);
//           window.alert('You enrolled successfully.');

//           // Clear the form fields
//           form.resetForm();

//           this.enrollmentData.email = ''; // Clear the enrollmentData object if needed
//         },
//         error: (error) => {
//           console.error('Enrollment failed', error);
//           window.alert('Enrollment failed.');
//         },
//         complete: () => {
//           console.log('Enrollment process completed');
//         }
        
//       });
      
//     } else {
//       // window.alert('Please select a file.');
//       this.fileErrorMessage = 'Please select a file.';
//     }

//     if (form.invalid) {
//       this.errorMessage = 'Fill all the fields';
//     } else if (form.value.password !== form.value.confirmPassword) {
//       this.errorMessage = 'Passwords do not match';
//     } else {
//       this.errorMessage = '';
//       console.log('Form Submitted', form.value);
//     }
//   }

//   //Add a new section
//   addSection() {
//     this.sections.push({
//       university: '',
//       fromDate: '',
//       toDate: '',
//       degree: '',
//       field: '',
//       class: '',
//       fileErrorMessage: ''
//     });
//   }

//   //Remove the last section
//   removeSection() {
//     if (this.sections.length > 1) {
//       this.sections.pop();
//     }
//   }

//   //Handle file changes
//   // onFileChange(event: any, sectionIndex: number) {
//   //   const file = event.target.files[0];
//   //   if (!file) {
//   //     this.sections[sectionIndex].fileErrorMessage = 'File is required.';
//   //   } else {
//   //     this.sections[sectionIndex].fileErrorMessage = '';  // Clear any previous errors
//   //   }
//   // }
// }
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnrollService } from './enroll.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent {

  studentData = {
    nameWithInitials: '',
    fullName: '',
    contactNumber: '',
    email: '',
    address: '',
    publications: '',
    programOfStudy: '',
    educationalQualifications: [] as any[]
  };

  sections = [{
    university: '',
    fromDate: '',
    toDate: '',
    degree: '',
    field: '',
    selectedFile: null
  }];

  errorMessage: string = '';

    // New fields for Student ID and Birth Certificate
    studentIdDocument: File | null = null;
    birthCertificate: File | null = null;

  constructor(private enrollService: EnrollService) {}

  addSection() {
    this.sections.push({
      university: '',
      fromDate: '',
      toDate: '',
      degree: '',
      field: '',
      selectedFile: null
    });
  }

  removeSection() {
    if (this.sections.length > 1) {
      this.sections.pop();
    }
  }

  onFileChange(event: any, sectionIndex: number) {
    const file = event.target.files[0];
    this.sections[sectionIndex].selectedFile = file ? file : null;
  }

   // New methods to handle Student ID and Birth Certificate file changes
   onStudentIdChange(event: any) {
    const file = event.target.files[0];
    this.studentIdDocument = file ? file : null;
  }

  onBirthCertificateChange(event: any) {
    const file = event.target.files[0];
    this.birthCertificate = file ? file : null;
  }

  onEnrollSubmit(form: NgForm) {
    this.errorMessage = ''; // Reset error message

    if (!form.valid) {
      form.form.markAllAsTouched(); // Mark fields as touched
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.studentData.educationalQualifications = this.sections.map(section => ({
      university: section.university,
      fromDate: section.fromDate,
      toDate: section.toDate,
      degree: section.degree,
      field: section.field
    }));

    const attachments: File[] = this.sections
      .map(section => section.selectedFile)
      .filter(file => file !== null) as File[];

      // Ensure that Student ID and Birth Certificate are selected
    if (!this.studentIdDocument) {
      this.errorMessage = 'Student ID Document is required.';
      return;
    }

    if (!this.birthCertificate) {
      this.errorMessage = 'Birth Certificate is required.';
      return;
    }

    // console.log('Student Data:', this.studentData);
    // console.log('Attachments:', attachments);

    this.enrollService.enrollStudent(this.studentData, attachments, this.studentIdDocument,this.birthCertificate).subscribe({
      next: (response) => {
        console.log('Enrollment successful', response);
        window.alert('Enrollment successful!');
        form.resetForm();
        this.studentData = {
          nameWithInitials: '',
          fullName: '',
          contactNumber: '',
          email: '',
          address: '',
          publications: '',
          programOfStudy: '',
          educationalQualifications: []
        };
        this.sections = [{
          university: '',
          fromDate: '',
          toDate: '',
          degree: '',
          field: '',
          selectedFile: null
        }];
        // Reset the new file fields
        this.studentIdDocument = null;
        this.birthCertificate = null;
      },
      error: (error) => {
        console.error('Enrollment failed', error);
        this.errorMessage = error.message || 'Enrollment failed. Please try again.';
      }
    });
  }
}
