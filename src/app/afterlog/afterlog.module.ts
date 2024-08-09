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
import { FormsModule } from '@angular/forms';
import { CollapsibleSectionComponent } from './shared/collapsible-section/collapsible-section.component';
import { TileComponent } from './shared/tile/tile.component';
import { CreateCollapsibleSectionComponent } from './shared/create-collapsible-section/create-collapsible-section.component';




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
    StudentProfileToAdminComponent,
    CollapsibleSectionComponent,
    TileComponent,
    CreateCollapsibleSectionComponent
  ],
  imports: [
    CommonModule,
    AfterlogRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AfterlogModule { }
