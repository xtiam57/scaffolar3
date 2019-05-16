import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayFieldName',
  pure: false
})
export class DisplayFieldNamePipe implements PipeTransform {
  transform(item: any, displayValue: string): any {
    if (item == null || item === undefined || displayValue === '' || displayValue === null || displayValue === undefined) {
      return null;
    }
    return item[displayValue];
  }
}

@Pipe({
  name: 'displayName',
  pure: false
})
export class DisplayNamePipe implements PipeTransform {
  transform(item: any, displayValue: string): any {
    if (item == null || item === undefined || displayValue === '' || displayValue == null || displayValue === undefined) {
      return null;
    }
    return item[displayValue];
  }
}
