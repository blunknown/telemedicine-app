import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Credentials } from '../interfaces/credentials.interface';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<User>(null);
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  public get loggedIn(): User {
    return this.loggedInSubject.value;
  }

  public set loggedIn(user: User) {
    this.loggedInSubject.next(user);
  }

  login(credentials: Credentials): Observable<User> {
    return this.httpClient
      .post<AuthResponse>(`${environment.apiUrl}/login`, credentials)
      .pipe(
        switchMap((authResponse) => {
          this.storageService.saveJwt(authResponse.token);
          return this.getLoggedIn();
        })
      );
  }

  logout(): void {
    this.storageService.removeJwt();
    this.loggedInSubject.next(null);
  }

  getLoggedIn(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/self`);
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getJwt();
  }
}
