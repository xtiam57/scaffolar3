import { Injectable } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { PromptComponent } from './prompt.component';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private _defaultOptions: any = {
    centered: true,
    container: null,
    size: '',
    keyboard: true,
    backdrop: 'static',
    backdropClass: '',
    windowClass: '',
    confirmButtonText: 'Ok',
    cancelButtonText: 'Cancel',
    inputs: [],
    selects: []
  };

  constructor(private modalService: NgbModal) {}

  open(title: string = 'Prompt', text: string = '', options: any = {}): NgbModalRef {
    // Merge with default values
    const opts = _.defaults({}, options, _.clone(this._defaultOptions));

    const promptRef = this.modalService.open(PromptComponent, {
      backdrop: opts.backdrop,
      backdropClass: opts.backdropClass,
      centered: opts.centered,
      container: opts.container,
      keyboard: opts.keyboard,
      size: opts.size,
      windowClass: opts.windowClass
    });
    // Set attributes
    (<PromptComponent>promptRef.componentInstance).title = title;
    (<PromptComponent>promptRef.componentInstance).text = text;
    (<PromptComponent>promptRef.componentInstance).options = {
      confirmButtonText: opts.confirmButtonText,
      cancelButtonText: opts.cancelButtonText,
      inputs: opts.inputs,
      selects: opts.selects
    };

    return promptRef;
  }
}
