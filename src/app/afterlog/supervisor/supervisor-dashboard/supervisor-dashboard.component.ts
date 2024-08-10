import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrl: './supervisor-dashboard.component.css'
})
export class SupervisorDashboardComponent {

  constructor(private router: Router) {}

  navigateToSupervisees(){
    this.router.navigate(['afterlog/supervisees']);
  }

  navigateToReportSubmission(){
    this.router.navigate(['#']);
  }
}
