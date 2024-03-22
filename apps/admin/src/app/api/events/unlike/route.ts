import { print } from "graphql";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { gql } from "urql";

import { getApiUrl } from "@/shared/getRootUrl";

const like = gql`
  mutation UnLikePost($postId: String!) {
    unLikePost(postId: $postId) {
      ok
      message
    }
  }
`;
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const id = params.get("id");
  const type = params.get("type");
  if (!id || !type) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const resp = await fetch(getApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookies().toString(),
    },
    body: JSON.stringify({
      query: print(like),
      variables: {
        postId: id,
        type,
      },
    }),
  });
  const data = await resp.json();
  return NextResponse.json(data);
}
