import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';
import { NgToastModule } from 'ng-angular-popup';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { SubmissionListComponent } from './submission-list/submission-list.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CourseFormComponent,
    CourseListComponent,
    StudentFormComponent,
    StudentListComponent,
    InstructorFormComponent,
    InstructorListComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    DashboardComponent,
    AssignmentFormComponent,
    AssignmentListComponent,
    EnrollmentListComponent,
    SubmissionListComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgToastModule,
    AuthModule.forRoot({
      domain: 'dev-jwvwtwvlur4qpvte.us.auth0.com',
      clientId: '1FfBKJzZOVvh6WhXgSif5GywrSRcpwou',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
