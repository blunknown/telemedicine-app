import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageReponse } from '../interfaces/message-reponse.interface';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private httpClient: HttpClient) {}

  getMessages(id: string): Observable<MessageReponse> {
    return this.httpClient.get<MessageReponse>(
      `${environment.apiUrl}/mensajes/${id}`
    );
  }
}
