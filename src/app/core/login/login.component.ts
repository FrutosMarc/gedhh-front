import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {UtilsService} from '../utils.service';
import {Auth2Service} from '../services/security/auth2.service';
import {Credentials} from '../services/security/credentials';
import {HttpErrorResponse} from '@angular/common/http';
import {AUTH} from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subjectError = new BehaviorSubject<string>('');
  errorMsg$: Observable<string> = this.subjectError.asObservable();
  loading$: Observable<boolean>;
  user$ =this.auth2Svc.user$;

  subLogin: Subscription;

  username: string;
  password: string;

  constructor(private utils: UtilsService,

              private auth2Svc: Auth2Service) {
  }

  ngOnInit(): void {


  }

  login() {

    if (this.username && this.password) {
      this.subLogin = this.auth2Svc.login(new Credentials(this.username, this.password)).subscribe(
        (response) => {
          if (response instanceof HttpErrorResponse) {
            if (response.status === 401) {
              this.subjectError.next(`Votre compte ne peut accéder à l'application. Re-saisissez votre login / mot de passe. Si le problème persiste, contactez votre administrateur.`);
            }
            if (response.status === 404 || response.status === 504) {
              this.subjectError.next(`Le service DATAMEAL API est introuvable. Contactez votre administrateur.`);
            }
          }
          // do logic to reroute
          this.auth2Svc.redirectToActivatedRoute();
        },
        err => {
          console.error('ERROR', err);
          this.subjectError.next('Erreur inconnue. Contactez votre administrateur');
          this.auth2Svc.logout();
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.utils.unsubscribe(this.subLogin);
  }
}
