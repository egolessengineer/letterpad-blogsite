import Head from "next/head";
import { FC } from "react";
import { PageHeader } from "ui/isomorphic";

import { Content } from "@/components/client-wrapper";

import { Feature } from "@/app/home/_feature";

import { PageProps } from "@/types";

const Home: FC<PageProps> = ({ settings }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <PageHeader title="Welcome to your blog! 🎉" className="site-page-header">
        <span className="help-text">
          Thank you for trying out Letterpad. We encourage you to update the
          below information first. This will allow search engines to discover
          your site.
        </span>
      </PageHeader>
      <Content>
        <div
          style={{
            fontSize: "1rem",
            padding: "40px 20px",
            minHeight: "calc(100vh - 100px)",
            paddingBottom: 20,
            display: "flex",
            alignItems: "top",
            flexDirection: "column",
            justifyContent: "left",
            lineHeight: 1.6,
          }}
        >
          <Feature />
        </div>
      </Content>
    </>
  );
};
export default Home;

// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";

// export function SearchBar() {
//   return (
//     <div className="relative w-full max-w-sm">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//         <Search className="h-5 w-5 text-gray-400" />
//       </div>
//       <Input
//         type="search"
//         className="pl-10 pr-4 py-2 w-full h-12 rounded-lg border border-[#515670] focus:ring-2 focus:ring-blue-500 bg-transparent"
//         placeholder="Search market"
//       />
//     </div>
//   );
// }
