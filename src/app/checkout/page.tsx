"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, ArrowRight, CreditCard, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AsaasCheckoutSimulatedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "premium";
  const [isProcessing, setIsProcessing] = useState(false);

  const planTitles: Record<string, { name: string; price: string }> = {
    essential: { name: "Consultoria Essential", price: "R$ 249/mês" },
    premium: { name: "Consultoria Premium VIP", price: "R$ 397/mês" },
    elite: { name: "Consultoria Elite VIP", price: "R$ 597/mês" },
  };

  const currentPlan = planTitles[plan] || planTitles.premium;

  const handleApprovePayment = async () => {
    setIsProcessing(true);
    await new Promise((res) => setTimeout(res, 1200));
    setIsProcessing(false);
    // Redireciona para o formulário de cadastro com o payment_id do Asaas aprovado
    router.push(`/cadastro?plan=${plan}&payment_id=asaas_pay_confirmed_${Date.now()}`);
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[160px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6 text-center"
      >
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-1.5 bg-primary/10 border border-primary/20 text-primary text-[0.68rem] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Gateway Seguro Asaas</span>
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white pt-2">
            Finalizar Inscrição VIP
          </h1>
          <p className="text-xs text-muted-foreground">
            Você está prestes a assinar a consultoria de alta performance Maria Araújo.
          </p>
        </div>

        {/* Plan summary box */}
        <div className="bg-[#090909] border border-[#262626] rounded-2xl p-5 text-left space-y-3">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <span className="text-xs font-bold text-primary uppercase block">Plano Selecionado</span>
              <h3 className="text-base font-black text-white">{currentPlan.name}</h3>
            </div>
            <span className="text-lg font-black text-white">{currentPlan.price}</span>
          </div>

          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Acompanhamento direto e suporte individualizado</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Acesso imediato à área exclusiva do aluno</span>
            </div>
          </div>
        </div>

        {/* Payment Simulation Action */}
        <div className="space-y-3 pt-2">
          <Button
            onClick={handleApprovePayment}
            disabled={isProcessing}
            variant="glow"
            className="w-full py-6 rounded-full font-black text-xs uppercase tracking-wider"
          >
            {isProcessing ? (
              <span>Confirmando pagamento no Asaas...</span>
            ) : (
              <>
                <QrCode className="mr-2 h-4 w-4" />
                <span>SIMULAR PAGAMENTO APROVADO NO ASAAS</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-[0.65rem] text-muted-foreground">
            O Asaas aceita PIX instantâneo, Cartão de Crédito e Boleto com liberação imediata.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
