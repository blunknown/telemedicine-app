import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView,
} from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
  addHours,
} from 'date-fns';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/core/models/appointment.model';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

interface Film {
  id: number;
  title: string;
  release_date: string;
}

const getTimezoneOffsetString = (date: Date): string => {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';
  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events$: Observable<CalendarEvent<{ appointment: Appointment }>[]>;
  // events$: Observable<Appointment[]>;
  activeDayIsOpen: boolean = false;
  loggedIn: User;
  actions: CalendarEventAction[] = [
    {
      label: '<span class="mr-2 editar">Editar</span>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.actualizar(event);
      },
    },
    {
      label: '<span class="eliminar ">Eliminar</span>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.eliminar(event);
      },
    },
    // {
    //   label: '<i class="fas fa-fw fa-trash-alt"></i>',
    //   a11yLabel: 'Delete',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter((iEvent) => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   },
    // },
  ];

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) {
    this.loggedIn = authService.loggedIn;
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    // const params = new HttpParams()
    //   .set(
    //     'primary_release_date.gte',
    //     format(getStart(this.viewDate), 'yyyy-MM-dd')
    //   )
    //   .set(
    //     'primary_release_date.lte',
    //     format(getEnd(this.viewDate), 'yyyy-MM-dd')
    //   )
    //   .set('api_key', '0ec33936a68018857d727958dca1424f');

    this.loggedIn.roles[0] === 'paciente'
      ? (this.events$ = this.appointmentService.getPatientAppointments().pipe(
          map((appointments) => {
            console.log(appointments);
            return appointments.map((appointment) => {
              return {
                title: appointment.razon,
                start: new Date(appointment.fecha.substring(0, 16)),
                end: addHours(new Date(appointment.fecha.substring(0, 16)), 1),
                color: colors.yellow,
                meta: { appointment },
              };
            });
          })
        ))
      : (this.events$ = this.appointmentService.getDoctorAppointments().pipe(
          map((appointments) => {
            console.log(appointments);
            return appointments.map((appointment) => {
              return {
                title: appointment.razon,
                start: new Date(appointment.fecha),
                end: addHours(new Date(appointment.fecha), 1),
                color: colors.yellow,
                actions: this.actions,
                meta: { appointment },
              };
            });
          })
        ));
    // this.events$ = this.http
    //   .get('https://api.themoviedb.org/3/discover/movie', { params })
    //   .pipe(
    //     map(({ results }: { results: Film[] }) => {
    //       return results.map((film: Film) => {
    //         return {
    //           title: film.title,
    //           start: new Date(
    //             film.release_date + getTimezoneOffsetString(this.viewDate)
    //           ),
    //           end: addHours(new Date(), 2),
    //           color: colors.yellow,
    //           meta: {
    //             film,
    //           },
    //         };
    //       });
    //     })
    //   );
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ film: Film }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ appointment: Appointment }>): void {
    const detailsAppointment = this.dialog.open(NewAppointmentComponent, {
      data: { update: false, appointment: event.meta.appointment },
      autoFocus: false,
    });
  }

  actualizar(event: CalendarEvent<{ appointment: Appointment }>): void {
    const updateComponent = this.dialog.open(NewAppointmentComponent, {
      data: { update: true, appointment: event.meta.appointment },
      autoFocus: false,
    });
    updateComponent.afterClosed().subscribe((result) => {
      this.fetchEvents();
    });
  }

  eliminar(event: CalendarEvent<{ appointment: Appointment }>): void {
    console.log('gaaa');
    this.appointmentService
      .deleteAppointment(event.meta.appointment._id)
      .subscribe(() => {
        console.log('ezz');
        this.fetchEvents();
      });
  }

  addAppointment(): void {
    const newAppointment = this.dialog.open(NewAppointmentComponent, {
      autoFocus: false,
    });
    newAppointment.afterClosed().subscribe((result) => {
      this.fetchEvents();
    });
    // const event =
    // this.events = [
    //   ...this.events,
    //   {
    //     title: 'New event',
    //     start: startOfDay(new Date()),
    //     end: endOfDay(new Date()),
    //     color: colors.red,
    //     draggable: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];
  }
}
