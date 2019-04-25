export default `
  type Post {
    id: Int
    title: String
    body: String
    author: Author
    excerpt: String
    cover_image: String
    type: String
    status: String
    slug: String
    mode: String
    createdAt: String
    published_at: String
    taxonomies: [Taxonomy]
  }
  type PostNode {
      count: Int,
      rows: [Post]
  }
  type PostTaxonomyNode {
    count: Int,
    posts: [Post],
  }

  type AdjacentPosts {
    previous: Post,
    next: Post
  }

  input TaxonomyInputType {
    id: Int
    name: String
    type: String
    slug: String
  }

  type Response {
    ok: Boolean!
    post: Post
    errors: [Error!]
  }

  type PostStatus {
    published: Int
    drafts: Int
  }

  type Stats {
    posts: PostStatus
    pages: PostStatus
    tags: Int
    categories: Int
  }

  type SearchResult {
    id: Int
    title: String
    excerpt: String
    published_at: String
    slug: String
  }

  type SearchOutput {
    ok: Boolean
    count: Int
    posts: [SearchResult]
  }

  type Query {
    post(id: Int, type: String, slug: String): Post
    posts(type: String, body: String, status: String, offset: Int, limit: Int, cursor: Int): PostNode
    postsMenu(slug: String,type: String, name: String, postType: String,offset: Int, limit: Int, cursor: Int): PostTaxonomyNode
    pageMenu(slug: String, name: String, postType: String): Response
    postsByTaxSlug(type: String!, slug: String!, postType: String, offset: Int, limit: Int, cursor: Int): PostTaxonomyNode
    adjacentPosts(type: String, slug:String): AdjacentPosts
    search(query: String!): SearchOutput
    stats: Stats
  }
  
  type Mutation {
    createPost(id: Int, title: String, body: String, author_id: Int, mode: String, excerpt: String, cover_image: String, type: String, status: String, slug: String, taxonomies: [TaxonomyInputType]):Response!
    updatePost(id: Int, title: String, body: String, author_id: Int, mode: String, excerpt: String, cover_image: String, type: String, status: String, slug: String, taxonomies: [TaxonomyInputType]): Response!
    deletePosts(ids: String!): Response!
    uploadFile(id: Int, cover_image: String):Response!
  }
`;
