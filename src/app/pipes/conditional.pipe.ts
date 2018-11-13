import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conditional'
})
export class ConditionalPipe implements PipeTransform {
  transform(value: any, positive: any, negative: any, compareTo: any = true): any {
    const t = positive || 'Yes',
      f = negative || 'No';

    return value === compareTo ? t : f;
  }
}
