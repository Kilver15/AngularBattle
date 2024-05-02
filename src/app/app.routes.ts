import { Routes } from '@angular/router';
import { LoginGuard } from './auth/login.guard';
import { VerificacionGuard } from './auth/verificacion.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
      },
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
      },
      {
        path: 'verificacion',
        loadChildren: () => import('./verificacion/verificacion.module').then(m => m.VerificacionModule),
        canActivate: [VerificacionGuard]
      },
      {
        path: 'juegos',
        loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'partida/:id',
        loadChildren: () => import('./partida/partida.module').then(m => m.PartidaModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'estadisticas',
        loadChildren: () => import('./estadisticas/estadisticas.module').then(m => m.EstadisticasModule),
        canActivate: [LoginGuard]
      },
    { path: '', redirectTo: '/', pathMatch: 'full' },
];
