import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeletryComponent } from './pages/teletry/teletry.component';

const routes: Routes = [
  {
    path: '',
    component: TeletryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeletryRoutingModule {}
