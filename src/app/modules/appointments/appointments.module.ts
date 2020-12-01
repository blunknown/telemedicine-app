import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppointmentsComponent,
    CalendarHeaderComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    MaterialModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class AppointmentsModule {}
