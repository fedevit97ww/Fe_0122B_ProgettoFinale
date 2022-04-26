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

import Swal from 'sweetalert2';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string;
  tenant: string;
  x: any;

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
        console.log(error);

        if (error.error.error == 'Unauthorized') {
          Swal.fire({title:'Accesso negato, Username e password non combaciano', icon:'error'});
          
        } else if (error.error.message == 'Error: Username is already taken!') {
          Swal.fire({title:'Username già in uso', icon:'error'});

        } else if (error.error.error == 'Bad Request') {
          Swal.fire({title:'La password deve essere almeno di sei caratteri', icon:'error'});

        } else if (error.error.message == 'Error: Email is already in use!') {
         Swal.fire({title:'Email già in uso', icon:'error'});
          
        } else if (error.error.error == "Internal Server Error") {
          Swal.fire({title:'Azione non possibile', icon:'error'});
        }

        return throwError(() => (this.x = new Error(error.name)));
      }),
      finalize(() => {})
    );
  }
}

