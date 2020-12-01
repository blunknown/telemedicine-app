import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuatComponent } from './pages/fuat/fuat.component';

const routes: Routes = [
  {
    path: '',
    component: FuatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuatRoutingModule {}
