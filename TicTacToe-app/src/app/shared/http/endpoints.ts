import { environment } from 'src/environments/environment';
import { IBaseParams, IBrowseOptions, BrowseHttpParams } from './browseParams';

export interface IEndpoint {
  params: BrowseHttpParams;
  endpoint: string;
}

export abstract class Endpoint implements IEndpoint {
  abstract endpoint = 'notfound';
  public params: BrowseHttpParams;

  constructor(public options: IBrowseOptions = null) {
    this.params = new BrowseHttpParams(options as any);
  }
}

export class PostsEndpoint extends Endpoint {
  public endpoint = 'posts';

  constructor(public options: IBrowseOptions = null) {
    super(options);
  }
}

export class PagesEndpoint extends Endpoint {
  public endpoint = 'pages';

  constructor(public options: IBrowseOptions = null, ) {
    super(options);
  }
}

export class TagsEndpoint extends Endpoint {
  public endpoint = 'tags';

  constructor(public options: IBrowseOptions = null) {
    super(options);
  }
}

export class AuthorsEndpoint extends Endpoint {
  public endpoint = 'authors';

  constructor(public options: IBrowseOptions = null, ) {
    super(options);
  }
}

export class SettingsEndpoint extends Endpoint {
  public endpoint = 'settings';

  constructor(public options: IBrowseOptions = null, ) {
    super(options);
  }
}
