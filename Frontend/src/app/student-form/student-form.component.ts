import { Component } from '@angular/core';
import {StudentService } from '../student.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  student: any = {
    StudentID: "",
    Name: "",
    Gender: "",
    DoB: "",
    Major: "",
    Email: "",
    ContactNum: null
  };

  constructor(private studentService: StudentService, private router: Router, private toast : NgToastService) {}

  onSubmit(): void {
    this.studentService.postStudent(this.student).subscribe(response => {
      console.log('Student added:', response);
      this.student = {};
      this.toast.success({detail:"SUCCESS",summary:'New Student added Successfully',duration:2000, position:'botomCenter'});
      this.router.navigate(['/student']);
    });
  }
}
