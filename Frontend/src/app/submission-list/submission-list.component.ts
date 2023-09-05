import { Component, OnInit } from '@angular/core';
import {SubmissionService } from '../submission.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-submission-list',
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.css']
})
export class SubmissionListComponent implements OnInit {
  submissions: any[] = [];
  editMode: boolean = false;
  editedSubmission: any = {}; // Object to store edited data
  editedIndex: number = -1; // Index of the row being edited

  constructor(private submissionService: SubmissionService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.submissionService.getSubmissions().subscribe(data => {
      this.submissions = data;
    });
  }

  onEditClick(index: number, course: any): void{
    this.editMode = true;
    this.editedSubmission = { ...course }; // Create a copy of the student object to avoid modifying the original data
    this.editedIndex = index;
  }

  onSaveClick(index: number): void {
    // Send a patch request with this.editedStudent to update the data on the server
    // After a successful update, update the local students array
    this.editedSubmission = { ...this.submissions[this.editedIndex] };
    // console.log(this.editedIndex, this.editedSubmission._id, this.editedCourse);

    this.submissionService
      .editSubmission(this.editedSubmission._id, this.editedSubmission)
      .subscribe(
        (response) => {
          // Handle the successful response here, e.g., update the local data
          // Example: this.students[index] = response;
          console.log('Data updated successfully:', response);
          this.toast.info({detail:"Update",summary:'Submission data updated Successfully',duration:2000, position: 'botomCenter'});
        },
        (error) => {
          // Handle any errors that occur during the PATCH request
          console.error('Error updating data:', error);
        }
      );

    // Reset edit mode
    this.editMode = false;
    this.editedSubmission = {};
    this.editedIndex = -1;
  }

  onCancelClick(): void {
    // Reset edit mode without saving changes
    this.editMode = false;
    this.editedSubmission = {};
    this.editedIndex = -1;
  }

  
  onDeleteClick(submissionID: string) {
    if (confirm('Are you sure you want to delete this submission?')) {
      this.submissionService.deleteSubmission(submissionID).subscribe(
        (response) => {
          console.log(`Submission with ID ${submissionID} deleted.`);
          // Refresh the student list or update as needed
          this.toast.warning({detail:"Delete",summary:'Submission deleted Successfully',duration:2000, position: 'botomCenter'});
          this.submissionService.getSubmissions().subscribe((data) => {
            this.submissions = data;
          });
        },
        (error) => {
          console.error(`Error deleting Submission with ID ${submissionID}:`, error);
        }
      );
    }
  }
}
