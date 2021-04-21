import { signIn, useSession } from "next-auth/client";
import {
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
  PostTypes,
} from "../../__generated__/lib/queries/queries.graphql";
import Link from "next/link";
import { initializeApollo } from "../../lib/apollo";
import { Button, Layout, PageHeader, Table } from "antd";

import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import {
  Author,
  Image,
  Setting,
  Tags,
} from "../../__generated__/lib/type-defs.graphqls";
const { Header, Content, Footer } = Layout;
import CustomLayout from "../../layouts/Layout";
import { PostsNode } from "../../lib/type-defs.graphqls";
import { useRouter } from "next/router";
import { useEffect } from "react";

const columns = [
  {
    title: "Image",
    dataIndex: "cover_image",
    key: "cover_image",
    responsive: ["md"] as Breakpoint[],
    render: (cover_image: Image) => <img src={cover_image.src} width={80} />,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (title: string, record) => (
      <Link href={"/post/" + record.id}>
        <a>{title}</a>
      </Link>
    ),
  },
  {
    title: "Description",
    dataIndex: "excerpt",
    key: "excerpt",
    responsive: ["md"] as Breakpoint[],
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    responsive: ["lg"] as Breakpoint[],
    render: (author: Author) => author.name,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags: Tags[]) => tags.map(tag => tag.name).join(", "),
  },
  {
    title: "Published",
    dataIndex: "publishedAt",
    key: "publishedAt",
  },
];

interface IProps {
  data: PostsNode;
  settings: Setting;
}

export default function Posts({ data, settings }: IProps) {
  const [session, loading] = useSession();
  const router = useRouter();
  if (typeof window !== "undefined" && loading) return null;

  useEffect(() => {
    if (!session) {
      signIn();
    }
  }, []);

  // If no session exists, display access denied message
  if (!session) {
    return <div>Access denied</div>;
  }

  const posts = data.rows.map(post => {
    return {
      ...post,
      key: post.id,
    };
  });

  // If session exists, display content
  return (
    <CustomLayout settings={settings}>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Posts"
        // subTitle="This is a subtitle"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => router.push("/post/create")}
          >
            New Post
          </Button>,
        ]}
      ></PageHeader>
      <Content style={{ margin: "16px 0px 0" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: "77vh" }}
        >
          <Table columns={columns} dataSource={posts} />
        </div>
      </Content>
    </CustomLayout>
  );
}

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo({}, context);

  const post = await apolloClient.query<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    variables: {
      filters: {
        type: PostTypes.Post,
      },
    },
  });
  return {
    props: {
      data: post.data.posts,
    },
  };
}
