import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionTitle({ title, subtitle, action, className, ...props }: SectionTitleProps) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)} {...props}>
      <div>
        <h3 className="text-lg font-black uppercase tracking-tight text-white">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
