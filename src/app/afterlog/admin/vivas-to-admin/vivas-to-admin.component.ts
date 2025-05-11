import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-vivas-to-admin',
  templateUrl: './vivas-to-admin.component.html',
  styleUrl: './vivas-to-admin.component.css'
})
export class VivasToAdminComponent {

  constructor(private http: HttpClient){}

  tableData: Array<{
    id: number, 
    title: string, 
    vivaDate: Date,
    //comments: string, 
    regNumber: string,
    registrationNumber: string,
    status: string, 
  }> = [];

  searchText: string = '';

  ngOnInit(): void {
    scrollTo(0,0);
    this.loadVivas();
  }
  
  loadVivas() {
    this.http.get<Array<{ 
      id: number,    
      title: string, 
      vivaDate: Date,
      //comments: string, 
      regNumber: string,
      registrationNumber: string,
      status: string,}>>(`${environment.apiUrl}/viva/details`)
      .subscribe({
        next: (data) => {
          this.tableData = data;
        },
        error: (error) => {
          console.error('Error loading supervisor data', error);
        },
        complete: () => {
          console.log('Examiner data loading complete');
        }
      });
    }

    get filteredData() {
      return this.tableData.filter(row => 
        (row.regNumber?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
        (row.status?.toLowerCase().includes(this.searchText.toLowerCase()) || '') ||
        (row.title?.toLowerCase().includes(this.searchText.toLowerCase()) || '')
      );
    }
}
