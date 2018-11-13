import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class TimeUtilService {
  constructor(private datePipe: DatePipe) {}

  /**
   * To get the difference in another unit of measurement, pass that measurement as the second argument
   * @param date1 Usually the largest date
   * @param date2 Usally the smallest date
   * @param period Unit of measurement: days, hours, minutes, seconds, weeks, months, years
   */
  getDuration(date1: any, date2: any, period: any = 'milliseconds'): number {
    return Math.round(moment(date1).diff(moment(date2), period, true) * 100000) / 100000;
  }

  /**
   * Copy a time in a specific date
   * @param date Destination date
   * @param time Source date. Time to copy
   */
  copyTime(date: any, time: any): any {
    if (_(date).isDate() && _(time).isDate()) {
      date.setHours(time.getHours());
      date.setMinutes(time.getMinutes());
      date.setSeconds(time.getSeconds());
    }
    return date;
  }

  /**
   * Set a specific time in a date
   * @param date Destination date
   * @param hours Hour of the date (from 0 to 23)
   * @param minutes Minutes of the date (form 0 to 59)
   * @param seconds Seconds of the date (from 0 to 59)
   */
  setTime(date: any, hours: number = 0, minutes: number = 0, seconds: number = 0): any {
    if (_(date).isDate()) {
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(seconds);
    }
    return date;
  }

  /**
   *
   * @param date Destination date
   * @param duration Amount to be added (negative values are allowed)
   * @param period Unit of measurement: days, hours, minutes, seconds, weeks, months, years
   */
  addDuration(date: any, duration: number = 0, period: any = 'milliseconds'): any {
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
    date1 = moment(this.datePipe.transform(date1, 'yyyy-MM-dd HH:mm'));
    date2 = moment(this.datePipe.transform(date2, 'yyyy-MM-dd HH:mm'));
    return date1.isSame(date2);
  }

  /**
   * Check if a date is after another date
   * @param date1 First date
   * @param date2 Second date
   * @param includeLimits Include the limits to be compared (default: false)
   */
  isAfter(date1: any, date2: any, includeLimits: boolean = false): boolean {
    date1 = moment(this.datePipe.transform(date1, 'yyyy-MM-dd HH:mm'));
    date2 = moment(this.datePipe.transform(date2, 'yyyy-MM-dd HH:mm'));
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
    date1 = moment(this.datePipe.transform(date1, 'yyyy-MM-dd HH:mm'));
    date2 = moment(this.datePipe.transform(date2, 'yyyy-MM-dd HH:mm'));
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
}
