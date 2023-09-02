import { Component } from '@angular/core';
import {StudentService } from '../student.service';

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

  constructor(private studentService: StudentService) {}

  onSubmit(): void {
    this.studentService.postStudent(this.student).subscribe(response => {
      console.log('Student added:', response);
      this.student = {};
    });
  }
}
