import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssignmentService } from '../assignment.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css'],
})
export class AssignmentFormComponent {
  assignment: any = {
    AssignmentID: '',
    CourseCode: '',
    Title: '',
    Description: '',
    DueDate: '',
  };

  constructor(
    private assignmentService: AssignmentService,
    private router: Router,
    private toast: NgToastService
  ) {}

  onSubmit(): void {
    this.assignmentService
      .postAssignment(this.assignment)
      .subscribe((response) => {
        console.log('Assignment added:', response);
        this.assignment = {};
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'New Assignment added Successfully',
          duration: 2000,
          position: 'botomCenter',
        });
        this.router.navigate(['/assignment']);
      });
  }
}
