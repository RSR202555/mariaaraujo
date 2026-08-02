"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, RefreshCw, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { AuthService } from "@/services/authService";
import { Button } from "@/components/ui/button";

export function VerifyEmailView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "seu@email.com";

  const [isResending, setIsResending] = useState(false);
  const [resentMessage, setResentMessage] = useState<string | null>(null);

  const handleResend = async () => {
    setIsResending(true);
    setResentMessage(null);
    const result = await AuthService.resendVerificationEmail(email);
    setIsResending(false);

    if (result.success) {
      setResentMessage("E-mail de confirmação reenviado com sucesso! Verifique sua caixa de entrada.");
    } else {
      setResentMessage(result.error || "Erro ao reenviar e-mail.");
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mx-auto glow-pink">
        <Mail className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black uppercase text-white tracking-tight">
          Verifique Seu E-mail
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Enviamos um e-mail de confirmação para <span className="font-bold text-white">{email}</span>. Clique no link recebido para ativar sua conta na plataforma.
        </p>
      </div>

      {resentMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center space-x-2"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{resentMessage}</span>
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
          {isResending ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Reenviando...</span>
            </div>
          ) : (
            <>
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              <span>Reenviar E-mail</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
