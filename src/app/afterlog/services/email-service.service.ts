import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailTemplate } from '../../models/email-template';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  private apiUrl = 'http://localhost:8080/emails';
 
  constructor(private http: HttpClient) { }


  getAllTemplates(): Observable<EmailTemplate[]> {
      return this.http.get<EmailTemplate[]>(this.apiUrl);
  }

  updateTemplate(id: number, template: EmailTemplate): Observable<EmailTemplate> {
      return this.http.put<EmailTemplate>(`${this.apiUrl}/${id}`, template);
  }

  getTemplateById(id: number): Observable<EmailTemplate> {
    return this.http.get<EmailTemplate>(`${this.apiUrl}/${id}`);
  }

  addNewTemplate(template: EmailTemplate): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(`${this.apiUrl}/new`, template);
  }


//To be completed 
  sendEmailsFromStudentProfile(template: EmailTemplate, ): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(`${this.apiUrl}/send/stu/`, template);
  }

  sendEmails(template: EmailTemplate, ): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(`${this.apiUrl}/send/`, template);
  }

}
