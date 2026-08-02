"use client";

import { Bell, CheckCircle2, Dumbbell, Calendar, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationButton() {
  const notifications = [
    {
      id: 1,
      title: "Novo treino disponível!",
      description: "Maria enviou seu novo treino B - Hipertrofia.",
      time: "Há 10 min",
      icon: Dumbbell,
      unread: true,
    },
    {
      id: 2,
      title: "Avaliação semanal",
      description: "Sua próxima avaliação é em 2 dias.",
      time: "Há 2 horas",
      icon: Calendar,
      unread: true,
    },
    {
      id: 3,
      title: "Mensagem da Maria",
      description: "Vídeo de execução analisado com sucesso.",
      time: "Ontem",
      icon: MessageSquare,
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-2 rounded-xl border border-[#262626] bg-[#141414] text-muted-foreground hover:text-white hover:border-white/20 transition-all focus:outline-none"
          aria-label="Notificações"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-white shadow-lg">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-3 py-2">
          <DropdownMenuLabel className="p-0 text-xs font-black uppercase text-white">
            Notificações
          </DropdownMenuLabel>
          <span className="text-[0.65rem] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {unreadCount} Novas
          </span>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-72 overflow-y-auto space-y-1">
          {notifications.map((item) => {
            const IconComp = item.icon;
            return (
              <DropdownMenuItem key={item.id} className="flex items-start space-x-3 p-2.5">
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <IconComp className="h-3.5 w-3.5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{item.title}</span>
                    <span className="text-[0.65rem] text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-[0.7rem] text-muted-foreground truncate mt-0.5">{item.description}</p>
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="justify-center text-[0.7rem] font-bold uppercase text-primary cursor-pointer py-2">
          Marcar todas como lidas
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
