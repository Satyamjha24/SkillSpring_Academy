import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import {InstructorService } from '../instructor.service';
import {CourseService } from '../course.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  studentLength: number = 0;
  instructorLength: number = 0;
  courseLength: number = 0;


  constructor(
    private studentService: StudentService,
    private instructorService: InstructorService,
    private courseService: CourseService,
  ) {}


  ngOnInit(): void {

    this.studentService.getStudents().subscribe((data) => {
      this.studentLength = data.length;
    });

    this.instructorService.getInstructors().subscribe(data => {
      this.instructorLength = data.length;
    });

    this.courseService.getCourses().subscribe(data => {
      this.courseLength = data.length;
    });
  }
}
