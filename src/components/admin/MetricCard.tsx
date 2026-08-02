"use client";

import { motion } from "framer-motion";
import { Users, Clock, DollarSign, Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface CleanMetricProps {
  title: string;
  value: string | number;
  subtitle: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: any;
}

export function MetricCard({ title, value, subtitle, change, trend, icon: Icon }: CleanMetricProps) {
  const isUp = trend === "up";
  const isWarning = trend === "down";

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-5 text-left space-y-3 hover:border-[#333333] transition-all group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center space-x-1.5">
          <Icon className="h-4 w-4 text-primary" />
          <span>{title}</span>
        </span>
        <span
          className={`inline-flex items-center text-[0.65rem] font-bold px-2 py-0.5 rounded-md ${
            isWarning
              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              : isUp
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-white/5 text-muted-foreground border border-white/10"
          }`}
        >
          {isUp ? <TrendingUp className="h-3 w-3 mr-1" /> : isWarning ? <TrendingDown className="h-3 w-3 mr-1" /> : null}
          {change}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-extrabold text-white tracking-tight font-body">{value}</h3>
        <p className="text-[0.7rem] text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
