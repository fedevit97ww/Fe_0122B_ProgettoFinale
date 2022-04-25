import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string;
  tenant: string;
  x:any;

  constructor() {
    this.token = environment.adminToken;
    this.tenant = environment.adminTenant;
  }
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let ok: string;
    let authReq: HttpRequest<unknown> = req.clone({
      headers: req.headers
        .set('Authorization', 'Bearer ' + this.token)
        .set('X-TENANT-ID', this.tenant),
    });

    return next.handle(authReq).pipe(
      tap((evento) => {
        ok = evento instanceof HttpResponse ? 'successo' : '';
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() =>
		this.x = new Error(error.name))
      }),
      finalize(() => {})
    );
  }
}
