import { Directive, ElementRef, AfterViewInit, Renderer } from '@angular/core';
import * as _ from 'underscore';

@Directive({
  selector: '[appModalCollapsible]'
})
export class ModalCollapsibleDirective implements AfterViewInit {
  observer: MutationObserver;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngAfterViewInit() {
    const container = this.el.nativeElement;

    this.observer = new MutationObserver((mutations) => {
      const modals = _.filter(container.childNodes, (item: any) => _.contains(item.classList, 'compose-modal'));

      modals.forEach((modal: any) => {
        const title = modal.getElementsByClassName('modal-title')[0];
        const body = modal.getElementsByClassName('modal-body')[0];
        const footer = modal.getElementsByClassName('modal-footer')[0];

        if (!_.contains(title.classList, 'click-event-added')) {
          this.renderer.listen(title, 'click', () => {
            if (!_.contains(body.classList, 'show')) {
              title.classList.remove('modal-collapsed');
              body.classList.add('show');
              footer.classList.add('show');
            } else {
              title.classList.add('modal-collapsed');
              body.classList.remove('show');
              footer.classList.remove('show');
            }
          });
          title.classList.add('click-event-added');
          title.classList.add('pointer');
          title.classList.add('mr-3');
          title.classList.add('pointer');
          body.classList.add('show');
          body.classList.add('collapse');
          footer.classList.add('show');
          footer.classList.add('collapse');
        }
      });
    });

    this.observer.observe(container, {
      attributes: true,
      subtree: false,
      childList: true,
      characterData: true
    });
  }
}
