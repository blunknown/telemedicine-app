import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionsRoutingModule } from './prescriptions-routing.module';
import { PrescriptionsComponent } from './pages/prescriptions/prescriptions.component';


@NgModule({
  declarations: [PrescriptionsComponent],
  imports: [
    CommonModule,
    PrescriptionsRoutingModule
  ]
})
export class PrescriptionsModule { }
