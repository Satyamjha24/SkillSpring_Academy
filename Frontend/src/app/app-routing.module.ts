import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'course', component: CourseListComponent },
  { path: 'add_course', component: CourseFormComponent },
  { path: 'student', component: StudentListComponent },
  { path: 'add_student', component: StudentFormComponent },
  { path: 'instructor', component: InstructorListComponent },
  { path: 'add_instructor', component: InstructorFormComponent },
  { path: 'assignment', component: AssignmentListComponent },
  { path: 'add_assignment', component: AssignmentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
