import { DatePipe, DecimalPipe, JsonPipe } from '@angular/common';
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
import { ChartModule } from 'angular-highcharts';
import { BusyConfig, NgBusyModule } from 'ng-busy';
import { SidebarModule } from 'ng-sidebar';
import { CustomFormsModule } from 'ng2-validation';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ContextMenuModule } from 'ngx-contextmenu';
import { WebStorageModule } from 'ngx-store';
import { ToastrModule } from 'ngx-toastr';
import { AppHttpInterceptor } from './app-http.interceptor';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvailablePipe } from './pipes/available.pipe';
import { ConditionalPipe } from './pipes/conditional.pipe';
import { FractionPipe } from './pipes/fraction.pipe';
import { StriphtmlPipe } from './pipes/striphtml.pipe';
import { PromptComponent } from './services/prompt/prompt.component';
import { TabManagerComponent } from './services/tabManager/tab-manager.component';
import { TABSET_DIRECTIVES } from './services/tabManager/tabset';
import { busyConfigFactory, CustomBusyComponent } from './templates/customBusy.component';
import { ModalExampleComponent } from './views/modal-example/modal-example.component';
import { GridsterModule } from 'angular-gridster2';
import { GridModule } from '@progress/kendo-angular-grid';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SampleComponent } from './views/dashboard/charts/sample/sample.component';
import { TableComponent } from './views/dashboard/charts/table/table.component';

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
    TABSET_DIRECTIVES,
    StriphtmlPipe,
    PromptComponent,
    ModalExampleComponent,
    DashboardComponent,
    SampleComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    WebStorageModule,
    GridsterModule,
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
    NgBusyModule,
    ChartModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    SidebarModule.forRoot(),
    CustomFormsModule,
    SortableModule.forRoot(),
    GridModule,
    SplitterModule,
    FilterPipeModule,
  ],
  providers: [
    DecimalPipe,
    JsonPipe,
    DatePipe,
    FractionPipe,
    AvailablePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    {
      provide: BusyConfig,
      useFactory: busyConfigFactory
    }
  ],
  entryComponents: [CustomBusyComponent, PromptComponent, ModalExampleComponent, DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
