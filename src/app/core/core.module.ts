import {UtilsService} from './utils.service';
import {Auth2Service} from './services/security/auth2.service';
import {Auth2Guard} from './services/security/auth2.guard';
import {LoadingService} from './services/loading.service';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {
  MatButtonModule, MatCardModule, MatCommonModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingComponent} from './loading/loading.component';
import {RoutemapService} from './services/routemap.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatCommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [LoadingComponent],
  exports: [
    MatSnackBarModule,
    MatProgressBarModule,
    MatCommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingComponent
  ],
  providers: [
    JwtHelper,
    UtilsService,
    Auth2Service,
    Auth2Guard,
    LoadingService,
    RoutemapService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule

    };
  }
}


