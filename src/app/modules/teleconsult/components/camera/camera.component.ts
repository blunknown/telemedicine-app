import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { DeviceService } from 'src/app/core/services/device.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { createLocalVideoTrack, LocalVideoTrack } from 'twilio-video';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit, OnDestroy {
  @ViewChild('preview', { static: false }) previewElement: ElementRef;

  isInitializing: boolean = true;
  videoTrack: LocalVideoTrack = null;

  constructor(
    private readonly storageService: StorageService,
    private readonly renderer: Renderer2,
    private deviceService: DeviceService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  apagar(): void {
    this.finalizePreview();
    // navigator.getUserMedia({video: true, audio: true},
    //   function (stream) {
    //     stream.getVideoTracks().forEach((e) => {
    //       e.stop();
    //       console.log(e.readyState === 'ended');
    //     });
    //   },
    //   function (error) {
    //     console.log('getUserMedia() error', error);
    //   }
    // );
  }

  async encender() {
    if (this.previewElement && this.previewElement.nativeElement) {
      console.log('encendiendo');
      const selectedVideoInput = this.storageService.get('videoInputId');
      await this.initializeDevice(selectedVideoInput);
    }
  }

  async ngAfterViewInit() {
    if (this.previewElement && this.previewElement.nativeElement) {
      const selectedVideoInput = this.storageService.get('videoInputId');
      await this.initializeDevice(selectedVideoInput);
    }
  }

  async initializePreview(deviceId: string) {
    await this.initializeDevice(deviceId);
  }

  finalizePreview() {
    try {
      if (this.videoTrack) {
        this.videoTrack.stop();
        this.videoTrack.detach().forEach((element) => {
          element.remove();
        });
      }
      this.videoTrack = null;
    } catch (e) {
      console.error(e);
    }
  }

  private async initializeDevice(deviceId?: string) {
    try {
      this.isInitializing = true;

      this.finalizePreview();

      this.videoTrack = deviceId
        ? await createLocalVideoTrack({ deviceId })
        : await createLocalVideoTrack();

      const videoElement = this.videoTrack.attach();
      this.renderer.setStyle(videoElement, 'height', '100%');
      this.renderer.setStyle(videoElement, 'width', '100%');
      this.renderer.appendChild(
        this.previewElement.nativeElement,
        videoElement
      );
    } finally {
      this.isInitializing = false;
    }
  }
}
