import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  

  constructor(private router: Router,private webSocketService: WebsocketService) {}

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
  
  testingButton(){

  }

  // Add Staff Members By Admin
  isAddStaffMembersByAdminOpen = false;
  openAddStaffMembersByAdmin(): void{
    this.isAddStaffMembersByAdminOpen = true;
  }
  closeAddStaffMembersByAdmin(): void{
    this.isAddStaffMembersByAdminOpen = false;
  }

  // Create Calendar Event
  isCreateCalendarEventOpen = false;
  openCreateCalendarEvent(): void{
    this.isCreateCalendarEventOpen = true;
  }
  closeCreateCalendarEvent(): void{
    this.isCreateCalendarEventOpen = false;
  }

}
