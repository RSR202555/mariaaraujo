"use client";

import { MessageSquare, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminMessageSummary } from "@/types/admin";
import { Button } from "@/components/ui/button";

interface MessagePanelProps {
  messages?: AdminMessageSummary[];
}

const defaultMessages: AdminMessageSummary[] = [
  {
    id: "1",
    studentName: "Juliana Mendes",
    studentAvatar: "/fotocapa.png",
    lastMessage: "Maria, enviei o vídeo do agachamento! Pode dar uma olhada na cadência?",
    timeAgo: "Há 12 min",
    unreadCount: 2,
  },
  {
    id: "2",
    studentName: "Camila Fernandes",
    studentAvatar: "/fotocapa.png",
    lastMessage: "Perfeito! Já comprei os ingredientes da tabela de substituições.",
    timeAgo: "Há 1 hora",
    unreadCount: 0,
  },
  {
    id: "3",
    studentName: "Beatriz Ramos",
    studentAvatar: "/fotocapa.png",
    lastMessage: "Obrigada pelas correções no treino A, senti muito mais o glúteo!",
    timeAgo: "Há 3 horas",
    unreadCount: 0,
  },
];

export function MessagePanel({ messages = [] }: MessagePanelProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl group hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Conversas com Alunas
          </h3>
        </div>
        <span className="text-[0.65rem] font-bold uppercase text-white bg-primary px-2.5 py-0.5 rounded-full shadow-md shadow-primary/30">
          Chat Ativo
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="p-5 text-center space-y-1 bg-[#090909] border border-[#262626] rounded-2xl">
          <p className="text-xs font-semibold text-gray-300">Nenhuma conversa pendente</p>
          <p className="text-[0.68rem] text-muted-foreground">Mensagens diretas enviadas por alunas aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {messages.map((item) => (
            <div
              key={item.id}
              className="bg-[#090909] border border-[#262626] rounded-2xl p-3 flex items-start space-x-3 hover:border-white/20 transition-all"
            >
              <Avatar className="h-9 w-9 border border-white/10 shrink-0 mt-0.5">
                <AvatarImage src={item.studentAvatar} alt={item.studentName} />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">{item.studentName}</span>
                  <span className="text-[0.62rem] text-muted-foreground">{item.timeAgo}</span>
                </div>
                <p className="text-[0.7rem] text-gray-300 truncate mt-0.5 leading-tight">{item.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={() => (window.location.href = "/mensagens")}
        variant="glow"
        className="w-full py-5 rounded-full font-black text-xs uppercase tracking-wider"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        <span>ABRIR CHAT DE CONSULTORIA</span>
      </Button>
    </div>
  );
}
