import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { about, links } from "@/utils/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
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
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
