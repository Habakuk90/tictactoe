import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, catchError, skip } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { BaseResponse } from '../http/response';
import { IApiEndpoint } from '../http/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  browse<T extends BaseResponse>(item: IApiEndpoint, responeType: Response = null, count: number = 15, page: number = 0): Observable<T> {
    return this.http.get<T>(item.fullUrl)
      .pipe(take(count), skip(page * count), catchError(this.handleError));
  }
}
