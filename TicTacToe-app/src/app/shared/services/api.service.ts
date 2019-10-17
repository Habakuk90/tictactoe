import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/core/services/base.service';
import { IBaseResponse } from '../http/response';
import { IEndpoint } from '../http/endpoints';
import { environment } from 'src/environments/environment';

export class ApiService extends BaseService {

  public get apiUrl() {
    return environment.ghost.baseUrl +
      environment.ghost.contentApiUrl;
  }
  constructor(public http: HttpClient) {
    super();
  }

  protected browse<T extends IBaseResponse>(obj: IEndpoint) {
    const url = this.apiUrl + obj.endpoint;
    return this.http.get<T>(url, { params: obj.params });
  }
}
