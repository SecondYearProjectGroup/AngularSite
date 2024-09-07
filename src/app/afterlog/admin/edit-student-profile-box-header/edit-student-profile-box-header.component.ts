import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-edit-student-profile-box-header',
  templateUrl: './edit-student-profile-box-header.component.html',
  styleUrl: './edit-student-profile-box-header.component.css'
})
export class EditStudentProfileBoxHeaderComponent {

  @Input() regNumber: string | null = null;
  @Input() nameWithInitials: string | null = null;
  @Input() programOfStudy: string | null = null;
  @Output() close = new EventEmitter<void>();

  student: Student = {
    regNumber: '',
    nameWithInitials: '',
    programOfStudy: '',
    status: '',
    contactNumber: '',
    email: '',
    address: '',
    university: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {

  }

  ngOnInit(): void {
    this.student.nameWithInitials = this.nameWithInitials ?? '';
    this.student.programOfStudy = this.programOfStudy ?? '';
  }
   

  closeCreateCalendarEvent(): void {
    this.close.emit();
  }
}
