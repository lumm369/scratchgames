import { SiteConfig } from "@/types/siteConfig";

const baseSiteConfig = {
  title: "Popular Scratch Games - Play & Explore Best Scratch Games",
  description:
    "Discover trending Scratch games updated in real-time. Play instantly, explore popular games. Updated every day with fresh content.",
  url: "https://scratchgames.info",
  ogImage: "https://scratchgames.info/og.png",
  metadataBase: '/',
  alternates: {
    canonical: "https://scratchgames.info",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/logo.png",
  },
  headerLinks: [],
  footerLinks: []
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
}
