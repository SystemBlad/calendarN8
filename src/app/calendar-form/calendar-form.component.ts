import {Component, OnInit} from '@angular/core';
import {InputData} from '../input-data';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})

export class CalendarFormComponent implements OnInit {
  inputData: InputData = {
    startDate: new Date(),
    numberOfDays: null,
    countryCode: 'US',
    dateAfter: null,
    monthsAfter: 0,
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
      let Nomonths;
      Nomonths = (date2.getFullYear() - date1.getFullYear()) * 12;
      Nomonths -= date1.getMonth() + 1;
      Nomonths += date2.getMonth() + 1; // we should add + 1 to get correct month number
      return Nomonths <= 0 ? 1 : Nomonths + 1;
    }

    function addDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    if (this.inputData.numberOfDays < 1 || this.inputData.numberOfDays > 1000000) {
      this.inputData.numberOfDays = null;
    } else {
      this.inputData.dateAfter = addDays(this.inputData.startDate, this.inputData.numberOfDays - 1);
      this.inputData.monthsAfter = NumberOfMonths(this.inputData.startDate, this.inputData.dateAfter);

      this.minDate = {
        year: this.inputData.startDate.getFullYear(),
        month: this.inputData.startDate.getMonth() + 1,
        day: this.inputData.startDate.getDate()
      };

      this.maxDate = {
        year: this.inputData.dateAfter.getFullYear(),
        month: this.inputData.dateAfter.getMonth() + 1,
        day: this.inputData.dateAfter.getDate()
      };
    }
  }

}
