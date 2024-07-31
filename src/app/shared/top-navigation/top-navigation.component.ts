import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css'
})
export class TopNavigationComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    // Initialization logic that doesn't depend on the DOM
  }

  constructor(private router: Router) {}

  @Input() mode: 'beforeLog' | 'login' | 'afterLog' = 'afterLog';

  navigateToLogin() {
    this.router.navigate(['/beforelog/login']);
  }

  navigateToEnroll() {
    this.router.navigate(['/beforelog/enroll']);
  }

  navigateToDashboard() {
    this.router.navigate(['/afterlog/student-dashboard']);
  }

  navigateToStuDashboard() {
    this.router.navigate(['/afterlog/student-dashboard']);
  }

  navigateToAdminDashboard() {
    this.router.navigate(['/afterlog/admin-dashboard']);
  }

  navigateToHome() {
    this.router.navigate(['/beforelog/welcome']);
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
