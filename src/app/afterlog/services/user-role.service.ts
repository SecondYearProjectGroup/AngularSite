import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSubject.asObservable();

  setUserRole(role: string) {
    this.userRoleSubject.next(role);
  }

  getUserRole(): string | null {
    return this.userRoleSubject.getValue();
  }

  setUserId(userId: string) {
    this.userIdSubject.next(userId);
  }

  getUserId(): string | null {
    return this.userIdSubject.getValue();
  }

  clearUserRole() {
    this.userRoleSubject.next(null);
    this.userIdSubject.next(null);
  }

}
