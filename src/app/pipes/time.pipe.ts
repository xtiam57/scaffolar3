import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'time'
})
export class TimetPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (_.isString(value)) {
      const arr = value.split(':');
      return arr.length > 2 ? `${arr[0]}:${arr[1]}` : value;
    }
    return value;
  }

}
