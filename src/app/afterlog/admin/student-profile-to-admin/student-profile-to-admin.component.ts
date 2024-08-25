import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../models/student';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-student-profile-to-admin',
  templateUrl: './student-profile-to-admin.component.html',
  styleUrls: ['./student-profile-to-admin.component.css']
})
export class StudentProfileToAdminComponent implements OnInit {

  student: Student = {
    regNumber: '',
    nameWithInitials: '',
    programOfStudy: '',
    status: '',
    contactNumber: '',
    email: '',
    address: '',
    university: ''
  };

  regNumber: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    console.log('StudentProfileToAdminComponent initialized.');
    scrollTo(0, 0);

    this.regNumber = this.route.snapshot.paramMap.get('regNumber');
    console.log('Retrieved regNumber from route params:', this.regNumber);
    
    if (this.regNumber) {
      console.log('Loading student profile for regNumber:', this.regNumber);
      this.loadStudentProfile(this.regNumber);
    } else {
      console.warn('No regNumber found in route parameters.');
    }
  }

  loadStudentProfile(regNumber: string): void {
    console.log('Making HTTP GET request to load student profile for regNumber:', regNumber);
    
    // Encode the regNumber to handle any special characters
    const encodedRegNumber = encodeURIComponent(regNumber);
  
    const token = this.authService.getToken(); // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get<Student>(`http://localhost:8080/studentProfileForAdmin/${encodedRegNumber}`, { headers })
      .subscribe({
        next: (data) => {
          console.log('Student data successfully retrieved:', data);
          this.student = data;
        },
        error: (error) => {
          console.error('Error loading student data:', error);
          switch (error.status) {
            case 401:
              console.error('Unauthorized access - check your token');
              break;
            case 403:
              console.error('Forbidden access - insufficient permissions');
              break;
            case 404:
              console.error('Student not found for regNumber:', regNumber);
              break;
            default:
              console.error('Unexpected error occurred:', error.message || error);
          }
        },
        complete: () => {
          console.log('Student data loading process complete.');
        }
      });
  }
  


  isModalOpen = false;
  sections: { buttonName: string, tiles: { title: string, routerLink: string }[] }[] = [
    {
      buttonName: 'General2',
      tiles: [
        { title: 'Forum', routerLink: '/afterlog/feedback-page' },
        { title: 'Announcements', routerLink: 'https://example.com/announcements' }
      ]
    }
  ];

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addNewSection(newSection: { buttonName: string, tiles: { title: string, routerLink: string }[] }): void {
    this.sections.push(newSection);
    this.closeModal();
  }


  isAssignSupervisorByAdminOpen = false;
  openAssignSupervisorByAdmin(): void{
    this.isAssignSupervisorByAdminOpen = true;
  }
  closeAssignSupervisorByAdmin(): void{
    this.isAssignSupervisorByAdminOpen = false;
  }
}
