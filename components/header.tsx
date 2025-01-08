"use client";

import { useState } from "react";
import { Gamepad2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavMenu from "@/components/nav-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              {/* <Gamepad2 className="h-7 w-7" /> */}
              <Image 
                src="/logo.png"
                alt="ScratchGames.info Logo"
                width={35}
                height={35}
                className="object-contain"
              />
              <h1 className="font-bold text-xl tracking-tight">ScratchGames.info</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavMenu />
          </div>

          {/* Desktop Auth Buttons */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="hover:bg-secondary">Sign In</Button>
            <Button>Join Now</Button>
          </div> */}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-6">
                  <NavMenu orientation="vertical" />
                  {/* <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full">Sign In</Button>
                    <Button className="w-full">Join Now</Button>
                  </div> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}