"use client";

import React, { useState, useEffect } from "react";
import { Bell, Dumbbell, MessageSquare, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { DashboardNotificationItem } from "@/types/dashboard";
import { useAuth } from "@/hooks/useAuth";

export function NotificationList() {
  const { user } = useAuth();
  const studentEmail = user?.email || "rianflamengo8@gmail.com";
  const [notifications, setNotifications] = useState<DashboardNotificationItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedKey = `maria_notifications_${studentEmail.toLowerCase()}`;
    const savedData = localStorage.getItem(savedKey);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed)) {
          setNotifications(parsed);
          return;
        }
      } catch {}
    }

    setNotifications([]);
  }, [studentEmail]);

  const unreadCount = notifications.filter((n) => n.unread).length;

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
          {unreadCount} {unreadCount === 1 ? "Nova" : "Novas"}
        </span>
      </div>

      {notifications.length === 0 ? (
        /* Estado Limpo / Sem Falsas Notificações */
        <div className="bg-[#090909] border border-[#262626] rounded-2xl p-6 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
            <Bell className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white">Nenhuma notificação pendente</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Você está em dia! Avisos de reavaliações, treinos e mensagens aparecerão aqui assim que forem enviados pela Maria.
            </p>
          </div>
        </div>
      ) : (
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
                {item.type === "update" && <Dumbbell className="h-4 w-4" />}
                {item.type === "message" && <MessageSquare className="h-4 w-4" />}
                {item.type === "evaluation" && <Calendar className="h-4 w-4" />}
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
      )}
    </div>
  );
}
