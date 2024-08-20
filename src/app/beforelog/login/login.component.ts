// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthServiceService } from '../../services/auth-service.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';

//   constructor(private authService: AuthServiceService, private router: Router) {}

//   onSubmit() {
//     this.authService.login(this.username, this.password).subscribe(
//       (response: string) => {
//         console.log('Login successful:', response);
//         const roles = response.split(','); // Assuming the roles are returned as a comma-separated string
        
//         if (roles.includes('ADMIN')) {
//           this.router.navigate(['/afterlog/admin-dashboard']);
//         } else if (roles.includes('STUDENT')) {
//           this.router.navigate(['/afterlog/student-dashboard']);
//         } else if (roles.includes('SUPERVISOR')) {
//           this.router.navigate(['/afterlog/supervisor-dashboard']);
//         } else {
//           this.router.navigate(['/beforelog/login']);
//         }
//       },
//       (error: any) => {
//         console.error('Login failed:', error);
//         alert('Login failed. Please check your credentials.');
//       }
//     );
//   }

//   navigateToSignup() {
//     this.router.navigate(['/beforelog/signup']);
//   }
// }
// components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { decodeJwt } from '../../utils/jwt-utils.service';


interface DecodedToken {
  exp: number;
  iat: number;
  roles: { authority: string }[]; // Update based on actual structure
  [key: string]: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response: string) => {
        console.log('Login successful:', response);
  
        localStorage.setItem('jwt', response);
  
        try {
          const decodedToken: DecodedToken = decodeJwt(response);
          const roles = (decodedToken.roles || []).map(role => role.authority); // Extract the authority
  
          console.log(roles);
  
          if (roles.includes('ADMIN')) {
            this.router.navigate(['/afterlog/admin-dashboard']);
          } else if (roles.includes('STUDENT')) {
            this.router.navigate(['/afterlog/student-dashboard']);
          } else if (roles.includes('SUPERVISOR')) {
            this.router.navigate(['/afterlog/supervisor-dashboard']);
          } else {
            this.router.navigate(['/beforelog/login']);
          }
        } catch (error) {
          console.error('Failed to decode token:', error);
          this.router.navigate(['/beforelog/login']);
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password.'; // Set error message
      }
    );  
  }

  navigateToSignup() {
    this.router.navigate(['/beforelog/signup']);
  }
}



