import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { NgForm } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private router: Router , private signupService : SignupService) {}

  navigateToLogin() {
    this.router.navigate(['beforelog/login']);
  }

  signupData = {
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  };
  errorMessage: string = '';

  
  onSubmit(form: NgForm) {
    this.signupService.signup(this.signupData).subscribe({
      next: (response) => {
        //alert('Signup successful! Redirecting to login page...');
        this.router.navigate(['beforelog/login']); // Programmatically navigate to login pag
      },
      error: (error) => {
        console.error('Signup error:', error.message);
        if (error.status === 409) {
          alert('Username already exists. Please choose another.');
        } else {
          NONE_TYPE
        }
      }
    });

    if (form.invalid) {
      this.errorMessage = 'Fill all the fields';
    } else if (form.value.password !== form.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
    } else {
      this.errorMessage = '';
      console.log('Form Submitted', form.value);
    }
  }
}

