import { Injectable } from '@angular/core';
import { File } from './file';
import { RESTfulService } from '../restful.service';
import * as _ from 'underscore';
import { map } from 'rxjs/operators';
import { ListParams } from 'src/app/base/list-params';
import { Observable } from 'rxjs';
import { Expand } from 'src/app/base/expand';
import { MessagesService } from '../messages.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  constructor(private restful: RESTfulService, private messages: MessagesService) { }

  upload(payload: any, id: string) {
    return this.restful.post(`attachments/${id}`, payload)
      .pipe(map(() => this.messages.create('attachment')));
  }

  list(id: string) {
    const files = [];
    return this.restful.get(`attachments/${id}`)
      .pipe(map((response) => {
        _.each(response.data, (file) => {
          const aux = new File(file);
          files.push(aux);
        });

        response.data = _.sortBy(files, (value) => value.createdAt).reverse();

        return response;
      }));
  }

  listTags(params: ListParams): Observable<any> {
    return this.restful.get(`attachments/tags/${params.keyword}`)
      .pipe(map((response: any) => response.data));
  }

  getCounter(id: string): Observable<any> {
    return this.restful.get(`attachments/${id}/count`);
  }

  update(id: string, payload: any, inPlace = false) {
    return this.restful.put(`attachments/${id}`, payload, { inPlace })
      .pipe(map(() => this.messages.update('attachment')));
  }
}
