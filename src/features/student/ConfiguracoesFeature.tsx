"use client";

import React, { useState } from "react";
import { Settings, Bell, Lock, Shield, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ConfiguracoesFeature() {
  const [notifications, setNotifications] = useState({
    workoutReminder: true,
    waterReminder: true,
    chatMessage: true,
    evaluationAlert: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Seção 1: Notificações */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 border-b border-[#1c1c1c] pb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Preferências de Notificação</h3>
            <p className="text-xs text-muted-foreground">Escolha os alertas e lembretes que deseja receber no aplicativo.</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { key: "workoutReminder", title: "Lembretes de Treino Diário", desc: "Receba alertas nos dias programados para não perder a sessão." },
            { key: "waterReminder", title: "Alertas de Hidratação", desc: "Lembretes periódicos para bater a meta de água." },
            { key: "chatMessage", title: "Mensagens da Maria Personal", desc: "Notificação imediata ao receber recados e suporte." },
            { key: "evaluationAlert", title: "Aviso de Troca de Ficha", desc: "Alerta quando sua ficha quinzenal/mensal estiver pronta." },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3.5 bg-[#121212] border border-[#222] rounded-2xl">
              <div>
                <span className="text-xs font-bold text-white block">{item.title}</span>
                <span className="text-[0.7rem] text-muted-foreground">{item.desc}</span>
              </div>
              <input
                type="checkbox"
                checked={(notifications as any)[item.key]}
                onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                className="rounded border-[#262626] bg-[#090909] text-primary focus:ring-primary accent-primary h-5 w-5 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Seção 2: Alteração de Senha */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 border-b border-[#1c1c1c] pb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Segurança & Alteração de Senha</h3>
            <p className="text-xs text-muted-foreground">Mantenha sua conta protegida atualizando sua senha periodicamente.</p>
          </div>
        </div>

        {passwordSaved && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Senha alterada com sucesso!
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Senha Atual
            </label>
            <Input
              required
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Nova Senha
            </label>
            <Input
              required
              minLength={6}
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo de 6 caracteres"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="glow" size="sm" className="rounded-full text-xs font-black uppercase tracking-wider">
              <Save className="mr-1.5 h-3.5 w-3.5" /> Atualizar Senha
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
