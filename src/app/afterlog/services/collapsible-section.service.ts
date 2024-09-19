import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingSection } from '../../models/section.model';

@Injectable({
  providedIn: 'root'
})
export class CollapsibleSectionService {

  private apiUrl = 'http://localhost:8080/sections';

  constructor(private http: HttpClient) {}

  saveSection(section: { regNumber: string | null; 
    buttonName: string; 
    activeTab: string | null;
    tiles: { type: string; title: string }[] }): Observable<any> {
    return this.http.post(this.apiUrl, section);
  }

  getSectionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getSections(regNumber: string , activeTab: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${regNumber}/${activeTab}`);
  }

  getSectionsForExaminers(regNumber: string , activeTab: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/examiners/${regNumber}/${activeTab}`);
  }

  updateSection(id: number, section: LoadingSection): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, section);
  }
  

  deleteSection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
