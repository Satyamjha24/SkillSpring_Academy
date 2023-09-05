import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = 'https://skill-spring-backend.vercel.app/';


  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<any> {
    return this.http.get(`${this.apiUrl}enrollments/`);
  }

  deleteEnrollment(enrollmentID: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}enrollments/${enrollmentID}/`);
  }

  editEnrollment(enrollmentID: string, updatedData:any): Observable<any> {
    return this.http.patch(`${this.apiUrl}enrollments/update/${enrollmentID}/`,updatedData);
  }
}
