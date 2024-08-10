// src/app/afterlog/afterlog-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { SupervisorDashboardComponent } from './supervisor/supervisor-dashboard/supervisor-dashboard.component';
import { EnrolledStudentsComponent } from './admin/enrolled-students/enrolled-students.component';
import { RolesMainComponent } from './roles-main/roles-main.component';
import { StudentsToAdminComponent } from './admin/students-to-admin/students-to-admin.component';
import { SupervisorsToAdminComponent } from './admin/supervisors-to-admin/supervisors-to-admin.component';
import { ExaminersToAdminComponent } from './admin/examiners-to-admin/examiners-to-admin.component';
import { StudentProfileToAdminComponent } from './admin/student-profile-to-admin/student-profile-to-admin.component';
import { StudentResearchComponent } from './student/student-research/student-research.component';
import { StudentCoursesComponent } from './student/student-courses/student-courses.component';
import { ExaminerDashboardComponent } from './examiner/examiner-dashboard/examiner-dashboard.component';
import { SuperviseesComponent } from './supervisor/supervisees/supervisees.component';
import { StudentProfileToSupervisorComponent } from './supervisor/student-profile-to-supervisor/student-profile-to-supervisor.component';
import { StudentsToExaminerComponent } from './examiner/students-to-examiner/students-to-examiner.component';
import { StudentProfileToExaminerComponent } from './examiner/student-profile-to-examiner/student-profile-to-examiner.component';
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';
// import { RoleGuardService as RoleGuard } from '../shared/services/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: RolesMainComponent,
    children: [
      // Admin
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'students-to-admin', component: StudentsToAdminComponent },
      { path: 'enrolled-students', component: EnrolledStudentsComponent },
      { path: 'supervisors-to-admin', component: SupervisorsToAdminComponent },
      { path: 'examiners-to-admin', component: ExaminersToAdminComponent },
      { path: 'student-profile-to-admin', component: StudentProfileToAdminComponent },

      // Student
      { path: 'student-dashboard', component: StudentDashboardComponent },
      { path: 'student-research', component: StudentResearchComponent },
      { path: 'student-courses', component: StudentCoursesComponent },

      // Supervisor
      { path: 'supervisor-dashboard', component: SupervisorDashboardComponent },
      { path: 'supervisees', component: SuperviseesComponent },
      { path: 'student-profile-to-supervisor', component: StudentProfileToSupervisorComponent },

      // Examiner
      { path: 'examiner-dashboard', component: ExaminerDashboardComponent },
      { path: 'students-to-examiner', component: StudentsToExaminerComponent },
      { path: 'student-profile-to-examiner', component: StudentProfileToExaminerComponent },


      { path: 'edit-profile', component: EditProfileComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfterlogRoutingModule { }
