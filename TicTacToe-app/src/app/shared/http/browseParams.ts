import { HttpParams } from '@angular/common/http';

export interface IBaseParams {
  include?: string;
  fields?: string;
  debug?: boolean;
  formats?: string;
}

export interface IBrowseOptions extends IBaseParams {
  filter?: string;
  limit?: number;
  page?: number;
  order?: string;
  debug?: boolean;
  absolute_urls?: string;
}

export class BrowseHttpParams extends HttpParams {
  constructor(
    params?: { [param: string]: string | string[] }
  ) {
    super({ fromObject: params });
  }
}
