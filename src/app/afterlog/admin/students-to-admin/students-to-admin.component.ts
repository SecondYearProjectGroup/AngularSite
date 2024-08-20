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
    regNumber: String,
    nameWithInitials: string, 
    fullName: string, 
    contactNumber: string, 
    email:string, 
    address: string, 
    programOfStudy: string
  }> = [];

  searchText: string = '';

  loadStudents() {
    this.http.get<Array<{
    regNumber: String,
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
      row.regNumber.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
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
