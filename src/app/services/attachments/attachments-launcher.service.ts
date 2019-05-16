import { Injectable } from '@angular/core';
import { AttachmentsComponent } from './attachments.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsLauncherService {

  constructor(private modalService: NgbModal) { }

  open(id: string) {
    const modal = this.modalService.open(AttachmentsComponent, {
      backdrop: false,
      windowClass: 'full-modal just-header',
      keyboard: false
    });

    modal.componentInstance.id = id;

    return modal.result;
  }
}
