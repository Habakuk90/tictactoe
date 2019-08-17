import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiEndpoint } from './endpoints';
import { take, catchError, skip } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { BaseParams, BaseResponse } from './response';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }
  //  item = response type
  browse<T extends BaseResponse>(item: IApiEndpoint, responeType: Response = null, count: number = 15, page: number = 0): Observable<T> {
    return this.http.get<T>(item.fullUrl)
      .pipe(take(count), skip(page * count), catchError(this.handleError));
  }

  read() {

  }

  add<T>() {

  }

  edit<T>() {

  }

  destory<T>() {

  }
}
