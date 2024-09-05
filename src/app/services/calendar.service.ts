import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRoleService } from '../afterlog/services/user-role.service';
import { switchMap } from 'rxjs/operators';
import { Event } from '../models/event';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient , private userRoleService: UserRoleService) { }

  private apiUrl = 'http://localhost:8080';

  getUserEvents(): Observable<Event[]> {
    return this.userRoleService.userId$.pipe(
      switchMap(userId => {
        if (userId) {
          return this.http.get<Event[]>(`${this.apiUrl}/events/${userId}`);
        } else {
          return [];
        }
      })
    );
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }
}
