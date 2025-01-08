import { LucideIcon } from 'lucide-react';

export type Link = {
  name: string
  href: string
  icon?: LucideIcon
}
export type AlternateURLs = {
  canonical: string
}
export type SiteConfig = {
  title: string
  description: string
  url: string
  ogImage: string
  metadataBase: URL | string
  alternates: AlternateURLs
  icons: {
    icon: string
    shortcut?: string
    apple?: string
  }
  headerLinks: Link[]
  footerLinks: Link[]
}

