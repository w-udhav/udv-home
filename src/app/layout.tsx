import type { Metadata } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import BottomDockNav from "@/components/ui/bottom-dock-nav";
import CustomCursor from "@/components/ui/custom-cursor";
import SiteFooter from "@/components/ui/site-footer";
import { about, links } from "@/utils/constants";
import "./globals.css";

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${about.name} - ${about.title}`,
    template: `%s | ${about.name}`,
  },
  description: about.description,
  authors: [{ name: about.name }],
  creator: about.name,
  keywords: [
    about.title,
    "Software Engineer",
    "Portfolio",
    "Web Developer",
    "Digital Experiences",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: links.linkedin,
    title: `${about.name} - ${about.title}`,
    description: about.description,
    siteName: about.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${about.name} - ${about.title}`,
    description: about.description,
  },
  alternates: {
    canonical: links.linkedin,
  },
  other: {
    sameAs: [links.github, links.linkedin, links.instagram].join(","),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${sourceSerif4.variable} ${geist.variable} pb-28 font-serif antialiased sm:pb-32`}
      >
        <CustomCursor />
        {children}
        <BottomDockNav />
        <SiteFooter />
      </body>
    </html>
  );
}
