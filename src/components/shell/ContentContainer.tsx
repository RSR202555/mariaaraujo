import React from "react";
import { cn } from "@/lib/utils";

interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ContentContainer({ children, className, ...props }: ContentContainerProps) {
  return (
    <div
      className={cn("w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 pb-28 md:pb-12 space-y-8 sm:space-y-10", className)}
      {...props}
    >
      {children}
    </div>
  );
}
