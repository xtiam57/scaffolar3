import { Injectable } from '@angular/core';
import { RESTfulService } from '../services/restful.service';
import { SessionStorage } from 'ngx-store';
import { MessagesService } from '../services/messages.service';
import { Router } from '@angular/router';
import { TabManagerService } from '../services/tabManager/tab-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @SessionStorage() isLoggedIn = false;
  @SessionStorage() token: string | null = null;
  @SessionStorage() user: any = null;
  redirectUrl = '/home';

  constructor(private restful: RESTfulService, private messageService: MessagesService, private router: Router, private tabManager: TabManagerService) {}

  private cleanSession() {
    this.isLoggedIn = null;
    this.token = null;
    this.user = null;
  }

  login({ username, password }) {
    this.router.navigateByUrl(this.redirectUrl);
    this.isLoggedIn = true;
    this.token = 'token';
    this.user = {
      name: 'Admin',
      username: 'admin',
      role: 'ADMIN'
    };
    // this.messageService.show('Wrong username/password combination.', null, 'warning');
  }

  logout() {
    this.cleanSession();
    this.router.navigateByUrl('/login');
    this.tabManager.reset();
  }
}
