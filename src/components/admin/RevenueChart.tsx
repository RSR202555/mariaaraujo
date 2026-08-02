"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, DollarSign } from "lucide-react";
import { RevenueData } from "@/types/admin";

interface RevenueChartProps {
  data?: RevenueData;
}

const defaultRevenue: RevenueData = {
  currentMonthRevenue: 48950,
  totalRevenue: 385400,
  averageTicket: 397,
  monthlyHistory: [
    { month: "Set", revenue: 32400, salesCount: 82 },
    { month: "Out", revenue: 38900, salesCount: 98 },
    { month: "Nov", revenue: 41200, salesCount: 104 },
    { month: "Dez", revenue: 45600, salesCount: 115 },
    { month: "Jan", revenue: 46800, salesCount: 118 },
    { month: "Fev", revenue: 48950, salesCount: 123 },
  ],
};

function generateAreaChartPath(history: { month: string; revenue: number }[]) {
  const width = 500;
  const height = 140;
  const padding = 20;

  const minRev = Math.min(...history.map((h) => h.revenue)) * 0.9;
  const maxRev = Math.max(...history.map((h) => h.revenue)) * 1.05;

  const points = history.map((item, i) => {
    const x = padding + (i / (history.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((item.revenue - minRev) / (maxRev - minRev)) * (height - 2 * padding);
    return { x, y, month: item.month, revenue: item.revenue };
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

export function RevenueChart({ data = defaultRevenue }: RevenueChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ month: string; revenue: number } | null>(null);
  const { strokePath, areaPath, points } = generateAreaChartPath(data.monthlyHistory);

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-6 shadow-2xl group hover:border-emerald-500/40 transition-colors relative overflow-hidden">
      {/* Top Gradient Ambient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between z-10 relative">
        <div className="space-y-0.5">
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-400 block">
            Faturamento Recorrente Asaas
          </span>
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Receita da Consultoria
          </h3>
        </div>
        <span className="inline-flex items-center text-xs font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full">
          <TrendingUp className="h-4 w-4 mr-1.5" />
          <span>+14.8% este mês</span>
        </span>
      </div>

      {/* Grid de Métricas Financeiras */}
      <div className="grid grid-cols-3 gap-3 z-10 relative">
        <div className="bg-[#090909] border border-[#262626] p-3.5 rounded-2xl">
          <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Faturamento Mês</span>
          <span className="text-sm sm:text-base font-black text-emerald-400">R$ {data.currentMonthRevenue.toLocaleString("pt-BR")}</span>
        </div>
        <div className="bg-[#090909] border border-[#262626] p-3.5 rounded-2xl">
          <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Ticket Médio</span>
          <span className="text-sm sm:text-base font-black text-white">R$ {data.averageTicket}</span>
        </div>
        <div className="bg-[#090909] border border-[#262626] p-3.5 rounded-2xl">
          <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">Acumulado Total</span>
          <span className="text-sm sm:text-base font-black text-primary">R$ {data.totalRevenue.toLocaleString("pt-BR")}</span>
        </div>
      </div>

      {/* Modern Curved Wave Area Chart */}
      <div className="space-y-2 z-10 relative">
        <div className="flex items-center justify-between text-[0.68rem] font-bold uppercase text-muted-foreground">
          <span>Evolução da Receita Mensal</span>
          {hoveredPoint ? (
            <span className="text-emerald-400 font-extrabold">{hoveredPoint.month}: R$ {hoveredPoint.revenue.toLocaleString("pt-BR")}</span>
          ) : (
            <span className="text-gray-300 font-semibold">Passe o cursor sobre os pontos</span>
          )}
        </div>

        <div className="h-40 w-full bg-[#090909] border border-[#262626] rounded-2xl p-4 relative flex flex-col justify-between overflow-hidden">
          {/* Horizontal Grid lines */}
          <div className="absolute inset-x-0 top-1/4 border-b border-white/5" />
          <div className="absolute inset-x-0 top-2/4 border-b border-white/5" />
          <div className="absolute inset-x-0 top-3/4 border-b border-white/5" />

          {/* SVG Curved Chart */}
          <svg viewBox="0 0 500 140" className="w-full h-full overflow-visible relative z-10">
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Filled Area */}
            <motion.path
              d={areaPath}
              fill="url(#revenueGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Glowing Line */}
            <motion.path
              d={strokePath}
              fill="none"
              stroke="#10B981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Interactive Data Dots */}
            {points.map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  className="fill-[#090909] stroke-[#10B981] stroke-[2.5] cursor-pointer hover:r-7 transition-all"
                  onMouseEnter={() => setHoveredPoint({ month: pt.month, revenue: pt.revenue })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            ))}
          </svg>

          {/* Month Labels */}
          <div className="flex justify-between items-center px-2 pt-2 border-t border-white/5 text-[0.62rem] font-bold text-muted-foreground uppercase relative z-10">
            {data.monthlyHistory.map((h, i) => (
              <span key={i} className="hover:text-emerald-400 transition-colors">
                {h.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
