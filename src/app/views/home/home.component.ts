import { Component, OnInit } from '@angular/core';
import { TabManagerService } from '../../services/tabManager/tab-manager.service';
import { ExampleComponent } from '../example/example.component';
import { AuthService } from '../../auth/auth.service';

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
    this.tabManager.open('Aaron Wellbore X85eww', ExampleComponent, ['fas', 'home']);
    this.tabManager.open('CCCCCCCFFFFFFFFFGGGGGGGGGKKKKKKKK', ExampleComponent, ['fas', 'check']);
  }

  addTab() {
    this.tabManager.open('Title<b>@</b>' + this.next, ExampleComponent, null, { message: 'hello world!' })
      .subscribe((tab) => {
        (<ExampleComponent>tab.componentInstance).message = 'IT WORKS!' + this.next++;
      });
  }

  /**
   * Open/close sidebar
   */
  toggleSidebar() {
    this.asideOpened = !this.asideOpened;
  }
}
