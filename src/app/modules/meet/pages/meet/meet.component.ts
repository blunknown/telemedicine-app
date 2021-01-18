import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ZoomMtg } from '@zoomus/websdk';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ZoomService } from 'src/app/core/services/zoom.service';

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.5/lib', '/av');

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss'],
})
export class MeetComponent implements OnInit, AfterViewInit {
  signatureEndpoint =
    'https://sistema-oncologico.herokuapp.com/api/video/token-zoom';
  apiKey = 'GykF13J4T3qUj6vZiNQK9Q';
  //  meetingNumber = '2357323763';
  meetingNumber = '';
  role: number;
  leaveUrl = 'https://devnknown.github.io/telemedicine-front/meet';
  userName = '';
  userEmail = '';
  passWord = '';
  view = false;
  form: FormGroup;
  formJoin: FormGroup;
  isLoading = false;
  isLoadingMeet = false;
  loggedIn: User;
  idMeet: string = null;
  passwordMeet: string = null;

  constructor(
    private httpClient: HttpClient,
    @Inject(DOCUMENT) document,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private zoomService: ZoomService,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
    this.loggedIn = this.authService.loggedIn;
    this.userName = this.loggedIn.nombres + ' ' + this.loggedIn.apellidos;
    if (this.loggedIn.roles[0] === 'paciente') {
      this.role = 0;
    } else {
      this.role = 1;
    }
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      topic: ['', [Validators.required]],
    });
    this.formJoin = this.formBuilder.group({
      id: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  createMeeting(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;
      const topic: string = this.form.get('topic').value;
      this.zoomService.createMeeting(topic).subscribe((res) => {
        this.idMeet = res.id;
        this.passwordMeet = res.password;
        this.isLoading = false;
        console.log(res);
        this._snackBar.open('Reunion creada correctamente', 'Ok', {
          duration: 3000,
        });
      });
      // this.authService
      //   .login(credentials)
      //   .pipe(finalize(() => (this.isLoading = false)))
      //   .subscribe(() => this.router.navigate(['/home']));
    }
  }

  ngAfterViewInit(): void {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }

  ngOnInit(): void {
    console.log('cargado');
  }

  getSignature(event: Event) {
    event.preventDefault();
    if (this.formJoin.valid) {
      this.isLoadingMeet = true;
      this.meetingNumber = this.formJoin.get('id').value;
      this.passWord = this.formJoin.get('password').value;
      this.httpClient
        .post(this.signatureEndpoint, {
          meetingNumber: this.meetingNumber,
          role: this.role,
        })
        .toPromise()
        .then((data: any) => {
          if (data.signature) {
            console.log(data.signature);
            this.startMeeting(data.signature);
          } else {
            console.log(data);
          }
          this.isLoadingMeet = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoadingMeet = false;
        });
    }
  }

  startMeeting(signature) {
    // this.router.navigate(['/']);
    // this.view = true;
    // document.getElementById('zmmtg-root').style.display = 'block';
    // console.log(document.getElementById('zmmtg-root'));
    // console.log(document.getElementById('xddd'));

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log('gaaa');
        console.log(success);
        // document.getElementById('zmmtg-root').style.display = 'block';
        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            this._snackBar.open('Ingresando a la reunión...', 'Ok', {
              duration: 3000,
            });
            document.getElementById('zmmtg-root').style.display = 'block';
            this.router.navigate(['/zoom']);
            console.log('ez');
            console.log(success);
            this.isLoadingMeet = false;
          },
          error: (error) => {
            console.log('gg');
            console.log(error);
            this.isLoadingMeet = false;
          },
        });
      },
      error: (error) => {
        console.log(error);
        this.isLoadingMeet = false;
      },
    });
  }
}
