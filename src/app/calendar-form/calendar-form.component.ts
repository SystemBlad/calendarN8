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
    dateAfter: null
  };

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.inputData.numberOfDays < 1 || this.inputData.numberOfDays  > 1000000) {
      this.inputData.numberOfDays = null;
    } else {
      const dateAfter = new Date();
      dateAfter.setDate(this.inputData.startDate.getDate() + this.inputData.numberOfDays);
      this.inputData.dateAfter = dateAfter;
    }
  }

}
