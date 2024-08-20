import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrl: './assignment-submission.component.css'
})
export class AssignmentSubmissionComponent implements OnInit {

  ngOnInit(): void {
    scrollTo(0,0);
  }

}
