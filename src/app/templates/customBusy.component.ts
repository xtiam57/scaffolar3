import { Component, Inject } from '@angular/core';
import { InstanceConfigHolderService, BusyConfig } from 'ng-busy';

@Component({
  selector: 'app-default-busy',
  template: `
    <div class="ng-busy-default-wrapper" [ngStyle]="templateNgStyle">
      <div class="ng-busy-default-sign">
        <fa-icon [icon]="['fas', 'spinner']" [pulse]="true"></fa-icon>
        <div class="ng-busy-default-text">{{ message }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      .ng-busy-default-sign {
        background: #fff;
        box-shadow: none;
        padding: 10px 20px;
        border-bottom-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        border: solid 1px #eee;
        border-top: none;
      }
    `
  ]
})
export class CustomBusyComponent {
  templateNgStyle: any;

  constructor(@Inject('instanceConfigHolder') private instanceConfigHolder: InstanceConfigHolderService) {}

  get message() {
    return this.instanceConfigHolder.config.message;
  }
}

export function busyConfigFactory() {
  return new BusyConfig({
    message: 'Loading',
    minDuration: 1000,
    template: CustomBusyComponent
  });
}
