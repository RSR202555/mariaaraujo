"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useAppShell } from "./AppShellContext";
import { Breadcrumb } from "./Breadcrumb";
import { SearchInput } from "./SearchInput";
import { NotificationButton } from "./NotificationButton";
import { UserMenu } from "./UserMenu";

export function Topbar() {
  const { setIsMobileOpen } = useAppShell();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#262626] bg-[#090909]/90 px-3 sm:px-8 backdrop-blur-md">
      {/* Left: Mobile Toggle / Small Logo & Breadcrumb */}
      <div className="flex items-center space-x-3">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden p-2 text-muted-foreground hover:text-white rounded-xl bg-white/5 border border-white/10"
          aria-label="Abrir menu mobile"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Small Logo on Mobile */}
        <Link href="/dashboard" className="md:hidden font-black text-sm text-white tracking-tight">
          MARIA<span className="text-primary">.</span>
        </Link>

        {/* Breadcrumb Navigation */}
        <div className="hidden sm:block">
          <Breadcrumb />
        </div>
      </div>

      {/* Right: Search, Notifications & User Dropdown */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <SearchInput />
        <NotificationButton />
        <div className="h-4 w-px bg-[#262626] mx-0.5 hidden sm:block" />
        <UserMenu />
      </div>
    </header>
  );
}
