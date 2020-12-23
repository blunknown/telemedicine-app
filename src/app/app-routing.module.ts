import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'teleconsult',
        loadChildren: () =>
          import('./modules/teleconsult/teleconsult.module').then(
            (m) => m.TeleconsultModule
          ),
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./modules/appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'teletry',
        canActivate: [RoleGuard],
        data: { roles: ['paciente'] },
        loadChildren: () =>
          import('./modules/teletry/teletry.module').then(
            (m) => m.TeletryModule
          ),
      },
      {
        path: 'prescriptions',
        canActivate: [RoleGuard],
        data: { roles: ['paciente'] },
        loadChildren: () =>
          import('./modules/prescriptions/prescriptions.module').then(
            (m) => m.PrescriptionsModule
          ),
      },
      {
        path: 'fuat',
        canActivate: [RoleGuard],
        data: { roles: ['doctor'] },
        loadChildren: () =>
          import('./modules/fuat/fuat.module').then((m) => m.FuatModule),
      },
      {
        path: 'reports',
        canActivate: [RoleGuard],
        data: { roles: ['doctor'] },
        loadChildren: () =>
          import('./modules/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./modules/chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'forum',
        loadChildren: () =>
          import('./modules/forum/forum.module').then((m) => m.ForumModule),
      },
      {
        path: 'patients',
        canActivate: [RoleGuard],
        data: { roles: ['doctor'] },
        loadChildren: () =>
          import('./modules/patients/patients.module').then(
            (m) => m.PatientsModule
          ),
      },
      {
        path: 'questions',
        canActivate: [RoleGuard],
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
    path: 'forbidden',
    loadChildren: () =>
      import('./modules/forbidden/forbidden.module').then(
        (m) => m.ForbiddenModule
      ),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
