import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AppSettings } from '../../app.settings';
import { RESTfulService } from '../../services/restful.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  busy: any;
  appSettings: any;
  credentials: any = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService, private restful: RESTfulService) {
    this.appSettings = AppSettings;
  }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.busy = this.restful.get('users/xtiam57/repos').subscribe();
    this.authService.login(this.credentials);
  }
}
