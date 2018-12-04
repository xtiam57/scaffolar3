import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { LocalStorage } from 'ngx-store';
import { MessagesService } from '../../services/messages.service';
import * as $ from 'jquery';
import { GridStackItem, GridStackOptions, GridStackItemComponent, GridStackComponent} from 'ng4-gridstack';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @Input() params: any;
  @Input() message: string;
  test;

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

  public options: GridStackOptions = new GridStackOptions();
  public widget1: GridStackItem = new GridStackItem();
// public widget2: GridStackItem = new GridStackItem();

  chart2 = new Chart({
    chart: {
      type: 'pie',
      height: 400
    },
    title: {
      text: 'Prueba'
    },
    credits: {
      enabled: false
    },
    yAxis: {
      title: {
          text: 'Total percent market share'
      }
  },
  plotOptions: {
    pie: {
        shadow: false,
        center: ['50%', '50%']
    }
},
    series: [
      {
        name: 'Spending',
        data: [
          {
            y: 300,
            color: '#F7464A',
            name: 'Red'
        },
        {
            y: 50,
            color: '#46BFBD',
            name: 'Green'
        },
        {
            y: 100,
            color: '#FDB45C',
            name: 'Yellow'
        }
        ],
      // size: '90%',
      //  innerSize: '55%',
      }
    ] ,
  responsive: {
    rules: [{
      condition: {
        maxWidth: 400
      },
      chartOptions: {
        series: [{
            id: 'versions',
          }]
        }
    }]
  }
  });

  next = 0;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {

    this.options.alwaysShowResizeHandle = true;

    this.widget1.x = 0;
    this.widget1.y = 0;
    this.widget1.width = 6;
    this.widget1.height = 6;
    this.widget1.minWidth = 6;
    this.widget1.minHeight = 6;

  }

  showSuccess() {
    this.messageService.create('Hello world!', 'Title');
  }

  itemReize(item) {
    console.log('este es el item:' , item);
    const w = $('.chartContainer').width();
    const h =  $('.chartContainer').height();
  // this.chart.options.chart.height = h;
  // this.chart.reflow();
      this.chart2.ref.setSize(w, h * (3 / 4), false);
  }
}
