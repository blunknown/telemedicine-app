import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveJwt(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

  getJwt(): string {
    return localStorage.getItem('jwt');
  }

  removeJwt(): void {
    localStorage.removeItem('jwt');
  }
}
