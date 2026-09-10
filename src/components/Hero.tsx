"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Flame, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const stats = [
    { value: "+500", label: "Alunos Transformados", icon: Users, detail: "Resultados reais comprovados" },
    { value: "100%", label: "Personalizado", icon: ShieldCheck, detail: "Metodologia única para sua rotina" },
    { value: "98%", label: "Taxa de Renovação", icon: Trophy, detail: "Fidelidade e satisfação" },
  ];

  return (
    <section className="relative min-h-screen flex items-end lg:items-center pt-20 lg:pt-32 pb-10 lg:pb-16 bg-[#090909] overflow-hidden border-b border-[#262626]">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-primary/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-primary/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

      {/* MOBILE BACKGROUND IMAGE (100% UNTOUCHED MOBILE VIEW) */}
      <div className="lg:hidden absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0 }}
        >
          <Image
            src="/maria-imagem.jpeg"
            alt="Maria Araújo Personal Trainer"
            fill
            priority
            quality={100}
            className="object-cover object-center filter brightness-100 contrast-[1.02]"
            sizes="100vw"
          />

          {/* Mobile smooth bottom fade starting below her torso for clean text contrast */}
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#090909] via-[#090909]/85 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* DESKTOP BACKGROUND IMAGE (SEPARATE & PROPERLY FORMATTED DESKTOP RIGHT COLUMN) */}
      <div className="hidden lg:block absolute top-0 right-0 w-[52%] h-full z-0 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Image
            src="/maria-imagem.jpeg"
            alt="Maria Araújo Personal Trainer"
            fill
            priority
            quality={100}
            className="object-cover object-top filter brightness-[1.04] contrast-[1.05]"
            sizes="52vw"
          />

          {/* Desktop side fade overlay for left column contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#090909] via-[#090909]/80 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          className="max-w-2xl lg:max-w-[52%] flex flex-col items-start pt-[38vh] sm:pt-[42vh] lg:pt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Desktop-Only VIP Badge */}
          <motion.div variants={itemVariants} className="hidden lg:block mb-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-white uppercase border border-primary/30 bg-[#141414]/90 backdrop-blur-md shadow-lg shadow-primary/10">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Vagas limitadas para consultoria VIP</span>
              <Sparkles className="ml-1.5 h-3 w-3 text-primary" />
            </div>
          </motion.div>

          {/* Headline - Editorial Typography */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08] lg:leading-[1.04] uppercase mb-4 lg:mb-6 text-left drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] lg:drop-shadow-none"
          >
            O CORPO QUE VOCÊ QUER <br />
            NÃO ACONTECE POR ACASO. <br />
            ELE É CONSTRUÍDO COM <br />
            <span className="text-primary italic font-serif relative">
              ESTRATÉGIA.
              <span className="absolute bottom-1 left-0 w-full h-[2.5px] bg-primary/40 rounded-full" />
            </span>
          </motion.h1>

          {/* Bullets */}
          <motion.ul
            variants={itemVariants}
            className="space-y-2 sm:space-y-3 lg:space-y-3.5 mb-6 lg:mb-8 text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] lg:drop-shadow-none"
          >
            {[
              "Treino individualizado para sua rotina e objetivo.",
              "Orientação alimentar para potencializar seus resultados.",
              "Acompanhamento constante com ajustes sempre que necessário.",
            ].map((text, idx) => (
              <li key={idx} className="flex items-start sm:items-center space-x-2.5 text-xs sm:text-base text-white lg:text-gray-200 font-semibold lg:font-medium">
                <span className="w-2 h-2 lg:w-1.5 lg:h-1.5 rounded-full bg-primary shrink-0 mt-1 sm:mt-0 shadow-sm shadow-primary lg:shadow-none" />
                <span className="bg-[#090909]/40 sm:bg-transparent lg:bg-transparent px-1.5 sm:px-0 py-0.5 rounded sm:rounded-none">{text}</span>
              </li>
            ))}
          </motion.ul>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 mb-4 lg:mb-10">
            <a href="#consultorias" className="w-full sm:w-auto">
              <Button size="lg" variant="glow" className="w-full sm:w-auto uppercase font-extrabold tracking-wider text-xs sm:text-sm py-4 sm:py-6 px-7 rounded-full shadow-xl shadow-primary/30 group">
                <Flame className="mr-2 h-4 w-4 text-white fill-white" />
                QUERO SER ALUNO VIP
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#resultados" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto uppercase font-bold tracking-wider text-xs sm:text-sm py-4 sm:py-6 px-6 rounded-full border-white/20 lg:border-white/15 bg-[#090909]/60 lg:bg-white/5 backdrop-blur-md hover:bg-white/10">
                Ver Casos de Sucesso
              </Button>
            </a>
          </motion.div>

          {/* Desktop-Only Stats Bar (Restored on Desktop, Hidden on Mobile) */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:grid w-full pt-6 border-t border-[#262626] grid-cols-3 gap-4"
          >
            {stats.map((stat, i) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-[#141414]/90 border border-[#262626] rounded-2xl p-4 backdrop-blur-md flex flex-col items-start"
                >
                  <div className="text-left">
                    <span className="text-2xl font-black text-white block">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                      {stat.label}
                    </span>
                  </div>
                  <IconComp className="h-4 w-4 text-primary shrink-0 mt-2 self-end" />
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
