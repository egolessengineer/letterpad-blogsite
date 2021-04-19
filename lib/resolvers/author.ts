import { getSession } from "next-auth/client";
import {
  // Author as AuthorType,
  QueryResolvers,
} from "./../../__generated__/lib/type-defs.graphqls";
import { ResolverContext } from "../apollo";
import {
  MutationResolvers,
  Permissions,
  Role,
} from "../../__generated__/lib/type-defs.graphqls";
import models from "../../db/models";
import bcrypt from "bcryptjs";
import { getModifiedSession } from "./helpers";

const Author = {
  role: async author => {
    if (author.role) {
      return author.role;
    }
    try {
      const role = await author.getRole();
      return role.name;
    } catch (e) {
      throw new Error(e);
    }
  },
  permissions: async author => {
    if (author.permissions) {
      return author.permissions;
    }
    try {
      const role = await author.getRole();
      const permissions = await role.getPermissions();
      return permissions.map(p => p.name);
    } catch (e) {
      throw new Error(e);
    }
  },
};

const Query: QueryResolvers<ResolverContext> = {
  async me(_parent, _args, context, _info) {
    const session = await context.session;
    if (!session) {
      return null;
    }

    const author = await models.Author.findOne({
      where: { id: session.user.id },
    });

    return author?.get();
  },
};

const Mutation: MutationResolvers<ResolverContext> = {
  async login(_parent, args, _context, _info) {
    const author = await models.Author.findOne({
      where: { email: args.data?.email, password: args.data?.password },
    });
    if (author) {
      const role = await author.getRole();
      const per = await role.getPermissions();
      const permArr = per.map(p => p.name) as Permissions[];
      return {
        status: true,
        data: {
          ...author,
          social: JSON.parse(author.social as string),
          role: role ? (role.name as Role) : Role.Reader,
          permissions: permArr,
        },
      };
    }

    return { status: false };
  },
  async updateAuthor(_root, args, context) {
    const session = await getModifiedSession(context);
    if (session?.user.id !== args.author.id) {
      return {
        ok: true,
        errors: [{ message: "No session", path: "updateAuthor resolver" }],
      };
    }
    try {
      const dataToUpdate = { ...args.author };

      if (args.author.password) {
        dataToUpdate.password = await bcrypt.hash(args.author.password, 12);
      }

      await models.Author.update(dataToUpdate as any, {
        where: { id: args.author.id },
      });

      return {
        ok: true,
        errors: [],
      };
    } catch (e) {
      console.log("e :>> ", e);
      return {
        ok: false,
        errors: e, //utils.parseErrors(e),
      };
    }
  },
};

export default { Mutation, Author, Query };
