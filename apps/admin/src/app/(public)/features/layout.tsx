import { Metadata } from "next";

import Header from "@/components/header/Header";
import Footer from "@/components/website_v2/Footer";

export const metadata: Metadata = {
  title: "Letterpad Features",
};

const Layout = ({ children }) => {
  return (
    <div
      className="flex flex-col justify-between min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 80% 49% at 50% -25%, rgb(126 172 255 / 70%), transparent)",
      }}
    >
      <Header displayBg={false} />
      <div className="md:px-0 flex-1">
        <div className="flex flex-col justify-between">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
