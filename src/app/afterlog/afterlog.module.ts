import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { SupervisorDashboardComponent } from './supervisor/supervisor-dashboard/supervisor-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AfterlogRoutingModule } from './afterlog-routing.module';
import { SidebarRightComponent } from './shared/sidebar-right/sidebar-right.component';
import { RolesMainComponent } from './roles-main/roles-main.component';
import { EnrolledStudentsComponent } from './admin/enrolled-students/enrolled-students.component';
import { StudentsToAdminComponent } from './admin/students-to-admin/students-to-admin.component';
import { SupervisorsToAdminComponent } from './admin/supervisors-to-admin/supervisors-to-admin.component';
import { ExaminersToAdminComponent } from './admin/examiners-to-admin/examiners-to-admin.component';
import { StudentProfileToAdminComponent } from './admin/student-profile-to-admin/student-profile-to-admin.component';




@NgModule({
  declarations: [
    AdminDashboardComponent,
    StudentDashboardComponent,
    SupervisorDashboardComponent,
    SidebarRightComponent,
    RolesMainComponent,
    EnrolledStudentsComponent,
    StudentsToAdminComponent,
    SupervisorsToAdminComponent,
    ExaminersToAdminComponent,
    StudentProfileToAdminComponent
  ],
  imports: [
    CommonModule,
    AfterlogRoutingModule,
    SharedModule
  ]
})
export class AfterlogModule { }
