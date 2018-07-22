import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarFormComponent} from './calendar-form/calendar-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarFormComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
