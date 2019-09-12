import { graphql } from "@apollo/react-hoc";
import { UPDATE_OPTIONS } from "../../shared/queries/Mutations";

export default graphql(UPDATE_OPTIONS, {
  props: ({ mutate }) => {
    return {
      updateOptions: data =>
        mutate({
          variables: { options: data },
          updateQuery: (previousResult, { mutationResult }) => {
            return {
              settings: [
                ...previousResult.settings,
                ...mutationResult.data.updatedOptions,
              ],
            };
          },
        }),
    };
  },
});
