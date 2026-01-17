import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listcustomer',
    pathMatch: 'full'
  },
  {
    path: 'listcustomer',
    loadComponent: () => import('./listcustomer/listcustomer').then(m => m.Listcustomer)
  },
  {
    path: 'exercise10',
    loadComponent: () => import('../../exercise 10/app/lunar-year/lunar-year.component').then(m => m.LunarYearComponent)
  }
];

