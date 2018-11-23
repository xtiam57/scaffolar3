import { Component, OnInit, ViewContainerRef, ViewChildren, QueryList, AfterViewInit, ViewChild } from '@angular/core';
import { TabManagerService } from './tab-manager.service';
import { AppTabsetComponent } from './tabset';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss']
})
export class TabContainerComponent implements OnInit, AfterViewInit {
  @ViewChildren('componentContent', { read: ViewContainerRef })
  public targets: QueryList<ViewContainerRef>;

  @ViewChild('tabsetComponent')
  private tabsetComponent: AppTabsetComponent;

  constructor(public tabManager: TabManagerService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.tabManager.setViewRefs(this.targets);
    this.tabManager.setTabsetComponent(this.tabsetComponent);
  }
}
