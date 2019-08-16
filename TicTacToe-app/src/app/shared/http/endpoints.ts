import { environment } from 'src/environments/environment';
import { Params, BaseParams } from './response';

export interface IApiEndpoint {
  params: Params;
  url: string;
  fullUrl: string;
}

export interface PostParams extends Params {
  filter?: string;
}

export interface PagesParams extends Params {
  include?: string;
}

export abstract class Endpoint implements IApiEndpoint {
  public fullUrl: string;
  /**
   *
   */
  constructor(public params: Params = null, public url = 'notfound') {
    this.fullUrl = this.buildUrl(url, params);
  }

  private buildUrl(endpoint: string, params?: Params) {
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

export class Posts extends Endpoint {
  constructor(public params: PostParams = null, public endpoint = 'posts') {
    super(params, endpoint);
  }
}

export class Pages extends Endpoint {
  constructor(public params: PagesParams = null, public endpoint = 'pages') {
    super(params, endpoint);
  }
}

export class Tags extends Endpoint {
  constructor(public params: BaseParams = null, public endpoint = 'tags') {
    super(params, endpoint);
  }
}

export class Authors extends Endpoint {
  /**
   *
   */
  constructor(public params: BaseParams = null, public endpoint = 'authors') {
    super(params, endpoint);
  }
}

export class Settings extends Endpoint {
  /**
   *
   */
  constructor(public params: BaseParams = null, public endpoint = 'settings') {
    super(params, endpoint);
  }
}


enum Endpoints {
  Posts,
  Pages,
  Tags,
  Authors,
  Settings
}
