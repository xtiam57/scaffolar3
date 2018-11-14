import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtilService {

  constructor() { }

  /**
   * Get a random GUID
   */
  getGUID(): string {
    let d = new Date().getTime();

    if (window.performance && typeof window.performance.now === 'function') {
      // Use high-precision timer if available
      d += performance.now();
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}
