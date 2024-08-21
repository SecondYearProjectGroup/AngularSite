import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../afterlog/services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css'
})
export class TopNavigationComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    // Initialization logic that doesn't depend on the DOM
  }

  constructor(private router: Router, private userService: UserService, private http: HttpClient, private authService: AuthServiceService) {}

  @Input() mode: 'beforeLog' | 'login' | 'afterLog' = 'afterLog';

  logout() {
    this.http.post('http://localhost:8080/logout', {}, { withCredentials: true }).subscribe({
      next: () => {
        // Use AuthService to clear the token
        this.authService.logout();
        // Optional: Clear cookies if used
        this.clearCookies();
        // Navigate to the login page
        this.router.navigate(['/beforelog/login']).then(() => {
          console.log('Logged out and redirected to login page.');
        });
      },
      error: (error) => {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
      },
      complete: () => {
        console.log('Logout request completed.');
      }
    });
  }
  
  // Optional: Clear cookies if authentication uses them
  clearCookies() {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  }
  
  
  navigateToLogin() {
    this.logout();
  }

  navigateToEnroll() {
    this.router.navigate(['/beforelog/enroll']);
  }

  // navigateToDashboard() {
  //   this.router.navigate(['/afterlog/student-dashboard']);
  // }
  navigateToDashboard() {
    const role = this.userService.getRole();

    if (role === 'admin') {
      this.router.navigate(['/afterlog/admin-dashboard']);
    } else if (role === 'student') {
      this.router.navigate(['/afterlog/student-dashboard']);
    } else {
      console.error('Unknown role:', role);
    }
  }

  navigateToStuDashboard() {
    this.router.navigate(['/afterlog/student-dashboard']);
  }

  navigateToAdminDashboard() {
    this.router.navigate(['/afterlog/admin-dashboard']);
  }

  navigateToSupervisorDashboard() {
    this.router.navigate(['/afterlog/supervisor-dashboard']);
  }

  navigateToExaminerDashboard() {
    this.router.navigate(['/afterlog/examiner-dashboard']);
  }

  navigateToHome() {
    this.router.navigate(['/beforelog/welcome']);
  }
  navigateToEditProfile() {
    
    this.router.navigate(['/afterlog/edit-profile']);
  }

  ngAfterViewInit(): void {
    this.initializeNotificationPanel();
  }

  initializeNotificationPanel(): void {
    const notificationButton = document.getElementById('notificationButton');
    const notificationPanel = document.getElementById('notificationPanel');

    if (notificationButton && notificationPanel) {
      notificationButton.addEventListener('click', (event) => {
        event.stopPropagation();
        notificationPanel.style.display = notificationPanel.style.display === 'block' ? 'none' : 'block';
      });

      document.addEventListener('click', (event) => {
        const isClickInside = notificationPanel.contains(event.target as Node) || notificationButton.contains(event.target as Node);
        if (!isClickInside) {
          notificationPanel.style.display = 'none';
        }
      });
    }
  }
}
