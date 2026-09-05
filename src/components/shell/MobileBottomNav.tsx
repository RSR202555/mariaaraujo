"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  TrendingUp,
  MessageSquare,
  Users,
  FileText,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function MobileBottomNav() {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  // Atalhos para Área Administrativa da Maria Personal
  const adminNavItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Painel" },
    { href: "/admin/alunas", icon: Users, label: "Alunas" },
    { href: "/admin/protocolos", icon: FileText, label: "Protocolos", badge: 7 },
    { href: "/admin/financeiro", icon: DollarSign, label: "Financeiro" },
  ];

  // Atalhos para Área do Aluno VIP
  const studentNavItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Início" },
    { href: "/meu-treino", icon: Dumbbell, label: "Treino" },
    { href: "/plano-alimentar", icon: Utensils, label: "Dieta" },
    { href: "/minha-evolucao", icon: TrendingUp, label: "Evolução" },
  ];

  const currentNavItems = isAdmin ? adminNavItems : studentNavItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090909]/95 border-t border-[#262626] backdrop-blur-xl px-2 py-2 flex items-center justify-around shadow-2xl">
      {currentNavItems.map((item) => {
        const IconComp = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin" && item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all",
              isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeBottomTab"
                className="absolute inset-0 bg-primary/10 rounded-2xl border border-primary/30"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <div className="relative z-10">
              <IconComp className={cn("h-5 w-5 transition-transform", isActive && "scale-110 text-primary")} />
              {item.badge && (
                <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[0.55rem] font-bold text-white shadow-lg">
                  {item.badge}
                </span>
              )}
            </div>

            <span className={cn("text-[0.62rem] font-semibold tracking-tight mt-1 relative z-10", isActive ? "text-white" : "text-muted-foreground")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
