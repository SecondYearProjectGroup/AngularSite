import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private role: string = 'student'; // Default role, can be 'admin' or 'student'

  constructor() {}

  setRole(role: string) {
    this.role = role;
  }

  getRole(): string {
    return this.role;
  }

}
