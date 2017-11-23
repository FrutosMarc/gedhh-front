

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './core/login/login.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'monbureau',
    pathMatch: 'full',
  },

  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {
}

