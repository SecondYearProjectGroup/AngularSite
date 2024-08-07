import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {
  private enrollUrl = 'http://localhost:8080/enroll'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}
  enroll(enrollmentData: any, file: File | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nameWithInitials', enrollmentData.nameWithInitials);
    formData.append('fullName', enrollmentData.fullName);
    formData.append('contactNumber', enrollmentData.contactNumber);
    formData.append('email', enrollmentData.email);
    formData.append('address', enrollmentData.address);
    formData.append('university', enrollmentData.university);
    formData.append('fromDate', enrollmentData.fromDate);
    formData.append('toDate', enrollmentData.toDate);
    formData.append('degree', enrollmentData.degree);
    formData.append('field', enrollmentData.field);
    formData.append('class', enrollmentData.class);
    formData.append('publications', enrollmentData.publications);
    formData.append('programOfStudy', enrollmentData.programOfStudy);
    if (file) {
      formData.append('attachment', file, file.name);
    }
  
    return this.http.post<any>(this.enrollUrl, formData);
  }


}


