import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'available'
})
export class AvailablePipe implements PipeTransform {
  transform(value: any, result: any = 'N/A'): any {
    if (_.isString(value)) {
      value = value.trim();
    }
    if (_.isNumber(value)) {
      return value;
    }
    return _.isNull(value) || value === '' || _.isUndefined(value) || _.isNaN(value) || value === 'NaN' ? result : value;
  }
}
