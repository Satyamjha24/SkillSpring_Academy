import { Component, OnInit } from '@angular/core';
import {InstructorService } from '../instructor.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {
  instructors: any[] = [];
  editMode: boolean = false;
  editedinstructor: any = {}; // Object to store edited data
  editedIndex: number = -1; // Index of the row being edited

  constructor(private instructorService: InstructorService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.instructorService.getInstructors().subscribe(data => {
      this.instructors = data;
    });
  }

  onEditClick(index: number, course: any): void{
    this.editMode = true;
    this.editedinstructor = { ...course }; // Create a copy of the student object to avoid modifying the original data
    this.editedIndex = index;
  }

  onSaveClick(index: number): void {
    // Send a patch request with this.editedStudent to update the data on the server
    // After a successful update, update the local students array
    this.editedinstructor = { ...this.instructors[this.editedIndex] };
    // console.log(this.editedIndex, this.editedinstructor._id, this.editedinstructor);

    this.instructorService
      .editInstructor(this.editedinstructor._id, this.editedinstructor)
      .subscribe(
        (response) => {
          // Handle the successful response here, e.g., update the local data
          // Example: this.students[index] = response;
          console.log('Data updated successfully:', response);
        },
        (error) => {
          // Handle any errors that occur during the PATCH request
          console.error('Error updating data:', error);
        }
      );

    // Reset edit mode
    this.editMode = false;
    this.editedinstructor = {};
    this.editedIndex = -1;
  }

  onCancelClick(): void {
    // Reset edit mode without saving changes
    this.editMode = false;
    this.editedinstructor = {};
    this.editedIndex = -1;
  }

  
  onDeleteClick(courseID: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.instructorService.deleteInstructor(courseID).subscribe(
        (response) => {
          console.log(`Course with ID ${courseID} deleted.`);
          // Refresh the student list or update as needed
          this.instructorService.getInstructors().subscribe((data) => {
            this.instructors = data;
          });
        },
        (error) => {
          console.error(`Error deleting course with ID ${courseID}:`, error);
        }
      );
    }
  }

}
