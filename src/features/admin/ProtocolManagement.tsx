"use client";

import React, { useState } from "react";
import {
  Dumbbell,
  ExternalLink,
  Users,
  Search,
  CheckCircle2,
  Settings,
  Sparkles,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProtocolManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const mfitAdminUrl = "https://app.mfitpersonal.com.br/login";

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      {/* HERO CARD MFIT ADMIN */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow de Fundo */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1f1f] pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> MFIT Personal System
              </span>
              <span className="text-xs text-muted-foreground font-semibold">
                Painel Administrativo Maria Araújo
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight mt-1">
              Plataforma MFIT Personal
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Todas as prescrições de treino das alunas são elaboradas e publicadas diretamente no sistema oficial do MFIT Personal. As alunas acessam sua ficha digital com um clique no app do aluno.
            </p>
          </div>

          <div className="shrink-0">
            <a href={mfitAdminUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="glow"
                size="lg"
                className="w-full sm:w-auto px-8 py-6 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                <ExternalLink className="mr-2 h-4 w-4 stroke-[3]" />
                Abrir Painel Maria no MFIT
              </Button>
            </a>
          </div>
        </div>

        {/* ESTATÍSTICAS / RECURSOS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">Integração Ativa</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              O botão de acesso ao MFIT está ativado e disponível para todas as alunas no app.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">App do Aluno Liberado</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Alunas efetuam login com o e-mail cadastrado e acessam a ficha prescrevida por você.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">Prescrição sem Limites</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Monte fichas por dias, adicione vídeos demonstrativos e altere as séries no MFIT.
            </p>
          </div>
        </div>

        {/* INSTRUÇÕES PARA A MARIA */}
        <div className="bg-[#121212] border border-[#262626] p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Instruções de Fluxo de Treino
          </h3>

          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary text-primary font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <p className="pt-0.5">
                Clique no botão rosa acima para abrir o painel <strong className="text-white">MFIT Personal Admin</strong>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary text-primary font-black text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <p className="pt-0.5">
                Monte ou edite a ficha de treino da aluna utilizando o e-mail cadastrado na plataforma (ex: <strong className="text-white bg-[#1a1a1a] px-2 py-0.5 rounded-md">rianflamengo8@gmail.com</strong>).
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary text-primary font-black text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <p className="pt-0.5">
                Ao publicar o treino no MFIT, a aluna conseguirá abrir o treino diretamente com o botão exclusivo da área do aluno.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
