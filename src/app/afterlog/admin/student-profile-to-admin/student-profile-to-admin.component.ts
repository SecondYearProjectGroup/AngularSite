import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../models/student';
import { AuthServiceService } from '../../../services/auth-service.service';
import { CollapsibleSectionService } from '../../services/collapsible-section.service';
import { Section, Tile } from '../../../models/section.model';

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

  section: Section={
    buttonName: '',
    tiles: []
  }

  tile: Tile = {
    type: '',
    title: '',
    routerLink: ''
  }

  regNumber: string | null = null;

  sections: { buttonName: string, tiles: { type: string, title: string, routerLink: string }[] }[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthServiceService,
    private collapsibleSectionService: CollapsibleSectionService
  ) {}

  ngOnInit(): void {
    console.log('StudentProfileToAdminComponent initialized.');
    scrollTo(0, 0);

    this.regNumber = this.route.snapshot.paramMap.get('regNumber');
    console.log('Retrieved regNumber from route params:', this.regNumber);
    
    if (this.regNumber) {
      console.log('Loading student profile for regNumber:', this.regNumber);
      this.loadStudentProfile(this.regNumber);
      this.loadSections(this.regNumber);
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


  loadSections(regNumber: string): void {
    this.collapsibleSectionService.getSections(regNumber).subscribe({
      next: (data) => {
        this.sections = data.map(section => ({
          buttonName: section.buttonName, // Adjust these field names according to your backend response
          tiles: section.tiles.map((tile: Tile) => ({
            type: tile.type, // Adjust these field names according to your backend response
            title: tile.title, 
            routerLink: tile.routerLink 
          }))
        }));
        console.log('Sections loaded successfully', this.sections);
      },
      error: (error) => {
        console.error('Error loading sections', error);
      }
    });
  }
  


  isModalOpen = false;
  // sections: { buttonName: string, tiles: { type: string, title: string, routerLink: string }[] }[] = [
  //   {
  //     buttonName: 'General2',
  //     tiles: [
  //       { type: 'forum', title: 'Forum 2', routerLink: '/afterlog/feedback-page' },
  //       { type: 'submission', title: 'Submission 2', routerLink: '/afterlog/assignment-submission' }
  //     ]
  //   }
  // ];

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addNewSection(newSection: { buttonName: string, tiles: { type: string, title: string, routerLink: string }[] }): void {
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
