import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { WebStorageModule } from 'ngx-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgBusyModule, BusyConfig } from 'ng-busy';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FractionPipe } from './pipes/fraction.pipe';
import { AvailablePipe } from './pipes/available.pipe';
import { ConditionalPipe } from './pipes/conditional.pipe';
import { AppHttpInterceptor } from './app-http.interceptor';
import { CustomBusyComponent } from './templates/customBusy.component';

@NgModule({
  declarations: [AppComponent, routingComponents, FractionPipe, AvailablePipe, ConditionalPipe, CustomBusyComponent],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    WebStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      extendedTimeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true,
      progressBar: true
    }),
    LoadingBarHttpClientModule,
    NgBusyModule.forRoot(
      new BusyConfig({
        message: 'Loading',
        minDuration: 1000,
        template: CustomBusyComponent
      })
    )
  ],
  providers: [
    DecimalPipe,
    FractionPipe,
    AvailablePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  entryComponents: [CustomBusyComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
