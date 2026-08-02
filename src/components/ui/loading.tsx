import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ text = "Carregando...", fullScreen = false, className, ...props }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#090909]/80 backdrop-blur-md flex flex-col items-center justify-center space-y-3 text-white">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{text}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 space-y-3 text-white", className)} {...props}>
      <Loader2 className="h-6 w-6 text-primary animate-spin" />
      {text && <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{text}</span>}
    </div>
  );
}
