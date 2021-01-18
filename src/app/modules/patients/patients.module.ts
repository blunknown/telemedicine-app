import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pages/patients/patients.component';
import { DetailsComponent } from './components/details/details.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TeletriagesComponent } from './components/teletriages/teletriages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EpicrisisComponent } from './components/epicrisis/epicrisis.component';
import { MedicationComponent } from './components/medication/medication.component';
import { ChartsModule } from 'ng2-charts';
import { DetailsTeletriageComponent } from './components/details-teletriage/details-teletriage.component';

@NgModule({
  declarations: [
    PatientsComponent,
    DetailsComponent,
    TeletriagesComponent,
    EpicrisisComponent,
    MedicationComponent,
    DetailsTeletriageComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
})
export class PatientsModule {}
