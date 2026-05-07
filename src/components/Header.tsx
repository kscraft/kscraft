"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/StoreContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const Header = observer(() => {
  const { catalogStore } = useStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-14 w-48">
              <Image
                src="/assets/source/img/logo.png"
                alt="Kiran Slido Craft"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {catalogStore.navGroups.map((group) => (
                <NavigationMenuItem key={group.title}>
                  <NavigationMenuTrigger className="text-xs font-extrabold uppercase tracking-wider text-slate-700 hover:text-blue-600">
                    {group.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {group.items.map(([title, href]) => (
                        <li key={title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/${href.replace(".html", "")}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-blue-600"
                            >
                              <div className="text-sm font-bold leading-none">{title}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+919324084590"
            className="hidden items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-black uppercase tracking-tight text-white transition-transform hover:scale-105 active:scale-95 sm:flex"
          >
            +91 93240 84590
          </a>
          {/* Mobile menu could go here */}
        </div>
      </div>
    </header>
  );
});
