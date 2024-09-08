import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-assigned-supervisors-to-admin',
  templateUrl: './assigned-supervisors-to-admin.component.html',
  styleUrl: './assigned-supervisors-to-admin.component.css'
})
export class AssignedSupervisorsToAdminComponent {

  constructor(private http: HttpClient){}

  // tableData: Array<{ id: number, fullName: string, email:string, noOfSupervisees:number }> = [];

  searchText: string = '';

  ngOnInit(): void {
    scrollTo(0,0);
    // this.loadSupervisors();
  }
    
  //To load Supervisors 
  // loadSupervisors() {
  // this.http.get<Array<{ id: number, fullName: string, email: string, noOfSupervisees: number }>>('http://localhost:8080/supervisorsToAdmin')
  //   .subscribe({
  //     next: (data) => {
  //       this.tableData = data;
  //     },
  //     error: (error) => {
  //       console.error('Error loading supervisor data', error);
  //     },
  //     complete: () => {
  //       console.log('Supervisor data loading complete');
  //     }
  //   });
  // }

  

  // get filteredData() {
  //   return this.tableData.filter(row =>
  //     row.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     row.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     row.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     row.noOfSupervisees.toString().toLowerCase().includes(this.searchText.toLowerCase()) 
  //   );
  // }
}
