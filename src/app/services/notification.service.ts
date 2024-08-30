import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl =  'http://localhost:8080/notifications';

  constructor(private http: HttpClient) { }

  //Fetch unread notifications fron the backend
  getUnreadNotifications(): Observable<string> {
    return this.http.get(this.apiUrl + '/unread', { responseType: 'text' });
}


}