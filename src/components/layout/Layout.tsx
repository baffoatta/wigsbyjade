import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import StaticReviewsTab from "./StaticReviewsTab";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />

      {/* Static Reviews Tab - Fixed Position */}
      <StaticReviewsTab />
    </div>
  );
};

export default Layout;
