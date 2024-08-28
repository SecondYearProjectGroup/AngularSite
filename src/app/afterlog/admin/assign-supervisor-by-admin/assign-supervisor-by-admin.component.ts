import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-assign-supervisor-by-admin',
  templateUrl: './assign-supervisor-by-admin.component.html',
  styleUrl: './assign-supervisor-by-admin.component.css'
})
export class AssignSupervisorByAdminComponent implements OnInit{

  @Input() regNumber: string | null = null;
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

  // assignSupervisor(): void {
  //   const url = `http://localhost:8080/assignSupervisor/${this.regNumber}`;
  //   const body = { supervisorId: this.selectedSupervisor.id };
  
  //   this.http.post(url, null, { params: { supervisorId: this.selectedSupervisor.id } }).subscribe({
  //     next: (response) => {
  //       console.log('Supervisor assigned successfully:', response);
  //       alert('Supervisor assigned successfully.');
  //     },
  //     error: (error) => {
  //       console.error('Error assigning supervisor:', error);
  //       alert(`Error assigning supervisor: ${error.status} - ${error.statusText}`);
  //     },
  //   });
  // }
  

  assignSupervisor(): void {
    const url = `http://localhost:8080/assignSupervisor/${this.regNumber}`;
    this.http.post(url, null, { 
      params: { supervisorId: this.selectedSupervisor.id }, 
      responseType: 'text' // Expect a plain text response
    }).subscribe({
      next: (response) => {
        console.log('Supervisor assigned successfully:', response);
        alert('Supervisor assigned successfully.');
      },
      error: (error) => {
        console.error('Error assigning supervisor:', error);
        alert(`Error assigning supervisor: ${error.status} - ${error.statusText}`);
      },
    });
  }

}
