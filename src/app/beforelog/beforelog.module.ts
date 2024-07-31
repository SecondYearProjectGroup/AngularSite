import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeforelogRoutingModule } from './beforelog-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EnrollComponent } from './enroll/enroll.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    EnrollComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    BeforelogRoutingModule,
    SharedModule
  ]
})
export class BeforelogModule { }


// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import { EnrollComponent } from './enroll/enroll.component';
// import { WelcomeComponent } from './welcome/welcome.component';
// import { SharedModule } from '../shared/shared.module';
// import { BeforelogRoutingModule } from './beforelog-routing.module';



// @NgModule({
//   declarations: [
//     LoginComponent,
//     SignupComponent,
//     EnrollComponent,
//     WelcomeComponent
//   ],
//   imports: [
//     CommonModule,
//     SharedModule,
//     BeforelogRoutingModule
//   ]
// })
// export class BeforelogModule { }