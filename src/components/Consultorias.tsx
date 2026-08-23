"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Star, Award, UserCheck, Target, HeartHandshake, ShieldCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Plan = {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  badgeColor?: "pink" | "gold";
  price: string;
  installmentText?: string;
  recommended?: boolean;
  features: string[];
  checkoutUrl: string;
};

const plans: Plan[] = [
  {
    id: "mensal",
    name: "MENSAL",
    subtitle: "FLEXÍVEL E PRÁTICO",
    price: "R$ 200,00",
    installmentText: "/mês",
    recommended: false,
    features: [
      "Treino personalizado no aplicativo",
      "Correção de exercícios por vídeo",
      "Suporte via WhatsApp",
      "Ajustes quando necessário",
      "Feedback semanal",
      "Orientações nutricionais",
    ],
    checkoutUrl: "/checkout?plan=mensal",
  },
  {
    id: "trimestral",
    name: "TRIMESTRAL",
    subtitle: "COMPROMISSO E RESULTADOS",
    badge: "MAIS ESCOLHIDO",
    badgeColor: "pink",
    price: "R$ 500,00",
    installmentText: "3x de R$ 166,67",
    recommended: true,
    features: [
      "Tudo do plano mensal",
      "Ajustes estratégicos",
      "Reavaliação ao final dos 90 dias",
      "Planejamento focado em resultados",
      "Mais consistência e evolução",
    ],
    checkoutUrl: "/checkout?plan=trimestral",
  },
  {
    id: "semestral",
    name: "SEMESTRAL",
    subtitle: "TRANSFORMAÇÃO COMPLETA",
    badge: "MELHOR CUSTO-BENEFÍCIO",
    badgeColor: "gold",
    price: "R$ 900,00",
    installmentText: "6x de R$ 150,00",
    recommended: false,
    features: [
      "Tudo do plano trimestral",
      "Planejamento dividido por fases",
      "Reavaliações periódicas",
      "Prioridade no atendimento",
      "Acompanhamento mais próximo",
      "Estratégia de manutenção após o objetivo",
    ],
    checkoutUrl: "/checkout?plan=semestral",
  },
];

const highlights = [
  { icon: UserCheck, title: "ATENÇÃO INDIVIDUALIZADA" },
  { icon: Target, title: "ESTRATÉGIA PERSONALIZADA" },
  { icon: Award, title: "RESULTADOS COMPROVADOS" },
  { icon: HeartHandshake, title: "SUPORTE E MOTIVAÇÃO" },
];

export default function Consultorias() {
  return (
    <section id="consultorias" className="py-24 bg-[#090909] text-white relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Consultoria Online</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight font-serif">
            ESCOLHA O PLANO IDEAL <br />
            <span className="italic font-serif text-primary">PARA O SEU OBJETIVO</span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Acompanhamento completo para transformar seu corpo e sua vida. Prescrição 100% personalizada e suporte direto com a Maria Araújo.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex"
            >
              <div
                className={`relative w-full bg-[#141414] border rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                  plan.recommended
                    ? "border-primary shadow-[0_10px_50px_rgba(216,92,138,0.25)] bg-gradient-to-b from-[#1c1217] via-[#141414] to-[#141414]"
                    : plan.badgeColor === "gold"
                    ? "border-amber-500/40 hover:border-amber-500 shadow-[0_8px_30px_rgba(245,158,11,0.1)]"
                    : "border-[#262626] hover:border-white/20"
                }`}
              >
                {/* Badge Top */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[0.68rem] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center space-x-1 ${
                      plan.badgeColor === "gold"
                        ? "bg-gradient-to-r from-amber-500 to-yellow-600 shadow-amber-500/20"
                        : "bg-primary shadow-primary/30"
                    }`}
                  >
                    <Star className="h-3 w-3 fill-white" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="text-center pb-6 border-b border-[#262626] space-y-1">
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase font-serif">
                      {plan.name}
                    </h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Header */}
                  <div className="py-6 text-center space-y-1">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                        {plan.price}
                      </span>
                    </div>
                    {plan.installmentText && (
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                        {plan.installmentText}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="border-t border-[#262626] pt-6 mb-8 space-y-3.5 text-left">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-gray-200">
                        <div className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div>
                  <a href={plan.checkoutUrl} className="w-full block">
                    <Button
                      variant={plan.recommended ? "glow" : "outline"}
                      className={`w-full py-6 rounded-full font-black text-xs tracking-wider uppercase transition-all duration-300 ${
                        plan.recommended
                          ? ""
                          : plan.badgeColor === "gold"
                          ? "border-amber-500/50 bg-[#090909] text-amber-400 hover:bg-amber-500 hover:text-black"
                          : "border-[#262626] bg-[#090909] text-white hover:border-primary hover:bg-primary/10"
                      }`}
                    >
                      <span>ESCOLHER PLANO {plan.name}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-6">
          {highlights.map((h, idx) => {
            const IconComponent = h.icon;
            return (
              <div
                key={idx}
                className="bg-[#141414] border border-[#262626] rounded-2xl p-4 flex flex-col items-center text-center space-y-2 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                  <IconComponent className="h-5 w-5" />
                </div>
                <span className="text-[0.68rem] font-bold text-white uppercase tracking-wider">
                  {h.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Floating Banner CTA */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-[#141414] to-emerald-500/10 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto space-y-4 shadow-2xl">
          <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
            <MessageCircle className="h-4 w-4" />
            <span>Fale Diretamente Comigo</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight font-serif">
            FALE COMIGO E ESCOLHA O PLANO QUE VAI TE LEVAR <span className="text-emerald-400">AOS MELHORES RESULTADOS!</span>
          </h3>

          <div>
            <a
              href="https://wa.me/5500000000000?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20os%20planos%20da%20consultoria."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              <span>FALAR NO WHATSAPP COM A MARIA</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
