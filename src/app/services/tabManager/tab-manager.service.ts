import { ComponentFactoryResolver, Injectable, QueryList, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import * as _ from 'underscore';
import { StringUtilService } from '../string-util.service';
import { Tab } from './tab';
import { AppTabsetComponent } from './tabset';

@Injectable({
  providedIn: 'root'
})
export class TabManagerService {
  /**
   * List of tabs.
   */
  tabs: Array<Tab> = [];

  /**
   * List of tab view references.
   */
  private targets: QueryList<ViewContainerRef>;

  /**
   * Tabset view reference. Used to call .select()
   */
  private tabsetComponent: AppTabsetComponent;

  constructor(private resolver: ComponentFactoryResolver, private stringUtil: StringUtilService) {}

  /**
   * Finds the view reference for the given tab id.
   * @param tabId Unique tab id.
   */
  private _findViewRef(tabId: string): ViewContainerRef | null {
    // Find the right ViewContainerRef given its ID
    const target = _.filter(this.targets.toArray(), (item) => {
      return `${item.element.nativeElement.id}` === `content-${tabId}`;
    });
    return _.first(target) || null;
  }

  /**
   * Create component inside the tab.
   */
  private _attachComponents(): void {
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
        // Call subscribers (now the tab has the componentInstance)
        tab.notifySubscribers();
        // Select as an active tab
        this.tabsetComponent.select(tab.id);
      }
    });
  }

  /**
   * Set the tabset view reference.
   * This method is called from the tabContainer.
   * @param tabsetComponent TabSet view reference.
   */
  setTabsetComponent(tabsetComponent: AppTabsetComponent) {
    this.tabsetComponent = tabsetComponent;
  }

  /**
   * Set the view references for each tab and check if there is changes.
   * This method is called from the tabContainer.
   * @param targets View references for each tab
   */
  setViewRefs(targets: QueryList<ViewContainerRef>): void {
    // All ViewContainerRefs in TabContainerComponent
    this.targets = targets;
    // Insert tabs for the first time
    setTimeout(() => this._attachComponents());
    // Initialize components inside the tabs every time the tabsView (TabContainerComponent) changes
    this.targets.changes.subscribe(() => {
      setTimeout(() => this._attachComponents());
    });
  }

  /**
   * Checks if the tab already exists, if, the tab will be selected
   * @param tab The tab to compare with
   */
  exists(tab: Tab): boolean {
    const found = _.find(this.tabs, (value) => {
      return (
        this.stringUtil.isEqual(value.title, tab.title) && this.stringUtil.isEqual(value.component.name, tab.component.name) && _.isMatch(value.data, tab.data)
      );
    });
    if (found) {
      // Select as an active tab
      this.tabsetComponent.select(found.id);
      return true;
    }
    return false;
  }

  /**
   * Creates and opens a new tab.
   * @param title Title of the tab. Can contain HTML text.
   * @param component Component to load and add to the tab.
   * @param icon FontAwesome icon.
   * @param data Extra data to pass to the Component or tab.
   * @param id Unique ID for the tab.
   */
  open(title: string, component: any, icon?: Array<string>, data: any = {}, id?: string): Observable<Tab> {
    const tab = new Tab(title, component, icon, data, id);
    // The tab already exists
    if (this.exists(tab)) {
      return new Observable<Tab>();
    }
    // Set component factory
    tab.factory = this.resolver.resolveComponentFactory(component);
    this.tabs.push(tab);

    return new Observable<Tab>((observer) => {
      // After the tab is added to the view, the subscribers will be notified
      // returning the tab with the ComponentInstance
      tab.setObserver(observer);
    });
  }

  /**
   * Close a given tab.
   * @param tab Tab to close.
   * @param event Mouse event to avoid to refresh the page.
   */
  close(tab: Tab, event: MouseEvent): void {
    if (!_.isEmpty(event)) {
      // Prevent logout
      event.preventDefault();
    }
    // Get the tab index
    const index = _.indexOf(this.tabs, tab);
    // Check if the tab is active
    const isActive = this.stringUtil.isEqual(this.tabsetComponent.activeId, tab.id);
    // Close the tab
    this.tabs.splice(index, 1);
    // Select previous (left) tab
    if (isActive && index > 0) {
      this.tabsetComponent.select(this.tabs[index - 1].id);
    }
  }

  /**
   * Close all tab but the given one
   * @param tab Tab to keep.
   * @param event Mouse event to avoid to refresh the page.
   */
  closeOthers(tab: Tab, event: MouseEvent): void {
    if (!_.isEmpty(event)) {
      // Prevent logout
      event.preventDefault();
    }
    this.tabs = this.tabs.filter((item) => {
      return this.stringUtil.isEqual(item.id, tab.id);
    });
  }

  /**
   * Close all the tabs to the right of the given one.
   * @param tab Tab
   * @param event Mouse event to avoid to refresh the page.
   */
  closeAllToRight(tab: Tab, event: MouseEvent): void {
    if (!_.isEmpty(event)) {
      // Prevent logout
      event.preventDefault();
    }
    // Get the tab index
    const index = _.indexOf(this.tabs, tab);
    // If it isnt the last tab
    if (index < this.getCount() - 1) {
      // get the total of tab to the right
      const total = this.getCount() - (index + 1);
      // Close the tabs
      this.tabs.splice(index + 1, total);
    }
  }

  /**
   * Pin/Unpin a given tab
   * @param tab Tab to pin/unpin
   * @param value true to pin the tab
   * @param event Mouse event to avoid to refresh the page.
   */
  pin(tab: Tab, value: boolean, event: MouseEvent): void {
    if (!_.isEmpty(event)) {
      // Prevent logout
      event.preventDefault();
    }
    tab.isPinned = value;
    this.tabs = _.sortBy(this.tabs, (item) => !item.isPinned);
  }

  /**
   * Move a tab to the left/right
   * @param tab Tab to be moved.
   * @param direction 1 or -1 to move to left or right.
   * @param event Mouse event to avoid to refresh the page.
   */
  move(tab: Tab, direction: number, event: MouseEvent): void {
    if (!_.isEmpty(event)) {
      // Prevent logout
      event.preventDefault();
    }
    // Get the tab index
    const index = _.indexOf(this.tabs, tab);
    // Check if the tab can be moved
    if (index + direction >= 0 && index + direction < this.getCount()) {
      [this.tabs[index], this.tabs[index + direction]] = [this.tabs[index + direction], this.tabs[index]];
    }
    // Let the pinned tabs at the begining
    this.tabs = _.sortBy(this.tabs, (item) => !item.isPinned);
  }

  /**
   * Close all tabs. Reset array.
   */
  reset(): void {
    this.tabs = [];
  }

  /**
   * Returns a tab given its ID.
   * @param tabId Unique identifier
   */
  getTab(tabId: string): Tab | null {
    const tab = _.findWhere(this.tabs, { id: tabId });
    return tab || null;
  }

  /**
   * Get the quantity of tabs.
   */
  getCount() {
    return this.tabs.length;
  }

  /**
   * First tab.
   */
  getFirstTab() {
    return _.first(this.tabs) || null;
  }

  /**
   * Last tab.
   */
  getLastTab() {
    return _.last(this.tabs) || null;
  }
}
