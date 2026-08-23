"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingDown, ArrowRight, Activity, Plus } from "lucide-react";
import { WeightProgress } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

function generateWeightChartPath(history: { date: string; weight: number }[]) {
  const width = 500;
  const height = 130;
  const padding = 20;

  if (history.length === 1) {
    const pt = { x: width / 2, y: height / 2, date: history[0].date, weight: history[0].weight };
    return {
      strokePath: `M ${padding},${height / 2} L ${width - padding},${height / 2}`,
      areaPath: `M ${padding},${height / 2} L ${width - padding},${height / 2} L ${width - padding},${height} L ${padding},${height} Z`,
      points: [pt],
    };
  }

  const minW = Math.min(...history.map((h) => h.weight)) * 0.95;
  const maxW = Math.max(...history.map((h) => h.weight)) * 1.02;

  const points = history.map((item, i) => {
    const x = padding + (i / (history.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((item.weight - minW) / (maxW - minW || 1)) * (height - 2 * padding);
    return { x, y, date: item.date, weight: item.weight };
  });

  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cpX = (curr.x + next.x) / 2;
    d += ` C ${cpX},${curr.y} ${cpX},${next.y} ${next.x},${next.y}`;
  }

  const strokePath = d;
  const areaPath = `${d} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

  return { strokePath, areaPath, points };
}

export function ProgressChart() {
  const { user } = useAuth();
  const studentEmail = user?.email || "rianflamengo8@gmail.com";

  const [initialWeight, setInitialWeight] = useState<number>(68.5);
  const [currentWeight, setCurrentWeight] = useState<number>(65.0);
  const [targetWeight, setTargetWeight] = useState<number>(58.0);
  const [history, setHistory] = useState<{ date: string; weight: number }[]>([]);

  const [hoveredPoint, setHoveredPoint] = useState<{ date: string; weight: number } | null>(null);

  // Carregar métricas reais do perfil da aluna
  useEffect(() => {
    if (typeof window === "undefined") return;

    const profileKey = `maria_student_profile_${studentEmail.toLowerCase()}`;
    const profileData = localStorage.getItem(profileKey);

    if (profileData) {
      try {
        const parsed = JSON.parse(profileData);
        if (parsed.initialWeight) setInitialWeight(parsed.initialWeight);
        if (parsed.currentWeight) setCurrentWeight(parsed.currentWeight);
        if (parsed.targetWeight) setTargetWeight(parsed.targetWeight);
        if (Array.isArray(parsed.weightHistory) && parsed.weightHistory.length > 0) {
          setHistory(parsed.weightHistory);
          return;
        }
      } catch {}
    } else {
      // Tentar ler das alunas cadastradas
      const savedList = localStorage.getItem("maria_registered_students");
      if (savedList) {
        try {
          const list = JSON.parse(savedList);
          if (Array.isArray(list)) {
            const found = list.find((s: any) => s.email.toLowerCase() === studentEmail.toLowerCase());
            if (found) {
              const wVal = parseFloat(found.weight?.replace(" kg", "")) || 68.5;
              const tVal = parseFloat(found.targetWeight?.replace(" kg", "")) || 58.0;
              setInitialWeight(wVal);
              setCurrentWeight(wVal);
              setTargetWeight(tVal);
              setHistory([{ date: found.startDate || "Início", weight: wVal }]);
              return;
            }
          }
        } catch {}
      }
    }

    // Fallback real inicial da aluna
    setHistory([{ date: "Início", weight: initialWeight }]);
  }, [studentEmail]);

  const diff = initialWeight - currentWeight;
  const totalGoalDiff = initialWeight - targetWeight;
  const progressPercentage = totalGoalDiff > 0 ? Math.min(100, Math.max(0, Math.round((diff / totalGoalDiff) * 100))) : 0;
  const { strokePath, areaPath, points } = generateWeightChartPath(history.length > 0 ? history : [{ date: "Início", weight: initialWeight }]);

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-6 shadow-2xl group hover:border-primary/50 transition-colors relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary block">
            Evolução de Composição
          </span>
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Progresso de Peso
          </h3>
        </div>
        <span className="inline-flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase px-3 py-1 rounded-full">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>{diff >= 0 ? `-${diff.toFixed(1)} kg` : `+${Math.abs(diff).toFixed(1)} kg`}</span>
        </span>
      </div>

      {/* Grid de Métricas Principais Reais */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Inicial</span>
          <span className="text-sm font-black text-white">{initialWeight.toFixed(1)} kg</span>
        </div>
        <div className="bg-[#090909] border border-primary/40 p-3 rounded-2xl bg-primary/5">
          <span className="text-[0.62rem] font-bold uppercase text-primary block">Atual</span>
          <span className="text-sm font-black text-white">{currentWeight.toFixed(1)} kg</span>
        </div>
        <div className="bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Meta</span>
          <span className="text-sm font-black text-emerald-400">{targetWeight.toFixed(1)} kg</span>
        </div>
      </div>

      {/* Gráfico Vetorial em Curva Suave (SVG Wave Area Chart) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase text-muted-foreground">
          <span>Histórico de Pesagem</span>
          {hoveredPoint ? (
            <span className="text-primary font-extrabold">{hoveredPoint.date}: {hoveredPoint.weight} kg</span>
          ) : (
            <span className="text-primary font-black">{progressPercentage}% da Meta Alcançado</span>
          )}
        </div>

        <div className="h-36 w-full bg-[#090909] border border-[#262626] rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-x-0 top-1/4 border-b border-white/5" />
          <div className="absolute inset-x-0 top-2/4 border-b border-white/5" />
          <div className="absolute inset-x-0 top-3/4 border-b border-white/5" />

          <svg viewBox="0 0 500 130" className="w-full h-full overflow-visible relative z-10">
            <defs>
              <linearGradient id="weightGradientReal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D85C8A" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#D85C8A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <motion.path
              d={areaPath}
              fill="url(#weightGradientReal)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            <motion.path
              d={strokePath}
              fill="none"
              stroke="#D85C8A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="5"
                className="fill-[#090909] stroke-primary stroke-[2.5] cursor-pointer hover:r-7 transition-all"
                onMouseEnter={() => setHoveredPoint({ date: pt.date, weight: pt.weight })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
          </svg>

          <div className="flex justify-between items-center px-2 pt-1 border-t border-white/5 text-[0.62rem] font-bold text-muted-foreground uppercase relative z-10">
            {history.map((h, i) => (
              <span key={i}>{h.date}</span>
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={() => (window.location.href = "/minha-evolucao")}
        variant="outline"
        className="w-full py-5 rounded-full text-xs font-black uppercase tracking-wider border-white/10"
      >
        <span>VER EVOLUÇÃO COMPLETA</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
