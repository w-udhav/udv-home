import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import BottomDockNav from "@/components/ui/bottom-dock-nav";
import CustomCursor from "@/components/ui/custom-cursor";
import SiteFooter from "@/components/ui/site-footer";
import { about, links } from "@/utils/constants";
import "./globals.css";

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
});

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
        className={`${serif.variable} ${sans.variable} pb-28 font-serif antialiased sm:pb-32`}
      >
        <CustomCursor />
        {children}
        <BottomDockNav />
        <SiteFooter />
      </body>
    </html>
  );
}
