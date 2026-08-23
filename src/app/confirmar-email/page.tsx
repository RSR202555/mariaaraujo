"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, RefreshCw, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function ConfirmarEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "seu-email@exemplo.com";
  const name = searchParams.get("name") || "Aluno";

  const [isResending, setIsResending] = useState(false);
  const [resentSuccess, setResentSuccess] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((res) => setTimeout(res, 1000));
    setIsResending(false);
    setResentSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[160px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-center space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mx-auto glow-pink">
          <Mail className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black uppercase text-white tracking-tight">
            Confirme Seu E-mail
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enviamos um link de confirmação VIP para <span className="font-bold text-white">{email}</span>. Clique no link recebido para validar seu acesso à consultoria.
          </p>
        </div>

        {resentSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>E-mail reenviado com sucesso! Verifique sua caixa de entrada.</span>
          </motion.div>
        )}

        <div className="space-y-3 pt-2">
          <Button
            onClick={() => router.push("/login")}
            variant="glow"
            className="w-full py-6 rounded-full font-black text-xs uppercase tracking-wider"
          >
            <span>PROSSEGUIR PARA O LOGIN</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            onClick={handleResend}
            disabled={isResending}
            variant="outline"
            className="w-full py-5 rounded-full font-bold text-xs uppercase tracking-wider border-white/10"
          >
            <RefreshCw className={`mr-2 h-3.5 w-3.5 ${isResending ? "animate-spin" : ""}`} />
            {isResending ? "Reenviando..." : "Reenviar E-mail"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ConfirmarEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090909] flex items-center justify-center text-white">Carregando...</div>}>
      <ConfirmarEmailContent />
    </Suspense>
  );
}
