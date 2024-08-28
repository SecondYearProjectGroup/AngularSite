import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../../../models/student';


interface DecodedToken {
  exp: number;
  iat: number;
  roles: { authority: string }[]; // Update based on actual structure
  [key: string]: any;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit{

  ngOnInit(): void {
    scrollTo(0,0);
    this.loadUserData();
  }

  student: Student = {
    regNumber: '',
    nameWithInitials: '',
    contactNumber: '',
    email: '',
    address: '',
    university: '',
    programOfStudy: '',
    status: ''
}

  constructor(private http: HttpClient) {}

  loadUserData() {
    const token = localStorage.getItem; // Replace with actual token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Student>('http://localhost:8080/profile-student', { headers })
      .subscribe(
        (studentData) => {
          this.student = studentData;
        },
        (error) => {
          console.error('Error loading user data:', error);
        }
      );
  }

  // loadUserData() {
  //   // Subscribe to the userId$ observable to get the user ID
  //   this.userRoleService.userId$.subscribe(userId => {
  //     if (userId) {
  //       // Use the user ID to make the request to fetch the student profile
  //       this.http.get<Student>(`http://localhost:8080/profile-student/${userId}`)
  //         .subscribe(
  //           (studentData) => {
  //             this.student = studentData;
  //           },
  //           (error) => {
  //             console.error('Error loading user data:', error);
  //           }
  //         );
  //     } else {
  //       console.error('User ID not found');
  //     }
  //   });
  // }
  

 
  onEditProfileSubmit() {
    // Handle form submission logic here
  }
  
}
