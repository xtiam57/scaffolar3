import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';
import { TabManagerService } from '../services/tabManager/tab-manager.service';
import * as _ from 'underscore';

export interface DrilldownParams {
  title: string;
  component: any;
  id: string;
  icon: Array<string>;
  color: string;
}

@Directive({
  selector: '[appDrilldown]'
})
export class DrilldownDirective implements OnInit {
  @Input() appDrilldown: DrilldownParams;

  constructor(private element: ElementRef, private tabManager: TabManagerService) { }

  ngOnInit() {
    if (_.isUndefined(this.appDrilldown.component) || _.isUndefined(this.appDrilldown.id)) {
      return;
    }

    this.element.nativeElement.style.color = 'var(--primary)';
    this.element.nativeElement.style.cursor = 'pointer';
  }

  @HostListener('click', ['$event']) onclick($event) {
    if (_.isUndefined(this.appDrilldown.component) || _.isUndefined(this.appDrilldown.id)) {
      console.error('Missing needed component or ID');
      return;
    }

    this.tabManager.open(this.appDrilldown.title || 'Untitled',
      this.appDrilldown.component,
      { id: this.appDrilldown.id },
      this.appDrilldown.icon || ['fas', 'square'],
      this.appDrilldown.color || 'gray',
      this.appDrilldown.id);
  }
}
