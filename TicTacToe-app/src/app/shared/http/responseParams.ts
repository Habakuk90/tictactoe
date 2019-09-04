interface IMetaResponse {
  meta_title?: string;
  meta_description?: string;
}

interface ISocialMediaResponse {
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
}

export interface IResponse extends IMetaResponse, ISocialMediaResponse {
  id?: string;
  uuid?: string;
  comment_id?: string;

  title?: string;
  html?: string;
  slug?: string;

  featured?: boolean;

  feature_image?: string; // FIXME: Image?
  page?: boolean;

  created_at?: Date;
  updated_at?: Date;
  published_at?: Date;

  custom_excerpt?: string;
  custom_template?: string;

  authors?: Array<IAuthorsResponseParams>;
  primary_author?: IAuthorsResponseParams;

  tags?: Array<ITagsResponseParams>;
  primary_tag?: ITagsResponseParams;

  url?: string;
  excerpt?: string;
}

interface ICodeInjectionResponse {

  codeinjection_head?: string;
  codeinjection_foot?: string;
}

export interface ITagsResponseParams extends IMetaResponse {
  id: string;
  description: string;
  feature_image: string;
  name: string;
  slug: string;
  url: string;
  visibility: string;
}

export interface IAuthorsResponseParams extends IMetaResponse {
  bio: string;
  cover_image: string;
  facebook: string;
  id: string;
  location: string;
  name: string;
  profile_image: string;
  slug: string;
  twitter: string;
  url: string;
  website: string;
}

export interface ISettingsResponseParams extends ICodeInjectionResponse {
  title: string;
  icon: string;
  lang: string;
  description: string;
  cover_image: string;
  logo: string;
  ghost_head: string;
  ghost_foot: string;
  navigation: Array<INavigation>;
  timezone: string;
  twitter: string;
  facebook: string;
}

export interface INavigation {
  label: string;
  url: string;
}
