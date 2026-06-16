import { Component, OnInit } from '@angular/core';
import { CalendarService, Holiday, Festival } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  holidays: Holiday[] = [];
  festivals: Festival[] = [];
  currentYear: number = new Date().getFullYear();
  workingDaysCount: number = 0;
  
  startDate: string = '';
  endDate: string = '';
  checkDate: string = '';
  isWorking: boolean | null = null;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.loadHolidays();
    this.loadFestivals();
  }

  loadHolidays(): void {
    this.calendarService.getHolidays(this.currentYear).subscribe(data => {
      this.holidays = data;
    });
  }

  loadFestivals(): void {
    this.calendarService.getFestivals(this.currentYear).subscribe(data => {
      this.festivals = data;
    });
  }

  checkIfWorkingDay(date: string): void {
    if (date) {
      this.calendarService.isWorkingDay(date).subscribe(result => {
        this.isWorking = result;
      });
    }
  }

  calculateWorkingDays(start: string, end: string): void {
    if (start && end) {
      this.calendarService.getWorkingDays(start, end).subscribe(count => {
        this.workingDaysCount = count;
      });
    }
  }
}
