import { Component, OnInit } from '@angular/core';
import {CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit{
  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  onEditClick(courseID: string) {
    console.log(`Edit clicked with ID: ${courseID}`);
  }
  
  onDeleteClick(courseID: string) {
    console.log(`Delete clicked with ID: ${courseID}`);
  }
}
