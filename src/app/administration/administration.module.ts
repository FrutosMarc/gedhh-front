import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { GestionUtilisateurRootComponent } from './gestion-utilisateurs/gestion-utilisateur-root/gestion-utilisateur-root.component';
import { AdministrationComponent } from './administration/administration.component';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    CoreModule
  ],
  declarations: [GestionUtilisateurRootComponent, AdministrationComponent]
})
export class AdministrationModule { }
