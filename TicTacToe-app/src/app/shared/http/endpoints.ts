import { environment } from 'src/environments/environment';
import { IBaseParams, IBrowseParams } from './browseParams';

export interface IApiEndpoint {
  params: IBaseParams;
  url: string;
  fullUrl: string;
}

export abstract class Endpoint implements IApiEndpoint {
  public fullUrl: string;
  /**
   *
   */
  constructor(public params: IBaseParams = null, public url = 'notfound') {
    if (params) { params.debug = true; }
    this.fullUrl = this.buildUrl(url, params);
  }

  // FIXME, get parameters from query in url and build url in ghost/api .service
  private buildUrl(endpoint: string, params?: IBaseParams) {
    let urlParams = '';

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        urlParams += `&${key}=${value}`;
      }
    }

    return environment.ghost.baseUrl +
      environment.ghost.contentApiUrl +
      endpoint +
      '/?key=' + environment.ghost.apiKey +
      urlParams;
  }
}

export class PostsEndpoint extends Endpoint {
  constructor(public params: IBrowseParams = null, public endpoint = 'posts') {
    super(params, endpoint);
  }
}

export class PagesEndpoint extends Endpoint {
  constructor(public params: IBrowseParams = null, public endpoint = 'pages') {
    super(params, endpoint);
  }
}

export class TagsEndpoint extends Endpoint {
  constructor(public params: IBrowseParams = null, public endpoint = 'tags') {
    super(params, endpoint);
  }
}

export class AuthorsEndpoint extends Endpoint {
  /**
   *
   */
  constructor(public params: IBrowseParams = null, public endpoint = 'authors') {
    super(params, endpoint);
  }
}

export class SettingsEndpoint extends Endpoint {
  /**
   *
   */
  constructor(public params: IBrowseParams = null, public endpoint = 'settings') {
    super(params, endpoint);
  }
}
