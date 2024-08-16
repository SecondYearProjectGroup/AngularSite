import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisees',
  templateUrl: './supervisees.component.html',
  styleUrl: './supervisees.component.css'
})
export class SuperviseesComponent {

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

  navigateToStudentProfileToSupervisor(){
    this.router.navigate(['afterlog/student-profile-to-supervisor']);
  }
}


// get filteredData() {
//   return this.tableData.filter(row =>
//     row.column1.toLowerCase().includes(this.searchText.toLowerCase()) ||
//     row.column2.toLowerCase().includes(this.searchText.toLowerCase()) ||
//     row.column3.toLowerCase().includes(this.searchText.toLowerCase()) ||
//     row.column4.toLowerCase().includes(this.searchText.toLowerCase())
//   );
// }