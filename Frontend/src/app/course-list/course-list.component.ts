import { Component, OnInit } from '@angular/core';
import {CourseService } from '../course.service';
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit{
  courses: any[] = [];

  constructor(private courseService: CourseService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  onEditClick(courseID: string) {
    console.log(`Edit clicked with ID: ${courseID}`);
  }
  
  onDeleteClick(CourseCode: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.courseService.deleteCourse(CourseCode).subscribe(
        (response) => {
          console.log(`Student with ID ${CourseCode} deleted.`);
          // Refresh the student list or update as needed
          this.toast.info({detail:"DELETE",summary:'Course Deleted Successfully',sticky:true, position: 'botomCenter'});
          this.courseService.getCourses().subscribe(data => {
            this.courses = data;
          });
        },
        (error) => {
          console.error(`Error deleting student with ID ${CourseCode}:`, error);
        }
      );
    }
  }
}
