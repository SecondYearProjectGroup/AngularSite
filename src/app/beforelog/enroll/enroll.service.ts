// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class EnrollService {
//   private enrollUrl = 'http://localhost:8080/enroll'; // Replace with your actual backend URL

//   constructor(private http: HttpClient) {}
//   enroll(enrollmentData: any, file: File | null): Observable<any> {
//     const formData: FormData = new FormData();
//     formData.append('nameWithInitials', enrollmentData.nameWithInitials);
//     formData.append('fullName', enrollmentData.fullName);
//     formData.append('contactNumber', enrollmentData.contactNumber);
//     formData.append('email', enrollmentData.email);
//     formData.append('address', enrollmentData.address);
//     formData.append('university', enrollmentData.university);
//     formData.append('fromDate', enrollmentData.fromDate);
//     formData.append('toDate', enrollmentData.toDate);
//     formData.append('degree', enrollmentData.degree);
//     formData.append('field', enrollmentData.field);
//     formData.append('class', enrollmentData.class);
//     formData.append('publications', enrollmentData.publications);
//     formData.append('programOfStudy', enrollmentData.programOfStudy);
//     if (file) {
//       formData.append('attachment', file, file.name);
//     }
  
//     return this.http.post<any>(this.enrollUrl, formData);
//   }


// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  enrollStudent(studentData: any, attachments: File[],     studentIdDocument: File,
    birthCertificate: File): Observable<any> {
    const formData: FormData = new FormData();

    // Append student data (as JSON)
    formData.append('student', new Blob([JSON.stringify(studentData)], { type: 'application/json' }));

    // Append Student ID Document
    if (studentIdDocument) {
      formData.append('studentIdDocument', studentIdDocument, studentIdDocument.name);
    }

    // Append Birth Certificate
    if (birthCertificate) {
      formData.append('birthCertificate', birthCertificate, birthCertificate.name);
    }

    // Append multiple attachments
    attachments.forEach((file, index) => {
      formData.append('attachments', file);
    });

    // Send the POST request to the backend
    return this.http.post(`${this.baseUrl}/enroll`, formData);
  }
}




