import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-student-profile-to-admin',
  templateUrl: './student-profile-to-admin.component.html',
  styleUrl: './student-profile-to-admin.component.css'
})
export class StudentProfileToAdminComponent {

  student: Student = {
    regNumber: '',
    nameWithInitials: '',
    programOfStudy: '',
    status: '',
    contactNumber: '',
    email: '',
    address: '',
    university: ''
  }

  regNumber: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('StudentProfileToAdminComponent initialized.');
    
    scrollTo(0,0);

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
    
    this.http.get<Student>(`http://localhost:8080/studentProfileForAdmin/${regNumber}`)
      .subscribe(
        (data) => {
          console.log('Student data successfully retrieved:', data);
          this.student = data;
        },
        (error) => {
          console.error('Error loading student data:', error);
        }
      );
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
