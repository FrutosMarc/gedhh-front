import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Auth2Service} from './core/services/security/auth2.service';

import {UtilsService} from './core/utils.service';
import {RoutemapService} from './core/services/routemap.service';
import {Parametre} from './core/dtos/parametre';
import {ResponseSupplier} from './core/suppliers/response-supplier';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  title = 'Gestion Electronique Documentaire';
  isAdmin$;
  isUser$;
  user$;
  isLoggedIn$;

  constructor(public auth2Svc: Auth2Service, private titleSvc: Title, private http: HttpClient,
              private  elementRef: ElementRef,
              public routeMapSvc: RoutemapService,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.isAdmin$ = this.auth2Svc.isAdmin$;
    this.isUser$ = this.auth2Svc.isUtilisateur$;
    this.user$ = this.auth2Svc.user$;
    this.isLoggedIn$ = this.auth2Svc.isLoggedIn$;

    this.http.get<ResponseSupplier<Parametre>>('gedhh/parametres/title')
      .subscribe(data => {
        let rs: any = data;
        this.titleSvc.setTitle(rs.one.valeur);
      });
  }

  logout() {
    this.auth2Svc.logout();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {

  }


}
