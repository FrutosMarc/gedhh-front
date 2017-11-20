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
import {AUTH, SNACKBAR_CONF, SNACKBAR_TITLE} from '../../constants';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class Auth2Service {

  private _utilisateur: Utilisateur;

  private subject = new BehaviorSubject<Utilisateur>(this.createUserFromToken());

  user$: Observable<Utilisateur> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean> = this.user$
    .map(user => !!(user));

  constructor(private http: HttpClient,
              private utils: UtilsService,
              private jwtHelper: JwtHelper,
              private loadingService: LoadingService,
              private matSnackBar : MatSnackBar,
              private router: Router) {
  }

  hasFeature(user, userHasRight: UserHasRight): boolean {
    if (user) {
      const roleArr = user.roles.filter(item => item === userHasRight.role);
      if (roleArr && roleArr.length > 0) {
        return true;
      }
    }
    return false;
  }

  login(credentials: Credentials): Observable<Utilisateur> {

    const params = new FormData();
    params.append('grant_type', 'password');
    params.append('username', credentials.username);
    params.append('password', credentials.password);

    const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('gedhhapp:mfsrvl')});

    this.loadingService.announceLoading(true);

    return this.http.post('gedhh/oauth/token', params, {headers: headers})
      .switchMap(token => {
        const user = this.createUserFromToken(token);
        this.subject.next(user);
        this.loadingService.announceLoading(false);
        this.matSnackBar.open(SNACKBAR_TITLE.INFO,'utilisateur  reconnu',SNACKBAR_CONF);
        return Observable.of(user);
      }).catch(error => {
        this.matSnackBar.open(SNACKBAR_TITLE.ERROR,'utilisateur non reconnu',SNACKBAR_CONF);
        this.subject.next(new Utilisateur());
        this.loadingService.announceLoading(false);
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

    if (this.subject) {
      this.subject.next(new Utilisateur());
    }

    this.redirectToLoginPage();
  }

  /**
   * Stocke l'utilisateur du token dans le localstorage et le renvoie
   * @param data
   * @returns {UtilisateurDTO}
   */
  private  createUserFromToken(data ?: any) {
    if (data) {
      localStorage.setItem(AUTH.token, data.access_token);
      this.utils.createHeaders();
    }

    // this._utilisateur = _.cloneDeep(ANONYMOUS_USER);
    this._utilisateur = new Utilisateur();

    try {
      const token: any = this.jwtHelper.decodeToken(localStorage.getItem(AUTH.token));
      console.log('token',token);
      this._utilisateur.username = token.user_name;
      this._utilisateur.roles = token.authorities;
      this._utilisateur.prenom = token.prenom;
      this._utilisateur.nom = token.nom;

    } catch (e) {
      console.error('corrupted user', e);
      // user not recognized
      this.logout();
    }

    return this._utilisateur;
  }


  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  set utilisateur(value: Utilisateur) {
    this._utilisateur = value;
  }



}
