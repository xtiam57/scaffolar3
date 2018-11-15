import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  appSettings: any;
  credentials: any = {
    username: null,
    password: null
  };

  constructor(private authService: AuthService) {
    this.appSettings = AppSettings;
  }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.credentials);
  }
}
