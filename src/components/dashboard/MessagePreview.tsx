"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, ArrowRight, CheckCheck, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardMessage } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function MessagePreview() {
  const { user } = useAuth();
  const studentEmail = user?.email || "rianflamengo8@gmail.com";
  const [latestMessage, setLatestMessage] = useState<DashboardMessage | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedKey = `maria_messages_${studentEmail.toLowerCase()}`;
    const savedData = localStorage.getItem(savedKey);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const last = parsed[parsed.length - 1];
          setLatestMessage({
            id: last.id || "msg-1",
            senderName: last.senderName || "Maria Araújo Personal",
            senderAvatar: "/fotocapa.png",
            lastMessage: last.content || last.lastMessage,
            timeAgo: last.timeAgo || "Recentemente",
            unreadCount: last.isUnread ? 1 : 0,
          });
          return;
        }
      } catch {}
    }

    setLatestMessage(null);
  }, [studentEmail]);

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl group hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Mensagens Diretas
          </h3>
        </div>
        {latestMessage && latestMessage.unreadCount > 0 ? (
          <span className="text-[0.65rem] font-bold uppercase text-white bg-primary px-2.5 py-0.5 rounded-full shadow-md shadow-primary/30">
            {latestMessage.unreadCount} Nova Mensagem
          </span>
        ) : (
          <span className="text-[0.65rem] font-bold uppercase text-muted-foreground bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
            Chat Direct
          </span>
        )}
      </div>

      {/* Conteúdo Real ou Empty State */}
      {latestMessage ? (
        <div className="bg-[#090909] border border-[#262626] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Avatar className="h-8 w-8 border border-primary/40">
                <AvatarImage src={latestMessage.senderAvatar} alt={latestMessage.senderName} />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-xs font-bold uppercase text-white block">{latestMessage.senderName}</span>
                <span className="text-[0.62rem] text-muted-foreground">{latestMessage.timeAgo}</span>
              </div>
            </div>
            <CheckCheck className="h-4 w-4 text-primary" />
          </div>

          <p className="text-xs text-gray-300 leading-relaxed italic bg-[#141414]/60 p-3 rounded-xl border border-white/5">
            "{latestMessage.lastMessage}"
          </p>
        </div>
      ) : (
        <div className="bg-[#090909] border border-[#262626] rounded-2xl p-5 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white">Nenhuma mensagem recente</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Tire dúvidas sobre seu treino e dieta diretamente com a Maria no chat exclusivo da consultoria.
            </p>
          </div>
        </div>
      )}

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
