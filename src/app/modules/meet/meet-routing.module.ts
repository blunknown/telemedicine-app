import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetComponent } from './pages/meet/meet.component';

const routes: Routes = [
  {
    path: '',
    component: MeetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetRoutingModule {}
