import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuatRoutingModule } from './fuat-routing.module';
import { FuatComponent } from './pages/fuat/fuat.component';


@NgModule({
  declarations: [FuatComponent],
  imports: [
    CommonModule,
    FuatRoutingModule
  ]
})
export class FuatModule { }
