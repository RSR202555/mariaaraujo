"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Calendar, Clock, Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

function parseDateStringToDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
  }
  if (dateStr.includes("-")) {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }
  }
  return new Date();
}

export function ConsultancyStatusCard() {
  const { user } = useAuth();
  const studentEmail = user?.email || "rianflamengo8@gmail.com";

  const [startDateStr, setStartDateStr] = useState("10/01/2026");
  const [nextEvalDateStr, setNextEvalDateStr] = useState("10/02/2026");
  const [planName, setPlanName] = useState("Consultoria VIP Trimestral");

  // Carregar dados reais da aluna do localStorage ou cadastros
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Tentar ler override direto da aluna
    const customKey = `maria_student_consultancy_${studentEmail.toLowerCase()}`;
    const customData = localStorage.getItem(customKey);
    if (customData) {
      try {
        const parsed = JSON.parse(customData);
        if (parsed.startDate) setStartDateStr(parsed.startDate);
        if (parsed.nextEvaluationDate) setNextEvalDateStr(parsed.nextEvaluationDate);
      } catch {}
    } else {
      // 2. Buscar da lista de alunas da Maria
      const savedList = localStorage.getItem("maria_registered_students");
      if (savedList) {
        try {
          const students = JSON.parse(savedList);
          if (Array.isArray(students)) {
            const found = students.find((s: any) => s.email.toLowerCase() === studentEmail.toLowerCase());
            if (found) {
              if (found.startDate) setStartDateStr(found.startDate);
              if (found.nextEvaluationDate) setNextEvalDateStr(found.nextEvaluationDate);
              if (found.planName) setPlanName(found.planName);
            }
          }
        } catch {}
      }
    }
  }, [studentEmail]);

  // Cálculos dinâmicos em tempo real
  const now = new Date();
  const startDateObj = parseDateStringToDate(startDateStr);
  const nextEvalDateObj = parseDateStringToDate(nextEvalDateStr);

  const startMs = startDateObj.getTime();
  const nextEvalMs = nextEvalDateObj.getTime();
  const nowMs = now.getTime();

  // Total de dias do ciclo
  const totalDays = Math.max(1, Math.ceil((nextEvalMs - startMs) / (1000 * 60 * 60 * 24)));
  // Dias decorridos desde o início
  const daysElapsed = Math.max(0, Math.ceil((nowMs - startMs) / (1000 * 60 * 60 * 24)));
  // Dias restantes até a próxima avaliação
  const daysRemaining = Math.max(0, Math.ceil((nextEvalMs - nowMs) / (1000 * 60 * 60 * 24)));
  // Porcentagem calculada do ciclo
  const progressPercentage = Math.min(100, Math.max(0, Math.round((daysElapsed / totalDays) * 100)));

  const isDue = daysRemaining === 0;
  const isNear = daysRemaining > 0 && daysRemaining <= 5;

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
      {/* Glow de Iluminação */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header com Badges Contextuais */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {isDue ? (
          <span className="inline-flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[0.68rem] font-black uppercase tracking-wider px-3 py-1 rounded-full animate-pulse shadow-lg shadow-emerald-500/10">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Avaliação Liberada • Envie suas fotos</span>
          </span>
        ) : isNear ? (
          <span className="inline-flex items-center space-x-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[0.68rem] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Reavaliação Próxima ({daysRemaining} dias)</span>
          </span>
        ) : (
          <span className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[0.68rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Consultoria Ativa • {planName}</span>
          </span>
        )}

        <span className="text-[0.65rem] font-extrabold uppercase text-muted-foreground bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
          {daysRemaining === 0 ? "Dia da Avaliação" : `${daysRemaining} dias restantes`}
        </span>
      </div>

      {/* Main Title & Description */}
      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
          Acompanhamento Maria Araújo
        </h3>
        <p className="text-xs text-muted-foreground">
          Protocolo de alta performance ajustado e supervisionado individualmente pela Personal.
        </p>
      </div>

      {/* Grid de Metadados Reais */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
        <div className="bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.65rem] font-bold uppercase text-muted-foreground block flex items-center space-x-1 mb-0.5">
            <Calendar className="h-3 w-3 mr-1 text-primary" />
            Data de Início
          </span>
          <span className="text-xs font-black text-white">{startDateStr}</span>
        </div>

        <div className="bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.65rem] font-bold uppercase text-muted-foreground block flex items-center space-x-1 mb-0.5">
            <Clock className="h-3 w-3 mr-1 text-amber-400" />
            Próxima Avaliação
          </span>
          <span className="text-xs font-black text-amber-400">{nextEvalDateStr}</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.65rem] font-bold uppercase text-muted-foreground block flex items-center space-x-1 mb-0.5">
            <Sparkles className="h-3 w-3 mr-1 text-emerald-400" />
            Ciclo Atual
          </span>
          <span className="text-xs font-black text-emerald-400">{progressPercentage}% Concluído</span>
        </div>
      </div>

      {/* Barra de Progresso Real */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase">
          <span className="text-muted-foreground">Progresso do Mês</span>
          <span className="text-white">
            {Math.min(totalDays, daysElapsed)} / {totalDays} DIAS
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#090909] border border-[#262626] overflow-hidden p-0.5">
          <motion.div
            className="h-full rounded-full bg-primary shadow-[0_0_12px_rgba(216,92,138,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* CTA de Reavaliação se estiver próximo ou liberado */}
      {(isDue || isNear) && (
        <div className="pt-2">
          <a href="/avaliacoes">
            <Button
              variant="glow"
              className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider"
            >
              <span>Enviar Medidas & Fotos da Reavaliação</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
