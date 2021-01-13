import { Component, Inject, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Credentials } from 'src/app/core/interfaces/credentials.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  // signatureEndpoint = `https://sistema-oncologico.herokuapp.com/api/video/token-zoom`;
  // apiKey = 'GykF13J4T3qUj6vZiNQK9Q';
  // meetingNumber = '2301138951';
  // role = 0;
  // leaveUrl = 'http://localhost:4200';
  // userName = 'Angular';
  // userEmail = '';
  // passWord = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    // private httpClient: HttpClient,
    // @Inject(DOCUMENT) document
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      this.isLoading = true;
      const credentials: Credentials = this.form.value;
      this.authService
        .login(credentials)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => this.router.navigate(['/home']));
    }
  }

  // getSignature() {
  //   this.httpClient
  //     .post(this.signatureEndpoint, {
  //       meetingNumber: this.meetingNumber,
  //       role: this.role,
  //     })
  //     .toPromise()
  //     .then((data: any) => {
  //       if (data.signature) {
  //         console.log(data.signature);
  //         this.startMeeting(data.signature);
  //       } else {
  //         console.log(data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // startMeeting(signature) {
  //   document.getElementById('zmmtg-root').style.display = 'block';

  //   ZoomMtg.init({
  //     leaveUrl: this.leaveUrl,
  //     isSupportAV: true,
  //     success: (success) => {
  //       console.log(success);

  //       ZoomMtg.join({
  //         signature: signature,
  //         meetingNumber: this.meetingNumber,
  //         userName: this.userName,
  //         apiKey: this.apiKey,
  //         userEmail: this.userEmail,
  //         passWord: this.passWord,
  //         success: (success) => {
  //           console.log(success);
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         },
  //       });
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
}
