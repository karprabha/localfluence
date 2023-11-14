import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Localfluence - Connecting Businesses with Local Influencers",
    description:
        "Discover the ultimate synergy between businesses and influencers with Localfluence, a user-friendly platform designed to streamline influencer marketing. Find local influencers, track campaigns, and empower influencers to monetize their reach effectively.",
    keywords:
        "Localfluence, influencer marketing, local influencers, campaign tracking, monetization, business collaboration, influencer platform",
    authors: [{ name: "Your Name" }],
    icons: {
        icon: "favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <main>
                    <div>{children}</div>
                </main>
            </body>
        </html>
    );
}
