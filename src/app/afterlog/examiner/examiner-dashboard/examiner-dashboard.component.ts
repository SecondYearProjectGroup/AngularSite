import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examiner-dashboard',
  templateUrl: './examiner-dashboard.component.html',
  styleUrl: './examiner-dashboard.component.css'
})
export class ExaminerDashboardComponent {

  constructor(private router: Router) {}

  navigateToStudents(){
    this.router.navigate(['afterlog/students-to-examiner']);
  }

  navigateToReportSubmission(){
    this.router.navigate(['#']);
  }
}
