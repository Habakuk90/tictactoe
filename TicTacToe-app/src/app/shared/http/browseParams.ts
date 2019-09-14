export interface IBaseParams {
  include?: string;
  fields?: string;
  debug?: boolean;
  formats?: string;
}

export interface IBrowseParams extends IBaseParams {
  filter?: string;
  limit?: number;
  page?: number;
  order?: string;
  debug?: boolean;
  absolute_urls?: string;
}
