import { Component, OnInit } from '@angular/core';
import { TileIdService } from '../../../services/tile-id.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrl: './assignment-submission.component.css'
})
export class AssignmentSubmissionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute) { }

  id: number = 0;

  ngOnInit(): void {
    scrollTo(0, 0);
  
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? parseInt(idParam, 10) : 0; // Default to 0 if idParam is null
    console.log('Retrieved tile id from route params:', this.id);
  }

}
