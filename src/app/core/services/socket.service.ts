import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;

  constructor(private storageService: StorageService) {}

  connect(user: User) {
    const jwt = this.storageService.getJwt();
    this.socket = io(environment.socketUrl, {
      query: { jwt },
    });
    this.emit('connectUser', user);
  }

  isConnected(): boolean {
    return this.socket && this.socket.connected;
  }

  disconnect() {
    this.socket.disconnect();
  }

  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  listen(event: string): Observable<unknown> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data);
      });
    });
  }
}
