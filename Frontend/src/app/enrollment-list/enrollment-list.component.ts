import { Component, OnInit } from '@angular/core';
import {EnrollmentService } from '../enrollment.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit{
  enrollments: any[] = [];
  editMode: boolean = false;
  editedEnrollment: any = {}; // Object to store edited data
  editedIndex: number = -1; // Index of the row being edited

  constructor(private enrollmentService: EnrollmentService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.enrollmentService.getEnrollments().subscribe(data => {
      this.enrollments = data;
    });
  }

  onEditClick(index: number, course: any): void{
    this.editMode = true;
    this.editedEnrollment = { ...course }; // Create a copy of the student object to avoid modifying the original data
    this.editedIndex = index;
  }

  onSaveClick(index: number): void {
    // Send a patch request with this.editedStudent to update the data on the server
    // After a successful update, update the local students array
    this.editedEnrollment = { ...this.enrollments[this.editedIndex] };
    // console.log(this.editedIndex, this.editedEnrollment._id, this.editedCourse);

    this.enrollmentService
      .editEnrollment(this.editedEnrollment._id, this.editedEnrollment)
      .subscribe(
        (response) => {
          // Handle the successful response here, e.g., update the local data
          // Example: this.students[index] = response;
          console.log('Data updated successfully:', response);
          this.toast.info({detail:"Update",summary:'Enrollment data updated Successfully',duration:2000, position: 'botomCenter'});
        },
        (error) => {
          // Handle any errors that occur during the PATCH request
          console.error('Error updating data:', error);
        }
      );

    // Reset edit mode
    this.editMode = false;
    this.editedEnrollment = {};
    this.editedIndex = -1;
  }

  onCancelClick(): void {
    // Reset edit mode without saving changes
    this.editMode = false;
    this.editedEnrollment = {};
    this.editedIndex = -1;
  }

  
  onDeleteClick(enrollmentID: string) {
    if (confirm('Are you sure you want to delete this Enrollment?')) {
      this.enrollmentService.deleteEnrollment(enrollmentID).subscribe(
        (response) => {
          console.log(`Enrollment with ID ${enrollmentID} deleted.`);
          // Refresh the student list or update as needed
          this.toast.warning({detail:"Delete",summary:'Enrollment deleted Successfully',duration:2000, position: 'botomCenter'});
          this.enrollmentService.getEnrollments().subscribe((data) => {
            this.enrollments = data;
          });
        },
        (error) => {
          console.error(`Error deleting Enrollment with ID ${enrollmentID}:`, error);
        }
      );
    }
  }
}
