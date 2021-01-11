import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';
import { environment } from 'src/environments/environment';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss'],
})
export class MeetComponent implements OnInit {
  signatureEndpoint = environment.baseUrl;
  apiKey = '';
  meetingNumber = '123456789';
  role = 0;
  leaveUrl = 'http://localhost:4200';
  userName = 'Angular';
  userEmail = '';
  passWord = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  getSignature() {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';
    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
