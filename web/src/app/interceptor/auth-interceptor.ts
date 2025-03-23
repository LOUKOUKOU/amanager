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
    console.log(req.params);

    const newReq = this.isPublic(req.url)
      ? req
      : req.clone({
          headers: req.headers.append('X-Authentication-Token', authToken),
        });

    return handler.handle(newReq).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status == 401) {
            sessionService.clearSession();
          }
        }
      })
    );
  }
}
