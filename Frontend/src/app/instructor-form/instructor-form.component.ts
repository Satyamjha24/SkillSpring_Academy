import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {InstructorService } from '../instructor.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

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

  constructor(private instructorService: InstructorService, private router : Router, private toast : NgToastService) {}

  onSubmit(): void {
    this.instructorService.postInstructor(this.instructor).subscribe(response => {
      console.log('Instructor added:', response);
      this.instructor = {};
      this.toast.success({detail:"SUCCESS",summary:'New Instructor added Successfully',duration:2000, position:'botomCenter'});
      this.router.navigate(['/instructor']);
    });
  }
}
