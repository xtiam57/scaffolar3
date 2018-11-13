import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { WebStorageModule } from 'ngx-store';

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

@NgModule({
  declarations: [AppComponent, routingComponents, FractionPipe, AvailablePipe, ConditionalPipe],
  imports: [BrowserModule, NgbModule, FormsModule, HttpClientModule, AppRoutingModule, FontAwesomeModule, WebStorageModule],
  providers: [DecimalPipe, FractionPipe, AvailablePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
