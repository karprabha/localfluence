"use client";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col md:pl-64 flex-1">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1">
          <div className="py-6">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
