import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtilService {
  constructor() {}

  /**
   * Get a random GUID
   */
  getGUID(isTrimmed: boolean = false): string {
    let currentDate = new Date().getTime();

    if (window.performance && typeof window.performance.now === 'function') {
      // Use high-precision timer if available
      currentDate += performance.now();
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (digit) => {
      const r = (currentDate + Math.random() * 16) % 16 | 0;
      currentDate = Math.floor(currentDate / 16);
      return (digit === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return isTrimmed ? uuid.replace(/-/gi, '') : uuid;
  }

  /**
   * Compares the equality of 2 strings
   * @param str1 String 1
   * @param str2 String 2
   * @param isSensitive Sensitive or insensitive comparison
   */
  isEqual(str1: string, str2: string, isSensitive: boolean = false): boolean {
    const regex = new RegExp(str2.trim(), 'g' + (isSensitive ? '' : 'i'));
    return regex.test(str1);
  }
}
