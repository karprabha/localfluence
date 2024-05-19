"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import UserTypeForm from "./components/UserTypeForm";
import { ME } from "@/graphql/queries";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading, error, data } = useQuery(ME);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const { me } = data;

  return (
    <>
      {me.userType === null && <UserTypeForm me={me} />}
      {me.userType !== null && (
        <>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-col md:pl-64 flex-1">
            <Header setSidebarOpen={setSidebarOpen} me={me} />
            <main className="flex-1">
              <div className="py-6">{children}</div>
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
