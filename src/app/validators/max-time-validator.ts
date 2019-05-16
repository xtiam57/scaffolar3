import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'underscore';

function convertTimeToDate(time: any, date = new Date(2099, 0, 1, 0, 0, 0, 0)): any {
  if (!_.isString(time) || _.isEmpty(time)) {
    return time;
  }
  const split = time.split(':');
  if (split.length > 0 && split.length <= 2) {
    date.setHours(Number(split[0]));
    date.setMinutes(Number(split[1]));
  }
  if (split.length > 2) {
    date.setSeconds(Number(split[2]));
  }
  date.setMilliseconds(0);

  return date;
}

function isAfter(date1: any, date2: any): boolean {
  return moment(date1).isAfter(moment(date2));
}

export const maxTime = (maxValue: any): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!_.isEmpty(Validators.required(control))) {
      return null;
    }

    if (maxValue instanceof Function) {
      maxValue = maxValue();
    }

    if (!_.isEmpty(maxValue) && !_.isEmpty(control.value)) {
      const value = convertTimeToDate(control.value);
      const max = convertTimeToDate(maxValue);
      return isAfter(value, max) ? { maxTime: true } : null;
    }

    return {
      maxTime: true
    };
  };
};
