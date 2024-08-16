import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../afterlog/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css'
})
export class TopNavigationComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    // Initialization logic that doesn't depend on the DOM
  }

  constructor(private router: Router, private userService: UserService, private http: HttpClient) {}

  @Input() mode: 'beforeLog' | 'login' | 'afterLog' = 'afterLog';

  logout() {
    this.http.post('http://localhost:8080/api/logout', {}).subscribe({
      next: () => {
        // Clear any client-side authentication data
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
  
        // Redirect to login page
        this.router.navigate(['/beforelog/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
      complete: () => {
        console.log('Logout completed successfully');
        // Double-check redirection to ensure user is logged out
        if (!localStorage.getItem('token') && !sessionStorage.getItem('token')) {
          this.router.navigate(['/beforelog/login']);
        } else {
          console.warn('User is still logged in; forcing redirect.');
          this.router.navigate(['/beforelog/login']);
        }
      }
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
