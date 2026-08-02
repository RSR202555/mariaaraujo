"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Plan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  trimestralPrice: number;
  features: string[];
  recommended?: boolean;
  tagline?: string;
  checkoutUrl: string;
};

export default function Consultorias() {
  const [billingCycle, setBillingCycle] = useState<"mensal" | "trimestral">("mensal");

  const plans: Plan[] = [
    {
      id: "essential",
      name: "ESSENTIAL",
      description: "Ideal para quem busca orientação profissional básica e um norte nos treinos.",
      monthlyPrice: 249,
      trimestralPrice: 199,
      features: [
        "Treino personalizado individual",
        "Planilha digital via App Exclusivo",
        "Suporte direto via e-mail",
        "Ajustes no protocolo a cada 45 dias",
      ],
      checkoutUrl: "https://wa.me/5500000000000?text=Ol%C3%A1!%20Gostaria%20de%20assinar%20o%20plano%20ESSENTIAL.",
    },
    {
      id: "premium",
      name: "PREMIUM",
      description: "Acompanhamento completo focado em resultados rápidos e suporte próximo.",
      monthlyPrice: 397,
      trimestralPrice: 327,
      recommended: true,
      tagline: "Escolha de 85% das alunas",
      features: [
        "Treino 100% Personalizado",
        "Acesso completo ao App Premium",
        "Suporte prioritário via WhatsApp",
        "Ajustes mensais garantidos",
        "Análise técnica de vídeos de execução",
      ],
      checkoutUrl: "https://wa.me/5500000000000?text=Ol%C3%A1!%20Gostaria%20de%20assinar%20o%20plano%20PREMIUM.",
    },
    {
      id: "elite",
      name: "ELITE VIP",
      description: "O nível máximo de acompanhamento com suporte diário e total exclusividade.",
      monthlyPrice: 597,
      trimestralPrice: 497,
      features: [
        "Tudo incluso do plano Premium",
        "Check-in semanal por videochamada",
        "Suporte 24/7 de alta prioridade",
        "Protocolo de suplementação avançado",
        "Vagas limitadas (Consulte disponibilidade)",
      ],
      checkoutUrl: "https://wa.me/5500000000000?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20vagas%20para%20o%20plano%20ELITE.",
    },
  ];

  return (
    <section id="consultorias" className="py-24 bg-[#090909] text-white relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-4 py-1 rounded-full"
          >
            Consultorias & Planos
          </motion.span>
          
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight">
            ESCOLHA O SEU NÍVEL DE <br />
            <span className="italic font-serif text-primary">COMPROMETIMENTO.</span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Planos desenhados para acelerar sua transformação estética com protocolo individualizado e suporte direto.
          </p>

          {/* Interactive Billing Cycle Toggle */}
          <div className="pt-4">
            <div className="inline-flex items-center bg-[#141414] border border-[#262626] p-1.5 rounded-full relative">
              <button
                className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  billingCycle === "mensal" ? "text-white" : "text-muted-foreground hover:text-white"
                }`}
                onClick={() => setBillingCycle("mensal")}
              >
                Mensal
              </button>
              <button
                className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center space-x-1.5 ${
                  billingCycle === "trimestral" ? "text-white" : "text-muted-foreground hover:text-white"
                }`}
                onClick={() => setBillingCycle("trimestral")}
              >
                <span>Trimestral</span>
                <span className="bg-primary text-white text-[0.65rem] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  -20% OFF
                </span>
              </button>

              {/* Animated Switcher Pill */}
              <motion.div
                className="absolute top-1.5 bottom-1.5 rounded-full bg-primary shadow-lg shadow-primary/30"
                initial={false}
                animate={{
                  left: billingCycle === "mensal" ? "6px" : "50%",
                  width: billingCycle === "mensal" ? "calc(50% - 6px)" : "calc(50% - 6px)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => {
            const currentPrice = billingCycle === "mensal" ? plan.monthlyPrice : plan.trimestralPrice;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative w-full bg-[#141414] border rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                    plan.recommended
                      ? "border-primary shadow-[0_8px_40px_rgba(216,92,138,0.2)] bg-gradient-to-b from-[#1a1216] to-[#141414]"
                      : "border-[#262626] hover:border-white/20 hover:shadow-2xl"
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[0.68rem] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center space-x-1">
                      <Zap className="h-3 w-3 fill-white" />
                      <span>MAIS RECOMENDADO</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-black text-white tracking-tight uppercase">
                        {plan.name}
                      </h3>
                      {plan.recommended && (
                        <div className="flex items-center text-primary text-xs font-bold space-x-1">
                          <Star className="h-3.5 w-3.5 fill-primary" />
                          <span>{plan.tagline}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 min-h-[40px]">
                      {plan.description}
                    </p>

                    {/* Animated Price */}
                    <div className="flex items-baseline mb-8">
                      <span className="text-base font-bold text-white mr-1">R$</span>
                      <motion.span
                        key={currentPrice}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-black text-white tracking-tight"
                      >
                        {currentPrice}
                      </motion.span>
                      <span className="text-xs text-muted-foreground ml-1.5 font-medium">
                        /mês {billingCycle === "trimestral" ? "(plano 3 meses)" : ""}
                      </span>
                    </div>

                    <div className="border-t border-[#262626] pt-6 mb-8 space-y-3.5">
                      {plan.features.map((feature, fIdx) => (
                        <motion.div
                          key={fIdx}
                          whileHover={{ x: 3 }}
                          className="flex items-start space-x-3 text-xs sm:text-sm text-gray-200 cursor-default group"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all">
                            <Check className="h-3 w-3 text-primary group-hover:text-white" />
                          </div>
                          <span className="group-hover:text-white transition-colors">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <a href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer" className="w-full block">
                      <Button
                        variant={plan.recommended ? "glow" : "outline"}
                        className={`w-full py-6 rounded-full font-black text-xs tracking-wider uppercase transition-all duration-300 group ${
                          plan.recommended
                            ? ""
                            : "border-[#262626] bg-[#090909] text-white hover:border-primary hover:bg-primary/10"
                        }`}
                      >
                        <span>COMEÇAR NO {plan.name}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Garantia Incondicional de Satisfação</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Se nos primeiros 7 dias você sentir que a consultoria não é para você, devolvemos 100% do valor investido.</p>
            </div>
          </div>
          <a href="https://wa.me/5500000000000?text=Ol%C3%A1!%20Tenho%20d%C3%BAvidas%20sobre%20a%20consultoria." target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="whitespace-nowrap text-xs font-bold uppercase tracking-wider rounded-full border-white/10">
              Falar com Suporte
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
