// src/app/afterlog/afterlog-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { SupervisorDashboardComponent } from './supervisor/supervisor-dashboard/supervisor-dashboard.component';
import { EnrolledStudentsComponent } from './admin/enrolled-students/enrolled-students.component';
// import { RoleGuardService as RoleGuard } from '../shared/services/role-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'student-dashboard', pathMatch: 'full' },
//   { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'enrolled-students', component: EnrolledStudentsComponent }
//   { path: 'supervisor-dashboard', component: SupervisorDashboardComponent, canActivate: [RoleGuard], data: { expectedRole: 'supervisor' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfterlogRoutingModule { }
