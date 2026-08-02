"use client";

import { useAppShell } from "./AppShellContext";
import { cn } from "@/lib/utils";

interface SidebarGroupProps {
  title?: string;
  children: React.ReactNode;
}

export function SidebarGroup({ title, children }: SidebarGroupProps) {
  const { isCollapsed } = useAppShell();

  return (
    <div className="space-y-1.5 py-2">
      {title && !isCollapsed && (
        <span className="px-3 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground/70 block mb-1">
          {title}
        </span>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}
