"use client";

import Link from "next/link";
import { User, Settings, LogOut, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2.5 p-1 rounded-full hover:bg-white/5 transition-colors focus:outline-none group">
          <Avatar className="h-8 w-8 border border-white/10 group-hover:border-primary/50 transition-colors">
            <AvatarImage src="/fotocapa.png" alt="Usuário" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-black uppercase text-white tracking-wider">Aluna Maria VIP</p>
            <p className="text-[0.7rem] text-muted-foreground truncate">aluna@mariaaraujo.com</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/perfil" className="flex items-center space-x-2">
            <User className="h-3.5 w-3.5 text-primary" />
            <span>Meu Perfil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/configuracoes" className="flex items-center space-x-2">
            <Settings className="h-3.5 w-3.5 text-primary" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-rose-400 focus:text-rose-400 focus:bg-rose-500/10 cursor-pointer">
          <LogOut className="h-3.5 w-3.5 mr-2" />
          <span>Sair da Plataforma</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
