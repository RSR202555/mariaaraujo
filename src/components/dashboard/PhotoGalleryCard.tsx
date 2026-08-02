"use client";

import Image from "next/image";
import { Camera, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { EvolutionPhoto } from "@/types/dashboard";
import { Button } from "@/components/ui/button";

interface PhotoGalleryCardProps {
  photos?: EvolutionPhoto[];
  lastUpdateDate?: string;
}

const defaultPhotos: EvolutionPhoto[] = [
  { id: "1", angle: "Frente", url: "/fotocapa.png", date: "14 Fev" },
  { id: "2", angle: "Costas", url: "/fotocapa.png", date: "14 Fev" },
  { id: "3", angle: "Perfil D", url: "/fotocapa.png", date: "14 Fev" },
  { id: "4", angle: "Perfil E", url: "/fotocapa.png", date: "14 Fev" },
];

export function PhotoGalleryCard({
  photos = defaultPhotos,
  lastUpdateDate = "14/02/2026",
}: PhotoGalleryCardProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-7 text-left space-y-5 shadow-2xl group hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary block">
            Registro Fotográfico
          </span>
          <h3 className="text-xl font-black uppercase text-white tracking-tight">
            Fotos de Evolução
          </h3>
        </div>
        <span className="text-[0.65rem] font-bold text-muted-foreground bg-[#090909] border border-[#262626] px-2.5 py-1 rounded-full flex items-center space-x-1">
          <Calendar className="h-3 w-3 mr-1 text-primary" />
          <span>Atualizado {lastUpdateDate}</span>
        </span>
      </div>

      {/* Grid de 4 Miniaturas */}
      <div className="grid grid-cols-4 gap-2.5">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative h-28 w-full rounded-2xl overflow-hidden border border-[#262626] bg-[#090909] group/photo hover:border-primary transition-all"
          >
            <Image src={photo.url} alt={photo.angle} fill className="object-cover object-top opacity-80 group-hover/photo:opacity-100 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-1.5 text-center">
              <span className="text-[0.6rem] font-black uppercase text-white block">{photo.angle}</span>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => (window.location.href = "/fotos")}
        variant="outline"
        className="w-full py-5 rounded-full text-xs font-black uppercase tracking-wider border-white/10"
      >
        <Camera className="mr-2 h-4 w-4 text-primary" />
        <span>COMPARAR EVOLUÇÃO VISUAL</span>
      </Button>
    </div>
  );
}
