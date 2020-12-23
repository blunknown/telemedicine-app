import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Teletry } from '../models/teletry.model';

@Injectable({
  providedIn: 'root',
})
export class TeletryService {
  constructor(private httpClient: HttpClient) {}

  createTeletry(teletry: Teletry): Observable<Teletry> {
    return this.httpClient.post<Teletry>(
      `${environment.apiUrl}/enviar-encuesta`,
      teletry
    );
  }

  getTeletriagesByPatientId(id: string): Observable<Teletry[]> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/encuestas-paciente/${id}`
    ).pipe(tap(value => console.log(value)));
  }
}
