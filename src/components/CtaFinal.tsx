"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CtaFinal() {
  return (
    <section className="relative py-32 bg-[#090909] text-white overflow-hidden border-t border-[#262626]">
      {/* Background Image Container with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fotocapa.png"
          alt="Maria Araújo Personal Trainer"
          fill
          quality={90}
          className="object-cover object-top opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/80 to-[#090909]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          className="flex flex-col items-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white uppercase border border-[#262626] bg-[#141414]">
            Aproveite a oportunidade
          </span>

          <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight uppercase leading-tight">
            PRONTO PARA O SEU <br />
            <span className="italic font-serif text-primary">CORPO ESTRATÉGICO?</span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
            As vagas são limitadas para manter o padrão ouro de acompanhamento individualizado. Inscreva-se agora e garanta a sua transformação física com base científica.
          </p>

          <div className="pt-4">
            <a href="#consultorias">
              <Button size="lg" variant="glow" className="py-6 px-10 rounded-full uppercase font-extrabold tracking-wider text-xs sm:text-sm">
                COMEÇAR AGORA <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
