import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  constructor(private httpClient: HttpClient) {}

  createMeeting(topic: string): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/video/createRoom-zoom`,
      { topic }
    );
  }
}
