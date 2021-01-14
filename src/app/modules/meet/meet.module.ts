import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetRoutingModule } from './meet-routing.module';
import { MeetComponent } from './pages/meet/meet.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MeetComponent],
  imports: [
    CommonModule,
    MeetRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class MeetModule {}
