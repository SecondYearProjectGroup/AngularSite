import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRoleService } from '../../../services/user-role.service';

@Component({
  selector: 'app-viva-page',
  templateUrl: './viva-page.component.html',
  styleUrl: './viva-page.component.css'
})
export class VivaPageComponent implements OnInit {
  dueDate: any;
  
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userRoleService: UserRoleService) { 
      this.userRoleService.userRole$.subscribe(role => {
        this.userRole = role;
      });
    }

  id: number = 0;
  isCommmented: boolean = false;

  ngOnInit(): void {
    scrollTo(0, 0);
  
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? parseInt(idParam, 10) : 0; // Default to 0 if idParam is null
    console.log('Retrieved tile id from route params:', this.id);
  }

  onSubmit(){

    this.isCommmented = true;
  }
}
