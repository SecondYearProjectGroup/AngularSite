import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserRoleService } from '../../afterlog/services/user-role.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router, 
    private userRoleService: UserRoleService, 
    private http: HttpClient, 
    private authService: AuthServiceService
  ) {}

  userRole: string | null = null; // Variable of the user Role & Initialize with null
  userId: string | null = null; // Variable of the user ID & Initialize

  @Input() mode: 'beforeLog' | 'login' | 'afterLog' = 'afterLog';

  ngOnInit(): void {
    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    this.userRoleService.userId$.subscribe(id => {
      this.userId = id;
    });
  }

  ngAfterViewInit(): void {
    this.initializeNotificationPanel();
  }

  logout() {
    this.http.post('http://localhost:8080/logout', {}, { withCredentials: true }).subscribe({
      next: () => {
        // Clear role in the service
        this.userRoleService.clearUserRole();
        sessionStorage.clear();
        localStorage.clear();

        // Use AuthService to clear the token
        this.authService.logout();
        this.router.navigate(['/beforelog/login'])

        // // Optional: Clear cookies if used
        // this.clearCookies();

        // // Clear browser cache and navigate to login page
        // this.clearBrowserCacheAndRedirect();
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
  
  // // Optional: Clear cookies if authentication uses them
  // clearCookies() {
  //   document.cookie.split(';').forEach((c) => {
  //     document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  //   });
  // }
  
  // // Method to clear browser cache and redirect after logout
  // clearBrowserCacheAndRedirect() {
  //   sessionStorage.clear();
  //   localStorage.clear();
  
  //   // Replace history state to prevent back navigation
  //   window.history.replaceState({}, '', '/beforelog/login');
  //   this.router.navigate(['/beforelog/login']).then(() => {
  //     window.location.reload(); // Reload to enforce fresh navigation
  //   });
  // }
  
  
  navigateToLogin() {
    this.logout(); // Call logout when navigating to login
  }



  navigateToEnroll() {
    this.router.navigate(['/beforelog/enroll']);
  }

  navigateToDashboard() {

    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/afterlog/admin-dashboard']);
    } else if (this.userRole === 'STUDENT') {
      this.router.navigate(['/afterlog/student-dashboard']);
    } else if (this.userRole === 'SUPERVISOR') {
      this.router.navigate(['/afterlog/supervisor-dashboard']);
    } else if (this.userRole === 'EXAMINER') {
      this.router.navigate(['/afterlog/examiner-dashboard']);
    } else {
      console.error('Unknown role:', this.userRole);
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

    console.log('User role:', this.userRole);
    console.log('User ID:', this.userId);

    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/afterlog/edit-profile-for-staff']);
    } else if (this.userRole === 'STUDENT') {
      this.router.navigate(['/afterlog/edit-profile']);
    } else if (this.userRole === 'SUPERVISOR') {
      this.router.navigate(['/afterlog/edit-profile-for-staff']);
    } else if (this.userRole === 'EXAMINER') {
      this.router.navigate(['/afterlog/edit-profile-for-staff']);
    } else {
      console.error('Unknown role:', this.userRole);
    }
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
