import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './core/login/login.component';
import {MonbureauModule} from './monbureau/monbureau.module';

// Angular 5 new locale impl
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    // CORE
    CoreModule.forRoot(),
    BrowserModule,

    // ROUTING
    AppRoutingModule,

    // FEATURES
    MonbureauModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
