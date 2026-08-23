"use client";

import { createClient } from "@/lib/supabase/client";

export interface ChatMessage {
  id: string;
  studentEmail: string;
  sender: "STUDENT" | "ADMIN";
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatThread {
  studentEmail: string;
  studentName: string;
  studentAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCountAdmin: number;
  unreadCountStudent: number;
  messages: ChatMessage[];
}

const STORAGE_KEY = "maria_chat_threads_v3";

const DEFAULT_WELCOME_MESSAGE = (email: string, name: string): ChatMessage => ({
  id: `welcome-${email}`,
  studentEmail: email,
  sender: "ADMIN",
  senderName: "Maria Araújo Personal",
  senderAvatar: "/fotocapa.png",
  text: `Seja muito bem-vinda à sua Consultoria VIP, ${name.split(" ")[0]}! Este é o nosso canal direto para tirar dúvidas sobre treinos, cargas e alimentação. Como posso te ajudar hoje?`,
  timestamp: new Date().toISOString(),
  isRead: true,
});

export class ChatService {
  private static loadAllThreads(): Record<string, ChatThread> {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  private static saveAllThreads(threads: Record<string, ChatThread>): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
    
    // 1. Notificar na mesma janela/aba
    window.dispatchEvent(new CustomEvent("maria_chat_updated"));
    
    // 2. Notificar em outras abas via BroadcastChannel
    try {
      const channel = new BroadcastChannel("maria_chat_channel");
      channel.postMessage({ type: "CHAT_UPDATED" });
      channel.close();
    } catch {}
  }

  public static getThread(
    studentEmail: string,
    studentName = "Aluna VIP",
    studentAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  ): ChatThread {
    const key = (studentEmail || "rianflamengo8@gmail.com").trim().toLowerCase();
    const threads = this.loadAllThreads();

    if (!threads[key]) {
      const initialMsg = DEFAULT_WELCOME_MESSAGE(key, studentName);
      threads[key] = {
        studentEmail: key,
        studentName: studentName || "Rian Flamengo",
        studentAvatar: studentAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        lastMessage: initialMsg.text,
        lastTimestamp: initialMsg.timestamp,
        unreadCountAdmin: 0,
        unreadCountStudent: 0,
        messages: [initialMsg],
      };
      this.saveAllThreads(threads);
    }

    return threads[key];
  }

  public static getAllThreads(): ChatThread[] {
    const threads = this.loadAllThreads();
    const defaultKey = "rianflamengo8@gmail.com";

    if (!threads[defaultKey]) {
      this.getThread(defaultKey, "Rian Flamengo");
      return this.getAllThreads();
    }

    return Object.values(threads).sort(
      (a, b) => new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime()
    );
  }

  public static sendMessage(
    studentEmail: string,
    sender: "STUDENT" | "ADMIN",
    text: string,
    senderName?: string,
    senderAvatar?: string
  ): ChatThread {
    const key = (studentEmail || "rianflamengo8@gmail.com").trim().toLowerCase();
    const threads = this.loadAllThreads();

    if (!threads[key]) {
      threads[key] = {
        studentEmail: key,
        studentName: senderName || "Rian Flamengo",
        studentAvatar: senderAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        lastMessage: "",
        lastTimestamp: new Date().toISOString(),
        unreadCountAdmin: 0,
        unreadCountStudent: 0,
        messages: [DEFAULT_WELCOME_MESSAGE(key, senderName || "Rian Flamengo")],
      };
    }

    const thread = threads[key];

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      studentEmail: key,
      sender,
      senderName: sender === "ADMIN" ? "Maria Araújo Personal" : senderName || thread.studentName || "Aluna VIP",
      senderAvatar: sender === "ADMIN" ? "/fotocapa.png" : senderAvatar || thread.studentAvatar,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    thread.messages.push(newMsg);
    thread.lastMessage = newMsg.text;
    thread.lastTimestamp = newMsg.timestamp;

    if (sender === "STUDENT") {
      thread.unreadCountAdmin += 1;
    } else {
      thread.unreadCountStudent += 1;
    }

    threads[key] = thread;
    this.saveAllThreads(threads);

    // Sincronizar o preview da mensagem no dashboard do aluno
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `maria_messages_${key}`,
        JSON.stringify([
          {
            id: newMsg.id,
            senderName: newMsg.senderName,
            lastMessage: newMsg.text,
            timeAgo: "Agora",
            isUnread: sender === "ADMIN",
          },
        ])
      );
    }

    // Tentar persistir no Supabase se houver conexão
    try {
      const supabase = createClient();
      (supabase.from("messages").insert({
        content: newMsg.text,
        is_read: false,
      } as any) as any);
    } catch {}

    return thread;
  }

  public static markAsRead(studentEmail: string, userRole: "ALUNO" | "ADMIN"): void {
    const key = (studentEmail || "").trim().toLowerCase();
    if (!key) return;

    const threads = this.loadAllThreads();

    if (threads[key]) {
      if (userRole === "ADMIN") {
        threads[key].unreadCountAdmin = 0;
      } else {
        threads[key].unreadCountStudent = 0;
      }

      threads[key].messages = threads[key].messages.map((m) => ({
        ...m,
        isRead: true,
      }));

      this.saveAllThreads(threads);
    }
  }
}
