import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}students/`);
  }

  postStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add_student/`, studentData);
  }

  deleteStudent(studentID: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}students/${studentID}/`);
  }

  editStudent(studentID: string, updatedData:any): Observable<any> {
    return this.http.patch(`${this.apiUrl}students/update/${studentID}/`,updatedData);
  }


  
}
