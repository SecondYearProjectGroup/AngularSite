import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisees',
  templateUrl: './supervisees.component.html',
  styleUrl: './supervisees.component.css'
})
export class SuperviseesComponent {

  constructor(private router: Router) {}

  searchText: string = '';
  tableData: Array<{ column1: string, column2: string, column3: string, column4: string }> = [
    { column1: '1', column2: 'Supun Perera', column3: 'University of Peradeniya', column4: 'None' },
    { column1: '2', column2: 'Ishan Thathsra', column3: 'University of Ruhuna', column4: 'Angular' },
    { column1: '3', column2: 'More Data 3', column3: 'More Data 3', column4: 'More Data 3' },
    // Add more data as needed
  ];

  get filteredData() {
    return this.tableData.filter(row =>
      row.column1.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.column2.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.column3.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.column4.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  navigateToStudentProfileToSupervisor(){
    this.router.navigate(['afterlog/student-profile-to-supervisor']);
  }
}
