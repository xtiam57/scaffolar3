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
   * To get the difference in another unit of measurement, pass that measurement as the second argument
   * @param date1 Usually the largest date
   * @param date2 Usally the smallest date
   * @param period Unit of measurement: days, hours, minutes, seconds, weeks, months, years
   */
  getDuration(date1: any, date2: any, period: any = 'days'): number {
    return Math.round(moment(date1).diff(moment(date2), period, true) * 100000) / 100000;
  }

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

  /**
   * Convert all strings with date or time format to javascript dates
   * @param input Object or array to process
   * @param minDate In case the process find an hour HH:mm:ss without date
   */
  stringToDate(input: any, minDate: string = '1971-01-01') {
    // http://jsfiddle.net/kQZw8/157/
    const regexIso8601 = /^\d{4}-\d{1,2}-\d{1,2}(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?$/i,
      regexTime = /^([\d]{1,2}):([\d]{1,2}):([\d]{1,2})(\.\d*)?$/i;

    // Ignore things that aren't objects.
    if (typeof input !== 'object') {
      return input;
    }

    for (const key in input) {
      if (!input.hasOwnProperty(key)) {
        continue;
      }

      let value = input[key],
        match;

      // Process "HH:mm.ss"
      if (typeof value === 'string' && value.match(regexTime)) {
        // Append current date
        // const date = new Date();
        // const year = date.getFullYear();
        // let month: number|string = date.getMonth() + 1;
        // let day: number|string = date.getDate();
        // // Padding
        // month = (month < 10 ? '0' : '') + month;
        // day = (day < 10 ? '0' : '') + day;
        // input[key] = value = `${year}-${month}-${day}T${value}Z`;
        input[key] = value = `${minDate}T${value}Z`;
      }

      // Check for string properties which look like dates.
      // TODO: Improve this regex to better match ISO 8601 date strings.
      if (typeof value === 'string' && (match = value.match(regexIso8601))) {
        // match[1] = "THH:mm:ssZ" or null if the date is "2017-12-25"
        // We need to append the current time THH:mm:ssZ
        match[1] = !match[1] ? new Date().toJSON().substr(10) : '';
        // Get date string
        const dateStr = match[0] + match[1];
        // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
        const milliseconds = Date.parse(dateStr);
        if (!isNaN(milliseconds)) {
          const year = parseInt(dateStr.substr(0, 4), 10);
          const month = parseInt(dateStr.substr(5, 2), 10) - 1;
          const day = parseInt(dateStr.substr(8, 2), 10);
          const hours = parseInt(dateStr.substr(11, 2), 10);
          const minutes = parseInt(dateStr.substr(14, 2), 10);
          const seconds = parseInt(dateStr.substr(17, 2), 10);
          input[key] = new Date(year, month, day, hours, minutes, seconds);
        }
      } else if (typeof value === 'object') {
        // Recurse into object
        this.stringToDate(value);
      }
    }
  }
}
