// TODOANDI cleanup Response Types
export interface IBaseResponse {
  meta: IMetaResponse;
}


export interface IPostResponse extends IBaseResponse {
  posts: Array<IPostResponseParams>;
}

export interface IPageResponse extends IBaseResponse {
  pages: Array<IPageResponseParams>;
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

export interface IPageResponseParams {
  html: string;
  title: string;
}

export interface IPostResponseParams {
  id?: string;
  uuid?: string;
  title?: string;
  slug?: string;
  html?: string;
  comment_id?: string;
  feature_image?: string; // FIXME: Image?
  featured?: boolean;
  page?: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at?: Date;
  updated_at?: Date;
  published_at?: Date;
  custom_excerpt?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  custom_template?: string;
  authors?: Array<IAuthorsResponseParams>;
  primary_author?: IAuthorsResponseParams;
  tags?: Array<ITagsResponseParams>;
  primary_tag?: ITagsResponseParams;
  url?: string;
  excerpt?: string;
}

interface ITagsResponseParams {
  description: string;
  feature_image: string;
  id: string;
  meta_description: string;
  meta_title: string;
  name: string;
  slug: string;
  url: string;
  visibility: string;
}

interface IAuthorsResponseParams {
  bio: string;
  cover_image: string;
  facebook: string;
  id: string;
  location: string;
  meta_description: string;
  meta_title: string;
  name: string;
  profile_image: string;
  slug: string;
  twitter: string;
  url: string;
  website: string;
}

interface ISettingsResponseParams {
  codeinjection_foot: string;
  codeinjection_head: string;
  cover_image: string;
  description: string;
  facebook: string;
  ghost_foot: string;
  ghost_head: string;
  icon: string;
  lang: string;
  logo: string;
  navigation: Array<INavigation>;
  timezone: string;
  title: string;
  twitter: string;
}

export interface INavigation {
  label: string;
  url: string;
}

export interface IBaseParams {
  include?: string;
  fields?: string;
  debug?: boolean;
  absolute_urls?: string;
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
