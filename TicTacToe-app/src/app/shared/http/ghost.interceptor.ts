import { environment } from 'src/environments/environment';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GhostService } from '../services/ghost.service';
import { tap, map, catchError } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable()
export class GhostInterceptor extends BaseService implements HttpInterceptor {
  constructor(private injector: Injector) { super(); }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const key = environment.ghost.apiKey;

    // clone instance of request to manipulate data for params.. dont know why
    req = req.clone({
      headers: req.headers.set("Content-Type", "application/json"),
      params: req.params.set('key', key)
    });

    return next.handle(req).pipe(catchError(super.handleError), map(x => { return x }));
  }
}
