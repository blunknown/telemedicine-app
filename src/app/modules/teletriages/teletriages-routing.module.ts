import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeletriagesComponent } from './pages/teletriages/teletriages.component';

const routes: Routes = [
  {
    path: '',
    component: TeletriagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeletriagesRoutingModule {}
