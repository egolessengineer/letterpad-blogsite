import { FC } from "react";
import { BuilderContext, Layout as LayoutBuilder } from "ui";

import { CreativesHead } from "@/components/creatives";
import { FileExplorer } from "@/components/file-explorer";

import { Post } from "@/__generated__/__types__";

import { Title } from "../components/title";

interface Props {
  post?: Post;
}

export const Creatives: FC<Props> = ({ post }) => {
  if (!post) return null;
  return (
    <div className="my-10">
      <div className="mx-4">
        <Title title={post.title || ""} postId={post?.id} />
      </div>
      <BuilderContext
        data={JSON.parse(post.page_data as string).rows}
        onSave={
          (page_data) => {}
          //   debounceUpdatePostAPI({
          //     id: post.id,
          //     page_data: JSON.stringify({ rows: page_data }),
          //   })
        }
        FileExplorer={FileExplorer}
      >
        <LayoutBuilder head={<CreativesHead />} />
      </BuilderContext>
    </div>
  );
};
