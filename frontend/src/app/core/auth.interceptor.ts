import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageConstants } from '@mean/utils';
@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem(SessionStorageConstants.USER_TOKEN);
    if (token) {
      if (!req.url.toString().includes('refresh')) {
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          },
        });
      }
    }

    return next.handle(req);
  }
}
