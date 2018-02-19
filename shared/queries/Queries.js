import gql from "graphql-tag";

export const GET_POSTS = gql`
    query getPosts($type: String!, $offset: Int, $limit: Int, $status: String) {
        posts(type: $type, offset: $offset, limit: $limit, status: $status) {
            count
            rows {
                id
                title
                body
                author {
                    username
                }
                type
                slug
                status
                created_at
                excerpt
                taxonomies {
                    id
                    name
                    type
                }
            }
        }
    }
`;

export const GET_SINGLE_POST = gql`
    query getPost($id: Int!) {
        post(id: $id) {
            id
            title
            body
            author {
                username
            }
            type
            status
            created_at
            cover_image
            excerpt
            slug
            taxonomies {
                id
                name
                type
            }
        }
    }
`;

export const GET_PAGE_NAMES = gql`
    query getPosts($type: String!, $status: String) {
        posts(type: $type, status: $status) {
            count
            rows {
                id
                title
                slug
            }
        }
    }
`;
export const GET_MEDIA = gql`
    query getMedia($author_id: Int!, $offset: Int, $limit: Int) {
        media(author_id: $author_id, offset: $offset, limit: $limit) {
            count
            rows {
                id
                url
                created_at
            }
        }
    }
`;

export const GET_AUTHORS = gql`
    query getAuthors {
        authors {
            id
            email
            fname
            lname
            username
            role {
                name
                permissions {
                    name
                }
            }
        }
    }
`;

export const GET_AUTHOR = gql`
    query getAuthor($id: Int!) {
        author(id: $id) {
            id
            username
            email
            fname
            lname
            social
            role {
                name
                permissions {
                    name
                }
            }
        }
    }
`;

export const GET_OPTIONS = gql`
    query getOptions {
        settings {
            id
            option
            value
        }
    }
`;

export const GET_TAXONOMIES = gql`
    query getTaxonomies($type: String!) {
        taxonomies(type: $type) {
            id
            name
            desc
            slug
        }
    }
`;

export const SEARCH_POSTS = gql`
    query searchPosts(
        $type: String!
        $query: String!
        $offset: Int
        $limit: Int
    ) {
        posts(type: $type, body: $query, offset: $offset, limit: $limit) {
            count
            rows {
                id
                title
                body
                author {
                    username
                }
                type
                slug
                status
                created_at
                excerpt
                cover_image
                taxonomies {
                    id
                    name
                    type
                }
            }
        }
    }
`;

export const SEARCH_POSTS_BY_TAXONOMY = gql`
    query catPosts(
        $type: String
        $slug: String
        $postType: String
        $offset: Int
        $limit: Int
    ) {
        taxonomyBySlug(type: $type, slug: $slug) {
            post_count
            posts(type: $postType, offset: $offset, limit: $limit) {
                id
                title
                body
                type
                cover_image
                created_at
                slug
                excerpt
                taxonomies {
                    id
                    name
                    type
                }
            }
        }
    }
`;

export const BLOG_STATS = gql`
    query stats {
        stats {
            posts {
                published
                drafts
            }
            pages {
                published
                drafts
            }
            tags
            categories
        }
    }
`;

export const TAX_SUGGESTIONS = gql`
    query getTaxonomies($type: String!) {
        taxonomies(type: $type) {
            id
            name
        }
    }
`;
