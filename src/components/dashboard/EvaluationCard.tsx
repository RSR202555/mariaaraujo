"use client";

import React, { useState, useEffect } from "react";
import { ClipboardCheck, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

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

export function EvaluationCard() {
  const { user } = useAuth();
  const studentEmail = user?.email || "rianflamengo8@gmail.com";
  const [nextEvalDateStr, setNextEvalDateStr] = useState("10/02/2026");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const customKey = `maria_student_consultancy_${studentEmail.toLowerCase()}`;
    const customData = localStorage.getItem(customKey);
    if (customData) {
      try {
        const parsed = JSON.parse(customData);
        if (parsed.nextEvaluationDate) setNextEvalDateStr(parsed.nextEvaluationDate);
      } catch {}
    } else {
      const savedList = localStorage.getItem("maria_registered_students");
      if (savedList) {
        try {
          const students = JSON.parse(savedList);
          if (Array.isArray(students)) {
            const found = students.find((s: any) => s.email.toLowerCase() === studentEmail.toLowerCase());
            if (found && found.nextEvaluationDate) {
              setNextEvalDateStr(found.nextEvaluationDate);
            }
          }
        } catch {}
      }
    }
  }, [studentEmail]);

  const now = new Date();
  const nextEvalObj = parseDateStringToDate(nextEvalDateStr);
  const daysLeft = Math.max(0, Math.ceil((nextEvalObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl group hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-amber-400 block">
            Check-in de Evolução
          </span>
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Próxima Reavaliação
          </h3>
        </div>
        <span className="text-[0.65rem] font-extrabold uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          {daysLeft === 0 ? "Hoje" : `Em ${daysLeft} dias`}
        </span>
      </div>

      {/* Date banner */}
      <div className="bg-[#090909] border border-[#262626] p-3.5 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="font-bold text-white uppercase">Data Limite de Envio:</span>
        </div>
        <span className="font-black text-amber-400 text-sm">{nextEvalDateStr}</span>
      </div>

      {/* Checklist Pendente */}
      <div className="space-y-2">
        <span className="text-[0.65rem] font-bold uppercase text-muted-foreground block">
          Checklist de Reavaliação:
        </span>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#090909]/60 border border-[#262626]">
            <span className="text-gray-300">4 Fotos de Evolução (Frente, Costas, Lados)</span>
            <span className="text-emerald-400 font-bold flex items-center space-x-1 text-[0.68rem]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Pronto</span>
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#090909]/60 border border-[#262626]">
            <span className="text-gray-300">Pesagem & Medidas Atuais</span>
            <span className="text-emerald-400 font-bold flex items-center space-x-1 text-[0.68rem]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Pronto</span>
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#090909]/60 border border-[#262626]">
            <span className="text-gray-300">Feedback de Cargas & Rotina</span>
            <span className="text-amber-400 font-bold text-[0.68rem]">Pendente</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => (window.location.href = "/avaliacoes")}
        variant="glow"
        className="w-full py-5 rounded-full font-black text-xs uppercase tracking-wider"
      >
        <ClipboardCheck className="mr-2 h-4 w-4" />
        <span>ENVIAR REAVALIAÇÃO COMPLETA</span>
      </Button>
    </div>
  );
}
