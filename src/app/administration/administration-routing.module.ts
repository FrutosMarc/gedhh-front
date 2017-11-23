import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Auth2Guard} from '../core/services/security/auth2.guard';
import {AdministrationComponent} from './administration/administration.component';
import {SECURITY} from '../core/constants';
import {GestionUtilisateurRootComponent} from './gestion-utilisateurs/gestion-utilisateur-root/gestion-utilisateur-root.component';

const routes: Routes = [
  {
    path: 'administration',
    component: AdministrationComponent,
    canActivate: [Auth2Guard],
    canActivateChild: [Auth2Guard],
    data: {role: SECURITY.ROLES.ROLEADMIN},
    children: [
      {
        path: 'gestion-utilisateurs',
        component: GestionUtilisateurRootComponent,
        data: {role: SECURITY.ROLES.ROLEADMIN}
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
