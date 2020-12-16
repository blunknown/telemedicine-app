import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { VideochatService } from 'src/app/core/services/videochat.service';
import {
  createLocalAudioTrack,
  Room,
  LocalTrack,
  LocalVideoTrack,
  LocalAudioTrack,
  RemoteParticipant,
} from 'twilio-video';
import { CameraComponent } from '../../components/camera/camera.component';
import { ParticipantsComponent } from '../../components/participants/participants.component';
import { RoomsComponent } from '../../components/rooms/rooms.component';
import { SettingsComponent } from '../../components/settings/settings.component';

@Component({
  selector: 'app-teleconsult',
  templateUrl: './teleconsult.component.html',
  styleUrls: ['./teleconsult.component.scss'],
})
export class TeleconsultComponent implements OnInit {
  @ViewChild('rooms') rooms: RoomsComponent;
  @ViewChild('camera') camera: CameraComponent;
  @ViewChild('settings') settings: SettingsComponent;
  @ViewChild('participants') participants: ParticipantsComponent;

  activeRoom: Room;

  // private notificationHub: HubConnection;

  constructor(private readonly videoChatService: VideochatService) {}

  async ngOnInit() {
    // const builder =
    //     new HubConnectionBuilder()
    //         .configureLogging(LogLevel.Information)
    //         .withUrl(`${location.origin}/notificationHub`);
    // this.notificationHub = builder.build();
    // this.notificationHub.on('RoomsUpdated', async updated => {
    //     if (updated) {
    //         await this.rooms.updateRooms();
    //     }
    // });
    // await this.notificationHub.start();
  }

  async onSettingsChanged(deviceInfo?: MediaDeviceInfo) {
    await this.camera.initializePreview(deviceInfo.deviceId);
    if (this.settings.isPreviewing) {
      const track = await this.settings.showPreviewCamera();
      if (this.activeRoom) {
        const localParticipant = this.activeRoom.localParticipant;
        localParticipant.videoTracks.forEach((publication) =>
          publication.unpublish()
        );
        await localParticipant.publishTrack(track);
      }
    }
  }

  async onLeaveRoom(_: boolean) {
    if (this.activeRoom) {
      this.activeRoom.disconnect();
      this.activeRoom = null;
    }

    const videoDevice = this.settings.hidePreviewCamera();
    await this.camera.initializePreview(videoDevice && videoDevice.deviceId);

    this.participants.clear();
  }

  async onRoomChanged(roomName: string) {
    if (roomName) {
      if (this.activeRoom) {
        this.activeRoom.disconnect();
      }

      this.camera.finalizePreview();

      const tracks = await Promise.all([
        createLocalAudioTrack(),
        this.settings.showPreviewCamera(),
      ]);

      this.activeRoom = await this.videoChatService.joinOrCreateRoom(
        roomName,
        tracks
      );

      this.participants.initialize(this.activeRoom.participants);
      this.registerRoomEvents();

      // this.notificationHub.send('RoomsUpdated', true);
    }
  }

  onParticipantsChanged(_: boolean) {
    this.videoChatService.nudge();
  }

  private registerRoomEvents() {
    this.activeRoom
      .on('disconnected', (room: Room) =>
        room.localParticipant.tracks.forEach((publication) =>
          this.detachLocalTrack(publication.track)
        )
      )
      .on('participantConnected', (participant: RemoteParticipant) =>
        this.participants.add(participant)
      )
      .on('participantDisconnected', (participant: RemoteParticipant) =>
        this.participants.remove(participant)
      )
      .on('dominantSpeakerChanged', (dominantSpeaker: RemoteParticipant) =>
        this.participants.loudest(dominantSpeaker)
      );
  }

  private detachLocalTrack(track: LocalTrack) {
    if (this.isDetachable(track)) {
      track.detach().forEach((el) => el.remove());
    }
  }

  private isDetachable(
    track: LocalTrack
  ): track is LocalAudioTrack | LocalVideoTrack {
    return (
      !!track &&
      ((track as LocalAudioTrack).detach !== undefined ||
        (track as LocalVideoTrack).detach !== undefined)
    );
  }
}
