"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Trophy, Sparkles, ZoomIn, X, Flame } from "lucide-react";
import Image from "next/image";

type TransformationItem = {
  id: number;
  isDual: boolean; // Se true, exibe 2 fotos (Antes & Depois). Se false, exibe 1 foto normal.
  beforeImage?: string;
  afterImage?: string;
  singleImage?: string;
  objective: string;
  duration: string;
  result: string;
  statLabel: string;
  details: string;
  badge: string;
};

const transformations: TransformationItem[] = [
  {
    id: 1,
    isDual: true,
    beforeImage: "/antes e depois/WhatsApp Image 2026-07-05 at 08.40.56.jpeg",
    afterImage: "/antes e depois/WhatsApp Image 2026-07-05 at 08.40.56 (1).jpeg",
    objective: "Recomposição Corporal & Definição",
    duration: "16 semanas",
    result: "-10.5 kg Gordura | +5.8 kg Massa",
    statLabel: "Evolução Corporal Completa",
    details: "Redução drástica do percentual de gordura corporal, afinação de cintura e definição do tronco e membros inferiores.",
    badge: "Destaque VIP",
  },
  {
    id: 2,
    isDual: false,
    singleImage: "/antes e depois/WhatsApp Image 2026-07-05 at 08.43.48.jpeg",
    objective: "Emagrecimento Express & Tonificação",
    duration: "8 semanas",
    result: "-8.4 kg Eliminados",
    statLabel: "Redução Total de Peso",
    details: "Déficit calórico planejado sem restrições extremas, mantendo alta adesão, energia nos treinos e postura corrigida.",
    badge: "Transformação Rápida",
  },
  {
    id: 3,
    isDual: false,
    singleImage: "/antes e depois/WhatsApp Image 2026-08-12 at 13.45.21.jpeg",
    objective: "Protocolo VIP de Alta Performance",
    duration: "20 semanas",
    result: "Redefinição Completa",
    statLabel: "Evolução Corporal Total",
    details: "Acompanhamento individualizado com trocas mensais de ficha, ajustes de intensidade e evolução fotográfica quinzenal.",
    badge: "Case de Sucesso",
  },
];

export default function Transformacoes() {
  const [selectedItem, setSelectedItem] = useState<TransformationItem | null>(null);

  return (
    <section id="transformacoes" className="section bg-[#090909] text-white py-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Casos Reais de Alunas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-serif">
            ANTES E DEPOIS <br />
            <span className="text-primary italic font-serif">TRANSFORMAÇÕES QUE INSPIRAM.</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Resultados reais de alunas que aplicaram o método de consultoria da Maria Araújo. Clique nos cards para ampliar as imagens.
          </p>
        </div>

        {/* Transformations Grid (3 Colunas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {transformations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#141414] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl flex flex-col group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Photo Showcase Container */}
              <div 
                onClick={() => setSelectedItem(item)}
                className="relative h-80 w-full bg-[#090909] cursor-pointer overflow-hidden group/img"
              >
                {item.isDual ? (
                  /* Dual Photo Layout (Apenas para o primeiro caso) */
                  <div className="grid grid-cols-2 gap-0.5 h-full w-full">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={item.beforeImage!}
                        alt={`${item.objective} - Antes`}
                        fill
                        className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[0.62rem] font-extrabold uppercase px-2.5 py-1 rounded-md">
                        ANTES
                      </div>
                    </div>

                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={item.afterImage!}
                        alt={`${item.objective} - Depois`}
                        fill
                        className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
                      <div className="absolute bottom-3 right-3 bg-primary text-white text-[0.62rem] font-black uppercase px-2.5 py-1 rounded-md shadow-lg shadow-primary/30">
                        DEPOIS
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Single Photo Layout (Normal) */
                  <>
                    <Image
                      src={item.singleImage!}
                      alt={item.objective}
                      fill
                      className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40" />
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md border border-primary/30 text-primary text-[0.68rem] font-extrabold uppercase px-3 py-1 rounded-lg">
                      Foto de Resultados
                    </div>
                  </>
                )}

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3 z-10 inline-flex items-center space-x-1.5 bg-[#090909]/85 backdrop-blur-md border border-white/10 text-white text-[0.62rem] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                  <Flame className="h-3 w-3 text-primary" />
                  <span>{item.badge}</span>
                </div>

                {/* Duration Badge Top Right */}
                <div className="absolute top-3 right-3 z-10 bg-primary/90 text-white text-[0.62rem] font-black uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md shadow-lg">
                  {item.duration}
                </div>

                {/* Zoom Hint Icon */}
                <div className="absolute bottom-3 right-3 z-10 bg-[#090909]/80 backdrop-blur-md border border-white/20 text-white p-2 rounded-full opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all">
                  <ZoomIn className="h-4 w-4 text-primary" />
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white font-serif leading-snug group-hover:text-primary transition-colors">
                    {item.objective}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {item.details}
                  </p>
                </div>

                {/* Result Highlight & CTA */}
                <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                  <div>
                    <span className="text-[0.65rem] font-bold text-primary uppercase block tracking-wider">
                      {item.statLabel}
                    </span>
                    <span className="text-sm sm:text-base font-black text-white">
                      {item.result}
                    </span>
                  </div>

                  <a
                    href="#consultorias"
                    className="inline-flex items-center text-xs font-bold text-white group-hover:text-primary transition-colors space-x-1"
                  >
                    <span>VER RESULTADO</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA Box */}
        <div className="bg-gradient-to-r from-primary/10 via-[#141414] to-primary/10 border border-primary/30 rounded-3xl p-8 text-center max-w-4xl mx-auto space-y-4 shadow-2xl">
          <Trophy className="h-10 w-10 text-primary mx-auto" />
          <h3 className="text-2xl font-black uppercase text-white tracking-tight font-serif">
            SUA PRÓXIMA TRANSFORMAÇÃO COMEÇA HOJE
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Junte-se às alunas que transformaram o corpo e a autoestima com prescrições 100% individualizadas.
          </p>
          <div className="pt-2">
            <a
              href="#consultorias"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105"
            >
              <span>INICIAR MINHA CONSULTORIA AGORA</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#141414] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 bg-[#090909] border border-white/20 text-white p-2 rounded-full hover:bg-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {selectedItem.isDual ? (
                /* Modal Lado a Lado para o Primeiro Caso */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh]">
                  <div className="relative h-full w-full bg-black rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={selectedItem.beforeImage!}
                      alt="Antes"
                      fill
                      className="object-contain"
                      sizes="50vw"
                      priority
                    />
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase px-3 py-1.5 rounded-lg">
                      ANTES DO PROTOCOLO
                    </div>
                  </div>

                  <div className="relative h-full w-full bg-black rounded-2xl overflow-hidden border border-primary/30">
                    <Image
                      src={selectedItem.afterImage!}
                      alt="Depois"
                      fill
                      className="object-contain"
                      sizes="50vw"
                      priority
                    />
                    <div className="absolute bottom-4 right-4 bg-primary text-white text-xs font-black uppercase px-3 py-1.5 rounded-lg shadow-lg shadow-primary/30">
                      DEPOIS ({selectedItem.duration})
                    </div>
                  </div>
                </div>
              ) : (
                /* Modal Foto Única para os demais */
                <div className="relative h-[65vh] w-full bg-black rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={selectedItem.singleImage!}
                    alt={selectedItem.objective}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div>
                  <span className="text-xs font-bold text-primary uppercase block">
                    {selectedItem.duration} • {selectedItem.badge}
                  </span>
                  <h4 className="text-lg font-black text-white">{selectedItem.objective}</h4>
                  <p className="text-xs text-muted-foreground">{selectedItem.details}</p>
                </div>

                <a
                  href="#consultorias"
                  onClick={() => setSelectedItem(null)}
                  className="inline-flex items-center justify-center bg-primary text-white font-bold text-xs uppercase px-5 py-3 rounded-full hover:bg-primary/90 transition-colors shrink-0"
                >
                  <span>GARANTIR MINHA VAGA</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
