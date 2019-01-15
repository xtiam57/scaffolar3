import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appComposeModalCounter]'
})
export class ComposeModalCounterDirective implements AfterViewInit {
  observer: MutationObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const qty = this.el.nativeElement.parentElement.childElementCount - 1 - 3;
        this.el.nativeElement.innerText = qty;
        this.el.nativeElement.hidden = qty < 1;
        this.el.nativeElement.title = `Hiding ${qty} modal${qty > 1 ? 's' : ''}`;
      });
    });

    this.observer.observe(this.el.nativeElement.parentElement, {
      attributes: true,
      childList: true,
      characterData: true
    });
  }
}
