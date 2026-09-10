"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  userName?: string;
  onNext: () => void;
}

export function WelcomeStep({ userName = "Aluno VIP", onNext }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#141414] border border-[#262626] rounded-3xl p-8 sm:p-12 max-w-xl mx-auto shadow-2xl text-center space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mx-auto glow-pink">
        <HeartHandshake className="h-8 w-8" />
      </div>

      <div className="space-y-3 relative z-10">
        <span className="inline-flex items-center space-x-1 text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-1 rounded-full">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          Bem-vinda à Consultoria Exclusiva
        </span>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-serif">
          Bem-vinda, {userName}.
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
          Estamos felizes por ter você aqui. Agora vamos conhecer melhor seus objetivos e rotina para criar um protocolo totalmente personalizado com a Maria Araújo.
        </p>
      </div>

      <div className="pt-4 relative z-10">
        <Button
          onClick={onNext}
          variant="glow"
          size="lg"
          className="w-full sm:w-auto py-6 px-10 rounded-full font-black text-xs sm:text-sm uppercase tracking-wider group"
        >
          <span>COMEÇAR ANAMNESE VIP</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
