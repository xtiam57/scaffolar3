import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {
  constructor(private datePipe: DatePipe) {}

  /**
   *
   * @param date Destination date
   * @param duration Amount to be added (negative values are allowed)
   * @param period Unit of measurement: days, hours, minutes, seconds, weeks, months, years
   */
  addDuration(date: any, duration: number = 0, period: any = 'days'): any {
    return moment(date)
      .add(duration, period)
      .toDate();
  }

  /**
   * Check if a date is the same as another date
   * @param date1 First date
   * @param date2 Second date
   */
  isSame(date1: any, date2: any): boolean {
    date1 = moment(this.datePipe.transform(date1, 'yyyy-MM-dd'));
    date2 = moment(this.datePipe.transform(date2, 'yyyy-MM-dd'));
    return date1.isSame(date2);
  }

  /**
   * Check if a date is after another date
   * @param date1 First date
   * @param date2 Second date
   * @param includeLimits Include the limits to be compared (default: false)
   */
  isAfter(date1: any, date2: any, includeLimits: boolean = false): boolean {
    date1 = moment(this.datePipe.transform(date1, 'yyyy-MM-dd'));
    date2 = moment(this.datePipe.transform(date2, 'yyyy-MM-dd'));
    if (includeLimits) {
      return date1.isAfter(date2) || date1.isSame(date2);
    }
    return date1.isAfter(date2);
  }

  /**
   * Check if a date is before another date
   * @param date1 First date
   * @param date2 Second date
   * @param includeLimits Include the limits to be compared (default: false)
   */
  isBefore(date1: any, date2: any, includeLimits: boolean = false): boolean {
    date1 = moment(this.datePipe.transform(date1, 'yyyy-MM-dd'));
    date2 = moment(this.datePipe.transform(date2, 'yyyy-MM-dd'));
    if (includeLimits) {
      return date1.isBefore(date2) || date1.isSame(date2);
    }
    return date1.isBefore(date2);
  }

  /**
   * Check if a date is between another two dates
   * @param date1 First date
   * @param min Min date
   * @param max Max date
   * @param includeLimits Include the limits to be compared (default: false)
   */
  isBetween(date1: any, min: any, max: any, includeLimits: boolean = false): boolean {
    return this.isAfter(date1, min, includeLimits) && this.isBefore(date1, max, includeLimits);
  }

  /**
   * Formats a date
   * @param date Date to be formated
   * @param format Format
   */
  format(date: any, format: string = 'yyyy-MM-dd'): any {
    if (_.isDate(date)) {
      return this.datePipe.transform(date, format);
    } else {
      return date;
    }
  }

  // http://jsfiddle.net/kQZw8/157/
  // convertDateStringsToDates(input) {
  //   // Ignore things that aren't objects.
  //   if (typeof input !== 'object') {
  //     return input;
  //   }
  //   for (const key in input) {
  //     if (!input.hasOwnProperty(key)) {
  //       continue;
  //     }
  //     const value = input[key];
  //     let match;
  //     // Check for string properties which look like dates.
  //     // TODO: Improve this regex to better match ISO 8601 date strings.
  //     if (typeof value === 'string' && (match = value.match(/^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i))) {
  //       // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
  //       const milliseconds = Date.parse(match[0]);
  //       if (!isNaN(milliseconds)) {
  //         input[key] = new Date(milliseconds);
  //       }
  //     } else if (typeof value === 'object') {
  //       // Recurse into object
  //       this.convertDateStringsToDates(value);
  //     }
  //   }
  // }
}
