import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.warn('LoaderInterceptor');
    const loaderService = this.injector.get(LoaderService);
    loaderService.show();
    console.log(loaderService.showLoaderSubject.value);
    return next.handle(req).pipe(finalize(() => loaderService.hide())
    );
  }
}
