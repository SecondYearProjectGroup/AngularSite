import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-assign-supervisor-by-admin',
  templateUrl: './assign-supervisor-by-admin.component.html',
  styleUrl: './assign-supervisor-by-admin.component.css'
})
export class AssignSupervisorByAdminComponent implements OnInit{

  @Input() regNumber: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() supervisorAssigned = new EventEmitter<string>();

  constructor(private http: HttpClient){}

  tableData: Array<{ id: number, fullName: string, email:string, noOfSupervisees:number }> = [];

  searchText: string = '';
  
  //To load Supervisors 
  loadSupervisors(regNumber : string | null) {
  this.http.get<Array<{ id: number, fullName: string, email: string, noOfSupervisees: number }>>(`http://localhost:8080/supervisors/${regNumber}`)
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
    this.loadSupervisors(this.regNumber);
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


  assignSupervisor(): void {

    if (this.selectedSupervisor) {
      const url = `http://localhost:8080/assignSupervisor/${this.regNumber}`;
      this.http.post(url, null, { 
        params: { supervisorId: this.selectedSupervisor.id }, 
        responseType: 'text' // Expect a plain text response
      }).subscribe({
        next: (response) => {
          console.log('Supervisor assigned successfully:', response);
          alert('Supervisor assigned successfully.');
          
          // Emit the supervisor's name after a successful assignment
          this.supervisorAssigned.emit(this.selectedSupervisor.fullName); // Emit the selected supervisor's name

          // Close the assignment dialog
          this.closeAssignSupervisorByAdmin();
        },
        error: (error) => {
          console.error('Error assigning supervisor:', error);
          alert(`Error assigning supervisor: ${error.status} - ${error.statusText}`);
        },
      });
    } else {
      alert('Please select a supervisor.');
    }
  }

}
