import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './pages/patients/patients.component';
import { DetailsComponent } from './components/details/details.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [PatientsComponent, DetailsComponent],
  imports: [CommonModule, PatientsRoutingModule, MaterialModule],
})
export class PatientsModule {}
