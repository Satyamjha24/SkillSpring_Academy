import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {InstructorService } from '../instructor.service';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent {
  instructor: any = {
    InstructorID: "",
    Name: "",
    Gender: "",
    DoB: "",
    DepartmentID: "",
    Email: "",
    ContactNum: ""
  };

  constructor(private instructorService: InstructorService) {}

  onSubmit(): void {
    this.instructorService.postInstructor(this.instructor).subscribe(response => {
      console.log('Instructor added:', response);
      this.instructor = {};
    });
  }
}
