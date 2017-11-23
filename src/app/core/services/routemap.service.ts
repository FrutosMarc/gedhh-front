import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class RoutemapService {

  constructor(private router : Router) {

  }

  public goToAdministration(){
    this.router.navigate(['/administration']);
  }

  public goToAdministrationUtilisateurs(){
    this.router.navigate(['/administration/gestion-utilisateurs']);
  }

}
