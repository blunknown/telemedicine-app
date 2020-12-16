import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeleconsultRoutingModule } from './teleconsult-routing.module';
import { TeleconsultComponent } from './pages/teleconsult/teleconsult.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DeviceSelectComponent } from './components/device-select/device-select.component';
import { CameraComponent } from './components/camera/camera.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ActivityIndicatorComponent } from './components/activity-indicator/activity-indicator.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    TeleconsultComponent,
    SettingsComponent,
    DeviceSelectComponent,
    CameraComponent,
    RoomsComponent,
    ActivityIndicatorComponent,
    ParticipantsComponent,
  ],
  imports: [
    CommonModule,
    TeleconsultRoutingModule,
    FormsModule,
    MaterialModule,
  ],
})
export class TeleconsultModule {}
