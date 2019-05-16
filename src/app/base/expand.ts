import * as _ from 'underscore';

export class Expand {
  constructor(private entity: string | Array<string>, private type?: string, private folder?: string) { }

  /**
   *
   * @param entity Can be either string or array. If array is passed then expand will be created based on this array; otherwise the string can be either entity (as main role) or the template name (see @param type for more info)
   * @param type Can be either string or undefined. If undefined is passed then will assume first parameter as template name, otherwise will be used as expand type
   * @param folder If passed will be used as the folder name to build the template name
   */
  get(): string {
    // Remove this values from expand
    const bannedValues = ['itemValue', 'name', 'startDate', 'endDate', 'estimatedStartDate', 'estimatedEndDate', 'data'];

    // Check for values integrity
    if (_.isUndefined(this.entity)) {
      console.error('First param can not be undefined');
      return '';
    }

    if (_.isArray(this.entity)) {
      return this.__getExpandString(this.entity);
    }

    console.error('Unfinished code at src/app/base/base-service.ts');
    return '';
  }

  __getExpandString(arr: Array<string>): string {
    if (!_.isArray(arr)) {
      console.error(`Expand must be an array, but ${typeof arr} received`);
      return '';
    }

    if (arr.length > 0) {
      arr[0] = '.' + arr[0];
    }

    return arr.join(',.');
  }
}
