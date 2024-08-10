import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent{

  constructor(private router: Router) {}

  navigateToStudentResearch(){
    this.router.navigate(['afterlog/student-research']);
  }

  navigateToStudentCourses(){
    this.router.navigate(['afterlog/student-courses']);
  }
}

