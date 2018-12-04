import { DecimalPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AgGridModule } from 'ag-grid-angular';
import { ChartModule } from 'angular-highcharts';
import { BusyConfig, NgBusyModule } from 'ng-busy';
import { SidebarModule } from 'ng-sidebar';
import { ContextMenuModule } from 'ngx-contextmenu';
import { WebStorageModule } from 'ngx-store';
import { ToastrModule } from 'ngx-toastr';
import { AppHttpInterceptor } from './app-http.interceptor';
import { GridStackModule } from 'ng4-gridstack';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvailablePipe } from './pipes/available.pipe';
import { ConditionalPipe } from './pipes/conditional.pipe';
import { FractionPipe } from './pipes/fraction.pipe';
import { StriphtmlPipe } from './pipes/striphtml.pipe';
import { TabManagerComponent } from './services/tabManager/tab-manager.component';
import { TABSET_DIRECTIVES } from './services/tabManager/tabset';
import { CustomBusyComponent } from './templates/customBusy.component';
import { ExampleComponent } from './views/example/example.component';

library.add(fas, far, fab);


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FractionPipe,
    AvailablePipe,
    ConditionalPipe,
    CustomBusyComponent,
    TabManagerComponent,
    ExampleComponent,
    TABSET_DIRECTIVES,
    StriphtmlPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    WebStorageModule,
    GridStackModule,
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
    ),
    ChartModule,
    AgGridModule.withComponents([]),
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    SidebarModule.forRoot()
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
  entryComponents: [CustomBusyComponent, ExampleComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
