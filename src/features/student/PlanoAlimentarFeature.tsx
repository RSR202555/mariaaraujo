"use client";

import React, { useState } from "react";
import {
  Utensils,
  ExternalLink,
  Phone,
  CheckCircle2,
  Sparkles,
  Droplets,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function PlanoAlimentarFeature() {
  const { user } = useAuth();
  const studentEmail = user?.email || "rianflamengo8@gmail.com";
  const studentName = user?.fullName || "Rian Flamengo";

  // URL oficial da plataforma Dietbox
  const dietboxUrl = "https://web.dietbox.me";

  // Controle de consumo diário de água
  const [waterMl, setWaterMl] = useState(0);
  const [isSubstitutionsModalOpen, setIsSubstitutionsModalOpen] = useState(false);
  const waterGoal = 3000;
  const waterPercent = Math.min(100, Math.round((waterMl / waterGoal) * 100));

  const addWater = (amount: number) => {
    setWaterMl((prev) => Math.min(5000, prev + amount));
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      {/* CARD PRINCIPAL: ACESSO AO DIETBOX */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow de Fundo */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1f1f] pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Dietbox VIP
              </span>
              <span className="text-xs text-muted-foreground font-semibold">
                Aluna: <span className="text-white font-extrabold">{studentName}</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight mt-1">
              Seu Plano Alimentar no Dietbox
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              Sua estratégia de nutrição individualizada, horários de refeição, receitas exclusivas e plano alimentar completo estão disponíveis diretamente na plataforma Dietbox.
            </p>
          </div>

          <div className="shrink-0">
            <a href={dietboxUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-6 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/60 shadow-xl shadow-emerald-500/10 hover:scale-[1.02] transition-all"
              >
                <Utensils className="mr-2 h-5 w-5" />
                Acessar Minha Dieta no Dietbox
                <ExternalLink className="ml-2 h-4 w-4 stroke-[3]" />
              </Button>
            </a>
          </div>
        </div>

        {/* RECURSOS DA DIETA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">Refeições & Horários</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Consulte seu cardápio diário estruturado por horários para melhor adesão.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">Substitutos Flexíveis</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Veja opções de substituição de alimentos equivalentes em calorias e macros.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222] p-4 rounded-2xl space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">Aplicativo para Celular</h4>
            <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
              Baixe o aplicativo Dietbox na sua loja de aplicativos para levar sua dieta onde for.
            </p>
          </div>
        </div>

        {/* INSTRUÇÕES DE ACESSO */}
        <div className="bg-[#121212] border border-[#262626] p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Passo a Passo para Acessar
          </h3>

          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <p className="pt-0.5">
                Clique no botão verde acima ou acesse o site oficial <strong className="text-white">web.dietbox.me</strong>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <p className="pt-0.5">
                Faça login utilizando o seu e-mail cadastrado: <strong className="text-white bg-[#1a1a1a] px-2 py-0.5 rounded-md">{studentEmail}</strong>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <p className="pt-0.5">
                Pronto! Seu plano alimentar personalizado e tabela de substituições já estarão disponíveis!
              </p>
            </div>
          </div>
        </div>

        {/* WIDGET DE HIDRATAÇÃO */}
        <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-sky-400" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-white">Consumo de Água Diário</span>
            </div>
            <span className="text-xs font-black text-sky-400">{waterPercent}%</span>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xl font-black text-white">{(waterMl / 1000).toFixed(2)}L</span>
              <span className="text-xs text-muted-foreground">Meta recomendada: {(waterGoal / 1000).toFixed(1)}L</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#1c1c1c] overflow-hidden">
              <div
                className="h-full bg-sky-400 transition-all duration-300"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Button
              onClick={() => addWater(250)}
              variant="outline"
              size="sm"
              className="w-full rounded-xl text-[0.7rem] font-bold border-sky-500/20 text-sky-400 hover:bg-sky-500/10"
            >
              + 250ml
            </Button>
            <Button
              onClick={() => addWater(500)}
              variant="outline"
              size="sm"
              className="w-full rounded-xl text-[0.7rem] font-bold border-sky-500/20 text-sky-400 hover:bg-sky-500/10"
            >
              + 500ml
            </Button>
            <Button
              onClick={() => setIsSubstitutionsModalOpen(true)}
              variant="outline"
              size="sm"
              className="w-full rounded-xl text-[0.7rem] font-bold border-white/10 text-white hover:bg-white/5"
            >
              Tabela de Trocas
            </Button>
          </div>
        </div>

        {/* CONTATO DIRETO WHATSAPP */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1f1f1f]">
          <div className="text-left space-y-0.5">
            <h4 className="text-xs font-extrabold text-white">Dúvidas sobre sua dieta no Dietbox?</h4>
            <p className="text-[0.7rem] text-muted-foreground">
              Fale diretamente com a Maria Araújo no WhatsApp para tirar dúvidas sobre sua alimentação.
            </p>
          </div>

          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%20Maria!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20meu%20plano%20alimentar%20no%20Dietbox."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto rounded-xl border-white/10 text-xs font-bold hover:bg-white/5"
            >
              <Phone className="mr-1.5 h-3.5 w-3.5 text-emerald-400" /> Falar com a Maria no WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {/* MODAL: TABELA DE SUBSTITUIÇÕES */}
      <Dialog open={isSubstitutionsModalOpen} onOpenChange={setIsSubstitutionsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Tabela de Substituição de Alimentos</DialogTitle>
            <DialogDescription>
              Guia rápido para trocar alimentos mantendo o mesmo aporte nutricional.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-left border-t border-[#262626] pt-4 max-h-[400px] overflow-y-auto pr-1">
            <div className="space-y-3">
              <div className="bg-[#121212] p-3.5 rounded-2xl border border-[#262626]">
                <h4 className="text-xs font-extrabold text-primary uppercase mb-1">Proteínas (100g Frango Grelhado = )</h4>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                  <li>100g Patinho / Filé Mignon grelhado</li>
                  <li>120g Filé de Tilápia / Merluza</li>
                  <li>4 unidades Ovos Mexidos inteiros</li>
                  <li>150g Iogurte Grego Natural Zero</li>
                </ul>
              </div>

              <div className="bg-[#121212] p-3.5 rounded-2xl border border-[#262626]">
                <h4 className="text-xs font-extrabold text-blue-400 uppercase mb-1">Carboidratos (100g Arroz Cozido = )</h4>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                  <li>120g Batata Doce assada</li>
                  <li>150g Batata Inglesa cozida</li>
                  <li>130g Mandioquinha / Aipim</li>
                  <li>60g Tapioca (massa)</li>
                </ul>
              </div>

              <div className="bg-[#121212] p-3.5 rounded-2xl border border-[#262626]">
                <h4 className="text-xs font-extrabold text-amber-400 uppercase mb-1">Gorduras (1 colher de Azeite = )</h4>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                  <li>15g Pasta de Amendoim Integral</li>
                  <li>30g Abacate maduro</li>
                  <li>12g Castanha do Pará / Caju</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSubstitutionsModalOpen(false)}
                className="rounded-xl text-xs font-bold border-white/10"
              >
                Fechar Tabela
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
