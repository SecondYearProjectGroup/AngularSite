import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viva-page',
  templateUrl: './viva-page.component.html',
  styleUrl: './viva-page.component.css'
})
export class VivaPageComponent implements OnInit {

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
