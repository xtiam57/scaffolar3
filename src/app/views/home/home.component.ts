import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { Chart } from 'angular-highcharts';
import { MessagesService } from '../../services/messages.service';
import { TabManagerService } from 'src/app/services/tabManager/tab-manager.service';
import { ExampleComponent } from '../example/example.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @LocalStorage() title = 'scaffolar';

  model = {
    left: true,
    middle: false,
    right: false
  };

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });

  cols = [{ headerName: 'Make', field: 'make' }, { headerName: 'Model', field: 'model' }, { headerName: 'Price', field: 'price' }];

  rows = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  next = 0;

  constructor(private message: MessagesService, public tabManager: TabManagerService) {}

  ngOnInit() {
    this.tabManager.open('A', ExampleComponent);
  }

  addTab() {
    this.tabManager.open('B<code>@</code>' + this.next, ExampleComponent, { message: 'hello world!' }).subscribe((tab) => {
      (<ExampleComponent>tab.componentInstance).message = 'IT WORKS!' + this.next++;
    });
  }

  closeAll() {
    this.tabManager.reset();
  }

  showSuccess() {
    this.message.create('Hello world!', 'Title');
  }
}
