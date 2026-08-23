"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, CreditCard, CheckCircle2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export function PerfilFeature() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: "5511998877665",
        birthDate: "15/04/1996",
      });
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && user) {
      const updated = { ...user, fullName: profile.fullName, email: profile.email };
      localStorage.setItem("maria_active_user", JSON.stringify(updated));
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Banner da Assinatura Ativa */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[0.65rem] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Assinatura Ativa
              </span>
              <span className="text-xs text-muted-foreground">Consultoria VIP Trimestral</span>
            </div>
            <h3 className="text-base font-extrabold text-white mt-1">Plano VIP Premium</h3>
            <p className="text-xs text-muted-foreground">
              Próxima renovação em 90 dias • Cobrança automática Asaas
            </p>
          </div>
        </div>
      </div>

      {/* Form de Dados Pessoais */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 space-y-6 shadow-xl">
        <h3 className="text-base font-extrabold text-white uppercase tracking-tight font-serif border-b border-[#1c1c1c] pb-4">
          Dados Cadastrais
        </h3>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Perfil atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Nome Completo
              </label>
              <Input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                E-mail de Acesso
              </label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                WhatsApp / Telefone
              </label>
              <Input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Data de Nascimento
              </label>
              <Input
                type="text"
                value={profile.birthDate}
                onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#1c1c1c] flex justify-end">
            <Button type="submit" variant="glow" size="sm" className="rounded-full text-xs font-black uppercase tracking-wider px-6">
              <Save className="mr-1.5 h-3.5 w-3.5" /> Salvar Alterações
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
