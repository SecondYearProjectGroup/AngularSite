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

  getFeedbackBySubmissionId(submissionId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/submission/${submissionId}`);
  }
}