import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Epicrisis } from '../models/epicrisis.model';

@Injectable({
  providedIn: 'root',
})
export class EpicrisisService {
  constructor(private httpClient: HttpClient) {}

  getEpicrisisByPatientId(id: string): Observable<Epicrisis[]> {
    return this.httpClient.get<Epicrisis[]>(
      `${environment.apiUrl}/epicrisis-paciente/${id}`
    );
  }
}
