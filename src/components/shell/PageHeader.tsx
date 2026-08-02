import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  badge?: string;
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  badge,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#262626] mb-6 sm:mb-8 text-left",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        {badge && (
          <span className="text-[0.65rem] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-0.5 rounded-full inline-block mb-1">
            {badge}
          </span>
        )}
        <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white font-serif">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
