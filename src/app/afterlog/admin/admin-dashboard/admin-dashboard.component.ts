import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(private router: Router, private authService : AuthServiceService, private http:HttpClient) {}

  navigateToEnrolledStudents(){
    this.router.navigate(['afterlog/enrolled-students']);
  }

  navigateToStudentsToAdmin(){
    this.router.navigate(['afterlog/students-to-admin']);
  }

  navigateToSupervisorsToAdmin(){
    this.router.navigate(['afterlog/supervisors-to-admin']);
  }

  navigateToExaminersToAdmin(){
    this.router.navigate(['afterlog/examiners-to-admin']);
  }

  getUsername() {
    const token = localStorage.getItem('jwt');; // Replace with actual token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:8080/username', { headers }).subscribe();
  }

  testingButton(){
    this.getUsername();
  }


  isAddStaffMembersByAdminOpen = false;
  openAddStaffMembersByAdmin(): void{
    this.isAddStaffMembersByAdminOpen = true;
  }
  closeAddStaffMembersByAdmin(): void{
    this.isAddStaffMembersByAdminOpen = false;
  }
}
