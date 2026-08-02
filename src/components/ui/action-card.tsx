import * as React from "react";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  onClick?: () => void;
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  badge,
  onClick,
  className,
  ...props
}: ActionCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer rounded-2xl border border-[#262626] bg-[#141414] p-5 shadow-xl transition-all duration-300 hover:border-primary/50 hover:bg-[#1B1B1B] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
          <Icon className="h-5 w-5" />
        </div>
        {badge && (
          <span className="text-[0.65rem] font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors">
            {badge}
          </span>
        )}
      </div>

      <h4 className="text-base font-extrabold text-white uppercase tracking-tight mb-1.5 group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{description}</p>

      <div className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform">
        <span>Acessar</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}
