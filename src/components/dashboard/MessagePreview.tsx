"use client";

import { MessageSquare, ArrowRight, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardMessage } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

interface MessagePreviewProps {
  message?: DashboardMessage;
}

const defaultMessage: DashboardMessage = {
  id: "1",
  senderName: "Maria Araújo Personal",
  senderAvatar: "/fotocapa.png",
  lastMessage: "Excelente execução no leg press! Aumente 5kg na próxima semana mantendo a cadência.",
  timeAgo: "Há 2 horas",
  unreadCount: 1,
};

export function MessagePreview({ message = defaultMessage }: MessagePreviewProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl group hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Mensagens Diretas
          </h3>
        </div>
        {message.unreadCount > 0 && (
          <span className="text-[0.65rem] font-bold uppercase text-white bg-primary px-2.5 py-0.5 rounded-full shadow-md shadow-primary/30">
            {message.unreadCount} Mensagem Direta
          </span>
        )}
      </div>

      {/* Box de Preview da Mensagem */}
      <div className="bg-[#090909] border border-[#262626] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Avatar className="h-8 w-8 border border-primary/40">
              <AvatarImage src={message.senderAvatar} alt={message.senderName} />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-xs font-bold uppercase text-white block">{message.senderName}</span>
              <span className="text-[0.62rem] text-muted-foreground">{message.timeAgo}</span>
            </div>
          </div>
          <CheckCheck className="h-4 w-4 text-primary" />
        </div>

        <p className="text-xs text-gray-300 leading-relaxed italic bg-[#141414]/60 p-3 rounded-xl border border-white/5">
          "{message.lastMessage}"
        </p>
      </div>

      <Button
        onClick={() => (window.location.href = "/mensagens")}
        variant="glow"
        className="w-full py-5 rounded-full font-black text-xs uppercase tracking-wider"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        <span>ABRIR CHAT DA CONSULTORIA</span>
      </Button>
    </div>
  );
}
