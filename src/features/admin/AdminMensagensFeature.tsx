"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  Phone,
  Search,
  User,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatService, ChatThread } from "@/services/chatService";

export function AdminMensagensFeature() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeEmail, setActiveEmail] = useState<string>("rianflamengo8@gmail.com");
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadData = () => {
    const all = ChatService.getAllThreads();
    setThreads(all);
    if (all.length > 0 && !activeEmail) {
      setActiveEmail(all[0].studentEmail);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("maria_chat_updated", handleUpdate);

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel("maria_chat_channel");
      channel.onmessage = () => loadData();
    } catch {}

    const interval = setInterval(loadData, 1000);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("maria_chat_updated", handleUpdate);
      if (channel) channel.close();
      clearInterval(interval);
    };
  }, []);

  const activeThread =
    threads.find((t) => t.studentEmail.toLowerCase().trim() === activeEmail.toLowerCase().trim()) ||
    threads[0];

  useEffect(() => {
    if (activeThread) {
      ChatService.markAsRead(activeThread.studentEmail, "ADMIN");
    }
  }, [activeEmail, activeThread?.messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;

    ChatService.sendMessage(activeThread.studentEmail, "ADMIN", inputText.trim());
    setInputText("");
    loadData();
  };

  const filteredThreads = threads.filter(
    (t) =>
      t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.studentEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      {/* Container Principal do Chat Admin */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 h-[680px]">
        {/* COLUNA ESQUERDA: LISTA DE ALUNAS */}
        <div className="md:col-span-4 border-r border-[#262626] flex flex-col bg-[#0d0d0d]">
          {/* Header da Sidebar de Alunas */}
          <div className="p-4 border-b border-[#262626] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-primary" /> Conversas da Consultoria
              </span>
              <span className="text-[0.65rem] font-extrabold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                {threads.filter((t) => t.unreadCountAdmin > 0).length} Não Lidas
              </span>
            </div>

            {/* Campo de Busca de Aluno */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar aluno por nome ou e-mail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-[#141414] border-[#262626] text-xs text-white rounded-xl focus:border-primary"
              />
            </div>
          </div>

          {/* Lista Scrollável de Alunos */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1a1a1a]">
            {filteredThreads.length === 0 ? (
              <div className="py-12 px-4 text-center text-xs text-muted-foreground space-y-2">
                <User className="w-6 h-6 mx-auto opacity-50 text-primary" />
                <p>Nenhuma conversa iniciada.</p>
              </div>
            ) : (
              filteredThreads.map((t) => {
                const isActive = t.studentEmail.toLowerCase().trim() === activeThread?.studentEmail.toLowerCase().trim();
                const timeFormatted = new Date(t.lastTimestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <button
                    key={t.studentEmail}
                    onClick={() => {
                      setActiveEmail(t.studentEmail);
                      ChatService.markAsRead(t.studentEmail, "ADMIN");
                    }}
                    className={`w-full p-4 text-left flex items-start space-x-3 transition-colors ${
                      isActive ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <img
                      src={t.studentAvatar}
                      alt={t.studentName}
                      className="w-10 h-10 rounded-full object-cover border border-primary/30 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-extrabold text-white truncate">{t.studentName}</span>
                        <span className="text-[0.62rem] text-muted-foreground">{timeFormatted}</span>
                      </div>
                      <p className="text-[0.7rem] text-muted-foreground truncate">{t.lastMessage}</p>
                    </div>

                    {t.unreadCountAdmin > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-black font-black text-[0.62rem] flex items-center justify-center shrink-0 shadow-md shadow-primary/30">
                        {t.unreadCountAdmin}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: CONVERSA ATIVA */}
        {activeThread ? (
          <div className="md:col-span-8 flex flex-col h-full bg-[#090909]">
            {/* Header da Aluna Selecionada */}
            <div className="p-4 border-b border-[#262626] flex items-center justify-between bg-[#0d0d0d]">
              <div className="flex items-center space-x-3">
                <img
                  src={activeThread.studentAvatar}
                  alt={activeThread.studentName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h3 className="text-sm font-extrabold text-white">{activeThread.studentName}</h3>
                  <p className="text-[0.7rem] text-muted-foreground flex items-center gap-1.5">
                    <span>{activeThread.studentEmail}</span> •{" "}
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Aluna VIP Ativa
                    </span>
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/5511999999999?text=Ol%C3%A1%20${encodeURIComponent(
                  activeThread.studentName
                )}!%20Aqui%20%C3%A9%20a%20Maria%20Ara%C3%BAjo.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs font-bold border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5" /> WhatsApp Direct
                </Button>
              </a>
            </div>

            {/* Lista de Mensagens na Thread */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#0d0d0d]">
              {activeThread.messages.map((msg) => {
                const isAdmin = msg.sender === "ADMIN";
                const timeFormatted = new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-md p-4 rounded-2xl text-xs space-y-1 ${
                        isAdmin
                          ? "bg-primary text-black font-semibold rounded-tr-none shadow-lg shadow-primary/20"
                          : "bg-[#141414] border border-[#262626] text-gray-200 rounded-tl-none"
                      }`}
                    >
                      {!isAdmin && (
                        <span className="text-[0.65rem] font-black uppercase tracking-wider text-primary block">
                          {msg.senderName || activeThread.studentName}
                        </span>
                      )}
                      <p className="leading-relaxed">{msg.text}</p>
                      <span
                        className={`text-[0.6rem] block text-right font-medium ${
                          isAdmin ? "text-black/70" : "text-muted-foreground"
                        }`}
                      >
                        {timeFormatted}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de Envio do Admin */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[#262626] bg-[#090909] flex items-center gap-2"
            >
              <Input
                type="text"
                placeholder={`Escreva sua resposta oficial para ${activeThread.studentName}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[#121212] border-[#262626] text-xs text-white rounded-xl focus:border-primary"
              />
              <Button type="submit" variant="glow" size="sm" className="rounded-xl px-5">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-8 flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-3">
            <MessageSquare className="w-10 h-10 opacity-30 text-primary" />
            <p className="text-xs">Selecione uma aluna na lista à esquerda para responder.</p>
          </div>
        )}
      </div>
    </div>
  );
}
