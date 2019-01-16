// import { Directive, ElementRef, AfterViewInit } from '@angular/core';
// import * as _ from 'underscore';

// @Directive({
//   selector: '[appComposeModalCounter]'
// })
// export class ComposeModalCounterDirective implements AfterViewInit {
//   observer: MutationObserver;

//   constructor(private el: ElementRef) {}

//   ngAfterViewInit() {
//     const counter = this.el.nativeElement;
//     const container = counter.parentElement;

//     this.observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (
//           (mutation.type === 'attributes' && _.contains(mutation.target.classList, 'modal-body') && mutation.attributeName === 'class') ||
//           (mutation.type === 'childList' && mutation.target.id === 'compose-container')
//         ) {
//           // console.log(mutation);

//           // const OFFSET = 50 /* Left margin */;
//           // const containerWidth = container.offsetWidth - OFFSET;
//           // let totalWidth = 0;
//           // let hiding = 0;
//           // const modals = _.filter(container.childNodes, (item: any) => _.contains(item.classList, 'compose-modal'));

//           // modals
//           //   .slice()
//           //   .reverse()
//           //   .forEach((modal: any, index: number) => {
//           //     const width = modal.offsetWidth;

//           //     if (totalWidth + width <= containerWidth) {
//           //       // totalWidth += width;
//           //       // modal.hidden = false;
//           //     } else {
//           //       const modalBody = modal.getElementsByClassName('modal-body')[0];
//           //       // Not showing and is not collapsed
//           //       if (_.contains(modalBody.classList, 'show')) {
//           //         // Click in the title to collapse
//           //         modal.getElementsByClassName('modal-title')[0].click();
//           //       }
//           //       // modal.hidden = true;
//           //       hiding++;
//           //     }
//           //   });

//           // counter.innerText = hiding;
//           // counter.hidden = hiding === 0;

//           // console.log(hiding);
//         }

//         // if (mutation.attributeName === 'ng-reflect-collapsed' || mutation.type === 'childList') {
//         //   const OFFSET = 50 /* Left margin */;
//         //   const containerWidth = container.offsetWidth - OFFSET;
//         //   let totalWidth = 0;
//         //   let hiding = 0;
//         //   const modals = _.filter(container.childNodes, (item: any) => _.contains(item.classList, 'compose-modal'));

//         //   modals
//         //     .slice()
//         //     .reverse()
//         //     .forEach((modal: any, index: number) => {
//         //       const width = modal.offsetWidth;

//         //       if (totalWidth + width <= containerWidth) {
//         //         totalWidth += width;
//         //         modal.hidden = false;
//         //       } else {
//         //         const modalBody = modal.getElementsByClassName('modal-body')[0];
//         //         // Not showing and is not collapsed
//         //         if (_.contains(modalBody.classList, 'show')) {
//         //           // Click in the title to collapse
//         //           modal.getElementsByClassName('modal-title')[0].click();
//         //         }
//         //         modal.hidden = true;
//         //         hiding++;
//         //       }
//         //     });

//         //   counter.innerText = hiding;
//         //   counter.hidden = hiding === 0;
//         // }

//         // const qty = container.childElementCount - 1 - 3;

//         // counter.innerText = qty;
//         // counter.hidden = qty < 1;
//         // counter.title = `Hiding ${qty} modal${qty > 1 ? 's' : ''}`;

//         // if (qty > 0) {
//         //   const modals = _.filter(container.childNodes, (item: any) => _.contains(item.classList, 'compose-modal'));

//         //   modals.forEach((item: any, index: number) => {
//         //     const modalBody = item.getElementsByClassName('modal-body')[0];
//         //     // Not showing and is not collapsed
//         //     if (index <= qty - 1 && _.contains(modalBody.classList, 'show')) {
//         //       // Click in the title to collapse
//         //       item.getElementsByClassName('modal-title')[0].click();
//         //     }
//         //   });
//         // }
//       });
//     });

//     this.observer.observe(container, {
//       attributes: true,
//       subtree: true,
//       childList: true
//       // characterData: true
//     });
//   }
// }
