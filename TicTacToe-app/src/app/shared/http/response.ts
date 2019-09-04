import { ISettingsResponseParams, IAuthorsResponseParams, ITagsResponseParams, IResponse } from './responseParams';

// TODOANDI cleanup Response Types
export interface IBaseResponse {
  meta: IMetaResponse;
}

export interface IPostResponse extends IBaseResponse {
  posts: Array<IResponse>;
}

export interface IPageResponse extends IBaseResponse {
  pages: Array<IResponse>;
}

export interface ITagResponse extends IBaseResponse {
  tags: Array<ITagsResponseParams>;
}

export interface IAuthorsResponse extends IBaseResponse {
  authors: Array<IAuthorsResponseParams>;
}


export interface ISettingsResponse extends IBaseResponse {
  settings: ISettingsResponseParams;
}

export interface IMetaResponse {
  pagination: IPagination;
}

interface IPagination {
  limit: number;
  next: number;
  page: number;
  pages: number;
  prev: number;
  total: number;
}
