"use client";

import React, { useState } from "react";
import { Camera, Plus, CheckCircle2, Calendar, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface PhotoRecord {
  id: string;
  date: string;
  angle: "FRENTE" | "COSTAS" | "PERFIL";
  status: "AVALIADO" | "PENDENTE";
  url: string;
}

export function FotosEvolucaoFeature() {
  const [photos, setPhotos] = useState<PhotoRecord[]>([
    {
      id: "demo-1",
      date: "20/08/2026",
      angle: "FRENTE",
      status: "AVALIADO",
      url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [angleFilter, setAngleFilter] = useState<string>("ALL");

  const [selectedAngle, setSelectedAngle] = useState<"FRENTE" | "COSTAS" | "PERFIL">("FRENTE");
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const filteredPhotos = photos.filter((p) => {
    if (angleFilter === "ALL") return true;
    return p.angle === angleFilter;
  });

  const handleSavePhoto = () => {
    if (!uploadedUrl) return;

    const newPhoto: PhotoRecord = {
      id: `photo_${Date.now()}`,
      date: new Date().toLocaleDateString("pt-BR"),
      angle: selectedAngle,
      status: "PENDENTE",
      url: uploadedUrl,
    };

    setPhotos((prev) => [newPhoto, ...prev]);
    setUploadedUrl("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Banner Informativo de Privacidade */}
      <div className="bg-[#090909] border border-[#262626] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Privacidade & Criptografia Total</h3>
            <p className="text-xs text-muted-foreground">
              Suas fotos de avaliação corporal são visíveis exclusivamente por você e pela personal Maria Araújo.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          variant="glow"
          size="sm"
          className="rounded-full text-xs font-black uppercase tracking-wider shrink-0 w-full sm:w-auto"
        >
          <Camera className="mr-1.5 h-3.5 w-3.5" />
          Enviar Novas Fotos
        </Button>
      </div>

      {/* Filtros por Ângulo */}
      <div className="flex items-center space-x-2">
        {["ALL", "FRENTE", "COSTAS", "PERFIL"].map((angle) => (
          <button
            key={angle}
            type="button"
            onClick={() => setAngleFilter(angle)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              angleFilter === angle
                ? "bg-primary text-black"
                : "bg-[#090909] border border-[#262626] text-muted-foreground hover:text-white"
            }`}
          >
            {angle === "ALL" ? "Todas as Fotos" : angle}
          </button>
        ))}
      </div>

      {/* Galeria de Fotos */}
      {filteredPhotos.length === 0 ? (
        <div className="bg-[#090909] border border-[#262626] rounded-3xl p-12 text-center space-y-4 shadow-xl max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
            <Camera className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white">Nenhuma foto neste filtro</h3>
            <p className="text-xs text-muted-foreground">
              Envie suas fotos nos ângulos sugeridos (frente, costas e perfil) para o acompanhamento corporal quinzenal da Maria Araújo.
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="glow"
            size="sm"
            className="rounded-full text-xs font-black uppercase tracking-wider mt-2"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Enviar Minha Primeira Foto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="bg-[#090909] border border-[#262626] rounded-3xl overflow-hidden shadow-xl space-y-3 p-3 group">
              <div className="w-full h-64 rounded-2xl overflow-hidden bg-[#141414] relative">
                <img
                  src={photo.url}
                  alt={`Foto de ${photo.angle}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 text-[0.65rem] font-black uppercase tracking-widest text-black bg-primary px-3 py-1 rounded-full shadow-lg">
                  {photo.angle}
                </span>
              </div>

              <div className="flex items-center justify-between px-2 pt-1 text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> {photo.date}
                </span>
                <span
                  className={`text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    photo.status === "AVALIADO"
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" /> {photo.status === "AVALIADO" ? "Avaliada" : "Em Análise"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: Enviar Fotos Cloudinary */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Fotos Corporais (Cloudinary)</DialogTitle>
            <DialogDescription>
              Selecione o ângulo e envie a foto para a nuvem do Cloudinary.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 text-left border-t border-[#262626] pt-4">
            {/* Seleção do Ângulo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                Selecione o Ângulo da Foto
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["FRENTE", "COSTAS", "PERFIL"] as const).map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setSelectedAngle(angle)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedAngle === angle
                        ? "bg-primary/20 border-primary text-white"
                        : "bg-[#090909] border-[#262626] text-muted-foreground hover:border-white/20"
                    }`}
                  >
                    {angle}
                  </button>
                ))}
              </div>
            </div>

            {/* Componente de Upload Cloudinary */}
            <ImageUpload
              value={uploadedUrl}
              onChange={(url) => setUploadedUrl(url)}
              onRemove={() => setUploadedUrl("")}
              folder="maria-araujo/evaluations"
              label="Foto Corporal de Avaliação"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl text-xs font-bold border-white/10"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSavePhoto}
                disabled={!uploadedUrl}
                variant="glow"
                size="sm"
                className="rounded-xl text-xs font-black uppercase"
              >
                Salvar Foto na Galeria
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
