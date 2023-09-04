import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  editMode: boolean = false;
  editedStudent: any = {}; // Object to store edited data
  editedIndex: number = -1; // Index of the row being edited

  constructor(private studentService: StudentService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  // onEditClick(studentID: string) {
  //   console.log(`Edit clicked with ID: ${studentID}`);
  // }

  onEditClick(index: number, student: any): void {
    this.editMode = true;
    this.editedStudent = { ...student }; // Create a copy of the student object to avoid modifying the original data
    this.editedIndex = index;
  }

  onSaveClick(index: number): void {
    // Send a patch request with this.editedStudent to update the data on the server
    // After a successful update, update the local students array
    this.editedStudent = { ...this.students[this.editedIndex] };
    // console.log(this.editedIndex, this.editedStudent._id, this.editedStudent);

    this.studentService.editStudent(this.editedStudent._id, this.editedStudent).subscribe(
      (response) => {
        // Handle the successful response here, e.g., update the local data
        // Example: this.students[index] = response;
        console.log('Data updated successfully:', response);
        this.toast.info({detail:"Update",summary:'Student data updated Successfully',duration:2000, position: 'botomCenter'});      
      },
      (error) => {
        // Handle any errors that occur during the PATCH request
        console.error('Error updating data:', error);
      }
    );

    // Reset edit mode
    this.editMode = false;
    this.editedStudent = {};
    this.editedIndex = -1;
  }

  onCancelClick(): void {
    // Reset edit mode without saving changes
    this.editMode = false;
    this.editedStudent = {};
    this.editedIndex = -1;
  }

  onDeleteClick(studentID: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(studentID).subscribe(
        (response) => {
          console.log(`Student with ID ${studentID} deleted.`);
          // Refresh the student list or update as needed
          this.toast.warning({detail:"Delete",summary:'Student deleted Successfully',duration:2000, position: 'botomCenter'});
          this.studentService.getStudents().subscribe((data) => {
            this.students = data;
          });
        },
        (error) => {
          console.error(`Error deleting student with ID ${studentID}:`, error);
        }
      );
    }
  }
}
