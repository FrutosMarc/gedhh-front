import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Auth2Service} from './core/services/security/auth2.service';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from './core/utils.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, AfterViewInit , OnDestroy {


  title = 'Gestion Electronique Documentaire';
  isAdmin$;
  isUser$;
  user$;
  isLoggedIn$;



  constructor(public auth2Svc: Auth2Service, private titleSvc: Title, private http: HttpClient,
              private  elementRef: ElementRef,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.isAdmin$ = this.auth2Svc.isAdmin$;
    this.isUser$ = this.auth2Svc.isUtilisateur$;
    this.user$ = this.auth2Svc.user$;
    this.isLoggedIn$ = this.auth2Svc.isLoggedIn$;

    this.titleSvc.setTitle(this.title);


  }

  logout() {
    this.auth2Svc.logout();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {

  }


}
