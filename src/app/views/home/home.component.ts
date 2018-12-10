import { Component, OnInit } from '@angular/core';

import { TabManagerService } from '../../services/tabManager/tab-manager.service';
import { ExampleComponent } from '../example/example.component';
import { AuthService } from '../../auth/auth.service';
import { Chart } from 'angular-highcharts';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * Sidebar is opened
   */
  public asideOpened = false;


  next = 1;


  constructor(public tabManager: TabManagerService, public auth: AuthService) {}

  ngOnInit() {
    this.tabManager.open('Aaron Wellbore X85eww', ExampleComponent, null, ['fas', 'home'], 'teal');
    this.tabManager.open('CCCCCCCFFFFFFFFFGGGGGGGGGKKKKKKKK', ExampleComponent, null, ['fas', 'check']);
  }

  addTab() {
    this.tabManager.open('Title<b>@</b>' + this.next, ExampleComponent, { message: 'hello world!' }).subscribe((tab) => {
      (<ExampleComponent>tab.componentInstance).message = 'IT WORKS!' + this.next++;
    });
  }

  goto() {
    this.tabManager.open('CCCCCCCFFFFFFFFFGGGGGGGGGKKKKKKKK', ExampleComponent, null, ['fas', 'check']);
  }

  /**
   * Open/close sidebar
   */
  toggleSidebar() {
    this.asideOpened = !this.asideOpened;
  }

  DargS() {
    console.log('dragg');
    }
}
