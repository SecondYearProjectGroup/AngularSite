import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080/files';


  constructor(private http: HttpClient) { }


  getFileMetadata(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${id}`, { responseType: 'blob' });
  }
}
