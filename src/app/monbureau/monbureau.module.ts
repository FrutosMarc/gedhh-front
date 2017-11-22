import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonbureauRoutingModule } from './monbureau-routing.module';
import { MonBureauComponent } from './mon-bureau/mon-bureau.component';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    MonbureauRoutingModule,
    CoreModule
  ],
  declarations: [MonBureauComponent]
})
export class MonbureauModule { }
