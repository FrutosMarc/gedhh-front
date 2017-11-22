import {Injectable} from '@angular/core';
import {Utilisateur} from '../../utilisateur';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilsService} from '../../utils.service';
import {JwtHelper} from 'angular2-jwt';
import {LoadingService} from '../loading.service';
import {Router} from '@angular/router';
import {UserHasRight} from './user-has-right';
import {Credentials} from './credentials';
import 'rxjs/add/operator/switchMap';
import {AUTH, SECURITY, SNACKBAR_CONF, SNACKBAR_TITLE} from '../../constants';
import {MatSnackBar} from '@angular/material';
import * as _ from 'lodash';

@Injectable()
export class Auth2Service {

  private _utilisateur: Utilisateur;

  private subjectUser = new BehaviorSubject<Utilisateur>(this.createUserFromToken());

  user$: Observable<Utilisateur> = this.subjectUser.asObservable();

  isLoggedIn$: Observable<boolean> = this.user$
    .map(user => !!(user));

  isAdmin$: Observable<boolean> = this.user$
    .map(user => this.hasRole(user, SECURITY.ROLES.ROLEADMIN));

  isUtilisateur$: Observable<boolean> = this.user$
    .map(user => this.hasRole(user, SECURITY.ROLES.ROLEUSER));

  constructor(private http: HttpClient,
              private utils: UtilsService,
              private jwtHelper: JwtHelper,
              private loadingService: LoadingService,
              private matSnackBar: MatSnackBar,
              private router: Router) {
  }

  hasRole(user: Utilisateur, role: string): boolean {
    if (user) {
      const roleArr = user.roles.filter(item => item === role);
      return !_.isEmpty(roleArr);
    }
    return false;
  }

  login(credentials: Credentials): Observable<Utilisateur> {

    const params = new FormData();
    params.append('grant_type', 'password');
    params.append('username', credentials.username);
    params.append('password', credentials.password);

    const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('gedhhapp:mfsrvl')});

    //this.loadingService.announceLoading(true);

    return this.http.post('gedhh/oauth/token', params, {headers: headers})
      .switchMap(token => {
        const user = this.createUserFromToken(token);
        this.subjectUser.next(user);
       // this.loadingService.announceLoading(false);
        return Observable.of(user);
      }).catch(error => {
        this.logout();
        this.matSnackBar.open(SNACKBAR_TITLE.INFO, 'utilisateur non reconnu', SNACKBAR_CONF);
       // this.loadingService.announceLoading(false);
        return Observable.of(error);
      });
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }

  redirectToHomePage() {
    this.router.navigate(['/monbureau']);
  }

  redirectToActivatedRoute() {
    const activatedUrl = localStorage.getItem(AUTH.redirectUrl);
    if (!activatedUrl) {
      return this.redirectToHomePage();
    } else {
      return this.router.navigate([activatedUrl]);
    }
  }

  logout() {
    localStorage.clear();

    if (this.subjectUser) {
      this.subjectUser.next(undefined);
    }

    this.redirectToLoginPage();
  }

  /**
   * Stocke l'utilisateur du token dans le localstorage et le renvoie
   * @param data
   * @returns {UtilisateurDTO}
   */
  private createUserFromToken(data ?: any) {
    if (data) {
      localStorage.setItem(AUTH.token, data.access_token);
      this.utils.createHeaders();
    }


    try {
      const token: any = this.jwtHelper.decodeToken(localStorage.getItem(AUTH.token));
      let utilisateur = new Utilisateur();
      utilisateur.username = token.user_name;
      utilisateur.roles = token.authorities;
      utilisateur.prenom = token.prenom;
      utilisateur.nom = token.nom;

      return utilisateur;

    } catch (e) {
      // user not recognized
      this.logout();
      return undefined;
    }
  }


  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  set utilisateur(value: Utilisateur) {
    this._utilisateur = value;
  }


}
