import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridsterComponentInterface, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType } from 'angular-gridster2';
import { Subject } from 'rxjs';
import { ChartTypes } from 'src/app/services/chartBuilder/chart-builder.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  get ChartTypes() { return ChartTypes; }

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  resize: Subject<any> = new Subject();
  gridItemDefaultHeight = 436;
  private gridItemHeader = (24 * 2) /* TODO: mejorar. Padding superior e inferior */ + 71 /* TODO: mejorar. Title size */;

  constructor() { }

  ngOnInit() {
    this.options = {
      gridType: GridType.VerticalFixed,
      fixedRowHeight: this.gridItemDefaultHeight,
      pushItems: true,
      swap: true,
      minCols: 3,
      maxCols: 3,
      minRows: 2,
      initCallback: (gridster: GridsterComponentInterface) => {
        setTimeout(() => {
          _.each(gridster.grid, (itemComponent) => {
            this.resize.next({
              item: itemComponent.item,
              width: itemComponent.width,
              height: itemComponent.height - this.gridItemHeader
            });
          });
        }, 350);
      },
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'item-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
      },
      resizable: {
        enabled: true,
        stop: (item: GridsterItem, itemComponent: GridsterItemComponentInterface, event: MouseEvent) => {
          setTimeout(() => {
            this.resize.next({
              item,
              width: itemComponent.width,
              height: itemComponent.height - this.gridItemHeader
            });
          }, 0);
        },
      }
    };
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
}
