import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrl: './feedback-page.component.css'
})
export class FeedbackPageComponent implements OnInit{

  userRole: string | null = null;
  isFeedbackUploaded: boolean = false;
  isFeedbackFileUploaded: boolean = false;

  @Input() mode: 'feedbackReciever' | 'feedbackProvider' = 'feedbackReciever';

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
