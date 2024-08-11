import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe(
      (response: string) => {
        console.log('Login successful:', response);
        const roles = response.split(','); // Assuming the roles are returned as a comma-separated string
        
        if (roles.includes('ADMIN')) {
          this.router.navigate(['/afterlog/admin-dashboard']);
        } else if (roles.includes('STUDENT')) {
          this.router.navigate(['/afterlog/student-dashboard']);
        } else if (roles.includes('SUPERVISOR')) {
          this.router.navigate(['/afterlog/supervisor-dashboard']);
        } else {
          this.router.navigate(['/beforelog/login']);
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }

  navigateToSignup() {
    this.router.navigate(['/beforelog/signup']);
  }
}
