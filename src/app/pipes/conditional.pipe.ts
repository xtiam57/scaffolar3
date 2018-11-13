import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conditional'
})
export class ConditionalPipe implements PipeTransform {
  transform(value: any, positive: any = 'Yes', negative: any = 'No', compareTo: any = true): any {
    return value === compareTo ? positive : negative;
  }
}
