import { Component, OnInit } from '@angular/core';
import {Auth2Service} from '../../core/services/security/auth2.service';

@Component({
  selector: 'app-mon-bureau',
  templateUrl: './mon-bureau.component.html',
  styleUrls: ['./mon-bureau.component.css']
})
export class MonBureauComponent implements OnInit {

  isAdmin$;
  isUser$;
  user$;

  constructor(public auth2Svc:Auth2Service) { }

  ngOnInit() {
    this.isAdmin$ = this.auth2Svc.isAdmin$;
    this.isUser$ = this.auth2Svc.isUtilisateur$;
    this.user$ = this.auth2Svc.user$;
  }

  logout(){
    this.auth2Svc.logout();
  }

}
