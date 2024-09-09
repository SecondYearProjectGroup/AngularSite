import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-assigned-examiners-to-admin',
  templateUrl: './assigned-examiners-to-admin.component.html',
  styleUrl: './assigned-examiners-to-admin.component.css'
})
export class AssignedExaminersToAdminComponent {

  constructor(private http: HttpClient){}

  // tableData: Array<{ id: number, fullName: string, department:string, email:string }> = [];

  searchText: string = '';

  ngOnInit(): void {
    scrollTo(0,0);
    // this.loadExaminers();
  }

  // loadExaminers() {
  //   this.http.get<Array<{ id: number, fullName: string, department:string, email:string }>>('http://localhost:8080/examinersToAdmin')
  //     .subscribe({
  //       next: (data) => {
  //         this.tableData = data;
  //       },
  //       error: (error) => {
  //         console.error('Error loading supervisor data', error);
  //       },
  //       complete: () => {
  //         console.log('Examiner data loading complete');
  //       }
  //     });
  //   }

  

  // get filteredData() {
  //   return this.tableData.filter(row =>
  //     row.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     row.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     row.department.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     row.email.toLowerCase().includes(this.searchText.toLowerCase()) 
  //   );
  // }
}
