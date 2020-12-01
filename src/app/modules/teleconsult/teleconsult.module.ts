import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeleconsultRoutingModule } from './teleconsult-routing.module';
import { TeleconsultComponent } from './pages/teleconsult/teleconsult.component';


@NgModule({
  declarations: [TeleconsultComponent],
  imports: [
    CommonModule,
    TeleconsultRoutingModule
  ]
})
export class TeleconsultModule { }
