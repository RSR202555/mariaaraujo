"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, HeartHandshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step1WelcomeProps {
  onNext: () => void;
}

export function Step1Welcome({ onNext }: Step1WelcomeProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
      <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mx-auto glow-pink">
        <HeartHandshake className="h-8 w-8" />
      </div>

      <div className="space-y-3">
        <span className="inline-flex items-center space-x-1.5 bg-primary/10 border border-primary/20 text-primary text-[0.68rem] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Consultoria Exclusiva Maria Araújo</span>
        </span>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-serif pt-1">
          Bem-vindo(a)!
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
          Estamos muito felizes por fazer parte da sua jornada. Vamos conhecer um pouco mais sobre você para montar uma consultoria totalmente personalizada.
        </p>
      </div>

      <div className="pt-4">
        <Button
          onClick={onNext}
          variant="glow"
          size="lg"
          className="w-full sm:w-auto py-6 px-10 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider group"
        >
          <span>COMEÇAR</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
