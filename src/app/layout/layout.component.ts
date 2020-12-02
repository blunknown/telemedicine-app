import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { SocketService } from '../core/services/socket.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  loggedIn$: Observable<User>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router
  ) {
    this.loggedIn$ = this.authService.loggedIn$;
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.socketService.disconnect();
    this.router.navigate(['/login']);
  }
}
