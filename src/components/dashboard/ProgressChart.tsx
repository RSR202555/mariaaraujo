"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, ArrowRight } from "lucide-react";
import { WeightProgress } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

interface ProgressChartProps {
  progress?: WeightProgress;
}

const defaultProgress: WeightProgress = {
  initialWeight: 68.5,
  currentWeight: 62.1,
  targetWeight: 58.0,
  progressPercentage: 61,
  history: [
    { date: "10 Jan", weight: 68.5 },
    { date: "17 Jan", weight: 67.2 },
    { date: "24 Jan", weight: 65.8 },
    { date: "31 Jan", weight: 64.5 },
    { date: "07 Fev", weight: 63.3 },
    { date: "14 Fev", weight: 62.1 },
  ],
};

function generateWeightChartPath(history: { date: string; weight: number }[]) {
  const width = 500;
  const height = 130;
  const padding = 20;

  const minW = Math.min(...history.map((h) => h.weight)) * 0.95;
  const maxW = Math.max(...history.map((h) => h.weight)) * 1.02;

  const points = history.map((item, i) => {
    const x = padding + (i / (history.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((item.weight - minW) / (maxW - minW)) * (height - 2 * padding);
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

export function ProgressChart({ progress = defaultProgress }: ProgressChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ date: string; weight: number } | null>(null);
  const currentDifference = progress.initialWeight - progress.currentWeight;
  const { strokePath, areaPath, points } = generateWeightChartPath(progress.history);

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
          <span>-{currentDifference.toFixed(1)} kg</span>
        </span>
      </div>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Inicial</span>
          <span className="text-sm font-black text-white">{progress.initialWeight} kg</span>
        </div>
        <div className="bg-[#090909] border border-primary/40 p-3 rounded-2xl bg-primary/5">
          <span className="text-[0.62rem] font-bold uppercase text-primary block">Atual</span>
          <span className="text-sm font-black text-white">{progress.currentWeight} kg</span>
        </div>
        <div className="bg-[#090909] border border-[#262626] p-3 rounded-2xl">
          <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Meta</span>
          <span className="text-sm font-black text-emerald-400">{progress.targetWeight} kg</span>
        </div>
      </div>

      {/* Gráfico Vetorial em Curva Suave (SVG Wave Area Chart) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase text-muted-foreground">
          <span>Histórico Semanal</span>
          {hoveredPoint ? (
            <span className="text-primary font-extrabold">{hoveredPoint.date}: {hoveredPoint.weight} kg</span>
          ) : (
            <span className="text-primary font-black">{progress.progressPercentage}% Concluído</span>
          )}
        </div>

        <div className="h-36 w-full bg-[#090909] border border-[#262626] rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-x-0 top-1/4 border-b border-white/5" />
          <div className="absolute inset-x-0 top-2/4 border-b border-white/5" />
          <div className="absolute inset-x-0 top-3/4 border-b border-white/5" />

          <svg viewBox="0 0 500 130" className="w-full h-full overflow-visible relative z-10">
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D85C8A" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#D85C8A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <motion.path
              d={areaPath}
              fill="url(#weightGradient)"
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
            {progress.history.map((h, i) => (
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
