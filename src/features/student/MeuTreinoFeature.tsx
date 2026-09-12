"use client";

import React, { useState, useEffect } from "react";
import {
  Dumbbell,
  ExternalLink,
  Phone,
  CheckCircle2,
  Lock,
  Smartphone,
  Video,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function MeuTreinoFeature() {
  const { user } = useAuth();
  const studentEmail = user?.email || "rianflamengo8@gmail.com";
  const studentName = user?.fullName || "Rian Flamengo";

  // URL padrão da plataforma MFIT Personal
  const mfitUrl = "https://app.mfitpersonal.com.br/login";

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      {/* CARD PRINCIPAL: ACESSO AO MFIT PERSONAL */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow de Fundo */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1f1f] pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> MFIT Personal VIP
              </span>
              <span className="text-xs text-muted-foreground font-semibold">
                Aluna: <span className="text-white font-extrabold">{studentName}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight mt-1">
              Sua Ficha de Treino no MFIT Personal
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Sua prescrição individualizada de exercícios, vídeos demonstrativos em alta definição, cronômetro de descansos e registro de cargas estão disponíveis diretamente no MFIT Personal.
            </p>
          </div>

          <div className="shrink-0">
            <a href={mfitUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="glow"
                size="lg"
                className="w-full sm:w-auto px-8 py-6 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                <Dumbbell className="mr-2 h-5 w-5" />
                Acessar Meu Treino no MFIT
                <ExternalLink className="ml-2 h-4 w-4 stroke-[3]" />
              </Button>
            </a>
          </div>
        </div>

        {/* BENEFÍCIOS / RECURSOS DO MFIT */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">Vídeos Demonstrativos HD</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Veja a execução correta de cada movimento prescrito pela Maria Araújo.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">Aplicativo para Celular</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Baixe o aplicativo MFIT Aluno na App Store ou Google Play Store.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">Cronômetro & Cargas</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Acompanhe o tempo exato de descanso entre as séries e anote sua evolução de pesos.
            </p>
          </div>
        </div>

        {/* INSTRUÇÕES PASSO A PASSO */}
        <div className="bg-[#121212] border border-[#262626] p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Passo a Passo para Acessar
          </h3>

          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary text-primary font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <p className="pt-0.5">
                Clique no botão verde acima ou acesse o site oficial <strong className="text-white">app.mfitpersonal.com.br</strong>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary text-primary font-black text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <p className="pt-0.5">
                Faça login utilizando o seu e-mail cadastrado: <strong className="text-white bg-[#1a1a1a] px-2 py-0.5 rounded-md">{studentEmail}</strong>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary text-primary font-black text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <p className="pt-0.5">
                Pronto! Sua ficha de treino completa por dias da semana já estará liberada na sua conta!
              </p>
            </div>
          </div>
        </div>

        {/* CONTATO DIRETO WHATSAPP */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1f1f1f]">
          <div className="text-left space-y-0.5">
            <h4 className="text-xs font-extrabold text-white">Dúvidas sobre o seu treino no MFIT?</h4>
            <p className="text-[0.7rem] text-muted-foreground">
              Fale diretamente com a Maria Araújo Personal no WhatsApp para ajustes ou dúvidas.
            </p>
          </div>

          <a
            href="https://wa.me/557192352255?text=Ol%C3%A1%20Maria!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20meu%20treino%20no%20MFIT."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto rounded-xl border-white/10 text-xs font-bold hover:bg-white/5"
            >
              <Phone className="mr-1.5 h-3.5 w-3.5 text-primary" /> Falar com a Maria no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
