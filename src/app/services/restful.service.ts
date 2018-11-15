import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'underscore';
import { AppSettings } from '../app.settings';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class RESTfulService {
  url: string;

  constructor(private http: HttpClient, private messageService: MessagesService) {
    this.url = AppSettings.api;
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
   * Handle errors
   * @param error Error information
   */
  private handleError(error: HttpErrorResponse | any) {
    switch (error.status) {
      case 401:
        // TODO
        this.messageService.show('Wrong username/password combination.', null, 'warning');
        this.messageService.show('Your session has expired. Re-enter your credentials.', null, 'warning');
        break;
      case 403:
        this.messageService.show('Your permissions are not sufficient to access this feature.', null, 'error');
        break;
      case 404:
        this.messageService.show('Sorry but the service you are looking for has not been found.', null, 'error');
        break;
      case 400:
      case 500:
        this.messageService.show(error.message, null, 'error');
        break;
      case -1:
        this.messageService.show('There is not Internet connection.', null, 'error');
        break;
      default:
        this.messageService.show('No "Access - Control - Allow - Origin" header is present on the requested resource.', null, 'error');
        break;
    }
    return throwError(error.message);
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
  private internalCall(method: string = 'get', endpoint: string, payload: any = null, queryStrings: any, config: any = {}): Observable<{}> {
    // Config can't be null
    if (_.isNull(config)) {
      config = {};
    }
    // GET and DELETE methods
    if (_.isNull(payload) || _.isUndefined(payload)) {
      return this.http[method](this.createUrl(endpoint, queryStrings), config).pipe(
        map((response) => this.processResponse(response)),
        catchError((error) => this.handleError(error))
      );
    }
    // POST, PUT, PATCH methods
    return this.http[method](this.createUrl(endpoint, queryStrings), payload, config).pipe(
      map((response) => this.processResponse(response)),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * GET
   * @return a Promise
   */
  get(endpoint: string, queryStrings: any, config: any = {}): Promise<{}> {
    return this.getObservable(endpoint, queryStrings, config).toPromise();
  }
  /**
   * POST
   * @return a Promise
   */
  post(endpoint: string, payload: any, queryStrings: any, config: any = {}): Promise<{}> {
    return this.postObservable(endpoint, payload, queryStrings, config).toPromise();
  }
  /**
   * PUT
   * @return a Promise
   */
  put(endpoint: string, payload: any, queryStrings: any, config: any = {}): Promise<{}> {
    return this.putObservable(endpoint, payload, queryStrings, config).toPromise();
  }
  /**
   * PATCH
   * @return a Promise
   */
  patch(endpoint: string, payload: any, queryStrings: any, config: any = {}): Promise<{}> {
    return this.patchObservable(endpoint, payload, queryStrings, config).toPromise();
  }
  /**
   * DELETE
   * @return a Promise
   */
  delete(endpoint: string, queryStrings: any, config: any = {}): Promise<{}> {
    return this.deleteObservable(endpoint, queryStrings, config).toPromise();
  }

  /**
   * GET Observable
   * @return a Observable
   */
  getObservable(endpoint: string, queryStrings: any, config: any = {}): Observable<{}> {
    return this.internalCall('get', endpoint, null, queryStrings, config);
  }
  /**
   * POST Observable
   * @return a Observable
   */
  postObservable(endpoint: string, payload: any, queryStrings: any, config: any = {}): Observable<{}> {
    return this.internalCall('post', endpoint, payload, queryStrings, config);
  }
  /**
   * PUT Observable
   * @return a Observable
   */
  putObservable(endpoint: string, payload: any, queryStrings: any, config: any = {}): Observable<{}> {
    return this.internalCall('put', endpoint, payload, queryStrings, config);
  }
  /**
   * PATCH Observable
   * @return a Observable
   */
  patchObservable(endpoint: string, payload: any, queryStrings: any, config: any = {}): Observable<{}> {
    return this.internalCall('patch', endpoint, payload, queryStrings, config);
  }
  /**
   * DELETE Observable
   * @return a Observable
   */
  deleteObservable(endpoint: string, queryStrings: any, config: any = {}): Observable<{}> {
    return this.internalCall('delete', endpoint, null, queryStrings, config);
  }
}
