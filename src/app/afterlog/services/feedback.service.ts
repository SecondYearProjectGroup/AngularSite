import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Feedback {
  id: number;
  body: string;
  fileName: string;
}


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  private apiUrl = 'http://localhost:8080/feedbacks';
 
  constructor(private http: HttpClient) { }

  // Method to get feedbacks by submission ID
  getFeedbackBySubmissionId(submissionId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/submission/${submissionId}`);
  }

  // Method to update feedback with a file and body based on submission ID and examiner ID
  updateFeedback(submissionId: number, examinerId: number, body: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('body', body);
    formData.append('file', file);

    return this.http.put(`${this.apiUrl}/submission/${submissionId}/examiner/${examinerId}`, formData);
  }
}
