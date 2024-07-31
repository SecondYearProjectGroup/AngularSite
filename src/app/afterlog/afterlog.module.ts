import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { SupervisorDashboardComponent } from './supervisor/supervisor-dashboard/supervisor-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AfterlogRoutingModule } from './afterlog-routing.module';
import { SidebarRightComponent } from './shared/sidebar-right/sidebar-right.component';




@NgModule({
  declarations: [
    AdminDashboardComponent,
    StudentDashboardComponent,
    SupervisorDashboardComponent,
    SidebarRightComponent
  ],
  imports: [
    CommonModule,
    AfterlogRoutingModule,
    SharedModule
  ]
})
export class AfterlogModule { }
