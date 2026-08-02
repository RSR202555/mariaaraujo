"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Check, RefreshCw, Info, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PhotoUploadStepProps {
  onComplete: (photos: Record<string, string>) => void;
}

export function PhotoUploadStep({ onComplete }: PhotoUploadStepProps) {
  const [photos, setPhotos] = useState<Record<string, string>>({
    frente: "",
    costas: "",
    perfilDireito: "",
    perfilEsquerdo: "",
  });

  const [uploadingAngle, setUploadingAngle] = useState<string | null>(null);

  const angles = [
    { id: "frente", label: "Vista de Frente", description: "Braços relaxados ao lado do corpo, postura ereta." },
    { id: "costas", label: "Vista de Costas", description: "Pés alinhados na largura dos ombros, costas visíveis." },
    { id: "perfilDireito", label: "Perfil Direito", description: "De lado, braços levemente afastados do corpo." },
    { id: "perfilEsquerdo", label: "Perfil Esquerdo", description: "De lado oposto, corpo ereto e centralizado." },
  ];

  const handleFileSelect = (angleId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingAngle(angleId);
      // Simula upload para o Cloudinary
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          setPhotos((prev) => ({
            ...prev,
            [angleId]: e.target?.result as string,
          }));
          setUploadingAngle(null);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const completedCount = Object.values(photos).filter(Boolean).length;
  const isAllUploaded = completedCount === 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl space-y-6 text-left"
    >
      <div className="space-y-1">
        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
          Passo 3 • Avaliação Postural
        </span>
        <h2 className="text-2xl font-black uppercase text-white tracking-tight">Upload das Fotos de Evolução</h2>
        <p className="text-xs text-muted-foreground">
          Envie 4 fotos padronizadas para que a Maria analise sua composição corporal, simetria e postura.
        </p>
      </div>

      {/* Box de Orientações para tirar fotos */}
      <div className="bg-[#090909] border border-primary/20 rounded-2xl p-4 flex items-start space-x-3 text-xs text-gray-300">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white uppercase block">Como tirar suas fotos:</span>
          <p className="leading-relaxed text-muted-foreground">
            1. Use roupa de treino (biquíni/sunga ou top/shorts ajustados). <br />
            2. Mantenha a câmera na altura do umbigo, em local bem iluminado e fundo neutro. <br />
            3. Não faça poses forçadas — mantenha a postura relaxada e natural.
          </p>
        </div>
      </div>

      {/* Grid de 4 Fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {angles.map((angle) => {
          const photoUrl = photos[angle.id];
          const isUploading = uploadingAngle === angle.id;

          return (
            <div
              key={angle.id}
              className={`border rounded-2xl p-4 bg-[#090909] flex flex-col justify-between transition-all ${
                photoUrl ? "border-emerald-500/40 bg-emerald-500/5" : "border-[#262626] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-white">{angle.label}</span>
                {photoUrl ? (
                  <span className="inline-flex items-center text-[0.65rem] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <Check className="h-3 w-3 mr-1" />
                    Enviada
                  </span>
                ) : (
                  <span className="text-[0.65rem] font-bold text-muted-foreground uppercase">Pendente</span>
                )}
              </div>

              <p className="text-[0.7rem] text-muted-foreground mb-4">{angle.description}</p>

              {/* Preview or Upload Input */}
              {photoUrl ? (
                <div className="relative h-44 w-full rounded-xl overflow-hidden border border-white/10 group">
                  <Image src={photoUrl} alt={angle.label} fill className="object-cover object-top" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Trocar Imagem</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(angle.id, e)}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="h-44 w-full rounded-xl border border-dashed border-[#262626] hover:border-primary/50 bg-[#141414]/50 flex flex-col items-center justify-center cursor-pointer transition-colors p-4 text-center group">
                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-2">
                      <RefreshCw className="h-6 w-6 text-primary animate-spin" />
                      <span className="text-xs font-bold text-white uppercase">Enviando foto...</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                        <Upload className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-white uppercase">Carregar Foto</span>
                      <span className="text-[0.65rem] text-muted-foreground mt-1">JPG, PNG até 10MB</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(e) => handleFileSelect(angle.id, e)}
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#262626]">
        <span className="text-xs text-muted-foreground font-semibold">
          {completedCount} de 4 fotos carregadas
        </span>
        <Button
          onClick={() => onComplete(photos)}
          disabled={!isAllUploaded}
          variant="glow"
          className={`w-full sm:w-auto py-6 px-8 rounded-full font-black text-xs uppercase tracking-wider ${
            isAllUploaded ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30" : "opacity-50"
          }`}
        >
          <span>FINALIZAR ENVIOS DE FOTOS</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
