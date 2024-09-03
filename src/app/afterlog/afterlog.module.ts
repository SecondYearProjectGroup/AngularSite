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
import { CreateCollapsibleSectionComponent } from './shared/create-collapsible-section/create-collapsible-section.component';
import { StudentResearchComponent } from './student/student-research/student-research.component';
import { StudentCoursesComponent } from './student/student-courses/student-courses.component';
import { ExaminerDashboardComponent } from './examiner/examiner-dashboard/examiner-dashboard.component';
import { MainCalendarComponent } from './shared/main-calendar/main-calendar.component';
import { SuperviseesComponent } from './supervisor/supervisees/supervisees.component';
import { StudentProfileToSupervisorComponent } from './supervisor/student-profile-to-supervisor/student-profile-to-supervisor.component';
import { StudentsToExaminerComponent } from './examiner/students-to-examiner/students-to-examiner.component';
import { StudentProfileToExaminerComponent } from './examiner/student-profile-to-examiner/student-profile-to-examiner.component';
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';
import { FeedbackPageComponent } from './shared/tiles-and-inside/feedback-page/feedback-page.component';
import { AssignSupervisorByAdminComponent } from './admin/assign-supervisor-by-admin/assign-supervisor-by-admin.component';
import { AddStaffMembersByAdminComponent } from './admin/add-staff-members-by-admin/add-staff-members-by-admin.component';
import { AssignmentSubmissionComponent } from './shared/tiles-and-inside/assignment-submission/assignment-submission.component';
import { EditProfileForStaffComponent } from './shared/edit-profile-for-staff/edit-profile-for-staff.component';
import { CreateCalendarEventComponent } from './shared/create-calendar-event/create-calendar-event.component';
import { FeedbackTileComponent } from './shared/tiles-and-inside/feedback-tile/feedback-tile.component';
import { AssignmentSubmissionTileComponent } from './shared/tiles-and-inside/assignment-submission-tile/assignment-submission-tile.component';
import { HomeForRolesComponent } from './shared/home-for-roles/home-for-roles.component';




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
    CreateCollapsibleSectionComponent,
    StudentResearchComponent,
    StudentCoursesComponent,
    ExaminerDashboardComponent,
    MainCalendarComponent,
    SuperviseesComponent,
    StudentProfileToSupervisorComponent,
    StudentsToExaminerComponent,
    StudentProfileToExaminerComponent,
    EditProfileComponent,
    FeedbackPageComponent,
    AssignSupervisorByAdminComponent,
    AddStaffMembersByAdminComponent,
    AssignmentSubmissionComponent,
    EditProfileForStaffComponent,
    CreateCalendarEventComponent,
    FeedbackTileComponent,
    AssignmentSubmissionTileComponent,
    HomeForRolesComponent
  ],
  imports: [
    CommonModule,
    AfterlogRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AfterlogModule { }
