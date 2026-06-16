import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Holiday {
  date: string;
  name: string;
}

export interface Festival {
  date: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:8081/api/calendar';

  constructor(private http: HttpClient) {}

  getHolidays(year: number): Observable<Holiday[]> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<Holiday[]>(`${this.apiUrl}/holidays`, { params });
  }

  getFestivals(year: number): Observable<Festival[]> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<Festival[]>(`${this.apiUrl}/festivals`, { params });
  }

  getWorkingDays(start: string, end: string): Observable<number> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<number>(`${this.apiUrl}/working-days`, { params });
  }

  isWorkingDay(date: string): Observable<boolean> {
    const params = new HttpParams().set('date', date);
    return this.http.get<boolean>(`${this.apiUrl}/is-working-day`, { params });
  }
}
