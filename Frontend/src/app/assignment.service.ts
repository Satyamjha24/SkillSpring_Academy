import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getAssignments(): Observable<any> {
    return this.http.get(`${this.apiUrl}assignments/`);
  }

  postAssignment(assignmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add_assignment/`, assignmentData);
  }

  deleteAssignment(assignmentID: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}assignments/${assignmentID}/`);
  }

  editAssignment(assignmentID: string, updatedData:any): Observable<any> {
    return this.http.patch(`${this.apiUrl}assignments/update/${assignmentID}/`,updatedData);
  }
}
