"use client";

import { Bell, ShieldCheck, Camera, ClipboardList } from "lucide-react";
import { AdminNotification } from "@/types/admin";

interface NotificationPanelProps {
  notifications?: AdminNotification[];
}

const defaultNotifications: AdminNotification[] = [
  {
    id: "1",
    title: "Novo Pagamento Aprovado no Asaas",
    description: "Juliana Mendes assinou a Consultoria Premium VIP.",
    timeAgo: "Há 10 min",
    unread: true,
  },
  {
    id: "2",
    title: "Aluno enviou novas fotos",
    description: "Camila Fernandes enviou 4 fotos posturais de reavaliação.",
    timeAgo: "Há 45 min",
    unread: true,
  },
  {
    id: "3",
    title: "Aluno solicitou reavaliação",
    description: "Beatriz Ramos concluiu o formulário quinzenal.",
    timeAgo: "Há 2 horas",
    unread: false,
  },
];

export function NotificationPanel({ notifications = defaultNotifications }: NotificationPanelProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl group hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4 text-primary" />
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Notificações
          </h3>
        </div>
        <span className="text-[0.65rem] font-bold uppercase text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
          {notifications.filter((n) => n.unread).length} Novas
        </span>
      </div>

      <div className="space-y-2.5">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-2xl border transition-all flex items-start space-x-3 ${
              item.unread
                ? "bg-[#090909] border-primary/30"
                : "bg-[#090909]/50 border-[#262626] opacity-80"
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5">
              <Bell className="h-4 w-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{item.title}</span>
                <span className="text-[0.62rem] text-muted-foreground">{item.timeAgo}</span>
              </div>
              <p className="text-[0.7rem] text-muted-foreground truncate mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
