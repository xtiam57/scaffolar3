import { Component, OnInit, ViewContainerRef, ViewChildren, QueryList, AfterViewInit, ViewChild } from '@angular/core';
import { TabManagerService } from './tab-manager.service';
import { AppTabsetComponent } from './tabset';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-tab-manager',
  templateUrl: './tab-manager.component.html',
  styleUrls: ['./tab-manager.component.scss']
})
export class TabManagerComponent implements OnInit, AfterViewInit {
  @ViewChildren('componentContent', { read: ViewContainerRef })
  public targets: QueryList<ViewContainerRef>;

  @ViewChild('tabsetComponent')
  public tabsetComponent: AppTabsetComponent;

  @ViewChild(ContextMenuComponent)
  public tabContextMenu: ContextMenuComponent;

  constructor(public tabManager: TabManagerService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.tabManager.setViewRefs(this.targets);
    this.tabManager.setTabsetComponent(this.tabsetComponent);
  }

  isPinned(item: any): boolean {
    return item && !item.isPinned;
  }

  isUnpinned(item: any): boolean {
    return item && item.isPinned;
  }
}
