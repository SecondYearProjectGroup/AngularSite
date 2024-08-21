import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../../../models/student';
import { decodeJwt } from '../../../utils/jwt-utils.service';


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

export class EditProfileComponent implements OnInit {

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

   ngOnInit(): void {
       this.loadUserData();
   }
  onEditProfileSubmit() {
    // Handle form submission logic here
  }
}
