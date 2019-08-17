export interface BaseResponse {
  meta: MetaResponse;
}


export interface PostResponse extends BaseResponse {
  posts: Array<PostResponseParams>;
}

export interface PageResponse extends BaseResponse {
  pages: Array<PagesResponeParams>;
}

export interface TagResponse extends BaseResponse {
  tags: Array<TagsResponseParams>;
}

export interface AuthorsResponse extends BaseResponse {
  authors: Array<AuthorsResponseParams>;
}


export interface SettingsResponse extends BaseResponse {
  settings: SettingsResponseParams;
}

export interface MetaResponse {
  pagination: Pagination;
}

interface Pagination {
  limit: number;
  next: number;
  page: number;
  pages: number;
  prev: number;
  total: number;
}

export interface PagesResponeParams {
  html: string;
}

export interface PostResponseParams {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id: string;
  feature_image: string; // FIXME: Image?
  featured: boolean;
  page: boolean;
  meta_title: string;
  meta_description: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  custom_excerpt: string;
  codeinjection_head: string;
  codeinjection_foot: string;
  og_image: string;
  og_title: string;
  og_description: string;
  twitter_image: string;
  twitter_title: string;
  twitter_description: string;
  custom_template: string;
  authors: Array<AuthorsResponseParams>;
  primary_author: AuthorsResponseParams;
  tags: Array<TagsResponseParams>;
  primary_tag: TagsResponseParams;
  url: string;
  excerpt: string;
}

interface TagsResponseParams {
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

interface AuthorsResponseParams {
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

interface SettingsResponseParams {
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
  navigation: Array<Navigation>;
  timezone: string;
  title: string;
  twitter: string;
}

export interface Navigation {
  label: string;
  url: string;
}

export interface BaseParams {
  include?: string;
  fields?: string;
  debug?: boolean;
  absolute_urls?: string;
  formats?: string;
}

export interface BrowseParams extends BaseParams {
  filter?: string;
  limit?: number;
  page?: number;
  order?: string;
  debug?: boolean;
  absolute_urls?: string;
}
