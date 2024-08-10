import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-to-examiner',
  templateUrl: './students-to-examiner.component.html',
  styleUrl: './students-to-examiner.component.css'
})
export class StudentsToExaminerComponent {

  constructor(private router: Router) {}

  searchText: string = '';
  tableData: Array<{ column1: string, column2: string, column3: string, column4: string, column5: string }> = [
    { column1: '1', column2: 'Supun Perera', column3: 'University of Peradeniya', column4: 'None', column5: 'Yes' },
    { column1: '2', column2: 'Ishan Thathsra', column3: 'University of Ruhuna', column4: 'Angular', column5: 'No' },
    { column1: '3', column2: 'More Data 3', column3: 'More Data 3', column4: 'More Data 3', column5: 'More data' }
    // Add more data as needed
  ];

  get filteredData() {
    return this.tableData.filter(row =>
      row.column1.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.column2.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.column3.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.column4.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.column5.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  navigateToStudentProfileToExaminer(){
    this.router.navigate(['afterlog/student-profile-to-examiner']);
  }
}
