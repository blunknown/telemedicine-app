import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeletryRoutingModule } from './teletry-routing.module';
import { TeletryComponent } from './pages/teletry/teletry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [TeletryComponent],
  imports: [
    CommonModule,
    TeletryRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
})
export class TeletryModule {}
