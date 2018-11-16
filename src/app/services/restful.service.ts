import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';
import { AppSettings } from '../app.settings';

enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete'
}

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
  private internalCall(method: HttpMethod = HttpMethod.Get, endpoint: string, payload?: any, queryStrings?: any, config?: any): Observable<any> {
    // Config can't be null
    if (_.isNull(config) || _.isUndefined(config)) {
      config = {};
    }
    // Convert method to string
    // To avoid lint
    const httpMethod: string = method;
    // GET and DELETE methods
    if (_.isNull(payload) || _.isUndefined(payload)) {
      return this.http[httpMethod](this.createUrl(endpoint, queryStrings), config)
        .pipe(map((response) => this.processResponse(response)));
    }
    // POST, PUT, PATCH methods
    return this.http[httpMethod](this.createUrl(endpoint, queryStrings), payload, config)
      .pipe(map((response) => this.processResponse(response)));
  }

  /**
   * GET
   * RESTful.get('endpointString', { qs: 'querystring' })
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  get(endpoint: string, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall(HttpMethod.Get, endpoint, null, queryStrings, config);
  }
  /**
   * POST
   * RESTful.post('endpointString', payloadObject)
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  post(endpoint: string, payload: any, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall(HttpMethod.Post, endpoint, payload, queryStrings, config);
  }
  /**
   * PUT
   * RESTful.put('endpointString', payloadObject)
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  put(endpoint: string, payload: any, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall(HttpMethod.Put, endpoint, payload, queryStrings, config);
  }
  /**
   * PATCH
   * RESTful.patch('endpointString', payloadObject)
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  patch(endpoint: string, payload: any, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall(HttpMethod.Patch, endpoint, payload, queryStrings, config);
  }
  /**
   * DELETE
   * RESTful.delete('endpointString', { qs: 'querystring' })
   *  .subscribe((response) => console.log(response));
   * @return a Observable
   */
  delete(endpoint: string, queryStrings?: any, config?: any): Observable<any> {
    return this.internalCall(HttpMethod.Delete, endpoint, null, queryStrings, config);
  }
}
