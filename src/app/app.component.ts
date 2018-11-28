import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarOpened = false;
  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }
}
