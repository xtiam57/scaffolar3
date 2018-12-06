import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { LocalStorage } from 'ngx-store';
import { MessagesService } from '../../services/messages.service';
import { ExporterService } from '../../services/exporter.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @Input() params: any;
  @Input() message: string;
  test;
  asideOpened = false;

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

  constructor(private messageService: MessagesService, private exporter: ExporterService) {}

  ngOnInit() {}

  showSuccess() {
    this.messageService.create('Hello world!', 'Title');
  }

  toggleSidebar() {
    this.asideOpened = !this.asideOpened;
  }

  export() {
    this.exporter.saveAs();
  }
}
