"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  QrCode,
  FileText,
  User,
  Mail,
  Phone,
  Lock,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutInput } from "@/schemas/checkoutSchema";

const planDetails: Record<
  string,
  { name: string; price: string; cycleText: string; description: string }
> = {
  mensal: {
    name: "Consultoria Mensal",
    price: "R$ 200,00",
    cycleText: "/mês",
    description: "Treino personalizado no app + suporte via WhatsApp + correções por vídeo.",
  },
  trimestral: {
    name: "Consultoria Trimestral VIP",
    price: "R$ 500,00",
    cycleText: "em até 3x de R$ 166,67",
    description: "Tudo do mensal + reavaliação aos 90 dias + ajustes estratégicos.",
  },
  semestral: {
    name: "Consultoria Semestral VIP",
    price: "R$ 900,00",
    cycleText: "em até 6x de R$ 150,00",
    description: "Tudo do trimestral + acompanhamento próximo + planejamento por fases.",
  },
};

interface CheckoutResponse {
  success: boolean;
  mode: "simulation" | "live";
  subscriptionId: string;
  customerId: string;
  paymentId: string | null;
  billingType: string;
  value: number;
  planTitle: string;
  nextDueDate?: string;
  invoiceUrl: string | null;
  bankSlipUrl: string | null;
  pixQrCode: string | null;       // Base64 encoded image
  pixCopiaECola: string | null;   // PIX copia-e-cola text code
}

function AsaasCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "trimestral";
  const [selectedPlan, setSelectedPlan] = useState<string>(
    planDetails[initialPlan] ? initialPlan : "trimestral"
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [billingType, setBillingType] = useState<"PIX" | "CREDIT_CARD" | "BOLETO">("PIX");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResponse | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  const currentPlanInfo = planDetails[selectedPlan];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const payload: CheckoutInput = {
        fullName,
        email,
        cpfCnpj,
        phone,
        planId: selectedPlan as any,
        billingType,
      };

      const response = await fetch("/api/checkout/asaas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (!response.ok || !data.success) {
        setErrorMessage(data.details || data.error || "Erro ao processar assinatura");
        return;
      }

      setCheckoutResult(data as CheckoutResponse);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || "Erro de conexão com o gateway Asaas");
    }
  };

  const handleCopyPix = () => {
    const codeToCopy = checkoutResult?.pixCopiaECola || checkoutResult?.pixQrCode;
    if (codeToCopy) {
      navigator.clipboard.writeText(codeToCopy);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2500);
    }
  };

  const handleProceedToRegistration = () => {
    const paymentId = checkoutResult?.paymentId || `asaas_pay_${Date.now()}`;
    router.push(`/cadastro?plan=${selectedPlan}&payment_id=${paymentId}`);
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10 text-left">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center space-x-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            <ShieldCheck className="h-4 w-4" />
            <span>Gateway Seguro Asaas</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-serif">
            FINALIZAR INSCRIÇÃO <span className="text-primary italic font-serif">VIP</span>
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Preencha seus dados de cobrança para gerar a assinatura no Asaas com liberação imediata.
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-wider">
          <div className={`p-2.5 rounded-xl border ${!checkoutResult ? "bg-primary/20 border-primary text-primary" : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"}`}>
            1. Plano Selecionado
          </div>
          <div className={`p-2.5 rounded-xl border ${!checkoutResult ? "bg-[#141414] border-[#262626] text-white" : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"}`}>
            2. Dados Asaas
          </div>
          <div className={`p-2.5 rounded-xl border ${checkoutResult ? "bg-primary/20 border-primary text-primary" : "bg-[#141414] border-[#262626] text-muted-foreground"}`}>
            3. Confirmação
          </div>
        </div>

        {!checkoutResult ? (
          /* Checkout Form & Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form Column (2/3) */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white uppercase tracking-tight border-b border-[#262626] pb-3">
                Dados Pessoais & Cobrança
              </h2>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                  E-mail Principal
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CPF/CNPJ */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                    CPF / CNPJ
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={cpfCnpj}
                      onChange={(e) => setCpfCnpj(e.target.value)}
                      placeholder="000.000.000-00"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                    WhatsApp / Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                  Forma de Pagamento (Asaas)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setBillingType("PIX")}
                    className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1.5 transition-all ${
                      billingType === "PIX"
                        ? "bg-primary/15 border-primary text-white"
                        : "bg-[#090909] border-[#262626] text-muted-foreground hover:border-white/20"
                    }`}
                  >
                    <QrCode className="h-5 w-5 text-primary" />
                    <span className="text-xs font-bold uppercase">PIX</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingType("CREDIT_CARD")}
                    className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1.5 transition-all ${
                      billingType === "CREDIT_CARD"
                        ? "bg-primary/15 border-primary text-white"
                        : "bg-[#090909] border-[#262626] text-muted-foreground hover:border-white/20"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="text-xs font-bold uppercase">Cartão</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingType("BOLETO")}
                    className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1.5 transition-all ${
                      billingType === "BOLETO"
                        ? "bg-primary/15 border-primary text-white"
                        : "bg-[#090909] border-[#262626] text-muted-foreground hover:border-white/20"
                    }`}
                  >
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-xs font-bold uppercase">Boleto</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="glow"
                  className="w-full py-6 rounded-full font-black text-xs uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Gerando Assinatura no Asaas...</span>
                    </div>
                  ) : (
                    <>
                      <span>GERAR PAGAMENTO NO ASAAS ({currentPlanInfo.price})</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Plan Summary Column (1/3) */}
            <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 space-y-5 shadow-2xl">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-[#262626] pb-3">
                Resumo do Plano
              </h3>

              {/* Plan Selector Buttons */}
              <div className="space-y-2">
                {Object.keys(planDetails).map((key) => {
                  const p = planDetails[key];
                  const isSelected = selectedPlan === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedPlan(key)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-primary/15 border-primary text-white"
                          : "bg-[#090909] border-[#262626] text-muted-foreground hover:border-white/20"
                      }`}
                    >
                      <div>
                        <span className="text-xs font-black uppercase block text-white">{p.name}</span>
                        <span className="text-[0.65rem] text-muted-foreground">{p.cycleText}</span>
                      </div>
                      <span className="text-xs font-black text-white">{p.price}</span>
                    </button>
                  );
                })}
              </div>

              {/* Benefits checklist */}
              <div className="space-y-2 pt-2 border-t border-[#262626]">
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Prescrição 100% personalizada</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Liberação imediata pós-pagamento</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Suporte direto com a Maria Araújo</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ===== PAYMENT GENERATED — CONFIRMATION SCREEN ===== */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#141414] border border-[#262626] rounded-3xl p-8 max-w-2xl mx-auto space-y-6 text-center shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full">
                Assinatura Gerada no Asaas
              </span>
              <h2 className="text-2xl font-black text-white uppercase">
                {checkoutResult.planTitle || currentPlanInfo.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                Assinatura registrada com sucesso no valor de <strong className="text-white">R$ {checkoutResult.value?.toFixed(2)}</strong>.
              </p>
            </div>

            {/* ===== PIX PAYMENT — QR Code Real ===== */}
            {checkoutResult.billingType === "PIX" && (
              <div className="bg-[#090909] border border-[#262626] p-6 rounded-2xl space-y-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 text-xs font-bold text-primary uppercase">
                  <QrCode className="h-4 w-4" />
                  <span>Pagamento Instantâneo via PIX</span>
                </div>

                {/* QR Code Image */}
                <div className="bg-white p-4 rounded-xl inline-block">
                  {checkoutResult.pixQrCode ? (
                    <img
                      src={`data:image/png;base64,${checkoutResult.pixQrCode}`}
                      alt="QR Code PIX para pagamento"
                      className="w-44 h-44 rounded-lg"
                    />
                  ) : (
                    <div className="w-44 h-44 bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold p-2 text-center rounded-lg">
                      QR Code indisponível — use o link de fatura abaixo
                    </div>
                  )}
                </div>

                {/* Copy PIX Copia e Cola */}
                {(checkoutResult.pixCopiaECola || checkoutResult.pixQrCode) && (
                  <div className="space-y-2">
                    <Button
                      onClick={handleCopyPix}
                      variant="outline"
                      className="w-full py-5 rounded-full text-xs font-bold uppercase tracking-wider border-white/10"
                    >
                      {copiedPix ? (
                        <>
                          <Check className="mr-2 h-4 w-4 text-emerald-400" />
                          <span>CÓDIGO PIX COPIADO!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4 text-primary" />
                          <span>COPIAR CÓDIGO PIX (COPIA E COLA)</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* ===== BOLETO — Link do Boleto ===== */}
            {checkoutResult.billingType === "BOLETO" && checkoutResult.bankSlipUrl && (
              <div className="bg-[#090909] border border-[#262626] p-6 rounded-2xl space-y-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 text-xs font-bold text-primary uppercase">
                  <FileText className="h-4 w-4" />
                  <span>Boleto Bancário Gerado</span>
                </div>
                <a
                  href={checkoutResult.bankSlipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="w-full py-5 rounded-full text-xs font-bold uppercase tracking-wider border-white/10"
                  >
                    <ExternalLink className="mr-2 h-4 w-4 text-primary" />
                    <span>ABRIR BOLETO PARA PAGAMENTO</span>
                  </Button>
                </a>
              </div>
            )}

            {/* ===== INVOICE URL — Link Geral da Fatura Asaas ===== */}
            {checkoutResult.invoiceUrl && (
              <div className="pt-2">
                <a
                  href={checkoutResult.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Acessar fatura completa no Asaas</span>
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleProceedToRegistration}
                variant="glow"
                className="w-full py-6 rounded-full font-black text-xs uppercase tracking-wider"
              >
                <span>PROSSEGUIR PARA O CADASTRO VIP DE ALUNA</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function AsaasCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090909] flex items-center justify-center text-white text-xs">
          Carregando checkout do Asaas...
        </div>
      }
    >
      <AsaasCheckoutContent />
    </Suspense>
  );
}
