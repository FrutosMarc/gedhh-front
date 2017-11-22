import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import 'rxjs/add/operator/map'
import {LoadingService} from "../../core/services/loading.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {

  loading$ = this.loadingSvc.allLoading$;

  constructor(public loadingSvc: LoadingService) {
  }

  ngOnInit() {


  }

}
