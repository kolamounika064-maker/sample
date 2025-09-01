import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing').then((m) => m.LandingComponent),
  },
  {
    path: 'enroll',
    loadComponent: () =>
      import('./pages/enroll/enroll').then((m) => m.EnrollComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about').then((m) => m.AboutComponent),
  },
  {
    path: 'joinus',
    loadComponent: () =>
      import('./pages/joinus/joinus').then((m) => m.JoinusComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/auth/signin/signin').then((m) => m.SigninComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/auth/signup/signup').then((m) => m.SignupComponent),
  },
  { path: '**', redirectTo: '' },
];
