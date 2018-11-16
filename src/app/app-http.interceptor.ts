import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { MessagesService } from './services/messages.service';
import * as _ from 'underscore';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, private messagesService: MessagesService) {}

  /**
   * intercept all XHR request
   * @param request Request to be intercepted
   * @param next HTTP haandler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!_.isEmpty(this.authService.token)) {
      request = request.clone({
        setHeaders: {
          'X-Auth-Token': this.authService.token
        }
      });
    }
    // Continues request execution
    return next.handle(request).pipe(catchError((error, caught) => {
      // Let the user to catch the error and do what he wants to
      return this.handleError(error);
      // If you've caught / handled the error, you don't want to rethrow it unless
      // you also want downstream consumers to have to handle it as well.
      // import { of } from 'rxjs/internal/observable/of';
      // return of(error);
    }) as any);
  }

  /**
   * Manage errors
   * @param error Error information
   */
  private handleError(error: HttpErrorResponse): Observable<any> {
    // Intercept the respons error and displace it to the console
    console.error(error);

    switch (error.status) {
      case 401:
        if (this.authService.isLoggedIn) {
          this.messagesService.show('Your session has expired. Re-enter your credentials.', null, 'warning');
          this.authService.logout();
        } else {
          this.messagesService.show('Wrong username/password combination.', null, 'warning');
        }
        break;
      case 403:
        this.messagesService.show('Your permissions are not sufficient to access this feature.', null, 'error');
        break;
      case 404:
        this.messagesService.show('Sorry but the service you are looking for has not been found.', null, 'error');
        break;
      case 400:
      case 500:
        this.messagesService.show(error.message, null, 'error');
        break;
      case -1:
        this.messagesService.show('There is not Internet connection.', null, 'error');
        break;
      case 0:
        this.messagesService.show('No "Access-Control-Allow-Origin" (CORS) header is present on the requested resource.', null, 'error');
        break;
      default:
        break;
    }
    return throwError(error.message);
  }
}
