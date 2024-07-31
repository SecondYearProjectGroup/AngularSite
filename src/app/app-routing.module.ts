import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/beforelog', pathMatch: 'full' },
  { path: 'beforelog', loadChildren: () => import('./beforelog/beforelog.module').then(m => m.BeforelogModule) },
  { path: 'afterlog', loadChildren: () => import('./afterlog/afterlog.module').then(m => m.AfterlogModule) },
  { path: '**', redirectTo: '/beforelog' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './beforelog/login/login.component';
// import { WelcomeComponent } from './beforelog/welcome/welcome.component';
// import { SignupComponent } from './beforelog/signup/signup.component';


// const routes: Routes = [
//   { path: '', redirectTo: '/welcome', pathMatch: 'full' },
//   { path: 'welcome', component: WelcomeComponent },
//   { path: 'signup', component: SignupComponent},
//   { path: 'login', component: LoginComponent},
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
