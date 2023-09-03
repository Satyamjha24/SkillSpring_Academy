import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}courses/`);
  }

  postCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add_course/`, courseData);
  }

  deleteCourse(courseID: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}courses/${courseID}/`);
  }

  editCourse(courseID: string, updatedData:any): Observable<any> {
    return this.http.patch(`${this.apiUrl}courses/update/${courseID}/`,updatedData);
  }
}
