import {Component, OnInit} from '@angular/core';
import {InputData} from '../input-data';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})

export class CalendarFormComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    function NumberOfMonths(date1, date2) {
      const totalDiff = ((date2.getFullYear() - date1.getFullYear()) * 12) + (date2.getMonth() - date1.getMonth());
      return totalDiff <= 0 ? 1 : totalDiff + 1;
    }

    function addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    if (this.inputData.numberOfDays < 1 || this.inputData.numberOfDays > 3650) {
      this.inputData.numberOfDays = null;
    } else {
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
}
