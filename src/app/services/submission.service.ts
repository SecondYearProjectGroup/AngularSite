import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private apiUrl = 'http://localhost:8080'; // Update with your actual backend API URL

  constructor(private http: HttpClient) {}

  setDeadline(regNumber: string, submissionId: number, deadline: Date): Observable<any> {
    const params = { deadline: deadline.toISOString() };  // Convert to ISO format
    return this.http.post(`${this.apiUrl}/setDeadline/${regNumber}/${submissionId}`, null, { params, responseType: 'text' });
  }
}
