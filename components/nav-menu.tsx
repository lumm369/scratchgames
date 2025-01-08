"use client";

import Link from "next/link";
import { TrendingUp, Flame, Clock, BookOpen } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LucideIcon } from "lucide-react";
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  icon?: LucideIcon;
  label: string;
}
const navItems: NavItem[] = [
  { href: "/popular", icon: Flame, label: "Popular" },
  { href: "/trending", icon: TrendingUp, label: "Trending" },
  { href: "/recent", icon: Clock, label: "Recent" },
  // { href: "/download", icon: BookOpen, label: "Download" },
  { href: "/blog", icon: BookOpen, label: "Blog" },
];

interface NavMenuProps {
  orientation?: "horizontal" | "vertical";
}

export default function NavMenu({ orientation = "horizontal" }: NavMenuProps) {
  const pathname = usePathname();
  const baseStyles = "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary";
  const horizontalStyles = "mx-2";
  const verticalStyles = "w-full";

  return (
    <NavigationMenu>
      <NavigationMenuList className={orientation === "vertical" ? "flex-col items-start space-y-2 w-full" : "space-x-1"}>
        {navItems.map(({ href, icon: Icon, label }) => (
          <NavigationMenuItem key={href} className={orientation === "vertical" ? "w-full" : ""}>
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${
                  orientation === "vertical" ? verticalStyles : horizontalStyles
                }`}
                isActive={pathname === href}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}