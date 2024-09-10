import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-examiner-by-admin',
  templateUrl: './assign-examiner-by-admin.component.html',
  styleUrls: ['./assign-examiner-by-admin.component.css']
})
export class AssignExaminerByAdminComponent implements OnInit {

  @Input() id: number | null = null;
  @Output() close = new EventEmitter<void>();

  tableData: Array<{ id: number, fullName: string, email: string, selected?: boolean }> = [];
  assignedExaminers: Array<{ id: number, fullName: string }> = []; // Store previously assigned examiners
  searchText: string = '';
  selectedExaminers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadExaminers(this.id);
    this.loadAssignedExaminers(); // Load previously assigned examiners
  }

  // Load examiners from the backend
  loadExaminers(submissionId : number | null) {
    this.http.get<Array<{ id: number, fullName: string, email: string }>>(`http://localhost:8080/examiners/${submissionId}`)
      .subscribe({
        next: (data) => {
          this.tableData = data.map(examiner => ({
            ...examiner,
            selected: false
          }));
        },
        error: (error) => {
          console.error('Error loading examiners data', error);
        },
        complete: () => {
          console.log('Examiners data loading complete');
        }
      });
  }

  // Load previously assigned examiners
  loadAssignedExaminers() {
    if (this.id !== null) {
      const url = `http://localhost:8080/getAssignedExaminers/${this.id}`;
      this.http.get<Array<{ id: number, fullName: string }>>(url)
        .subscribe({
          next: (data) => {
            this.assignedExaminers = data;
          },
          error: (error) => {
            console.error('Error loading assigned examiners', error);
          },
          complete: () => {
            console.log('Assigned examiners data loading complete');
          }
        });
    }
  }

  // Filter the table data based on search input
  get filteredData() {
    return this.tableData.filter(row =>
      row.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Close the modal
  closeAssignExaminerByAdmin(): void {
    this.close.emit();
  }

  // Assign selected examiners
  assignExaminers(): void {
    if (this.id === null) {
      alert('Submission ID is missing');
      return;
    }

    // Collect selected examiners' IDs
    const selectedExaminerIds = this.tableData
      .filter(examiner => examiner.selected)
      .map(examiner => examiner.id);

    if (selectedExaminerIds.length === 0) {
      alert('No examiners selected');
      return;
    }

    const url = `http://localhost:8080/assignExaminers/${this.id}`;
    const params = new HttpParams().set('examinerIds', selectedExaminerIds.join(','));

    this.http.post(url, null, {
      params,
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        console.log('Examiners assigned successfully:', response);
        alert('Examiners assigned successfully.');
        this.loadAssignedExaminers(); // Reload the assigned examiners list
      },
      error: (error) => {
        console.error('Error assigning examiners:', error);
        alert(`Error assigning examiners: ${error.status} - ${error.statusText}`);
      },
    });
  }
}


