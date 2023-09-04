import { Component, OnInit } from '@angular/core';
import {CourseService } from '../course.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit{
  courses: any[] = [];
  editMode: boolean = false;
  editedCourse: any = {}; // Object to store edited data
  editedIndex: number = -1; // Index of the row being edited

  constructor(private courseService: CourseService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  onEditClick(index: number, course: any): void{
    this.editMode = true;
    this.editedCourse = { ...course }; // Create a copy of the student object to avoid modifying the original data
    this.editedIndex = index;
  }

  onSaveClick(index: number): void {
    // Send a patch request with this.editedStudent to update the data on the server
    // After a successful update, update the local students array
    this.editedCourse = { ...this.courses[this.editedIndex] };
    // console.log(this.editedIndex, this.editedCourse._id, this.editedCourse);

    this.courseService
      .editCourse(this.editedCourse._id, this.editedCourse)
      .subscribe(
        (response) => {
          // Handle the successful response here, e.g., update the local data
          // Example: this.students[index] = response;
          console.log('Data updated successfully:', response);
          this.toast.info({detail:"Update",summary:'Course data updated Successfully',duration:2000, position: 'botomCenter'});
        },
        (error) => {
          // Handle any errors that occur during the PATCH request
          console.error('Error updating data:', error);
        }
      );

    // Reset edit mode
    this.editMode = false;
    this.editedCourse = {};
    this.editedIndex = -1;
  }

  onCancelClick(): void {
    // Reset edit mode without saving changes
    this.editMode = false;
    this.editedCourse = {};
    this.editedIndex = -1;
  }

  
  onDeleteClick(courseID: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseID).subscribe(
        (response) => {
          console.log(`Course with ID ${courseID} deleted.`);
          // Refresh the student list or update as needed
          this.toast.warning({detail:"Delete",summary:'Course deleted Successfully',duration:2000, position: 'botomCenter'});
          this.courseService.getCourses().subscribe((data) => {
            this.courses = data;
          });
        },
        (error) => {
          console.error(`Error deleting course with ID ${courseID}:`, error);
        }
      );
    }
  }
}
