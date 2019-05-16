import { Component, OnInit, Input } from '@angular/core';
import { ChartBuilderService, ChartTypes } from 'src/app/services/chartBuilder/chart-builder.service';
import { Chart } from 'angular-highcharts';
import { Subject } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  chart: Chart;
  @Input() resize: Subject<any>;
  @Input() name: string;
  @Input() type: ChartTypes = ChartTypes.Lines;

  constructor(private chartBuilder: ChartBuilderService) { }

  ngOnInit() {
    this.load();
    this.subscribe();
  }

  load() {
    this.chart = new Chart(this.chartBuilder.get(this.type));
  }

  subscribe() {
    this.resize.subscribe((value) => {
      if (!_.isEmpty(value) && value.item.name === this.name) {
        this.redraw(value.height);
      }
    });
  }

  redraw(height: number) {
    this.chart.ref$.subscribe((c) => {
      c.setSize(null, height);
    });
  }
}
