"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CompletionStep() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#141414] border border-primary/40 rounded-3xl p-8 sm:p-12 max-w-xl mx-auto shadow-2xl text-center space-y-6 relative overflow-hidden glow-pink"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <div className="space-y-3">
        <span className="inline-flex items-center space-x-1 text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 rounded-full">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          Onboarding Concluído com Sucesso
        </span>

        <h1 className="text-3xl font-black uppercase text-white tracking-tight">
          Recebemos todas as suas informações!
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Agora a Maria Araújo irá analisar seu perfil, hábitos e fotos para montar um protocolo 100% personalizado para você.
        </p>
      </div>

      <div className="bg-[#090909] border border-[#262626] rounded-2xl p-4 text-xs text-left space-y-2 text-gray-300 max-w-md mx-auto">
        <span className="font-bold text-white uppercase block">Próximos Passos:</span>
        <p className="text-muted-foreground leading-relaxed">
          • Seu status no Dashboard foi atualizado para <span className="text-amber-400 font-bold">"Avaliação em Andamento"</span>. <br />
          • Você receberá uma notificação assim que sua ficha de treino for liberada.
        </p>
      </div>

      <div className="pt-2">
        <Button
          onClick={() => router.push("/dashboard")}
          variant="glow"
          size="lg"
          className="w-full sm:w-auto py-6 px-10 rounded-full font-black text-xs uppercase tracking-wider group"
        >
          <span>IR PARA O DASHBOARD</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
