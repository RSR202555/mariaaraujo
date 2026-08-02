"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { useAppShell } from "./AppShellContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: string | number;
  onClick?: () => void;
}

export function SidebarItem({ href, icon: Icon, label, badge, onClick }: SidebarItemProps) {
  const pathname = usePathname();
  const { isCollapsed } = useAppShell();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200",
        isActive
          ? "bg-[#1B1B1B] text-white font-bold shadow-md shadow-black/40"
          : "text-muted-foreground hover:bg-[#141414] hover:text-white",
        isCollapsed ? "justify-center" : "justify-between"
      )}
      title={isCollapsed ? label : undefined}
    >
      {/* Active Page Indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-primary shadow-[0_0_10px_rgba(216,92,138,0.5)]"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <div className="flex items-center space-x-3 min-w-0">
        <Icon
          className={cn(
            "h-4 w-4 shrink-0 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
          )}
        />
        {!isCollapsed && <span className="truncate">{label}</span>}
      </div>

      {!isCollapsed && badge && (
        <span
          className={cn(
            "ml-auto text-[0.65rem] font-extrabold uppercase px-2 py-0.5 rounded-full",
            isActive
              ? "bg-primary text-white"
              : "bg-white/5 border border-white/10 text-muted-foreground group-hover:text-white"
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
