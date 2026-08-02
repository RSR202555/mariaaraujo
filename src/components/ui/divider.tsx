import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({ orientation = "horizontal", className, ...props }: DividerProps) {
  return (
    <div
      className={cn(
        "bg-[#262626] shrink-0",
        orientation === "horizontal" ? "h-px w-full my-6" : "w-px h-full mx-4",
        className
      )}
      {...props}
    />
  );
}
