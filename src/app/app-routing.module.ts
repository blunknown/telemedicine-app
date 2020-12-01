import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'teleconsult',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/teleconsult/teleconsult.module').then(
            (m) => m.TeleconsultModule
          ),
      },
      {
        path: 'appointments',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'prescriptions',
        canActivate: [AuthGuard],
        data: { roles: ['paciente'] },
        loadChildren: () =>
          import('./modules/prescriptions/prescriptions.module').then(
            (m) => m.PrescriptionsModule
          ),
      },
      {
        path: 'fuat',
        canActivate: [AuthGuard],
        data: { roles: ['doctor'] },
        loadChildren: () =>
          import('./modules/fuat/fuat.module').then((m) => m.FuatModule),
      },
      {
        path: 'reports',
        canActivate: [AuthGuard],
        data: { roles: ['doctor'] },
        loadChildren: () =>
          import('./modules/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'chat',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'forum',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/forum/forum.module').then((m) => m.ForumModule),
      },
      {
        path: 'patients',
        canActivate: [AuthGuard],
        data: { roles: ['doctor'] },
        loadChildren: () =>
          import('./modules/patients/patients.module').then(
            (m) => m.PatientsModule
          ),
      },
      {
        path: 'questions',
        canActivate: [AuthGuard],
        data: { roles: ['paciente'] },
        loadChildren: () =>
          import('./modules/questions/questions.module').then(
            (m) => m.QuestionsModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}