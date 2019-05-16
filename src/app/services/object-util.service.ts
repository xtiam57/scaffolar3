import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ObjectUtilService {
  constructor() { }

  private baseExtend(destination: any, source: any[], deep = true) {
    for (let i = 0, ii = source.length; i < ii; ++i) {
      const obj = source[i];
      if (!_.isObject(obj) && !_.isFunction(obj)) {
        continue;
      }
      const keys = Object.keys(obj);
      for (let j = 0, jj = keys.length; j < jj; j++) {
        const key = keys[j];
        const src = obj[key];

        if (deep && _.isObject(src)) {
          if (_.isDate(src)) {
            destination[key] = new Date(src.valueOf());
          } else if (_.isRegExp(src)) {
            destination[key] = new RegExp(src);
          } else {
            if (!_.isObject(destination[key])) {
              destination[key] = _.isArray(src) ? [] : {};
            }
            this.baseExtend(destination[key], [src], true);
          }
        } else {
          destination[key] = src;
        }
      }
    }
    return destination;
  }

  /**
   * Merges destination and source in one final object
   * @param destination Object
   * @param source Object
   */
  merge(destination: any, source: any): any {
    return this.baseExtend(destination, [source], true);
  }
}
