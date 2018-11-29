import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  Directive,
  TemplateRef,
  AfterContentChecked,
  Output,
  EventEmitter,
  Injectable,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ElementRef
} from '@angular/core';

let nextId = 0;

@Injectable({ providedIn: 'root' })
export class AppTabsetConfig {
  justify: 'start' | 'center' | 'end' | 'fill' | 'justified' = 'start';
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  type: 'tabs' | 'pills' = 'tabs';
}

/**
 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
 */
@Directive({
  selector: 'ng-template[appTabTitle]'
})
export class AppTabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * This directive must be used to wrap content to be displayed in a tab.
 */
@Directive({
  selector: 'ng-template[appTabContent]'
})
export class AppTabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * A directive representing an individual tab.
 */
@Directive({
  selector: '[appTab]'
})
export class AppTabDirective implements AfterContentChecked {
  /**
   * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
   */
  @Input() id = `tabset-${nextId++}`;
  /**
   * Simple (string only) title. Use the "NgbTabTitle" directive for more complex use-cases.
   */
  @Input() title: string;
  /**
   * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
   */
  @Input() disabled = false;

  titleTpl: AppTabTitleDirective | null;
  contentTpl: AppTabContentDirective | null;

  @ContentChildren(AppTabTitleDirective, { descendants: false }) titleTpls: QueryList<AppTabTitleDirective>;
  @ContentChildren(AppTabContentDirective, { descendants: false }) contentTpls: QueryList<AppTabContentDirective>;

  ngAfterContentChecked() {
    // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
    // only @ContentChildren allows us to specify the {descendants: false} option.
    // Without {descendants: false} we are hitting bugs described in:
    // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
    this.titleTpl = this.titleTpls.first;
    this.contentTpl = this.contentTpls.first;
  }
}

/**
 * The payload of the change event fired right before the tab change
 */
export interface AppTabChangeEvent {
  /**
   * Id of the currently active tab
   */
  activeId: string;

  /**
   * Id of the newly selected tab
   */
  nextId: string;

  /**
   * Function that will prevent tab switch if called
   */
  preventDefault: () => void;
}

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'app-tabset',
  template: `
    <ul #ulElement [class]="'nav nav-' + type + (orientation == 'horizontal' ? ' ' + justifyClass : ' flex-column')" role="tablist">
      <li class="nav-item" *ngFor="let tab of tabs">
        <a
          [id]="tab.id"
          class="nav-link"
          [class.active]="tab.id === activeId"
          [class.disabled]="tab.disabled"
          href
          (click)="select(tab.id); $event.preventDefault()"
          role="tab"
          [attr.tabindex]="tab.disabled ? '-1' : undefined"
          [attr.aria-controls]="!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null"
          [attr.aria-expanded]="tab.id === activeId"
          [attr.aria-disabled]="tab.disabled"
        >
          {{ tab.title }}<ng-template [ngTemplateOutlet]="tab.titleTpl?.templateRef"></ng-template>
        </a>
      </li>
      <li #leftScrollButton class="nav-item nav-item-left-arrow">
        <a (click)="scroll(-1)" class="nav-link" [class.disabled]="leftScrollDisabled">
          <fa-icon [icon]="['fas', 'chevron-left']" [fixedWidth]="false"></fa-icon>
        </a>
      </li>
      <li #rightScrollButton class="nav-item nav-item-right-arrow">
        <a (click)="scroll(1)" class="nav-link" [class.disabled]="rightScrollDisabled">
          <fa-icon [icon]="['fas', 'chevron-right']" [fixedWidth]="false"></fa-icon>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <div
        #tabPanes
        *ngFor="let tab of tabs"
        [hidden]="destroyOnHide && tab.id !== activeId"
        class="tab-pane {{tab.id === activeId ? 'active' : null}}"
        role="tabpanel"
        [attr.aria-labelledby]="tab.id"
        id="{{tab.id}}-panel"
        [attr.aria-expanded]="tab.id === activeId"
      >
        <ng-template [ngTemplateOutlet]="tab.contentTpl?.templateRef"></ng-template>
      </div>
    </div>
  `
})
export class AppTabsetComponent implements AfterContentChecked {
  justifyClass: string;

  // To disable scroll buttons
  leftScrollDisabled = true;
  rightScrollDisabled = false;

  @ContentChildren(AppTabDirective) tabs: QueryList<AppTabDirective>;

  // Elements for scrollable functionalities
  @ViewChild('ulElement') private ulElementRef: ElementRef;
  @ViewChildren('tabPanes') private tabPanesRef: QueryList<ElementRef>;
  @ViewChild('rightScrollButton') private rightScrollButtonRef: ElementRef;
  @ViewChild('leftScrollButton') private leftScrollButtonRef: ElementRef;

  /**
   * An identifier of an initially selected (active) tab. Use the "select" method to switch a tab programmatically.
   */
  @Input() activeId: string;

  /**
   * Whether the closed tabs should be hidden without destroying them
   */
  @Input() destroyOnHide = true;

  /**
   * The horizontal alignment of the nav with flexbox utilities. Can be one of 'start', 'center', 'end', 'fill' or
   * 'justified'
   * The default value is 'start'.
   */
  @Input()
  set justify(className: 'start' | 'center' | 'end' | 'fill' | 'justified') {
    if (className === 'fill' || className === 'justified') {
      this.justifyClass = `nav-${className}`;
    } else {
      this.justifyClass = `justify-content-${className}`;
    }
  }

  /**
   * The orientation of the nav (horizontal or vertical).
   * The default value is 'horizontal'.
   */
  @Input() orientation: 'horizontal' | 'vertical';

  /**
   * Type of navigation to be used for tabs. Can be one of Bootstrap defined types ('tabs' or 'pills').
   * Since 3.0.0 can also be an arbitrary string (for custom themes).
   */
  @Input() type: 'tabs' | 'pills' | string;

  /**
   * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
   */
  @Output() tabChange = new EventEmitter<AppTabChangeEvent>();

  constructor(config: AppTabsetConfig) {
    this.type = config.type;
    this.justify = config.justify;
    this.orientation = config.orientation;
  }

  /**
   * Selects the tab with the given id and shows its associated pane.
   * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
   */
  select(tabId: string) {
    const selectedTab = this._getTabById(tabId);
    if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
      let defaultPrevented = false;

      this.tabChange.emit({
        activeId: this.activeId,
        nextId: selectedTab.id,
        preventDefault: () => {
          defaultPrevented = true;
        }
      });

      if (!defaultPrevented) {
        this.activeId = selectedTab.id;
      }

      // Scroll to focus
      const ul = this.ulElementRef.nativeElement;
      const children = ul.children;
      for (let i = 0; i < children.length; i++) {
        const anchorRef = children.item(i).children.item(0);

        if (selectedTab.id === anchorRef.id) {
          setTimeout(() => {
            const tabWidth = children.item(i).offsetWidth;
            const tabLeftPosition = children.item(i).offsetLeft;
            const tabRightPosition = tabLeftPosition + tabWidth;
            const scrollPosition = ul.scrollLeft;
            const maxScroll = ul.scrollWidth - ul.offsetWidth;
            const visibleAreaWidth = ul.offsetWidth;
            const visibleLeftArea = ul.offsetLeft;
            const visibleRightArea = visibleLeftArea + visibleAreaWidth;

            let offset = 0;

            if (tabRightPosition - scrollPosition > visibleRightArea) {
              // TODO: check this offset when click
              offset = tabRightPosition - visibleRightArea;
              this.scroll(1, offset, 10);
            } else if (tabLeftPosition - scrollPosition < visibleLeftArea) {
              offset = scrollPosition - tabLeftPosition + visibleLeftArea;
              this.scroll(-1, offset, 10);
            }
          });
          return;
        }
      }
    }
  }

  /**
   * Horizontal scroll
   * @param sign negative go left, positive right
   * @param amountPixels Quantity of movement
   * @param step Increment in step
   */
  scroll(sign: number = 1, amountPixels: number = 440, step: number = 4) {
    let lastPosition = -1;
    const ul = this.ulElementRef.nativeElement;

    const interval = setInterval(() => {
      lastPosition = ul.scrollLeft;
      ul.scrollLeft += step * sign;
      amountPixels -= step;

      if (amountPixels <= 0 || lastPosition === ul.scrollLeft) {
        clearInterval(interval);
      }
    });
  }

  ngAfterContentChecked() {
    // auto-correct activeId that might have been set incorrectly as input
    const activeTab = this._getTabById(this.activeId);
    this.activeId = activeTab ? activeTab.id : this.tabs.length ? this.tabs.first.id : null;

    // Insert scrollable class
    if (this.ulElementRef && this.tabPanesRef) {
      const ul = this.ulElementRef.nativeElement;
      const ulWidth = ul.offsetWidth;
      const children = ul.children;
      const leftScrollButton = this.leftScrollButtonRef.nativeElement;
      const rightScrollButton = this.rightScrollButtonRef.nativeElement;
      let liWidths = 0;

      leftScrollButton.classList.remove('d-none');
      leftScrollButton.classList.remove('d-inline-block');
      rightScrollButton.classList.remove('d-none');
      rightScrollButton.classList.remove('d-inline-block');

      for (let i = 0; i < children.length; i++) {
        liWidths += children.item(i).offsetWidth;
      }
      // Remove scrollable buttons widths
      liWidths -= leftScrollButton.offsetWidth + rightScrollButton.offsetWidth;
      // Check if the width of all tabs is greater than the ul width
      if (liWidths >= ulWidth) {
        ul.classList.add('scrollable');
        leftScrollButton.classList.add('d-inline-block');
        rightScrollButton.classList.add('d-inline-block');
      } else {
        ul.classList.remove('scrollable');
        leftScrollButton.classList.add('d-none');
        rightScrollButton.classList.add('d-none');
      }

      this._updateScrollButtons();

      // Add scrollable class in tabpanes
      this.tabPanesRef.toArray().forEach((element) => {
        if (liWidths >= ulWidth) {
          element.nativeElement.classList.add('scrollable');
        } else {
          element.nativeElement.classList.remove('scrollable');
        }
      });
    }
  }

  private _getTabById(id: string): AppTabDirective {
    const tabsWithId: AppTabDirective[] = this.tabs.filter((tab) => tab.id === id);
    return tabsWithId.length ? tabsWithId[0] : null;
  }

  private _updateScrollButtons() {
    const ul = this.ulElementRef.nativeElement;
    const maxScroll = ul.scrollWidth - ul.offsetWidth;

    this.leftScrollDisabled = ul.scrollLeft <= 0;
    this.rightScrollDisabled = ul.scrollLeft >= maxScroll;
  }
}

export const TABSET_DIRECTIVES = [AppTabsetComponent, AppTabDirective, AppTabContentDirective, AppTabTitleDirective];
