import { graphql } from "@apollo/react-hoc";
import { THEME_SETTINGS } from "../../shared/queries/Queries";

export default graphql(THEME_SETTINGS, {
  props: ({ data: { loading, settings } }) => ({
    settings,
    loading,
  }),
});
