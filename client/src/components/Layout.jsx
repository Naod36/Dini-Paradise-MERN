import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavbarDemo from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-transparent">
      <NavbarDemo />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
