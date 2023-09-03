import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  getInstructors(): Observable<any> {
    return this.http.get(`${this.apiUrl}instructors/`);
  }

  postInstructor(instructorData: any): Observable<any> {
    console.log("service" , instructorData)
    return this.http.post(`${this.apiUrl}add_instructor/`, instructorData);
  }

  deleteInstructor(instructorID: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}instructors/${instructorID}/`);
  }

  editInstructor(instructorID: string, updatedData:any): Observable<any> {
    return this.http.patch(`${this.apiUrl}instructors/update/${instructorID}/`,updatedData);
  }


}
