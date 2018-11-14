import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  appSettings: any;

  constructor() {}

  ngOnInit() {
    this.appSettings = AppSettings.getInfo();
  }
}
