import { Injectable } from '@angular/core';
import { RESTfulService } from '../services/restful.service';
import { SessionStorage } from 'ngx-store';
import { MessagesService } from '../services/messages.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @SessionStorage() isLoggedIn = false;
  @SessionStorage() token: string | null = null;
  @SessionStorage() user: any = null;
  redirectUrl = '/home';

  constructor(private restfulService: RESTfulService, private messageService: MessagesService, private router: Router) {}

  private cleanSession() {
    this.isLoggedIn = false;
    this.token = null;
    this.user = null;
  }

  login({ username, password }) {
    if (username === 'admin' && password === '12345') {
      this.router.navigateByUrl(this.redirectUrl);
      this.isLoggedIn = true;
      this.token = 'token';
      this.user = {
        name: 'Admin',
        username: 'admin',
        role: 'ADMIN'
      };
    } else {
      this.messageService.show('Wrong username/password combination.', null, 'warning');
    }
  }

  logout() {
    this.cleanSession();
    this.router.navigateByUrl('/login');
  }
}
