import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

import UseAuthListner from "../app/UseAuthListner.jsx";

const RootLayout = () => {
  UseAuthListner();
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1c1c1c] to-[#111] text-white flex flex-col">
      <Header />
      <div className="min-h-max mb-8">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;

