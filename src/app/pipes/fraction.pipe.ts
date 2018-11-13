import { Pipe, PipeTransform } from '@angular/core';
import { Ratio } from 'lb-ratio';
import * as _ from 'underscore';

@Pipe({
  name: 'fraction'
})
export class FractionPipe implements PipeTransform {
  transform(value: any): string {
    if (
      _.isNull(value) ||
      value === '' ||
      _.isUndefined(value) ||
      _.isNaN(value) ||
      value === 'NaN' ||
      _.isBoolean(value) ||
      _.isString(value)
    ) {
      return '0';
    }
    return Ratio.parse(value)
      .simplify()
      .toQuantityOf(2, 3, 4, 5, 8, 16, 32, 40)
      .toLocaleString();
  }
}
