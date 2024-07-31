import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EnrollComponent } from './enroll/enroll.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'enroll', component: EnrollComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeforelogRoutingModule { }


// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import { EnrollComponent } from './enroll/enroll.component';
// import { WelcomeComponent } from './welcome/welcome.component';
// import { TopNavigationComponent } from '../shared/top-navigation/top-navigation.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/welcome', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
//   { path: 'enroll', component: EnrollComponent },
//   { path: 'welcome', component: WelcomeComponent },
//   { path: 'top-navigation', component: TopNavigationComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class BeforelogRoutingModule { }