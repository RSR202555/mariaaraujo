"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { user: authUser, logout } = useAuth();
  const router = useRouter();

  const [activeUser, setActiveUser] = useState<{ fullName: string; email: string; avatarUrl?: string }>({
    fullName: "Rian Flamengo",
    email: "rianflamengo8@gmail.com",
    avatarUrl: "",
  });

  useEffect(() => {
    // Tenta obter do useAuth ou localStorage
    if (authUser?.email && authUser.email !== "aluna@mariaaraujo.com") {
      setActiveUser({
        fullName: authUser.fullName || "Rian Flamengo",
        email: authUser.email,
        avatarUrl: authUser.avatarUrl || "",
      });
    } else if (typeof window !== "undefined") {
      const saved = localStorage.getItem("maria_active_user");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.email) {
            setActiveUser({
              fullName: parsed.fullName || "Rian Flamengo",
              email: parsed.email,
              avatarUrl: parsed.avatarUrl || "",
            });
          }
        } catch {}
      }
    }
  }, [authUser]);

  const fullName = activeUser.fullName || "Rian Flamengo";
  const email = activeUser.email || "rianflamengo8@gmail.com";
  const avatarUrl = activeUser.avatarUrl;

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "RF";

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("maria_active_user");
    }
    await logout();
    router.push("/aluno");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2.5 p-1 rounded-full hover:bg-white/5 transition-colors focus:outline-none group">
          <Avatar className="h-9 w-9 border border-white/10 group-hover:border-primary/50 transition-colors">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={fullName} />
            ) : (
              <AvatarFallback className="bg-primary/20 text-primary font-black text-xs border border-primary/30">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 p-2 bg-[#0d0d0d] border-[#262626]">
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-black uppercase text-white tracking-wider truncate">
              {fullName}
            </p>
            <p className="text-[0.7rem] text-primary font-semibold truncate">{email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-[#222]" />

        <DropdownMenuItem asChild>
          <Link href="/perfil" className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-gray-200 hover:text-white">
            <User className="h-3.5 w-3.5 text-primary" />
            <span>Meu Perfil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/configuracoes" className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-gray-200 hover:text-white">
            <Settings className="h-3.5 w-3.5 text-primary" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#222]" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-rose-400 focus:text-rose-400 focus:bg-rose-500/10 cursor-pointer text-xs font-bold"
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          <span>Sair da Plataforma</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
