import Sequelize from "sequelize";
import Fuse from "fuse.js";
import { _createPost, _updatePost } from "../models/post";
import {
  checkDisplayAccess,
  createPostsPerm,
  editPostPerm,
} from "../utils/permissions";
import memoryCache from "../utils/memoryCache";
import { innertext } from "../utils/common";
import { getMenuItemFromSlug } from "./selectors/post";

const noResult = {
  count: 0,
  rows: [],
};

const postresolver = {
  Query: {
    /**
     * Query to take care of multiple post in one page.
     * Used for Search and Admin posts and pages list.
     */
    posts: checkDisplayAccess.createResolver(
      async (root, args, { models, user }) => {
        const conditions = { include: [], where: {}, limit: 20 };

        const {
          status,
          sortBy,
          author,
          tag,
          category,
          limit,
          query,
          cursor,
          type,
          page,
        } = args.filters;

        if (category) {
          const taxCategory = await models.Taxonomy.findOne({
            where: { name: category },
          });
          if (!taxCategory) return noResult;
          conditions.include.push({
            model: models.PostTaxonomy,
            where: { taxonomy_id: taxCategory.id },
            require: true,
          });
        }

        if (tag) {
          const taxTag = await models.Taxonomy.findOne({
            where: { name: tag },
          });
          if (!taxTag) return noResult;

          conditions.include.push({
            model: models.PostTaxonomy,
            where: { taxonomy_id: taxTag.id },
            require: true,
          });
        }

        if (author) {
          const authorCondition = {
            where: {
              fname: { [Sequelize.Op.like]: "%" + author + "%" },
            },
          };
          const author = await models.Author.findOne(authorCondition);

          if (!author) {
            return noResult;
          }
          conditions.include.push({
            model: models.Author,
            where: { id: author.id },
            require: true,
          });
        }

        if (type) {
          conditions.where.type = type;
        }

        if (status) {
          conditions.where.status = status;
        } else {
          conditions.where.status = { [Sequelize.Op.ne]: "trash" };
        }

        conditions.order = [["updatedAt", "DESC"]];
        if (sortBy) {
          conditions.order = [
            ["updatedAt", sortBy === "oldest" ? "ASC" : "DESC"],
          ];
          // for public users, sort it based on published date
          if (user && user.id) {
            conditions.order = [["publishedAt", "DESC"]];
          }
        }

        if (limit) {
          conditions.limit = limit;
        }

        if (query) {
          conditions.where.title = {
            [Sequelize.Op.like]: "%" + query + "%",
          };
        }
        if (cursor) {
          conditions.where.id = { [Sequelize.Op.gt]: cursor };
        } else if (page) {
          conditions.offset = (page - 1) * conditions.limit;
        }
        const result = await models.Post.findAndCountAll(conditions);
        return {
          count: result.count,
          rows: result.rows,
        };
      },
    ),

    search: async (root, args, { models, user }) => {
      let cachedData = memoryCache.get("posts");
      if (!cachedData) {
        const data = await models.Post.findAll({
          attributes: ["id", "title", "body", "excerpt", "publishedAt", "slug"],
          where: { status: "publish" },
        });

        const cleanedData = data.map(item => {
          let cleanItem = item.toJSON();
          cleanItem.body = innertext(cleanItem.body);
          return cleanItem;
        });
        memoryCache.set("posts", cleanedData);
        cachedData = cleanedData;
      }

      const options = {
        keys: [
          {
            name: "title",
            weight: 1,
          },
          {
            name: "excerpt",
            weight: 0.9,
          },
          {
            name: "body",
            weight: 0.8,
          },
        ],
        includeMatches: true,
      };

      const fuse = new Fuse(cachedData, options);
      const searchResult = fuse.search(args.query).map(data => {
        delete data.item.body;
        return data.item;
      });
      return {
        ok: true,
        rows: searchResult.slice(0, 6),
        count: 6,
      };
    },
    /**
     * Query to handle a single post/page.
     */
    post: checkDisplayAccess.createResolver((root, args, { models }) => {
      const conditions = { where: { ...args.filters } };
      if (args.filters.id) {
        conditions.where.id = args.filters.id;
      }
      if (args.filters.slug) {
        conditions.where.slug = args.filters.slug;
      }
      return models.Post.findOne(conditions);
    }),
    /**
     * Query to take care of posts/page from navigation menu.
     * The navigation menu item will be either a category or a page.
     *
     * First we get the menu object and loop though it to
     * find the item (by matching slug) which was clicked.
     * Note: The menu can have nested children.
     *
     */
    menuContent: async (root, args, { models, user }) => {
      let menu = await models.Setting.findOne({
        where: { option: "menu" },
      });
      const filters = { ...args.filters, status: "publish" };
      menu = JSON.parse(menu.dataValues.value);
      let menuItem = {};
      if (args.filters.slug === "/") {
        menuItem = menu[0];
      } else {
        menuItem = getMenuItemFromSlug(
          menu,
          args.filters.slug,
          args.filters.type,
        );
      }

      if (menuItem.type === "page") {
        filters.type = menuItem.type;
        filters.slug = menuItem.slug;
      } else if (menuItem.type === "category") {
        filters.category = menuItem.title;
        filters.type = "post";
        delete filters.slug;
      } else {
        return noResult;
      }
      const result = await postresolver.Query.posts(
        root,
        { filters },
        {
          models,
          user,
        },
      );
      return {
        count: result.count,
        rows: result.rows,
      };
    },
    /**
     * Query to take care of adjacent posts.
     */
    adjacentPosts: async (root, args, { models }) => {
      let result = {};
      args.status = "publish";
      args.type = "post";
      // get the current post
      const currentPost = await models.Post.findOne({ where: args });
      if (currentPost === null) {
        throw new Error("Invalid query");
      }

      // we dont need the slug anymore. Clone and remove it.
      const { slug, ...newArgs } = args;

      // get the preview item
      result.previous = await models.Post.findOne({
        where: {
          ...newArgs,
          id: { [Sequelize.Op.lt]: currentPost.id },
        },
        order: [["id", "DESC"]],
      });

      // get the next item
      result.next = await models.Post.findOne({
        where: {
          ...newArgs,
          id: {
            [Sequelize.Op.gt]: currentPost.dataValues.id,
          },
        },
        order: [["id", "ASC"]],
      });

      return result;
    },
    /**
     * Query to get posts by taxonomy slug and taxonomy type.
     * The type can be post_category or post_tag
     */
    postsByTaxinomySlug: checkDisplayAccess.createResolver(
      async (root, args, { models, user }) => {
        // Get the taxonomy item
        const filters = { ...args };
        const taxonomy = await models.Taxonomy.findOne({
          where: { slug: args.slug, type: args.type },
        });
        if (!taxonomy) {
          return noResult;
        }
        if (taxonomy.type === "post_category") {
          filters.category = taxonomy.name;
        } else {
          filters.tag = taxonomy.name;
        }
        const result = await postresolver.Query.posts(
          root,
          { filters },
          {
            models,
            user,
          },
        );
        return {
          count: result.count,
          rows: result.rows,
        };
      },
    ),
    /**
     * Query to get some stats for the admin dashboard
     * TODO: Make one query to process all the data
     */
    stats: async (root, args, { models }) => {
      const result = {
        posts: { published: 0, drafts: 0 },
        pages: { published: 0, drafts: 0 },
        tags: 0,
        categories: 0,
      };
      result.posts.published = await models.Post.count({
        where: { status: "publish", type: "post" },
      });

      result.posts.drafts = await models.Post.count({
        where: { status: "draft", type: "post" },
      });

      result.pages.published = await models.Post.count({
        where: { status: "publish", type: "page" },
      });

      result.pages.drafts = await models.Post.count({
        where: { status: "draft", type: "page" },
      });

      result.categories = await models.Taxonomy.count({
        where: { type: "post_category" },
      });
      result.tags = await models.Taxonomy.count({
        where: { type: "post_tag" },
      });

      return result;
    },
  },
  Mutation: {
    createPost: createPostsPerm.createResolver(
      (root, args, { models, user }) => {
        args.data.authorId = user.id;
        memoryCache.del("posts");
        return _createPost(args.data, models);
      },
    ),
    updatePost: editPostPerm.createResolver((root, args, { models }) => {
      memoryCache.del("posts");
      return _updatePost(args.data, models);
    }),
    uploadFile: editPostPerm.createResolver((root, args, { models }) => {
      return _updatePost(args, models);
    }),
    deletePosts: editPostPerm.createResolver(async (root, args, { models }) => {
      try {
        const deleteFromSystem = args.deleteFromSystem || false;
        if (deleteFromSystem) {
          await models.Post.destroy({
            where: { id: args.ids },
          });
        } else {
          await models.Post.update(
            { status: "trash" },
            {
              where: {
                id: args.ids,
              },
            },
          );
          memoryCache.del("posts");
        }
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          errors: [
            {
              message: e.message,
              path: "deleteMessage",
            },
          ],
        };
      }
    }),
  },
  Post: {
    author: post => post.getAuthor(),
    taxonomies: post => {
      return post.getTaxonomies();
    },
  },
};

export default postresolver;
