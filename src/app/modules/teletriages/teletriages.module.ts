import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeletriagesRoutingModule } from './teletriages-routing.module';
import { TeletriagesComponent } from './pages/teletriages/teletriages.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DetailsComponent } from './components/details/details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeletriagesComponent, DetailsComponent],
  imports: [
    CommonModule,
    TeletriagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class TeletriagesModule {}
