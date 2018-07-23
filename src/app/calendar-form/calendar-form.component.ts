import {Component, OnInit} from '@angular/core';
import {InputData} from '../input-data';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})

export class CalendarFormComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  inputData: InputData = {
    startDate: null,
    numberOfDays: null,
    countryCode: null,
    dateAfter: null,
    monthsAfter: null,
  };

  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  minDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  holidaysArray = [];
  loading = false;

  ngOnInit() {

  }

  onSubmit() {
    if (this.inputData.numberOfDays < 1 || this.inputData.numberOfDays > 3650) {
      this.inputData.numberOfDays = null;
    } else {
      this.loading = true;
      // const url = 'https://date.nager.at/api/v1/get/' + this.inputData.countryCode + '/' +
      //   this.inputData.startDate.getFullYear();
      const url = '../../assets/holidays.json';
      this.http.get(url).subscribe((data: any) => {
          this.holidaysArray = data;
          this.daysAfterCalculation();
          this.loading = false;
        },
        err => {
          this.daysAfterCalculation();
          this.loading = false;
          alert('An error has occurred. Please try again later');
        });

    }
  }

  daysAfterCalculation() {
    function NumberOfMonths(date1, date2) {
      const totalDiff = ((date2.getFullYear() - date1.getFullYear()) * 12) + (date2.getMonth() - date1.getMonth());
      return totalDiff <= 0 ? 1 : totalDiff + 1;
    }

    function addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    this.inputData.dateAfter = addDays(this.inputData.startDate, this.inputData.numberOfDays - 1);
    this.inputData.monthsAfter = NumberOfMonths(this.inputData.startDate, this.inputData.dateAfter);
    this.maxDate = {
      year: this.inputData.dateAfter.getFullYear(),
      month: this.inputData.dateAfter.getMonth() + 1,
      day: this.inputData.dateAfter.getDate()
    };
    this.minDate = {
      year: this.inputData.startDate.getFullYear(),
      month: this.inputData.startDate.getMonth() + 1,
      day: this.inputData.startDate.getDate()
    };
  }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isWeekday(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() > 0 && d.getDay() < 6;
  }

  isHidden(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d < this.inputData.startDate || d > this.inputData.dateAfter;
  }

  isHoliday(date: NgbDateStruct) {
    if (this.holidaysArray && this.holidaysArray.filter(element => (
      // date.year.toString() === element.date.substring(0, 4)
       (date.month) === Number(element.date.substring(5, 7))
      && (date.day) === Number(element.date.substring(8, 10))
    )).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
