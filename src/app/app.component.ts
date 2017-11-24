import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Auth2Service} from './core/services/security/auth2.service';

import {UtilsService} from './core/utils.service';
import {RoutemapService} from './core/services/routemap.service';
import {Parametre} from './core/dtos/parametre';
import {ResponseSupplier} from './core/suppliers/response-supplier';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MatSidenav} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  title = 'Gestion Electronique Documentaire';
  isAdmin$;
  isUser$;
  user$;
  isLoggedIn$;

  isOpenSidenav: boolean = false;
  isLoggedIn: boolean = false;
  subIsLoggedIn: Subscription;

  @ViewChild('sidenav') sidenav: MatSidenav;

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

    this.subIsLoggedIn = this.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    this.http.get<ResponseSupplier<Parametre>>('gedhh/parametres/title')
      .subscribe(data => {
        let rs: any = data;
        this.title = rs.one.valeur;
        this.titleSvc.setTitle(this.title);
      });
  }

  logout() {
    this.sidenav.close();
    this.isOpenSidenav = false;
    this.auth2Svc.logout();
  }

  ngAfterViewInit(): void {

  }

  customBackdropClickHandler() {
    this.isOpenSidenav = false;
  }

  openMenu(isOpen: true) {
    if(this.isLoggedIn){
      if (!isOpen ) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
      this.isOpenSidenav = !isOpen;
    }else{
      this.isOpenSidenav = false;
    }

  }

  ngOnDestroy(): void {
    this.utils.unsubscribe(this.isLoggedIn);
  }


}
