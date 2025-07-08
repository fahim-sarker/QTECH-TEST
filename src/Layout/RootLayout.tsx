import React from "react";

import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../Components/Shared/Header";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const RootLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <ScrollRestoration />
      <Footer />
    </>
  );
};

export default RootLayout;
