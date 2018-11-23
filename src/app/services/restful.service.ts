import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class RESTfulService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = AppSettings.api;
  }

  /**
   * Create the endpoint using the API url
   * @param endpoint A string param that indicates the endpoint name
   * @param queryStrings An object with all query strings
   */
  private createUrl(endpoint: string, queryStrings?: any) {
    if (!_.isEmpty(queryStrings) && _.isObject(queryStrings)) {
      endpoint += endpoint.indexOf('?') === -1 ? '?' : '&';
      endpoint += Object.entries(queryStrings)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
    }
    return endpoint.indexOf('://') === -1 ? this.url + endpoint : endpoint;
  }

  /**
   * Process the response
   * @param response Element to process
   */
  private processResponse(response: any) {
    return response;
  }

  /**
   * Restful call
   * @param method REST method
   * @param endpoint Endpoint string
   * @param payload If any
   * @param queryStrings Query string object
   * @param config Settings object
   */
  private internalCall(
    method: string | 'post' | 'put' | 'delete' | 'patch' | 'get',
    endpoint: string,
    payload?: any,
    queryStrings?: any,
    config?: any
  ): Observable<any> {
    // Config can't be null
    if (_.isNull(config) || _.isUndefined(config)) {
      config = {};
    }
    // GET and DELETE methods
    if (_.isNull(payload) || _.isUndefined(payload)) {
      return this.http[method](this.createUrl(endpoint, queryStrings), config)
        .pipe(map((response) => this.processResponse(response)));
    }
    // POST, PUT, PATCH methods
    return this.http[method](this.createUrl(endpoint, queryStrings), payload, config)
      .pipe(map((response) => this.processResponse(response)));
  }

  /**
   * GET
   * RESTful.get('users/xtiam57/repos', { qs: 'querystring' })
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  get(endpoint: string, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall('get', endpoint, null, queryStrings, config);
  }
  /**
   * POST
   * RESTful.post('users/xtiam57/repos', payloadObject)
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  post(endpoint: string, payload: any, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall('post', endpoint, payload, queryStrings, config);
  }
  /**
   * PUT
   * RESTful.put('users/xtiam57/repos', payloadObject)
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  put(endpoint: string, payload: any, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall('put', endpoint, payload, queryStrings, config);
  }
  /**
   * PATCH
   * RESTful.patch('users/xtiam57/repos', payloadObject)
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  patch(endpoint: string, payload: any, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall('patch', endpoint, payload, queryStrings, config);
  }
  /**
   * DELETE
   * RESTful.delete('users/xtiam57/repos', { qs: 'querystring' })
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  delete(endpoint: string, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall('delete', endpoint, null, queryStrings, config);
  }
}
