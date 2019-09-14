import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, catchError, skip } from 'rxjs/operators';
import { BaseService } from 'src/app/core/services/base.service';
import { IBaseResponse } from '../http/response';
import { IApiEndpoint } from '../http/endpoints';

export class ApiService extends BaseService {

  constructor(public http: HttpClient) {
    super();
  }

  protected browse<T extends IBaseResponse>(item: IApiEndpoint, count: number = 15, page: number = 0): Observable<T> {

    return this.http.get<T>(item.fullUrl)
      .pipe(take(count), skip(page * count), catchError(super.handleError));
  }
}
