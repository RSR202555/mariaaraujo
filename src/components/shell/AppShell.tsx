"use client";

import React from "react";
import { AppShellProvider, useAppShell } from "./AppShellContext";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ContentContainer } from "./ContentContainer";
import { MobileBottomNav } from "./MobileBottomNav";
import { cn } from "@/lib/utils";

function ShellInner({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useAppShell();

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col antialiased selection:bg-primary selection:text-white">
      <Sidebar />
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out min-w-0",
          isCollapsed ? "md:pl-[80px]" : "md:pl-[280px]"
        )}
      >
        <Topbar />
        <main className="flex-1">
          <ContentContainer>{children}</ContentContainer>
        </main>
      </div>

      {/* Fixed Bottom Dock Navigation Bar for Mobile */}
      <MobileBottomNav />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShellProvider>
      <ShellInner>{children}</ShellInner>
    </AppShellProvider>
  );
}
