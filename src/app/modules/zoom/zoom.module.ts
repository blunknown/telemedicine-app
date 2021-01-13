import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoomRoutingModule } from './zoom-routing.module';
import { ZoomComponent } from './pages/zoom/zoom.component';


@NgModule({
  declarations: [ZoomComponent],
  imports: [
    CommonModule,
    ZoomRoutingModule
  ]
})
export class ZoomModule { }
