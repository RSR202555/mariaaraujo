"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ImageUploadProps {
  value?: string;
  onChange: (url: string, publicId?: string) => void;
  onRemove?: () => void;
  folder?: string;
  label?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = "maria-araujo/evaluations",
  label = "Selecione uma Imagem",
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Por favor, selecione um arquivo de imagem válido (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("O tamanho da imagem deve ser de no máximo 10MB.");
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/uploads/cloudinary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setIsUploading(false);

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || "Erro ao realizar upload da imagem.");
        return;
      }

      setPreviewUrl(data.secureUrl);
      onChange(data.secureUrl, data.publicId);
    } catch (err: any) {
      setIsUploading(false);
      setErrorMessage(err.message || "Erro de conexão com o serviço de upload.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || isUploading) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onRemove) {
      onRemove();
    } else {
      onChange("", "");
    }
  };

  return (
    <div className="space-y-2 text-left w-full">
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
          {label}
        </label>
      )}

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
        disabled={disabled || isUploading}
      />

      {previewUrl ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#262626] bg-[#090909] p-2 group">
          <div className="w-full h-56 rounded-xl overflow-hidden bg-[#141414] relative flex items-center justify-center">
            <img
              src={previewUrl}
              alt="Preview do upload"
              className="w-full h-full object-cover"
            />

            <div className="absolute top-2 right-2 flex space-x-2">
              <Button
                type="button"
                onClick={handleRemove}
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-full shadow-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute bottom-2 left-2 bg-emerald-500/90 text-black text-[0.65rem] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-lg">
              <CheckCircle2 className="h-3 w-3" />
              <span>Imagem Carregada</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 space-y-3 flex flex-col items-center justify-center ${
            isDragOver
              ? "border-primary bg-primary/10 scale-[0.99]"
              : "border-[#262626] bg-[#090909] hover:border-primary/50 hover:bg-[#121212]"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2 py-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Otimizando e Enviando Imagem...
              </span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Upload className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Clique ou Arraste a Foto Aqui
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Formatos aceitos: JPG, PNG ou WEBP (Máx. 10MB)
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
