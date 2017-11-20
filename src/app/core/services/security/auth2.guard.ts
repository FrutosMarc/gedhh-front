import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Utilisateur} from '../../utilisateur';
import {Auth2Service} from './auth2.service';
import {AUTH} from '../../constants';


@Injectable()
export class Auth2Guard implements CanActivate, CanActivateChild {

  userSub: Subscription;
  user: Utilisateur;

  constructor(private auth2Svc: Auth2Service) {
    this.userSub = this.auth2Svc.user$.subscribe(userAuth => this.user = userAuth);
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.storeRouteToActivate(next.data, state);

    const userHasRight = {role: next.data.role, feature: next.data.licence};
    if (this.auth2Svc.hasFeature(this.user, userHasRight)) {
      return true;
    }else {
      this.auth2Svc.redirectToLoginPage();
    }

    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }


  private storeRouteToActivate(routeData: any, state: RouterStateSnapshot) {
    localStorage.setItem(AUTH.redirectUrl, state.url);
    localStorage.setItem(AUTH.roleNeeded, routeData.role);
  }

}
