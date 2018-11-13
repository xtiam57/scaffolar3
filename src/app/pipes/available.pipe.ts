import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'available'
})
export class AvailablePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    args = args || args === '' ? args : 'N/A';
    if (_.isString(value)) {
      value = value.trim();
    }
    return _.isNull(value) || value === '' || _.isUndefined(value) || _.isNaN(value) || value === 'NaN' ? args : value;
  }
}
