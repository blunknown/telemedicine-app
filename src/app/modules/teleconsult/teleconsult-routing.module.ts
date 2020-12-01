import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeleconsultComponent } from './pages/teleconsult/teleconsult.component';

const routes: Routes = [
  {
    path: '',
    component: TeleconsultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeleconsultRoutingModule {}
