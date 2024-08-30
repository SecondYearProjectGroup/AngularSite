import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080/files/download';


  constructor(private http: HttpClient) { }


  getFileMetadata(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
  }

  downloadFileFromEnrolldStu(fileName: string) {
    const token = localStorage.getItem('authToken'); // Get the JWT token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}/${fileName}`, {
      headers: headers,
      responseType: 'blob' as 'json' // The response type is 'blob' since it's a file download
    });
  }
  


}
