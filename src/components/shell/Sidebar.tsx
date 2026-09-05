"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  TrendingUp,
  Camera,
  ClipboardList,
  MessageSquare,
  User,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Users,
  FileText,
  DollarSign,
  ArrowLeftRight,
} from "lucide-react";
import { useAppShell } from "./AppShellContext";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarItem } from "./SidebarItem";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const AUTHORIZED_ADMIN_EMAIL = "mariiaraujoo32@gmail.com";

export function Sidebar() {
  const { isCollapsed, toggleCollapse, isMobileOpen, setIsMobileOpen } = useAppShell();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isAdmin = pathname.startsWith("/admin");
  const isMariaAdmin = user?.email?.trim().toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();

  interface NavItem {
    href: string;
    icon: any;
    label: string;
    badge?: string;
  }

  // Menu de Navegação da Área do Aluno VIP
  const studentNavItems: NavItem[] = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/meu-treino", icon: Dumbbell, label: "Meu Treino", badge: "Ativo" },
    { href: "/plano-alimentar", icon: Utensils, label: "Plano Alimentar" },
    { href: "/minha-evolucao", icon: TrendingUp, label: "Minha Evolução" },
    { href: "/fotos", icon: Camera, label: "Fotos" },
    { href: "/avaliacoes", icon: ClipboardList, label: "Avaliações" },
  ];

  // Menu de Navegação da Área Administrativa da Maria Personal
  const adminNavItems: NavItem[] = [
    { href: "/admin", icon: LayoutDashboard, label: "Painel Geral" },
    { href: "/admin/alunas", icon: Users, label: "Gestão de Alunas" },
    { href: "/admin/protocolos", icon: FileText, label: "Protocolos & Treinos" },
    { href: "/admin/financeiro", icon: DollarSign, label: "Financeiro Mercado Pago" },
  ];

  const mainNavItems = isAdmin ? adminNavItems : studentNavItems;

  const accountNavItems = [
    { href: "/perfil", icon: User, label: "Perfil" },
    { href: "/configuracoes", icon: Settings, label: "Configurações" },
  ];

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex h-full flex-col justify-between py-5 px-3 text-left">
      <div className="space-y-6">
        {/* Logo Header */}
        <div className={cn("flex items-center justify-between px-2", isCollapsed && !isMobile && "justify-center")}>
          <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black text-sm">
              M
            </div>
            {(!isCollapsed || isMobile) && (
              <div className="flex flex-col">
                <span className="font-extrabold text-xs tracking-tight text-white uppercase">
                  MARIA ARAÚJO<span className="text-primary">.</span>
                </span>
                <span className="text-[0.62rem] font-bold text-primary uppercase tracking-widest">
                  {isAdmin ? "Painel Admin" : "Área do Aluno"}
                </span>
              </div>
            )}
          </Link>

          {!isMobile && (
            <button
              onClick={toggleCollapse}
              className="hidden md:flex p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
              aria-label={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
            >
              {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-4">
          <SidebarGroup title={isAdmin ? "Gestão Consultoria" : "Grupo Principal"}>
            {mainNavItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                onClick={isMobile ? () => setIsMobileOpen(false) : undefined}
              />
            ))}
          </SidebarGroup>

          <SidebarGroup title="Grupo Conta">
            {accountNavItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                onClick={isMobile ? () => setIsMobileOpen(false) : undefined}
              />
            ))}
          </SidebarGroup>

          {/* Botão de Alternância visível apenas para a Personal Maria Araújo */}
          {isMariaAdmin && (
            <div className="pt-2">
              <Link
                href={isAdmin ? "/dashboard" : "/admin"}
                onClick={isMobile ? () => setIsMobileOpen(false) : undefined}
                className={cn(
                  "flex items-center rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5 transition-colors",
                  isCollapsed && !isMobile ? "justify-center" : "space-x-2.5"
                )}
              >
                <ArrowLeftRight className="h-3.5 w-3.5 text-primary shrink-0" />
                {(!isCollapsed || isMobile) && (
                  <span>{isAdmin ? "Ver como Aluno" : "Ir para Admin"}</span>
                )}
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Logout Item at Bottom */}
      <div className="pt-4 border-t border-[#262626]">
        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className={cn(
            "w-full flex items-center rounded-xl px-3 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors",
            isCollapsed && !isMobile ? "justify-center" : "space-x-3"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {(!isCollapsed || isMobile) && <span>Sair</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed top-0 left-0 z-40 h-screen border-r border-[#262626] bg-[#090909] transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer (Sheet) */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>
    </>
  );
}
