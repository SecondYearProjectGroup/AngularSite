// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   private baseUrl = 'http://localhost:8080'; // Your backend base URL

//   constructor(private http: HttpClient) { }

//   login(username: string, password: string): Observable<string> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
//     const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    
//     return this.http.post(`${this.baseUrl}/login`, body, { headers, responseType: 'text' });
//   }
// }



