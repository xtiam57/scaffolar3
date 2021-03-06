import { ComponentFactory, ComponentRef } from '@angular/core';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { StringUtilService } from '../string-util.service';

export class Tab {
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
  private observer: Subscriber<Tab> | null;
  /**
   * If the tab is pinned.
   */
  isPinned = false;

  /**
   * Creates a new tab.
   * @param title Title of the tab. Can contain HTML text.
   * @param component Component to load and add to the tab.
   * @param params Extra data to pass to the Component or tab.
   * @param icon FontAwesome icon.
   * @param color Color of the tab ('blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow',
   * 'green', 'teal', 'cyan').
   * @param id Unique ID for the tab.
   */
  constructor(public title: string, public component: any, public params?: any, public icon?: string[], public color?: string, id?: string) {
    this.id = id || `T${new StringUtilService().getGUID(true)}`;
  }

  /**
   * Call subscribers once the tab has been rendered
   */
  notifySubscribers(): void {
    if (this.observer) {
      this.observer.next(this);
    }
  }

  /**
   * Set the subscriber
   * @param observer Subscriber to call once the tab has been rendered
   */
  setObserver(observer: Subscriber<Tab> | null): void {
    this.observer = observer;
  }
}
