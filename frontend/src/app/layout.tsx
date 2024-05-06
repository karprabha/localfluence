import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Localfluence",
  description:
    "User-friendly platform for businesses and influencers. Facilitates finding local influencers, tracking campaigns, and enabling influencers to monetize their reach.",
  keywords:
    "Localfluence, influencer marketing, local influencers, campaign tracking, monetization, business collaboration, influencer platform",
  authors: [{ name: "Prabhakar Yadav" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <main className="h-full bg-gray-100">
          <div className="max-w-7xl px-4 m-auto">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
