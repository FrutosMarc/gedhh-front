
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {NavigationStart, ResolveStart, Router, RoutesRecognized} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/combineLatest';

@Injectable()
export class LoadingService {

  private subjectSpecificLoading = new BehaviorSubject(false);
  specificLoading$ = this.subjectSpecificLoading.asObservable();
  allLoading$: Observable<boolean>;

  announceLoading(isLoading: boolean) {
    this.subjectSpecificLoading.next(isLoading);
  }

  constructor(private router: Router) {
    this.allLoading$ = Observable.combineLatest(this.router.events, this.specificLoading$ )
      .map(data => data[0] instanceof NavigationStart ||
        data[0] instanceof RoutesRecognized || data[0] instanceof ResolveStart || data[1] && data[1] === true );
  }

}
