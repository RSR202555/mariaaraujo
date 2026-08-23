"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ChatService, ChatThread } from "@/services/chatService";

export function MensagensFeature() {
  const { user } = useAuth();
  const studentEmail = user?.email || "rianflamengo8@gmail.com";
  const studentName = user?.fullName || "Rian Flamengo";
  const studentAvatar = user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

  const [thread, setThread] = useState<ChatThread | null>(null);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadData = () => {
    const current = ChatService.getThread(studentEmail, studentName, studentAvatar);
    setThread(current);
    ChatService.markAsRead(studentEmail, "ALUNO");
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
  }, [studentEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    ChatService.sendMessage(studentEmail, "STUDENT", inputText.trim(), studentName, studentAvatar);
    setInputText("");
    loadData();
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      {/* Header do Chat & WhatsApp Direct */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-black text-primary text-base">
              M
            </div>
            <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-[#090909] rounded-full absolute bottom-0 right-0" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">Maria Araújo Personal</h3>
            <p className="text-[0.7rem] text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Online • Suporte Prioritário VIP
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1%20Maria!%20D%C3%BAvida%20sobre%20minha%20consultoria."
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-bold border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5" /> Abrir no WhatsApp
          </Button>
        </a>
      </div>

      {/* Caixa de Conversa */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
        {/* Histórico de Mensagens Reais */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#0d0d0d]">
          {thread?.messages.map((msg) => {
            const isMaria = msg.sender === "ADMIN";
            const timeFormatted = new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMaria ? "items-start" : "items-end"}`}
              >
                <div
                  className={`max-w-md p-4 rounded-2xl text-xs space-y-1 ${
                    isMaria
                      ? "bg-[#141414] border border-[#262626] text-gray-200 rounded-tl-none"
                      : "bg-primary text-black font-semibold rounded-tr-none shadow-lg shadow-primary/10"
                  }`}
                >
                  {isMaria && (
                    <span className="text-[0.65rem] font-black uppercase tracking-wider text-primary block">
                      Maria Araújo Personal
                    </span>
                  )}
                  <p className="leading-relaxed">{msg.text}</p>
                  <span
                    className={`text-[0.6rem] block text-right font-medium ${
                      isMaria ? "text-muted-foreground" : "text-black/70"
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

        {/* Form de Envio de Mensagem */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-[#262626] bg-[#090909] flex items-center gap-2">
          <Input
            type="text"
            placeholder="Escreva sua dúvida ou mensagem para a Maria..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#121212] border-[#262626] text-xs text-white rounded-xl focus:border-primary"
          />
          <Button type="submit" variant="glow" size="sm" className="rounded-xl px-5">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
