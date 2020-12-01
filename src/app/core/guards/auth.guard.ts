import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      return this.verifyLoggedIn(route);
    }
    this.router.navigate(['/login']);
    return false;
  }

  verifyLoggedIn(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.getLoggedIn().pipe(
      map((user) => {
        if (
          route.data.roles &&
          route.data.roles.indexOf(user.roles[0]) === -1
        ) {
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        this.authService.loggedIn = user;
        if (!this.socketService.isConnected()) {
          console.log('conectado 1 vez');
          this.socketService.connect(user);
        }
        return true;
      })
    );
  }
}
