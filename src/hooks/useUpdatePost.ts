import { InputUpdatePost } from "@/__generated__/__types__";
import { useUpdatePostMutation } from "@/__generated__/queries/mutations.graphql";
import { PostDocument } from "@/__generated__/queries/queries.graphql";
import { apolloBrowserClient } from "@/graphql/apolloBrowserClient";
import { debounce } from "@/shared/utils";

export const useUpdatePost = () => {
  const [updatePostMutation, progress] = useUpdatePostMutation();
  const debounceUpdatePost = debounce(updatePost, 500);

  async function updatePost(data: InputUpdatePost) {
    return await updatePostMutation({
      variables: {
        data,
      },
      update: (cache, response) => {
        cache.writeQuery({
          query: PostDocument,
          variables: { filters: { id: data.id } },
          data: {
            post: response.data?.updatePost,
          },
        });
      },
      optimisticResponse: (cache) => {
        const postData = apolloBrowserClient.readQuery({
          query: PostDocument,
          variables: { filters: { id: data.id } },
        });
        return {
          updatePost: {
            ...postData.post,
            ...cache.data,
          },
        };
      },
    });
  }

  const updateLocalState = (data: InputUpdatePost) => {
    const postData = apolloBrowserClient.readQuery({
      query: PostDocument,
      variables: { filters: { id: data.id } },
    });
    const post = {
      ...postData.post,
      ...data,
    };

    apolloBrowserClient.writeQuery({
      query: PostDocument,
      variables: { filters: { id: data.id } },
      data: {
        post,
      },
    });
  };

  return { updatePost, progress, debounceUpdatePost, updateLocalState };
};
