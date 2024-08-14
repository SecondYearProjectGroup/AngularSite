import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-to-admin',
  templateUrl: './students-to-admin.component.html',
  styleUrl: './students-to-admin.component.css'
})
export class StudentsToAdminComponent {

  constructor(private router: Router, private http:HttpClient) {}

  tableData: Array<{ 
    id: number,
    nameWithInitials: string, 
    fullName: string, 
    contactNumber: string, 
    email:string, 
    address: string, 
    programOfStudy: string
  }> = [];

  searchText: string = '';

  // tableData: Array<{ column1: string, column2: string, column3: string, column4: string, column5: string, column6: string }> = [
  //   { column1: '1', column2: 'Supun Perera', column3: 'University of Peradeniya', column4: 'None', column5: 'Herath', column6: '' },
  //   { column1: '2', column2: 'Ishan Thathsra', column3: 'University of Ruhuna', column4: 'Angular', column5: 'Herath', column6: 'Herath' },
  //   { column1: '3', column2: 'More Data 3', column3: 'More Data 3', column4: 'More Data 3', column5: 'More Data 3', column6: 'More' },
  //   // Add more data as needed
  // ];

  loadStudents() {
    this.http.get<Array<{
    id: number,
    nameWithInitials: string, 
    fullName: string, 
    contactNumber: string, 
    email:string, 
    address: string,
    programOfStudy: string,
    status: string }>>('http://localhost:8080/students')
    .subscribe({
      next: (data) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error('Error loading student data', error);
      },
      complete: () => {
        console.log('Student data loading complete');
      }
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  get filteredData() {
    return this.tableData.filter(row =>
      row.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.nameWithInitials.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.contactNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.address.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.programOfStudy.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  navigateToStudentProfileToAdmin(){
    this.router.navigate(['afterlog/student-profile-to-admin']);
  }
}
