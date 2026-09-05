"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const faqData: FAQItem[] = [
    {
      question: "A CONSULTORIA É APENAS PARA ATLETAS?",
      answer: "Não. A consultoria é voltada para qualquer pessoa que queira evoluir o físico com estratégia, seja você iniciante, intermediário ou avançado. O protocolo é totalmente adaptado ao seu ponto de partida, nível de experiência e rotina diária.",
    },
    {
      question: "COMO RECEBO MEUS TREINOS?",
      answer: "Todos os seus treinos, vídeos explicativos detalhados de execução e feedbacks são disponibilizados diretamente no nosso aplicativo exclusivo de alunos, acessível facilmente pelo seu celular (iOS e Android) ou computador.",
    },
    {
      question: "POSSO CANCELAR A QUALQUER MOMENTO?",
      answer: "Sim. A nossa consultoria funciona com planos recorrentes e você tem total liberdade para cancelar a renovação automática da sua assinatura a qualquer momento, diretamente pela área de membros ou com nosso suporte, sem multas.",
    },
    {
      question: "TEREI SUPORTE DIRETO COM A MARIA?",
      answer: "Sim! Em todos os planos, você tem contato direto via WhatsApp para tirar dúvidas de treinos, ajustes nos protocolos e suporte contínuo de execução através da análise de vídeos de seus treinos.",
    },
    {
      question: "COMO FUNCIONA O ACOMPANHAMENTO DOS TREINOS?",
      answer: "Em todos os planos, você recebe o planejamento de treino de alta performance com análises periódicas e suporte técnico contínuo. Além disso, no plano Semestral você tem direito a 1 treino presencial em Salvador.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(4);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#090909] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
            Suporte
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight mb-4">
            DÚVIDAS <br />
            <span className="italic font-serif text-primary">FREQUENTES.</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Tudo o que você precisa saber antes de iniciar sua jornada.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqData.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className={`bg-[#141414] border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isExpanded ? "border-primary/50 shadow-lg" : "border-[#262626] hover:border-white/20"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 sm:px-8 py-5 text-left focus:outline-none"
                  onClick={() => toggleExpand(index)}
                  aria-expanded={isExpanded}
                >
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isExpanded ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 sm:px-8 pb-6 text-sm text-gray-300 leading-relaxed border-t border-[#262626]/50 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
