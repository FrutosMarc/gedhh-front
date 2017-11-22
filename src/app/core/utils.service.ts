import {Injectable} from '@angular/core';

import * as _ from 'lodash';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material';
import {LoadingService} from './services/loading.service';
import {AUTH} from './constants';

@Injectable()
export class UtilsService {

  private _options;
  constructor(private http: HttpClient,
              private loadingSvc: LoadingService,
              private titleSvc: Title,
              private snackBar: MatSnackBar) {
    this.createHeaders();
  }

  /**
   * Used with new API HttpClient
   */
  createHeaders() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem(AUTH.token));
    this._options = {headers: headers};
  }

  unsubscribe(sub: any) {
    if (sub) {
      sub.unsubscribe();
    }
  }


  get options() {
    return this._options;
  }

  set options(value) {
    this._options = value;
  }
}
