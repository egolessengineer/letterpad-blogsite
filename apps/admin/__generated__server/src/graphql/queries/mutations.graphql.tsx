/* 921579166e93c8ed62fa5f3ded7673a4962f8ef0
 * This file is automatically generated by graphql-let. */

//@ts-nocheck
import * as Types from '../../../__types__';

import gql from 'graphql-tag';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LoginMutationVariables = Types.Exact<{
  data?: Types.InputMaybe<Types.LoginData>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename: 'Author', id: number, name: string, email: string, role?: Types.Role, avatar?: string, permissions?: Array<Types.Permissions>, bio?: string, username: string, register_step?: Types.RegisterStep } | { __typename: 'LoginError', message: string } };

export type UpdateTagsMutationVariables = Types.Exact<{
  data?: Types.InputMaybe<Types.InputTags>;
}>;


export type UpdateTagsMutation = { __typename?: 'Mutation', updateTags: { __typename: 'EditTaxResponse', ok: boolean } | { __typename: 'UnAuthorized', message: string } };

export type AddSubscriberMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;


export type AddSubscriberMutation = { __typename?: 'Mutation', addSubscriber?: { __typename?: 'SubscribersAddResult', ok: boolean, message?: string } };

export type DeleteTagsMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type DeleteTagsMutation = { __typename?: 'Mutation', deleteTags: { __typename: 'DeleteTagsResult', ok: boolean } | { __typename: 'UnAuthorized', message: string } };

export type CreateAuthorMutationVariables = Types.Exact<{
  data: Types.InputCreateAuthor;
}>;


export type CreateAuthorMutation = { __typename?: 'Mutation', createAuthor?: { __typename: 'Author', name: string, id: number, register_step?: Types.RegisterStep, verified?: boolean, username: string } | { __typename: 'Exception' } | { __typename: 'Failed', message: string } | { __typename: 'NotFound' } | { __typename: 'UnAuthorized' } };

export type UpdateOptionsMutationVariables = Types.Exact<{
  options: Array<Types.SettingInputType> | Types.SettingInputType;
}>;


export type UpdateOptionsMutation = { __typename?: 'Mutation', updateOptions?: { __typename: 'NotFound' } | { __typename: 'Setting', id: number, site_title: string, site_tagline?: string, site_email: string, site_url: string, site_footer?: string, site_description?: string, subscribe_embed?: string, display_author_info: boolean, scripts?: string, cloudinary_key?: string, cloudinary_name?: string, cloudinary_secret?: string, client_token: string, intro_dismissed: boolean, show_about_page?: boolean, show_tags_page?: boolean, openai_key?: string, css?: string, theme?: string, design?: { __typename?: 'Design', brand_color?: string, primary_font?: string, secondary_font?: string }, menu: Array<{ __typename?: 'Navigation', label: string, original_name: string, slug: string, type: Types.NavigationType }>, banner?: { __typename?: 'Image', src?: string, width?: number, height?: number }, site_logo?: { __typename?: 'Image', src?: string, width?: number, height?: number }, site_favicon?: { __typename?: 'Image', src?: string, width?: number, height?: number } } | { __typename: 'UnAuthorized', message: string } };

export type SettingsFragmentFragment = { __typename?: 'Setting', id: number, site_title: string, site_tagline?: string, site_email: string, site_url: string, site_footer?: string, site_description?: string, subscribe_embed?: string, display_author_info: boolean, scripts?: string, cloudinary_key?: string, cloudinary_name?: string, cloudinary_secret?: string, client_token: string, intro_dismissed: boolean, show_about_page?: boolean, show_tags_page?: boolean, openai_key?: string, css?: string, theme?: string, design?: { __typename?: 'Design', brand_color?: string, primary_font?: string, secondary_font?: string }, menu: Array<{ __typename?: 'Navigation', label: string, original_name: string, slug: string, type: Types.NavigationType }>, banner?: { __typename?: 'Image', src?: string, width?: number, height?: number }, site_logo?: { __typename?: 'Image', src?: string, width?: number, height?: number }, site_favicon?: { __typename?: 'Image', src?: string, width?: number, height?: number } };

export type UpdateAuthorMutationVariables = Types.Exact<{
  author: Types.InputAuthor;
}>;


export type UpdateAuthorMutation = { __typename?: 'Mutation', updateAuthor?: { __typename: 'Author', id: number, name: string, bio?: string, occupation?: string, signature?: string, company_name?: string, avatar?: string, username: string, register_step?: Types.RegisterStep, social?: { __typename?: 'Social', github?: string, twitter?: string, instagram?: string, facebook?: string, linkedin?: string } } | { __typename: 'Exception', message: string } | { __typename: 'Failed', message: string } | { __typename: 'NotFound', message: string } | { __typename: 'UnAuthorized', message: string } };

export type CreatePostMutationVariables = Types.Exact<{
  data?: Types.InputMaybe<Types.InputCreatePost>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename: 'Post', id: number, title: string, sub_title?: string, html?: string, excerpt?: string, featured: boolean, html_draft?: string, type: Types.PostTypes, slug?: string, status: Types.PostStatusOptions, createdAt: any, publishedAt?: any, scheduledAt?: any, updatedAt: any, reading_time?: string, page_type?: string, page_data?: string, mail_status?: Types.MailStatus, author?: { __typename?: 'Author', name: string } | { __typename?: 'Exception' } | { __typename?: 'Failed' } | { __typename?: 'NotFound' } | { __typename?: 'UnAuthorized' }, tags?: { __typename?: 'Exception' } | { __typename?: 'TagsNode', rows: Array<{ __typename?: 'Tag', name: string, slug: string }> } | { __typename?: 'UnAuthorized' }, stats?: { __typename?: 'PostStats', words?: number, characters?: number, spaceless_characters?: number, reading_time?: string }, cover_image: { __typename?: 'Image', src?: string, width?: number, height?: number } } | { __typename: 'PostError', message: string } };

export type PartialFragment = { __typename?: 'Post', id: number, title: string, sub_title?: string, html?: string, excerpt?: string, featured: boolean, html_draft?: string, type: Types.PostTypes, slug?: string, status: Types.PostStatusOptions, createdAt: any, publishedAt?: any, scheduledAt?: any, updatedAt: any, reading_time?: string, page_type?: string, page_data?: string, mail_status?: Types.MailStatus, stats?: { __typename?: 'PostStats', words?: number, characters?: number, spaceless_characters?: number, reading_time?: string }, cover_image: { __typename?: 'Image', src?: string, width?: number, height?: number } };

export type UpdatePostMutationVariables = Types.Exact<{
  data?: Types.InputMaybe<Types.InputUpdatePost>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename: 'Post', id: number, title: string, sub_title?: string, html?: string, excerpt?: string, featured: boolean, html_draft?: string, type: Types.PostTypes, slug?: string, status: Types.PostStatusOptions, createdAt: any, publishedAt?: any, scheduledAt?: any, updatedAt: any, reading_time?: string, page_type?: string, page_data?: string, mail_status?: Types.MailStatus, author?: { __typename?: 'Author', id: number, name: string, avatar?: string, bio?: string, occupation?: string, company_name?: string, social?: { __typename?: 'Social', github?: string, twitter?: string, instagram?: string, facebook?: string, linkedin?: string } } | { __typename?: 'Exception' } | { __typename?: 'Failed' } | { __typename?: 'NotFound' } | { __typename?: 'UnAuthorized' }, tags?: { __typename?: 'Exception' } | { __typename?: 'TagsNode', rows: Array<{ __typename?: 'Tag', name: string, slug: string }> } | { __typename?: 'UnAuthorized' }, stats?: { __typename?: 'PostStats', words?: number, characters?: number, spaceless_characters?: number, reading_time?: string }, cover_image: { __typename?: 'Image', src?: string, width?: number, height?: number } } | { __typename: 'PostError', message: string } | { __typename: 'PostTrashed' } };

export type UpdateMediaMutationVariables = Types.Exact<{
  data: Types.InputUpdateMedia;
}>;


export type UpdateMediaMutation = { __typename?: 'Mutation', updateMedia?: { __typename: 'MediaUpdateResult', ok: boolean } | { __typename: 'UnAuthorized', message: string } };

export type UpdateSubscriberMutationVariables = Types.Exact<{
  data: Types.InputUpdateSubscriber;
}>;


export type UpdateSubscriberMutation = { __typename?: 'Mutation', updateSubscriber: { __typename?: 'SubscribersUpdateResult', ok: boolean, message?: string } };

export type DeleteMediaMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars['Int']> | Types.Scalars['Int'];
}>;


export type DeleteMediaMutation = { __typename?: 'Mutation', deleteMedia?: { __typename?: 'MediaDeleteResult', ok: boolean } | { __typename?: 'UnAuthorized', message: string } };

export type ForgotPasswordMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', ok: boolean, message?: string } };

export type ResetPasswordMutationVariables = Types.Exact<{
  password: Types.Scalars['String'];
  token: Types.Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ForgotPasswordResponse', ok: boolean, message?: string } };

export type AddDomainMutationVariables = Types.Exact<{
  domain: Types.Scalars['String'];
}>;


export type AddDomainMutation = { __typename?: 'Mutation', addDomain: { __typename: 'Domain', mapped?: boolean, ssl?: boolean, id: number, verification?: Array<{ __typename?: 'DomainVerification', type: string, domain: string, value: string, reason: string }> } | { __typename: 'DomainError', message: string } };

export type RemoveDomainMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type RemoveDomainMutation = { __typename?: 'Mutation', removeDomain: { __typename?: 'RemoveDomainResponse', ok: boolean, message?: string } };

export type DeleteAuthorMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type DeleteAuthorMutation = { __typename?: 'Mutation', deleteAuthor?: { __typename?: 'DeleteAuthorResponse', ok: boolean, message?: string } };

export type FollowAuthorMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type FollowAuthorMutation = { __typename?: 'Mutation', followAuthor: { __typename?: 'FollowAuthorResponse', ok: boolean, message?: string } };

export type UnFollowAuthorMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type UnFollowAuthorMutation = { __typename?: 'Mutation', unFollowAuthor: { __typename?: 'FollowAuthorResponse', ok: boolean, message?: string } };

export type LikePostMutationVariables = Types.Exact<{
  postId: Types.Scalars['Int'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'ToggleLikePostResponse', ok: boolean, message: string } };

export type UnLikePostMutationVariables = Types.Exact<{
  postId: Types.Scalars['Int'];
}>;


export type UnLikePostMutation = { __typename?: 'Mutation', unLikePost: { __typename?: 'ToggleLikePostResponse', ok: boolean, message: string } };

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
export const LoginDocument = gql`
    mutation Login($data: LoginData) {
  login(data: $data) {
    __typename
    ... on Author {
      id
      name
      email
      role
      avatar
      permissions
      bio
      username
      register_step
    }
    ... on LoginError {
      message
    }
  }
}
    `;
export const UpdateTagsDocument = gql`
    mutation UpdateTags($data: InputTags) {
  updateTags(data: $data) {
    __typename
    ... on EditTaxResponse {
      ok
    }
    ... on UnAuthorized {
      message
    }
  }
}
    `;
export const AddSubscriberDocument = gql`
    mutation addSubscriber($email: String!) {
  addSubscriber(email: $email) {
    ok
    message
  }
}
    `;
export const DeleteTagsDocument = gql`
    mutation DeleteTags($name: String!) {
  deleteTags(name: $name) {
    __typename
    ... on DeleteTagsResult {
      ok
    }
    ... on UnAuthorized {
      message
    }
  }
}
    `;
export const CreateAuthorDocument = gql`
    mutation createAuthor($data: InputCreateAuthor!) {
  createAuthor(data: $data) {
    __typename
    ... on Author {
      name
      id
      register_step
      verified
      username
    }
    ... on Failed {
      message
    }
  }
}
    `;
export const UpdateOptionsDocument = gql`
    mutation UpdateOptions($options: [SettingInputType!]!) {
  updateOptions(options: $options) {
    __typename
    ... on Setting {
      ...SettingsFragment
    }
    ... on UnAuthorized {
      message
    }
  }
}
    ${SettingsFragmentFragmentDoc}`;
export const UpdateAuthorDocument = gql`
    mutation UpdateAuthor($author: InputAuthor!) {
  updateAuthor(author: $author) {
    __typename
    ... on Author {
      id
      name
      social {
        github
        twitter
        instagram
        facebook
        linkedin
      }
      bio
      occupation
      signature
      company_name
      avatar
      username
      register_step
    }
    ... on Exception {
      message
    }
    ... on NotFound {
      message
    }
    ... on UnAuthorized {
      message
    }
    ... on Failed {
      message
    }
  }
}
    `;
export const CreatePostDocument = gql`
    mutation createPost($data: InputCreatePost) {
  createPost(data: $data) {
    __typename
    ... on Post {
      ...Partial
      author {
        ... on Author {
          name
        }
      }
      tags {
        ... on TagsNode {
          rows {
            name
            slug
          }
        }
      }
    }
    ... on PostError {
      message
    }
  }
}
    ${PartialFragmentDoc}`;
export const UpdatePostDocument = gql`
    mutation UpdatePost($data: InputUpdatePost) {
  updatePost(data: $data) {
    __typename
    ... on Post {
      ...Partial
      author {
        ... on Author {
          id
          name
          avatar
          social {
            github
            twitter
            instagram
            facebook
            linkedin
          }
          bio
          occupation
          company_name
        }
      }
      tags {
        ... on TagsNode {
          rows {
            name
            slug
          }
        }
      }
    }
    ... on PostError {
      message
    }
  }
}
    ${PartialFragmentDoc}`;
export const UpdateMediaDocument = gql`
    mutation UpdateMedia($data: InputUpdateMedia!) {
  updateMedia(data: $data) {
    __typename
    ... on MediaUpdateResult {
      ok
    }
    ... on UnAuthorized {
      message
    }
  }
}
    `;
export const UpdateSubscriberDocument = gql`
    mutation UpdateSubscriber($data: InputUpdateSubscriber!) {
  updateSubscriber(data: $data) {
    ok
    message
  }
}
    `;
export const DeleteMediaDocument = gql`
    mutation DeleteMedia($ids: [Int!]!) {
  deleteMedia(ids: $ids) {
    ... on MediaDeleteResult {
      ok
    }
    ... on UnAuthorized {
      message
    }
  }
}
    `;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ok
    message
  }
}
    `;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($password: String!, $token: String!) {
  resetPassword(password: $password, token: $token) {
    ok
    message
  }
}
    `;
export const AddDomainDocument = gql`
    mutation AddDomain($domain: String!) {
  addDomain(domain: $domain) {
    __typename
    ... on Domain {
      mapped
      ssl
      id
      verification {
        type
        domain
        value
        reason
      }
    }
    ... on DomainError {
      message
    }
  }
}
    `;
export const RemoveDomainDocument = gql`
    mutation RemoveDomain {
  removeDomain {
    ok
    message
  }
}
    `;
export const DeleteAuthorDocument = gql`
    mutation DeleteAuthor {
  deleteAuthor {
    ok
    message
  }
}
    `;
export const FollowAuthorDocument = gql`
    mutation FollowAuthor($username: String!) {
  followAuthor(username: $username) {
    ok
    message
  }
}
    `;
export const UnFollowAuthorDocument = gql`
    mutation UnFollowAuthor($username: String!) {
  unFollowAuthor(username: $username) {
    ok
    message
  }
}
    `;
export const LikePostDocument = gql`
    mutation LikePost($postId: Int!) {
  likePost(postId: $postId) {
    ok
    message
  }
}
    `;
export const UnLikePostDocument = gql`
    mutation UnLikePost($postId: Int!) {
  unLikePost(postId: $postId) {
    ok
    message
  }
}
    `;