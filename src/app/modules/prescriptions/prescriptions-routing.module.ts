import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrescriptionsComponent } from './pages/prescriptions/prescriptions.component';

const routes: Routes = [
  {
    path: '',
    component: PrescriptionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescriptionsRoutingModule {}
