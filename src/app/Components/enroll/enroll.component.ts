import { Component } from '@angular/core';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrl: './enroll.component.css'
})
export class EnrollComponent {

  onEnrollSubmit() {
    window.alert('You enrolled successfully.');
  }
}
