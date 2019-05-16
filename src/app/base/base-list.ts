import * as _ from 'underscore';
import { ListParams } from './list-params';

export class BaseList {
  items: any;
  params: ListParams;

  constructor({ items = [], size = 50, skip = 0, sort = [] }) {
    this.items = items;
    this.params = new ListParams({ size, skip, sort });
  }

  set(response: any): void {
    this.items['data'] = response.content;
    this.items['total'] = response.totalElements;
  }
}
