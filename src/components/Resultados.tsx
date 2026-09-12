"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, X, CheckCircle, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type CaseStudy = {
  id: number;
  tag: string;
  number: string;
  name: string;
  description: string;
  stat: string;
  time: string;
  imagePlaceholderColor: string;
  detailsModal: {
    idade: string;
    profissao: string;
    protocoloTreino: string;
    protocoloAlimentar: string;
    depoimentoAluno: string;
    conquistas: string[];
  };
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  stars: number;
  avatarLetter: string;
};

export default function Resultados() {
  const [activeTab, setActiveTab] = useState<"casos" | "depoimentos">("casos");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      tag: "PERDA DE PESO",
      number: "CASE STUDY 1",
      name: "ANA SILVA",
      description: "Foco total em recomposição corporal e acompanhamento biomecânico individualizado.",
      stat: "-15kg",
      time: "4 meses",
      imagePlaceholderColor: "linear-gradient(135deg, #1f1218 0%, #0d0d0d 100%)",
      detailsModal: {
        idade: "31 anos",
        profissao: "Engenheira de Software",
        protocoloTreino: "Divisão ABC de hipertrofia com estímulos de densidade e cardio moderado pós-treino.",
        protocoloAlimentar: "Estratégia de intensificação e progressão contínua de carga.",
        depoimentoAluno: "Achava impossível ter esses resultados com minha rotina corrida. A Maria reestruturou meu treino de forma cirúrgica!",
        conquistas: ["-15kg de gordura corporal eliminados", "Aumento de 4kg de massa muscular magra", "Redução de 14cm de cintura"],
      },
    },
    {
      id: 2,
      tag: "HIPERTROFIA",
      number: "CASE STUDY 2",
      name: "CARLOS MENDES",
      description: "Protocolo de hipertrofia avançado com foco em densidade muscular e performance.",
      stat: "+8kg",
      time: "de massa magra",
      imagePlaceholderColor: "linear-gradient(135deg, #12181f 0%, #0d0d0d 100%)",
      detailsModal: {
        idade: "29 anos",
        profissao: "Administrador",
        protocoloTreino: "Periodização ondulatória de alta intensidade com análise semanal de execução via vídeo.",
        protocoloAlimentar: "Periodização avançada com otimização de cargas e volume de treino.",
        depoimentoAluno: "Estava estagnado há 2 anos. Em 5 meses de consultoria meu físico mudou da água para o vinho.",
        conquistas: ["+8kg de massa magra densa", "Recorde pessoal nos treinos de força", "Percentual de gordura mantido em 10%"],
      },
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Mariana Costa",
      role: "Advogada, 32 anos",
      quote: "A consultoria mudou minha rotina. O protocolo de treino é cirúrgico e se adapta perfeitamente aos meus dias corridos de tribunal. Sinto mais energia e foco.",
      stars: 5,
      avatarLetter: "M",
    },
    {
      id: 2,
      name: "Felipe Andrade",
      role: "Empresário, 40 anos",
      quote: "O método da Maria é de outro nível. O acompanhamento é extremamente profissional. Perdi gordura e ganhei densidade muscular perceptível.",
      stars: 5,
      avatarLetter: "F",
    },
    {
      id: 3,
      name: "Beatriz Mello",
      role: "Médica, 28 anos",
      quote: "Excelente base científica! Como médica, sou exigente com prescrições e o trabalho da Maria superou todas as expectativas. Resultados rápidos e consistentes.",
      stars: 5,
      avatarLetter: "B",
    },
  ];

  return (
    <section id="resultados" className="py-16 sm:py-24 bg-[#090909] text-white border-b border-[#262626] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full">
            Evolução e Feedback
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight">
            RESULTADOS <br />
            <span className="italic font-serif text-primary">INCONTESTÁVEIS.</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-base max-w-xl">
            Mais do que estética, entregamos saúde, performance e transformações reais validadas cientificamente.
          </p>

          {/* Switcher Tab Selector (Mobile Touch Friendly) */}
          <div className="inline-flex bg-[#141414] border border-[#262626] p-1 rounded-full mt-3 w-full sm:w-auto">
            <button
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-full text-[0.7rem] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === "casos"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => setActiveTab("casos")}
            >
              CASOS DE SUCESSO
            </button>
            <button
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-full text-[0.7rem] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === "depoimentos"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => setActiveTab("depoimentos")}
            >
              DEPOIMENTOS
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            {activeTab === "casos" ? (
              <motion.div
                key="casos"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {caseStudies.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className="bg-[#141414] border border-[#262626] rounded-2xl sm:rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col group cursor-pointer"
                    onClick={() => setSelectedCase(item)}
                  >
                    {/* Visual Area */}
                    <div
                      className="relative h-48 sm:h-64 w-full flex items-center justify-center border-b border-[#262626] overflow-hidden"
                      style={{ background: item.imagePlaceholderColor }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <span className="absolute top-3.5 right-3.5 text-[0.65rem] font-black uppercase tracking-wider bg-primary text-white px-3 py-1 rounded-full shadow-lg">
                        {item.tag}
                      </span>
                      
                      <svg className="w-full h-full opacity-60" viewBox="0 0 100 100" fill="none">
                        <path d="M10 90 L30 70 L50 78 L90 20" stroke="rgba(216, 92, 138, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
                        <circle cx="90" cy="20" r="3" fill="#D85C8A" />
                        <line x1="10" y1="90" x2="90" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <line x1="10" y1="10" x2="10" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      </svg>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      <span className="text-[0.7rem] font-bold tracking-widest text-primary uppercase mb-1 flex items-center space-x-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{item.number}</span>
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5 flex-grow">
                        {item.description}
                      </p>

                      <div className="pt-4 sm:pt-6 border-t border-[#262626] flex items-end justify-between mt-auto">
                        <div>
                          <span className="text-2xl sm:text-3xl font-black text-white leading-none block">
                            {item.stat}
                          </span>
                          <span className="text-[0.7rem] text-muted-foreground mt-0.5 block font-medium">
                            {item.time}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center space-x-1 text-[0.7rem] sm:text-xs font-black uppercase tracking-wider text-white group-hover:text-primary transition-colors py-1 px-2"
                        >
                          <span>VER HISTÓRIA</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="depoimentos"
                className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#141414] border border-[#262626] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-1 mb-4 sm:mb-6">
                        {[...Array(item.stars)].map((_, idx) => (
                          <Star key={idx} className="h-3.5 w-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic mb-6 sm:mb-8">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-3.5 pt-4 sm:pt-6 border-t border-[#262626]">
                      <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        {item.avatarLetter}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{item.name}</h4>
                        <span className="text-[0.7rem] text-muted-foreground">{item.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Scrollable Modal */}
        <AnimatePresence>
          {selectedCase && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#141414] border border-primary/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full max-h-[88vh] overflow-y-auto shadow-2xl relative text-white space-y-5"
              >
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-white p-2 rounded-full bg-white/5 border border-white/10"
                >
                  <X className="h-4 w-4" />
                </button>

                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
                    {selectedCase.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-2.5">
                    Estudo de Caso: {selectedCase.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedCase.detailsModal.idade} • {selectedCase.detailsModal.profissao}
                  </p>
                </div>

                <div className="space-y-3.5 border-t border-b border-[#262626] py-3.5 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-white uppercase text-[0.7rem] tracking-wider text-primary mb-1">Protocolo de Treino:</h4>
                    <p className="text-gray-300 leading-relaxed text-xs">{selectedCase.detailsModal.protocoloTreino}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase text-[0.7rem] tracking-wider text-primary mb-1">Protocolo Alimentar:</h4>
                    <p className="text-gray-300 leading-relaxed text-xs">{selectedCase.detailsModal.protocoloAlimentar}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase text-[0.7rem] tracking-wider text-primary mb-1">Principais Conquistas:</h4>
                    <div className="space-y-1.5 mt-1.5">
                      {selectedCase.detailsModal.conquistas.map((cq, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-gray-200 text-xs">
                          <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{cq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#090909] p-3.5 rounded-xl border border-white/5 italic text-xs text-gray-300">
                  "{selectedCase.detailsModal.depoimentoAluno}"
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2.5 pt-1">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCase(null)} className="w-full sm:w-auto rounded-full text-xs uppercase font-bold border-white/10 py-2.5">
                    Fechar
                  </Button>
                  <a
                    href="https://wa.me/557192352255?text=Ol%C3%A1!%20Vi%20o%20estudo%20de%20caso%20e%20quero%20um%20resultado%20parecido."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="glow" size="sm" className="w-full sm:w-auto rounded-full text-xs uppercase font-bold py-2.5">
                      <Flame className="mr-1.5 h-3.5 w-3.5 fill-white" />
                      QUERO RESULTADO ASSIM
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
