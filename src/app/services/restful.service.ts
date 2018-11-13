import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class RESTfulService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = AppSettings.getInfo().api();
  }

  /**
   * Create the endpoint using the API url
   * @param endpoint A string param that indicates the endpoint name
   * @param queryStrings An object with all query strings
   */
  private createUrl(endpoint: string, queryStrings: any) {
    if (!_.isEmpty(queryStrings) && _.isObject(queryStrings)) {
      endpoint += endpoint.indexOf('?') === -1 ? '?' : '&';

      endpoint += Object.entries(queryStrings)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
    }
    return endpoint.indexOf('://') === -1 ? this.url + endpoint : endpoint;
  }

  /**
   * GET
   * @return a Promise
   */
  get(endpoint: string, queryStrings: any, config: any = {}) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(this.createUrl(endpoint, queryStrings), config)
        .toPromise()
        .then((response) => resolve(response), (msg) => reject(msg));
    });
    return promise;
  }

  /**
   * POST
   * @return a Promise
   */
  post(endpoint: string, payload: any, queryStrings: any, config: any = {}) {
    if (!payload || !_.isObject(payload)) {
      payload = {};
    }

    const promise = new Promise((resolve, reject) => {
      this.http
        .post(this.createUrl(endpoint, queryStrings), payload, config)
        .toPromise()
        .then((response) => resolve(response), (msg) => reject(msg));
    });
    return promise;
  }

  /**
   * PUT
   * @return a Promise
   */
  put(endpoint: string, payload: any, queryStrings: any, config: any = {}) {
    if (!payload || !_.isObject(payload)) {
      payload = {};
    }

    const promise = new Promise((resolve, reject) => {
      this.http
        .put(this.createUrl(endpoint, queryStrings), payload, config)
        .toPromise()
        .then((response) => resolve(response), (msg) => reject(msg));
    });
    return promise;
  }

  /**
   * PATCH
   * @return a Promise
   */
  patch(endpoint: string, payload: any, queryStrings: any, config: any = {}) {
    if (!payload || !_.isObject(payload)) {
      payload = {};
    }

    const promise = new Promise((resolve, reject) => {
      this.http
        .patch(this.createUrl(endpoint, queryStrings), payload, config)
        .toPromise()
        .then((response) => resolve(response), (msg) => reject(msg));
    });
    return promise;
  }

  /**
   * DELETE
   * @return a Promise
   */
  delete(endpoint: string, queryStrings: any, config: any = {}) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .delete(this.createUrl(endpoint, queryStrings), config)
        .toPromise()
        .then((response) => resolve(response), (msg) => reject(msg));
    });
    return promise;
  }
}
