import { ComponentFactoryResolver, Injectable, ViewContainerRef, QueryList, ComponentFactory, ComponentRef } from '@angular/core';
import { StringUtilService } from '../string-util.service';
import * as _ from 'underscore';

class TabInstance {
  id: string;
  factory: ComponentFactory<any> | null;
  componentInstance: ComponentRef<any> | null | any;
  disabled = false;

  constructor(public title: string, public component: any, public data: any, id?: string) {
    this.id = id || new StringUtilService().getGUID(true);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TabManagerService {
  tabs: Array<TabInstance> = [];
  private targets: QueryList<ViewContainerRef>;

  constructor(private resolver: ComponentFactoryResolver) {}

  private _findViewRef(tabId: string): ViewContainerRef | null {
    // Find the right ViewContainerRef given its ID
    const target = _.filter(this.targets.toArray(), (item) => {
      return item.element.nativeElement.id === tabId;
    });
    return _.first(target) || null;
  }

  private _attachComponents() {
    this.tabs.forEach((tab) => {
      // Optimize search
      if (tab.componentInstance) {
        return;
      }
      // Find the matching tab and ViewRef
      const target = this._findViewRef(tab.id);
      // If the target exists and there is not component inside of it
      if (target) {
        // NOTE: just in case (It can be removed)
        target.clear();
        tab.componentInstance = target.createComponent(tab.factory).instance;
        // Setting data to show in the view through "@Input() data"
        tab.componentInstance.data = tab.data;
      }
    });
  }

  getTab(tabId: string): TabInstance | null {
    const tab = _.findWhere(this.tabs, { id: tabId });
    return tab || null;
  }

  setViewRefs(targets: QueryList<ViewContainerRef>) {
    // Insert tabs for the first time
    setTimeout(() => this._attachComponents(), 0);
    // All ViewContainerRefs in TabContainerComponent
    this.targets = targets;
    // Initialize components inside the tabs every time the tabsView (TabContainerComponent) changes
    this.targets.changes.subscribe(() => {
      setTimeout(() => this._attachComponents(), 0);
    });
  }

  add(title: string, component: any, data: any = {}, id?: string) {
    const tab = new TabInstance(title, component, data, id);
    // Set component factory
    tab.factory = this.resolver.resolveComponentFactory(component);
    this.tabs.push(tab);

    return tab;
  }
}
