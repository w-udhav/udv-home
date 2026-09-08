import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { about, links } from "@/utils/constants";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${about.name} — ${about.title}`,
    template: `%s | ${about.name}`,
  },
  description: about.description,
  authors: [{ name: about.name }],
  creator: about.name,
  keywords: [about.title, "Software Engineer", "Portfolio", "Web Developer"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: links.site,
    title: `${about.name} — ${about.title}`,
    description: about.description,
    siteName: about.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${about.name} — ${about.title}`,
    description: about.description,
  },
  alternates: {
    canonical: links.site,
  },
  other: {
    sameAs: [links.github, links.linkedin, links.instagram].join(","),
  },
};

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem("udv-theme");
    const theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Inline boot script avoids a flash of the wrong color scheme. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap only */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${serif.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
