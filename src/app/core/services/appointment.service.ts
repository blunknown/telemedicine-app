import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private httpClient: HttpClient) {}

  getPatientAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(
      `${environment.apiUrl}/citas-paciente`
    );
  }

  getDoctorAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(
      `${environment.apiUrl}/citas-doctor`
    );
  }

  saveAppointment(appointment: Appointment): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.apiUrl}/enviar-cita`,
      appointment
    );
  }

  updateAppointment(id: string, appointment: Appointment): Observable<void> {
    return this.httpClient.post<void>(
      `${environment.apiUrl}/actualizar-cita/${id}`,
      appointment
    );
  }

  deleteAppointment(id: string): Observable<void> {
    return this.httpClient.get<void>(`${environment.apiUrl}/borrar-cita/${id}`);
  }
}
