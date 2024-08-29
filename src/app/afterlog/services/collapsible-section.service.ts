import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollapsibleSectionService {

  private apiUrl = 'http://localhost:8080/sections';

  constructor(private http: HttpClient) {}

  saveSection(section: { regNumber: string | null; buttonName: string; tiles: { type: string; title: string }[] }): Observable<any> {
    return this.http.post(this.apiUrl, section);
  }

  getSections(regNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${regNumber}`);
  }

  deleteSection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
