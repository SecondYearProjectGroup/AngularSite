import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private apiUrl = 'http://localhost:8080'; // Update with your actual backend API URL

  constructor(private http: HttpClient) {}

  setDeadline(submissionId: number, deadline: Date, opendate: Date): Observable<any> {
    const params = { 
      deadline: deadline.toISOString(),  // Convert to ISO format
      opendate: opendate.toISOString()   // Convert to ISO format
    };
    return this.http.post(`${this.apiUrl}/setDeadline/${submissionId}`, null, { params, responseType: 'text' });
  }

  getSubmissionDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/submissions/getSubmissionDetails/${id}`);
  }



  uploadFiles(formData: FormData, tileId: number): Observable<any> {
    return this.http.post(`http://localhost:8080/complete-assignment/${tileId}`, formData, {
      responseType: 'text' // This forces Angular to treat the response as plain text
    });
  }

  uploadFilesbyAdmin(formData: FormData, tileId: number): Observable<any> {
    return this.http.post(`http://localhost:8080/files/upload/${tileId}`, formData, {
      responseType: 'text' // This forces Angular to treat the response as plain text
    });
  }
  
  getUploadedFiles(submissionId: number): Observable<{ name: string; size: number }[]> {
    return this.http.get<{ name: string; size: number }[]>(`/api/submissions/${submissionId}/files`);
}

  
}
