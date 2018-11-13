import { Pipe, PipeTransform } from '@angular/core';
import { Ratio } from 'lb-ratio';

@Pipe({
  name: 'fraction'
})
export class FractionPipe implements PipeTransform {
  transform(value: any): string {
    return Ratio.parse(value)
      .simplify()
      .toQuantityOf(2, 3, 4, 5, 8, 16, 32, 40)
      .toLocaleString();
  }
}
