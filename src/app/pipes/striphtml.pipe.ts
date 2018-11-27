import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striphtml'
})
export class StriphtmlPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/<.*?>/g, '');
  }
}
