import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FractionPipe } from '../pipes/fraction.pipe';
import * as _ from 'underscore';
import { Ratio } from 'lb-ratio';

@Injectable({
  providedIn: 'root'
})
export class NumberUtilService {
  constructor(private decimalPipe: DecimalPipe, private fractionPipe: FractionPipe) {}

  /**
   * Rounds a decimal
   * @param value Number to be rounded
   * @param decimals Number of decimals (default: 2)
   */
  round(value: any, decimals: number = 2): number {
    if (_.isUndefined(value)) {
      return 0;
    }
    return Number(this.decimalPipe.transform(value, `1.0-${decimals}`));
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   * @param min Min number
   * @param max Max number
   */
  random(min: number = 0, max: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Transform a decimal into a fraction
   * @param value Number to transform
   */
  toFraction(value: any): string {
    return isNaN(value) ? value : this.fractionPipe.transform(value);
  }

  /**
   * Transform a fraction (string) into a decimal
   * @param value String to transform to number
   * @param round Number of decimals (default: 6)
   */
  fromFraction(value: string, round: number = 6): number {
    return this.round(Ratio.parse(value).valueOf(), round);
  }

  /**
   * Retuns an object {deg:, min:, sec:, dir:} with sec truncated to two digits (e.g. 3.14)
   * and dir being one of N, E, S, W depending on whether you set the isLongitude (longitude)
   * i.e. convertDDToDMS(-18.213, true) => { deg : 18, min : 12, sec : 46.79, dir : 'W' }
   * @param value The coordinate (number) to be transform
   * @param isLongitude If it is longitude or latitude
   * @param toString Returns an object or a string
   */
  convertDDToDMS(value: any, isLongitude: boolean = false, toString: boolean = false): any {
    const ret = {
      dir: value < 0 ? (isLongitude ? 'W' : 'S') : isLongitude ? 'E' : 'N',
      deg: 0 | (value < 0 ? (value = -value) : value),
      min: 0 | ((value % 1) * 60),
      sec: (0 | (((value * 60) % 1) * 6000)) / 100
    };
    return toString ? `${ret.deg}° ${ret.min}' ${ret.sec}" ${ret.dir}` : ret;
  }

  /**
   * Convert a number into a human-readable string
   * @param bytes amount of bytes
   */
  convertToFileSize(bytes: number): string {
    const thresh = 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }

  /**
   * Calculates the cumulative sum from acum and value
   * @param acum Cumulative value
   * @param value Value to be sum
   */
  acum(acum: any, value: any): number {
    if (!_.isNumber(acum) && _.isNumber(value)) {
      return value;
    }
    if (_.isNumber(acum) && !_.isNumber(value)) {
      return 0;
    }
    if (!_.isNumber(acum) && !_.isNumber(value)) {
      return 0;
    }
    return acum + value;
  }

  /**
   * Performs division and returns the percentage (0-100%) [or returns 0 on division by 0]
   * @param numerator The dividend or number to divide
   * @param denominator The divisor or number to divide by
   * @param round Number of decimals for rounding
   */
  percentage(numerator: any, denominator: any, round: any = null): number {
    const value = this.division(numerator, denominator) * 100;
    return _.isNumber(round) ? this.round(value, round) : value;
  }

  /**
   * Performs division and returns 0 on division by 0
   * @param numerator The dividend or number to divide
   * @param denominator The divisor or number to divide by
   * @param round Number of decimals for rounding
   */
  division(numerator: any, denominator: any, round: any = null): number {
    const ret = _.isNumber(numerator) && _.isNumber(denominator) && denominator !== 0 ? numerator / denominator : 0;
    return _.isNumber(round) ? this.round(ret, round) : ret;
  }

  /**
   * Returns the smallest value
   * @param value1 First value
   * @param value2 Second value
   */
  min(value1: any, value2: any): any {
    // value1 = null and value2 = number
    if (!_.isNumber(value1) && _.isNumber(value2)) {
      return value2;
    }
    // value1 = number and value2 = null
    if (_.isNumber(value1) && !_.isNumber(value2)) {
      return value1;
    }
    // value1 = null and value2 = null
    if (!_.isNumber(value1) && !_.isNumber(value2)) {
      return value1;
    }
    // value1 = number and value2 = number
    return Math.min(value1, value2);
  }

  /**
   * Returns the largest value
   * @param value1 First value
   * @param value2 Seconf value
   */
  max(value1: any, value2: any): number {
    // value1 = null and value2 = number
    if (!_.isNumber(value1) && _.isNumber(value2)) {
      return value2;
    }
    // value1 = number and value2 = null
    if (_.isNumber(value1) && !_.isNumber(value2)) {
      return value1;
    }
    // value1 = null and value2 = null
    if (!_.isNumber(value1) && !_.isNumber(value2)) {
      return value1;
    }
    // value1 = number and value2 = number
    return Math.max(value1, value2);
  }

  /**
   * Set Padding
   * @param value Number to be padded
   * @param width Length of final string
   * @param character Pad character, which can be any string
   */
  pad(value: any, width: number = 2, character: string = '0'): string {
    const strValue = value + '';
    return strValue.length >= width ? strValue : new Array(width - strValue.length + 1).join(character) + strValue;
  }
}
