import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MonBureauComponent} from './mon-bureau/mon-bureau.component';
import {Auth2Guard} from '../core/services/security/auth2.guard';
import {SECURITY} from '../core/constants';

const routes: Routes = [
  {
    path: 'monbureau',
    component: MonBureauComponent,
    canActivate: [Auth2Guard],
    data: {role: SECURITY.ROLES.ROLEUSER}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonbureauRoutingModule { }
