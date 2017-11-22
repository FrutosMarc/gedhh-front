import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Utilisateur} from '../../utilisateur';
import {Auth2Service} from './auth2.service';
import {AUTH} from '../../constants';
import {UtilsService} from '../../utils.service';


@Injectable()
export class Auth2Guard implements CanActivate, CanActivateChild, OnDestroy {


  userSub: Subscription;
  user: Utilisateur;

  constructor(private auth2Svc: Auth2Service, private utils:UtilsService) {
    this.userSub = this.auth2Svc.user$.subscribe(userAuth => this.user = userAuth);
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('user',this.user);
    this.storeRouteToActivate(next.data, state);

    if (this.auth2Svc.hasRole(this.user,next.data.role)) {
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

  ngOnDestroy(): void {
    this.utils.unsubscribe(this.userSub);
  }

}
