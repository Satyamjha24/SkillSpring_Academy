import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CourseService } from '../course.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {
  course: any = {
    CourseCode: '',
    Name: '',
    DepartmentID:'',
    Credits: null,
    Description: '',
    InstructorID:''
  };

  constructor(private courseService: CourseService, private router : Router, private toast : NgToastService) {}

  onSubmit(): void {
    this.courseService.postCourse(this.course).subscribe(response => {
      console.log('Course added:', response);
      this.course = {};
      this.toast.success({detail:"SUCCESS",summary:'New Course added Successfully',duration:2000, position:'botomCenter'});
      this.router.navigate(['/course']);
    });
  }
}
