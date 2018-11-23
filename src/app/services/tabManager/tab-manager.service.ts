import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, QueryList, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs/internal/Subscriber';
import * as _ from 'underscore';
import { StringUtilService } from '../string-util.service';
import { AppTabsetComponent } from './tabset';

class TabInstance {
  /**
   * Unique tab id.
   */
  id: string;

  /**
   * Component factory.
   */
  factory: ComponentFactory<any> | null;

  /**
   * Component instance. With this the user can set @Input information of the component.
   */
  componentInstance: ComponentRef<any> | null | any;

  /**
   * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
   */
  disabled = false;

  /**
   * Subscriber to call once the has been rendered
   */
  private observer: Subscriber<TabInstance> | null;

  /**
   * Creates a new tab.
   * @param title Title of the tab. Can contain HTML text.
   * @param component Component to load and add to the tab.
   * @param data Extra data to pass to the Component or tab.
   * @param id Unique ID for the tab.
   */
  constructor(public title: string, public component: any, public data: any, id?: string) {
    this.id = id || new StringUtilService().getGUID(true);
  }

  /**
   * Call subscribers once the tab has been rendered
   */
  callSubscribers(): void {
    if (this.observer) {
      this.observer.next(this);
    }
  }

  /**
   * Set the subscriber
   * @param observer Subscriber to call once the has been rendered
   */
  setObserver(observer: Subscriber<TabInstance> | null): void {
    this.observer = observer;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TabManagerService {
  /**
   * List of tabs.
   */
  tabs: Array<TabInstance> = [];

  /**
   * List of tab view references.
   */
  private targets: QueryList<ViewContainerRef>;

  /**
   * Tabset view reference. Used to call .select()
   */
  private tabsetComponent: AppTabsetComponent;

  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Finds the view reference for the given tab id.
   * @param tabId Unique tab id.
   */
  private _findViewRef(tabId: string): ViewContainerRef | null {
    // Find the right ViewContainerRef given its ID
    const target = _.filter(this.targets.toArray(), (item) => {
      return item.element.nativeElement.id === tabId;
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
        tab.callSubscribers();
        // Set active tab
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
   * Creates and open a new tab.
   * @param title Title of the tab. Can contain HTML text.
   * @param component Component to load and add to the tab.
   * @param data Extra data to pass to the Component or tab.
   * @param id Unique ID for the tab.
   */
  open(title: string, component: any, data: any = {}, id?: string): Observable<TabInstance> {
    // TODO: do not add the same tab
    const tab = new TabInstance(title, component, data, id);
    // Set component factory
    tab.factory = this.resolver.resolveComponentFactory(component);
    this.tabs.push(tab);

    return new Observable<TabInstance>((observer) => {
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
  close(tab: TabInstance, event: MouseEvent): void {
    if (!_.isEmpty(event)) {
      // Prevent logout
      event.preventDefault();
    }
    // Get the tab index
    const index = _.indexOf(this.tabs, tab);
    // Check if the tab is active
    const isActive = this.tabsetComponent.activeId === tab.id;
    // Close the tab
    this.tabs.splice(index, 1);
    // Select previous tab
    if (isActive && index > 0) {
      this.tabsetComponent.select(this.tabs[index - 1].id);
    }
  }

  /**
   * Close all tabs. Reset array.
   */
  reset() {
    this.tabs = [];
  }

  /**
   * Returns a tab given its ID.
   * @param tabId Unique identifier
   */
  getTab(tabId: string): TabInstance | null {
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
