import { requiresAdmin } from "../utils/permissions";

export default {
  Query: {
    themeSettings: async (root, args, { models }) => {
      return models.Theme.findAll({ where: args });
    },
  },
  Mutation: {
    insertThemeSettings: requiresAdmin.createResolver(
      async (root, args, { models }) => {
        // console.log(args);
        return models.Theme.create(args);
      },
    ),
    updateThemeSettings: requiresAdmin.createResolver(
      async (root, args, { models }) => {
        const { settings, value, name } = args;
        return models.Theme.update({ settings, value }, { where: { name } });
      },
    ),
  },
};
