import { Component } from '@angular/core';
import { Student } from '../../../models/student';
import { LoadingTile, Section, Tile } from '../../../models/section.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../../../services/auth-service.service';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'app-student-profile-to-examiner',
  templateUrl: './student-profile-to-examiner.component.html',
  styleUrl: './student-profile-to-examiner.component.css'
})
export class StudentProfileToExaminerComponent {

  student: Student = {
    registrationNumber: '',
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
    title: ''
  }

  loadingTile: LoadingTile = {
    id: 0,
    type: '',
    title: ''
  }

  regNumber: string | null = null;
  supervisorName: string = '';
  hasSupervisor: boolean = false;
  activeTab: string = 'tab1';

  sections: { buttonName: string, tiles: { type: string, title: string }[] }[] = [];
  loadingSections: { buttonName: string, loadingTiles: { id: number, type: string, title: string }[] }[] = [];

  userRole: string | null = null; // Assuming you get the user role from some service

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthServiceService,
    private userRoleService: UserRoleService
  ) {
    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  ngOnInit(): void {
    console.log('StudentProfileToExaminerComponent initialized.');
    scrollTo(0, 0);

    this.regNumber = this.route.snapshot.paramMap.get('regNumber');
    console.log('Retrieved regNumber from route params:', this.regNumber);

    // Retrieve activeTab from localStorage if it exists
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      this.activeTab = storedTab;
    } else {
      this.activeTab = 'tab1'; // Set default tab
    }
    
    if (this.regNumber) {
      console.log('Loading student profile for regNumber:', this.regNumber);
      this.loadStudentProfile(this.regNumber);
      // this.loadSections(this.regNumber, this.activeTab);
      this.loadSupervisorName(this.regNumber);
    } else {
      console.warn('No regNumber found in route parameters.');
    }
  }

  // Load student profile data from the backend
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


  // Load Sections data of a student from the backend
  loadSections(regNumber: string , activeTab: string): void {
    
  }

  loadSupervisorName(regNumber: string) {
    this.http.get<string>(`http://localhost:8080/supervisor/students/${regNumber}/supervisor`, { responseType: 'text' as 'json' })
      .subscribe({
        next: (supervisorName) => {
          this.supervisorName = supervisorName;
          this.hasSupervisor = true;
        },
        error: (error) => {
          if (error.status === 404) {
            this.supervisorName = "No supervisor assigned";
            this.hasSupervisor = false;
          } else {
            console.error('Error fetching supervisor name', error);
          }
        },
        complete: () => {
          console.log('Supervisor name fetching complete');
        }
      });
  }


  isAssignSupervisorByAdminOpen = false;
  openAssignSupervisorByAdmin(): void{
    this.isAssignSupervisorByAdminOpen = true;
  }
  closeAssignSupervisorByAdmin(): void{
    this.isAssignSupervisorByAdminOpen = false;
  }
  // Method to handle the event when a supervisor is assigned
  onSupervisorAssigned(newSupervisorName: string): void {
    this.supervisorName = newSupervisorName;
    this.hasSupervisor = true; // Set hasSupervisor to true if a supervisor is assigned
  }

  // Tabs
  selectTab(tab: string) {
    this.activeTab = tab;

    // Store the activeTab in localStorage
    localStorage.setItem('activeTab', this.activeTab);

    if (this.regNumber) {
      this.loadSections(this.regNumber, this.activeTab);
    } else {
      console.error('Registration number is null.');
    }
  }

}
