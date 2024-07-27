import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrl: './notification-panel.component.css'
})
export class NotificationPanelComponent implements OnInit {

  ngOnInit(): void {
    this.initializeNotificationPanel();
  }

  initializeNotificationPanel(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const notificationButton = document.getElementById('notificationButton');
      const notificationPanel = document.getElementById('notificationPanel');

      notificationButton?.addEventListener('click', (event) => {
        event.stopPropagation();
        notificationPanel!.style.display = notificationPanel!.style.display === 'block' ? 'none' : 'block';
      });

      document.addEventListener('click', (event) => {
        const isClickInside = notificationPanel?.contains(event.target as Node) || notificationButton?.contains(event.target as Node);
        if (!isClickInside) {
          notificationPanel!.style.display = 'none';
        }
      });
    });
  }
}
