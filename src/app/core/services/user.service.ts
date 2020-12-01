import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getPatientsByDoctorId(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/pacientes/${id}`);
  }

  getDoctorsByPatientId(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/doctores/${id}`);
  }
}
