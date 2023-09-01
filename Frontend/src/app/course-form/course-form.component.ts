import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CourseService } from '../course.service';

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

  constructor(private courseService: CourseService) {}

  onSubmit(): void {
    this.courseService.postCourse(this.course).subscribe(response => {
      console.log('Course added:', response);
      this.course = {};
    });
  }
}
