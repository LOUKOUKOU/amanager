import { SessionService } from '@/services/SessionService';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isPublic(route: string) {
    return route.includes('/auth/login') || route.includes('/auth/register');
  }

  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const sessionService = inject(SessionService);
    const authToken = sessionService.token;

    const newReq = this.isPublic(req.url)
      ? req
      : req.clone({
          headers: req.headers.append('authorization', `Bearer ${authToken}`),
        });

    return handler.handle(newReq).pipe(
      tap({
        error: (error) => {
          if (error?.error.statusCode == 401) {
            sessionService.clearSession();
          } else {
            console.error(error);
          }
        },
      })
    );
  }
}
