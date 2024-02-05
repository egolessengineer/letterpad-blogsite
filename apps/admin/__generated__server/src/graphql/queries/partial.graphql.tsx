/* baedf65e0f8c7723993078ccaf9820d80fa36597
 * This file is automatically generated by graphql-let. */

//@ts-nocheck
import * as Types from '../../../__types__';

import gql from 'graphql-tag';
export type PartialFragment = { __typename?: 'Post', id: number, title: string, sub_title?: string, html?: string, excerpt?: string, featured: boolean, html_draft?: string, type: Types.PostTypes, slug?: string, status: Types.PostStatusOptions, createdAt: any, publishedAt?: any, scheduledAt?: any, updatedAt: any, reading_time?: string, page_type?: string, page_data?: string, mail_status?: Types.MailStatus, stats?: { __typename?: 'PostStats', words?: number, characters?: number, spaceless_characters?: number, reading_time?: string }, cover_image: { __typename?: 'Image', src?: string, width?: number, height?: number } };

export type PostWithAuthorAndTagsFragment = { __typename?: 'Post', id: number, title: string, sub_title?: string, html?: string, excerpt?: string, featured: boolean, html_draft?: string, type: Types.PostTypes, slug?: string, status: Types.PostStatusOptions, createdAt: any, publishedAt?: any, scheduledAt?: any, updatedAt: any, reading_time?: string, page_type?: string, page_data?: string, mail_status?: Types.MailStatus, author?: { __typename: 'Author', id: number, name: string, avatar?: string, bio?: string, occupation?: string, company_name?: string, social?: { __typename: 'Social', github?: string, twitter?: string, instagram?: string, linkedin?: string, facebook?: string } } | { __typename: 'Exception' } | { __typename: 'Failed' } | { __typename: 'NotFound' } | { __typename: 'UnAuthorized' }, tags?: { __typename: 'Exception' } | { __typename: 'TagsNode', rows: Array<{ __typename?: 'Tag', name: string, slug: string }> } | { __typename: 'UnAuthorized' }, stats?: { __typename?: 'PostStats', words?: number, characters?: number, spaceless_characters?: number, reading_time?: string }, cover_image: { __typename?: 'Image', src?: string, width?: number, height?: number } };

export type SettingsFragmentFragment = { __typename?: 'Setting', id: number, site_title: string, site_tagline?: string, site_email: string, site_url: string, site_footer?: string, site_description?: string, subscribe_embed?: string, display_author_info: boolean, scripts?: string, cloudinary_key?: string, cloudinary_name?: string, cloudinary_secret?: string, client_token: string, intro_dismissed: boolean, show_about_page?: boolean, show_tags_page?: boolean, openai_key?: string, css?: string, theme?: string, design?: { __typename?: 'Design', brand_color?: string, primary_font?: string, secondary_font?: string }, menu: Array<{ __typename?: 'Navigation', label: string, original_name: string, slug: string, type: Types.NavigationType }>, banner?: { __typename?: 'Image', src?: string, width?: number, height?: number }, site_logo?: { __typename?: 'Image', src?: string, width?: number, height?: number }, site_favicon?: { __typename?: 'Image', src?: string, width?: number, height?: number } };

export type MeFragmentFragment = { __typename?: 'Author', id: number, name: string, username: string, analytics_id?: number, analytics_uuid?: string, register_step?: Types.RegisterStep, email: string, bio?: string, occupation?: string, signature?: string, company_name?: string, avatar?: string, first_post_published?: boolean, settings_updated?: boolean, profile_updated?: boolean, createdAt?: string, social?: { __typename: 'Social', github?: string, twitter?: string, instagram?: string, facebook?: string, linkedin?: string } };

export const PartialFragmentDoc = gql`
    fragment Partial on Post {
  id
  title
  sub_title
  html
  excerpt
  featured
  html_draft
  type
  slug
  status
  createdAt
  publishedAt
  scheduledAt
  updatedAt
  reading_time
  page_type
  page_data
  mail_status
  stats {
    words
    characters
    spaceless_characters
    reading_time
  }
  cover_image {
    src
    width
    height
  }
}
    `;
export const PostWithAuthorAndTagsFragmentDoc = gql`
    fragment PostWithAuthorAndTags on Post {
  ...Partial
  author {
    __typename
    ... on Author {
      id
      name
      avatar
      social {
        __typename
        github
        twitter
        instagram
        linkedin
        facebook
      }
      bio
      occupation
      company_name
    }
  }
  tags {
    __typename
    ... on TagsNode {
      __typename
      rows {
        name
        slug
      }
    }
  }
}
    ${PartialFragmentDoc}`;
export const SettingsFragmentFragmentDoc = gql`
    fragment SettingsFragment on Setting {
  id
  site_title
  site_tagline
  site_email
  site_url
  site_footer
  site_description
  subscribe_embed
  display_author_info
  scripts
  cloudinary_key
  cloudinary_name
  cloudinary_secret
  client_token
  intro_dismissed
  show_about_page
  show_tags_page
  openai_key
  design {
    brand_color
    primary_font
    secondary_font
  }
  menu {
    label
    original_name
    slug
    type
  }
  css
  theme
  banner {
    src
    width
    height
  }
  site_logo {
    src
    width
    height
  }
  site_favicon {
    src
    width
    height
  }
}
    `;
export const MeFragmentFragmentDoc = gql`
    fragment MeFragment on Author {
  id
  name
  username
  analytics_id
  analytics_uuid
  register_step
  social {
    __typename
    github
    twitter
    instagram
    facebook
    linkedin
  }
  email
  bio
  occupation
  signature
  company_name
  avatar
  first_post_published
  settings_updated
  profile_updated
  createdAt
}
    `;