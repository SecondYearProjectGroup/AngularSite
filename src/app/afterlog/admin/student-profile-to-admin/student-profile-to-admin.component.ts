import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../models/student';
import { AuthServiceService } from '../../../services/auth-service.service';
import { CollapsibleSectionService } from '../../services/collapsible-section.service';
import { LoadingTile, Section, Tile } from '../../../models/section.model';
import { UserRoleService } from '../../services/user-role.service';

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

  sections: { buttonName: string, tiles: { type: string, title: string }[] }[] = [];
  loadingSections: { buttonName: string, loadingTiles: { id: number, type: string, title: string }[] }[] = [];

  userRole: string | null = null; // Assuming you get the user role from some service

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthServiceService,
    private collapsibleSectionService: CollapsibleSectionService,
    private userRoleService: UserRoleService
  ) {
    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  ngOnInit(): void {
    console.log('StudentProfileToAdminComponent initialized.');
    scrollTo(0, 0);

    this.regNumber = this.route.snapshot.paramMap.get('regNumber');
    console.log('Retrieved regNumber from route params:', this.regNumber);
    
    if (this.regNumber) {
      console.log('Loading student profile for regNumber:', this.regNumber);
      this.loadStudentProfile(this.regNumber);
      this.loadSections(this.regNumber);
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
  loadSections(regNumber: string): void {
    this.collapsibleSectionService.getSections(regNumber).subscribe({
      next: (data) => {
        this.loadingSections = data.map(section => ({
          buttonName: section.buttonName, // Adjust these field names according to your backend response
          loadingTiles: section.tiles.map((tile: LoadingTile) => ({
            id: tile.id, // Adjust these field names according to your backend response
            type: tile.type, // Adjust these field names according to your backend response
            title: tile.title
          }))
        }));

        // Populate sections with the same data, adjusting the structure if necessary
        this.sections = this.loadingSections.map(loadingSection => ({
          buttonName: loadingSection.buttonName,
          tiles: loadingSection.loadingTiles.map(loadingTile => ({
            type: loadingTile.type,
            title: loadingTile.title
          }))
        }));

        console.log('Sections loaded successfully', this.loadingSections);
      },
      error: (error) => {
        console.error('Error loading sections', error);
      }
    });
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

  addNewSection(newSection: { buttonName: string, tiles: { type: string, title: string }[] }): void {
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

  // Tabs
  activeTab: string = 'tab1';
  selectTab(tab: string) {
    this.activeTab = tab;
  }

  // Edit Student Profile header
  isEditStudentProfileBoxHeaderOpen = false;
  openEditStudentProfileBoxHeader(): void {
    this.isEditStudentProfileBoxHeaderOpen = true;
  }
  closeEditStudentProfileBoxHeader(): void {
    this.isEditStudentProfileBoxHeaderOpen = false;
  }

}
