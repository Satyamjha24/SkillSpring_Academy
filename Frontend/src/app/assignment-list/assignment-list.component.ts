import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css'],
})
export class AssignmentListComponent implements OnInit {
  assignments: any[] = [];
  editMode: boolean = false;
  editedAssignment: any = {}; // Object to store edited data
  editedIndex: number = -1; // Index of the row being edited

  constructor(
    private assignmentService: AssignmentService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.assignmentService.getAssignments().subscribe((data) => {
      this.assignments = data;
    });
  }

  onEditClick(index: number, course: any): void {
    this.editMode = true;
    this.editedAssignment = { ...course }; // Create a copy of the student object to avoid modifying the original data
    this.editedIndex = index;
  }

  onSaveClick(index: number): void {
    // Send a patch request with this.editedStudent to update the data on the server
    // After a successful update, update the local students array
    this.editedAssignment = { ...this.assignments[this.editedIndex] };
    // console.log(this.editedIndex, this.editedAssignment._id, this.editedAssignment);

    this.assignmentService
      .editAssignment(this.editedAssignment._id, this.editedAssignment)
      .subscribe(
        (response) => {
          // Handle the successful response here, e.g., update the local data
          // Example: this.students[index] = response;
          console.log('Data updated successfully:', response);
          this.toast.info({
            detail: 'Update',
            summary: 'Assignment data updated Successfully',
            duration: 2000,
            position: 'botomCenter',
          });
        },
        (error) => {
          // Handle any errors that occur during the PATCH request
          console.error('Error updating data:', error);
        }
      );

    // Reset edit mode
    this.editMode = false;
    this.editedAssignment = {};
    this.editedIndex = -1;
  }

  onCancelClick(): void {
    // Reset edit mode without saving changes
    this.editMode = false;
    this.editedAssignment = {};
    this.editedIndex = -1;
  }

  onDeleteClick(assignmentID: string) {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.assignmentService.deleteAssignment(assignmentID).subscribe(
        (response) => {
          console.log(`Assignment with ID ${assignmentID} deleted.`);
          // Refresh the student list or update as needed
          this.toast.warning({
            detail: 'Delete',
            summary: 'Assignment deleted Successfully',
            duration: 2000,
            position: 'botomCenter',
          });
          this.assignmentService.getAssignments().subscribe((data) => {
            this.assignments = data;
          });
        },
        (error) => {
          console.error(`Error deleting Assignment with ID ${assignmentID}:`, error);
        }
      );
    }
  }
}
