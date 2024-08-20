import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{

  ngOnInit(): void {
    scrollTo(0,0);
  }

  onEditProfileSubmit() {
  }
  
}
