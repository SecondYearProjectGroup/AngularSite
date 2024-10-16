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

  //Send emails to students via the student profile
  sendEmailsFromStudentProfile(template: EmailTemplate, regNumber: string ): Observable<EmailTemplate> {
    return this.http.post<EmailTemplate>(`${this.apiUrl}/send/stu/${regNumber}`, template);
  } 

  //Send emails with the given set
  sendEmails(template: EmailTemplate, emails: string[]): Observable<EmailTemplate> {
    const payload = { template, emails };
    return this.http.post<EmailTemplate>(`${this.apiUrl}/send`, payload);
  }
  

}
