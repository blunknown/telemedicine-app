import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib', '/av');

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss'],
})
export class MeetComponent implements OnInit, AfterViewInit {

  constructor(
    private httpClient: HttpClient,
    @Inject(DOCUMENT) document,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }

  ngOnInit(): void {
    // console.log('cargado');
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
  //   // this.router.navigate(['/']);
  //   // this.view = true;
  //   // document.getElementById('zmmtg-root').style.display = 'block';
  //   // console.log(document.getElementById('zmmtg-root'));
  //   // console.log(document.getElementById('xddd'));

  //   ZoomMtg.init({
  //     leaveUrl: this.leaveUrl,
  //     isSupportAV: true,
  //     isSupportChat: true,
  //     disableInvite: true,
  //     disableRecord: true,
  //     disableJoinAudio: true,
  //     success: (success) => {
  //       console.log('gaaa');
  //       console.log(success);
  //       // document.getElementById('zmmtg-root').style.display = 'block';
  //       ZoomMtg.join({
  //         signature: signature,
  //         meetingNumber: this.meetingNumber,
  //         userName: this.userName,
  //         apiKey: this.apiKey,
  //         userEmail: this.userEmail,
  //         passWord: this.passWord,
  //         success: (success) => {
  //           document.getElementById('zmmtg-root').style.display = 'block';
  //           this.router.navigate(['/zoom']);
  //           console.log('ez');
  //           console.log(success);
  //         },
  //         error: (error) => {
  //           console.log('gg');
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
