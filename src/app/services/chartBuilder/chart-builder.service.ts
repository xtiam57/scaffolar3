import { Injectable } from '@angular/core';
import { LINES_CHART } from './lines-chart';
import { INVERSE_LINES_CHART } from './inverse-lines-chart';
import { SPLINES_CHART } from './splines-chart';
import { COLUMNS_CHART } from './columns-chart';
import { BARS_CHART } from './bars-chart';
import { AREA_CHART } from './area-chart';
import { AREA_SPLINES_CHART } from './area-splines-chart';
import { HALF_DONUT_CHART } from './half-donut-chart';
import { DONUT_CHART } from './donut-chart';
import { PIE_CHART } from './pie-chart';
import * as _ from 'underscore';
import { ObjectUtilService } from '../object-util.service';

export enum ChartTypes {
  Lines = 'Lines',
  InverseLines = 'InverseLines',
  Splines = 'Splines',
  Columns = 'Columns',
  Bars = 'Bars',
  Areas = 'Areas',
  AreaSplines = 'AreaSplines',
  HalfDonut = 'HalfDonut',
  Donut = 'Donut',
  Pie = 'Pie',
}

@Injectable({
  providedIn: 'root'
})
export class ChartBuilderService {
  private defaultHeight = 388;
  private defaultWidth = 553;
  private colors = [
    '#F7464A',
    '#46BFBD',
    '#FDB45C',
    '#DC6900',
    '#4D5360',
    '#2E7D32',
    '#5E35B1',
    '#FF4081',
    '#2b908f',
    '#dcdcdc',
    '#0091EA',
    '#949fb1',
    '#97bbcd'
  ];

  constructor(private objectUtil: ObjectUtilService) {
  }

  get(type: ChartTypes = ChartTypes.Lines, height = this.defaultHeight, title?: string, stacking = null): any {
    switch (type) {
      case ChartTypes.InverseLines:
        return this.getInverseLines(height, title);
      case ChartTypes.Splines:
        return this.getSplines(height, title);
      case ChartTypes.Columns:
        return this.getColumns(height, title, stacking);
      case ChartTypes.Bars:
        return this.getBars(height, title, stacking);
      case ChartTypes.Areas:
        return this.getAreas(height, title, stacking);
      case ChartTypes.AreaSplines:
        return this.getAreaSplines(height, title, stacking);
      case ChartTypes.HalfDonut:
        return this.getHalfDonut(height, title);
      case ChartTypes.Donut:
        return this.getDonut(height, title);
      case ChartTypes.Pie:
        return this.getPie(height, title);
      default:
        return this.getLines(height, title);
    }
  }

  getLines(height = this.defaultHeight, title?: string): any {
    return this.merge(height, LINES_CHART, title);
  }

  getInverseLines(height = this.defaultHeight, title?: string): any {
    return this.merge(height, INVERSE_LINES_CHART, title);
  }

  getSplines(height = this.defaultHeight, title?: string) {
    return this.merge(height, SPLINES_CHART, title);
  }

  getColumns(height = this.defaultHeight, title?: string, stacking = null): any {
    const chart = this.merge(height, COLUMNS_CHART, title);

    if (stacking) {
      chart.plotOptions.column.stacking = stacking; // 'percent', 'normal'
    }
    return chart;
  }

  getBars(height = this.defaultHeight, title?: string, stacking = null): any {
    const chart = this.merge(height, BARS_CHART, title);

    if (stacking) {
      chart.plotOptions.bar.stacking = stacking; // 'percent', 'normal'
    }
    return chart;
  }

  getAreas(height = this.defaultHeight, title?: string, stacking = null): any {
    const chart = this.merge(height, AREA_CHART, title);

    if (stacking) {
      chart.plotOptions.area.stacking = stacking; // 'percent', 'normal'
    }
    return chart;
  }

  getAreaSplines(height = this.defaultHeight, title?: string, stacking = null): any {
    const chart = this.merge(height, AREA_SPLINES_CHART, title);

    if (stacking) {
      chart.plotOptions.areaspline.stacking = stacking; // 'percent', 'normal'
    }
    return chart;
  }

  getHalfDonut(height = this.defaultHeight, title?: string): any {
    const chart = this.merge(height, HALF_DONUT_CHART, title);

    chart.plotOptions.pie.colors = this.colors;

    return chart;
  }

  getDonut(height = this.defaultHeight, title?: string): any {
    const chart = this.merge(height, DONUT_CHART, title);

    chart.plotOptions.pie.colors = this.colors;

    return chart;
  }

  getPie(height = this.defaultHeight, title?: string): any {
    const chart = this.merge(height, PIE_CHART, title);

    chart.plotOptions.pie.colors = this.colors;

    return chart;
  }

  setColors(chart: any) {
    _.each(chart.series, (value: any, index: number) => {
      value.color = this.colors[index % this.colors.length];
    });
  }

  private merge(height: number = this.defaultHeight, settings: any, title?: string): any {
    const chart = this.objectUtil.merge(this.getTemplate(height, title), settings);

    this.setColors(chart);

    return chart;
  }

  private getTemplate(height: number = this.defaultHeight, title?: string): any {
    return {
      chart: {
        height: height,
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        reflow: true,
        style: {
          fontFamily: 'Open Sans, Helvetica'
        }
      },
      title: {
        text: title,
        align: 'left',
        margin: 30,
        style: {
          fontSize: '30px'
        }
        // align: 'center',
        // verticalAlign: 'middle',
        // y: 40
      },
      resize: true,
      tooltip: {
        shared: false,
        pointFormat: '{series.name}: <strong>{point.y}</strong>'
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        squareSymbol: false,
        symbolHeight: 12,
        symbolWidth: 40,
        symbolRadius: 0,
        itemMarginBottom: 3,
        labelFormatter: function () {
          return this.name /*+ ' (' + this.y + '%)'*/;
        },
        itemStyle: {
          fontFamily: 'Open Sans',
          fontWeight: 'normal'
        }
      },
      loading: false,
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      }
    };
  }
}
