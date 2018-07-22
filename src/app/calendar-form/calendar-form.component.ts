import {Component, OnInit} from '@angular/core';
import {InputData} from '../input-data';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();
@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})

export class CalendarFormComponent implements OnInit {
  inputData: InputData = {
    startDate: now,
    numberOfDays: 0,
    countryCode: 'US',
    dateAfter: now
  };

  constructor() {
  }

  ngOnInit() {
  }

}
