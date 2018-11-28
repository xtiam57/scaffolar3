import { Component, OnInit } from '@angular/core';
import { TabManagerService } from 'src/app/services/tabManager/tab-manager.service';
import { ExampleComponent } from '../example/example.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * Sidebar is opened
   */
  public sidebarOpened = false;

  next = 1;

  constructor(public tabManager: TabManagerService) {}

  ngOnInit() {
    this.tabManager.open('Aaron Wellbore X85eww', ExampleComponent, ['fas', 'home']);
    this.tabManager.open('CCCCCCCFFFFFFFFFGGGGGGGGGKKKKKKKK', ExampleComponent, ['fas', 'check']);
  }

  addTab() {
    this.tabManager.open('Title<b>@</b>' + this.next, ExampleComponent, null, { message: 'hello world!' }).subscribe((tab) => {
      (<ExampleComponent>tab.componentInstance).message = 'IT WORKS!' + this.next++;
    });
  }

  /**
   * Open/close sidebar
   */
  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }
}
