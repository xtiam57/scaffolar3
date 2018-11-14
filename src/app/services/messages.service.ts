import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private toastr: ToastrService) {}

  show(text: string = 'Something wrong just happened.', title: string | null = null, fn: string = 'success') {
    this.toastr[fn](text, title);
  }

  create(entity: string = 'element', title: string | null = null) {
    this.show(`The <b>"${entity}"</b> was created successfully.`, title);
  }

  update(entity: string = 'element', title: string | null = null) {
    this.show(`The <b>"${entity}"</b> was updated successfully.`, title);
  }

  delete(entity: string = 'element', title: string | null = null) {
    this.show(`The <b>"${entity}"</b> was deleted successfully.`, title);
  }
}
