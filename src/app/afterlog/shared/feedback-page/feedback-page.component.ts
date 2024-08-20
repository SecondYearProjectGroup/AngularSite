import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrl: './feedback-page.component.css'
})
export class FeedbackPageComponent implements OnInit{

  ngOnInit(): void {
    scrollTo(0,0);
  }
}
