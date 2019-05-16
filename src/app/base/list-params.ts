import { Expand } from './expand';
import * as _ from 'underscore';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

interface ListFilter {
  field: string;
  operator: string;
  value: string;
}

export class ListParams {
  sort: Array<any>;
  size = 10;
  skip = 0;
  filter: any;
  simple = false;
  keyword = '';

  constructor({ size = 50, skip = 0, keyword = '', simple = false, sort = [] }) {
    this.size = size;
    this.skip = skip;
    this.keyword = keyword;
    this.simple = simple;
    this.sort = sort;
    this.filter = {
      logic: 'and',
      filters: []
    };
  }

  resetFilters(keep: string[] = []) {
    const f = {
      logic: 'and',
      filters: _.filter(this.filter.filters, (item: ListFilter) => _.contains(keep, item.field))
    };
    this.filter = f;
  }

  upsertFilter(filter: any | ListFilter) {
    const index = _.findIndex(this.filter.filters, (item: ListFilter) => item.field === filter.field);
    if (index >= 0) {
      this.filter.filters[index] = filter;
    } else {
      this.filter.filters.push(filter);
    }
  }

  deleteFilter(field: string) {
    if (!_.isEmpty(this.filter) && _.isArray(this.filter.filters)) {
      const index = _.findIndex(this.filter.filters, (item: ListFilter) => item.field === field);
      if (index >= 0) {
        this.filter.filters.splice(index, 1);
      }
    }
  }

  setSize(size: number): void {
    this.size = size;
  }

  private _getSort() {
    if (_.isEmpty(this.sort)) {
      return '';
    }
    return !_.isUndefined(_.first(this.sort).dir) ? `${_.first(this.sort).field},${_.first(this.sort).dir}` : '';
  }

  private _convertOperator(operator: string) {
    switch (operator) {
      case 'contains':
        return 'like';
      case 'neq':
        return 'notEqual';
      case 'isnull':
        return 'isNull';
      case 'isnotnull':
        return 'notNull';
      default:
        return operator;
    }
  }

  private _getFilters() {
    if (_.isEmpty(this.filter.filters)) {
      return '';
    }

    let filters = '';

    _.each(this.filter.filters, (item: ListFilter) => {
      let value = item.value;
      let match: any;
      const exp = /^\d{4}-\d{1,2}-\d{1,2}(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?$/i;

      if (_.isDate(value)) {
        // Format value if it's a date
        const year = value.getFullYear();
        let month: string | number = value.getMonth() + 1;
        let day: string | number = value.getDate();
        month = (month < 10 ? '0' : '') + month;
        day = (day < 10 ? '0' : '') + day;
        value = `${month}-${day}-${year}`;

        filters += `${item.field}:${value};`;

        // If the value has a date format
      } else if (_.isString(value) && (match = value.match(exp))) {
        // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
        const milliseconds = Date.parse(match[0]);
        if (!isNaN(milliseconds)) {
          const date = new Date(milliseconds)
            .toISOString()
            .slice(0, 10)
            .split('-');
          // 0: yyyy
          // 1: MM
          // 2: dd
          value = `${date[1]}-${date[2]}-${date[0]}`;
          filters += `${item.field}:${value};`;
        }
      } else {
        filters += `${item.field}~${this._convertOperator(item.operator)}~${value || ''};`;
      }
    });

    return filters;
  }

  get(expand?: Expand): any {
    return {
      size: this.size,
      page: this.skip / this.size,
      sort: this._getSort(),
      filter: this._getFilters(),
      expand: !_.isEmpty(expand) ? expand.get() : '',
      keyword: _.isString(this.keyword) ? this.keyword : '',
      simple: this.simple,
    };
  }

  extendOwn(values: any): void {
    _.extendOwn(this, values);
  }

  set(state: DataStateChangeEvent): void {
    this.size = state.take;
    this.skip = state.skip;
    this.sort = state.sort;
    this.filter = state.filter;
  }
}
