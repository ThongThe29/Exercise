import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'exercise10',
    loadComponent: () => import('../../exercise 10/app/lunar-year/lunar-year.component').then(m => m.LunarYearComponent)
  }
];
