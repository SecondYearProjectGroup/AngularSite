// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {

//   private baseUrl = 'http://localhost:8080'; // Your backend base URL

//   constructor(private http: HttpClient) { }

//   login(username: string, password: string): Observable<string> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
//     const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    
//     return this.http.post(`${this.baseUrl}/login`, body, { headers, responseType: 'text' });
//   }

//   getCurrentUser(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/current-user`, { withCredentials: true });
//   }

//   logout(): Observable<any> {
//     return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
//   }
  
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:8080'; // Backend URL
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const loginUrl = `${this.baseUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<{ jwt: string }>(loginUrl, body, { headers })
      .pipe(map(response => {
        const token = response.jwt;
        localStorage.setItem(this.tokenKey, token);
        return token;  // Return the token as a string
      }));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}


