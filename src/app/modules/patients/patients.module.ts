import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pages/patients/patients.component';
import { DetailsComponent } from './components/details/details.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TeletriagesComponent } from './components/teletriages/teletriages.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PatientsComponent, DetailsComponent, TeletriagesComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class PatientsModule {}
