import * as React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  description?: string;
}

export function StatsCard({
  title,
  value,
  change,
  trend = "up",
  icon: Icon,
  description,
  className,
  ...props
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#262626] bg-[#141414] p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{value}</span>
        {change && (
          <div
            className={cn(
              "inline-flex items-center space-x-1 text-xs font-extrabold px-2 py-0.5 rounded-full border",
              trend === "up"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : trend === "down"
                ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                : "bg-white/5 text-gray-300 border-white/10"
            )}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>

      {description && <p className="text-[0.7rem] text-muted-foreground mt-2">{description}</p>}
    </div>
  );
}
