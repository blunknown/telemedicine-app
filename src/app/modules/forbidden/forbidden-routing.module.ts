import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    component: ForbiddenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForbiddenRoutingModule {}
