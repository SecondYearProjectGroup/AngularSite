import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-assign-supervisor-by-admin',
  templateUrl: './assign-supervisor-by-admin.component.html',
  styleUrl: './assign-supervisor-by-admin.component.css'
})
export class AssignSupervisorByAdminComponent implements OnInit{

  @Output() close = new EventEmitter<void>();

  constructor(private http: HttpClient){}

  tableData: Array<{ id: number, fullName: string, email:string, noOfSupervisees:number }> = [];

  searchText: string = '';
  
  //To load Supervisors 
  loadSupervisors() {
  this.http.get<Array<{ id: number, fullName: string, email: string, noOfSupervisees: number }>>('http://localhost:8080/supervisors')
    .subscribe({
      next: (data) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error('Error loading supervisor data', error);
      },
      complete: () => {
        console.log('Supervisor data loading complete');
      }
    });
  }

  ngOnInit(): void {
    this.loadSupervisors();
  }

  get filteredData() {
    return this.tableData.filter(row =>
      row.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.noOfSupervisees.toString().toLowerCase().includes(this.searchText.toLowerCase()) 
    );
  }

  closeAssignSupervisorByAdmin(): void {
    this.close.emit();
  }

  selectedSupervisor: any;

  onSubmit() {
    console.log(this.selectedSupervisor); // Will contain the data of the selected supervisor
  }
}
