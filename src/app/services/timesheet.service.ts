import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private apiUrl = 'http://localhost:8081/api/timesheets';

  constructor(private http: HttpClient) {}

  getTimesheet(consultantId: number, weekStart: Date): Observable<any> {
    const formattedDate = weekStart.toISOString().split('T')[0];
    const params = new HttpParams().set('weekStart', formattedDate);
    return this.http.get<any>(`${this.apiUrl}/consultant/${consultantId}`, { params });
  }

  addTimesheetLine(timesheetId: number, assignmentId: number, workDate: Date, hours: number, description?: string): Observable<any> {
    const formattedDate = workDate.toISOString().split('T')[0];
    let params = new HttpParams()
      .set('assignmentId', assignmentId.toString())
      .set('workDate', formattedDate)
      .set('hours', hours.toString());
    
    if (description) {
      params = params.set('description', description);
    }

    return this.http.post<any>(`${this.apiUrl}/${timesheetId}/lines`, null, { params });
  }

  getAllTimesheets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  submitTimesheet(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/submit`, null);
  }
}
