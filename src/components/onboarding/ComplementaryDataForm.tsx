"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Calendar, Ruler, Scale, MapPin, UserCheck } from "lucide-react";
import { complementaryDataSchema, ComplementaryFormData } from "@/lib/validations/onboarding";
import { Button } from "@/components/ui/button";

interface ComplementaryDataFormProps {
  initialValues?: Partial<ComplementaryFormData>;
  onNext: (data: ComplementaryFormData) => void;
}

export function ComplementaryDataForm({ initialValues, onNext }: ComplementaryDataFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComplementaryFormData>({
    resolver: zodResolver(complementaryDataSchema),
    defaultValues: {
      phone: initialValues?.phone || "",
      birthDate: initialValues?.birthDate || "",
      gender: initialValues?.gender || "feminino",
      heightCm: initialValues?.heightCm || undefined,
      weightKg: initialValues?.weightKg || undefined,
      city: initialValues?.city || "",
      state: initialValues?.state || "",
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-10 max-w-xl mx-auto shadow-2xl space-y-6 text-left"
    >
      <div className="space-y-1">
        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
          Passo 1 • Informações Pessoais
        </span>
        <h2 className="text-2xl font-black uppercase text-white tracking-tight">Cadastro Complementar</h2>
        <p className="text-xs text-muted-foreground">
          Preencha seus dados corporais e de localização para cálculo do seu gasto energético e suporte.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        {/* Telefone / WhatsApp */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Telefone / WhatsApp
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              {...register("phone")}
              placeholder="(11) 99999-9999"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
            />
          </div>
          {errors.phone && <p className="text-[0.7rem] font-medium text-rose-400">{errors.phone.message}</p>}
        </div>

        {/* Linha dupla: Data de Nascimento & Sexo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Data de Nascimento
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                {...register("birthDate")}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>
            {errors.birthDate && <p className="text-[0.7rem] font-medium text-rose-400">{errors.birthDate.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Sexo Biológico
            </label>
            <select
              {...register("gender")}
              className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:outline-none focus:border-primary transition-all"
            >
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
            {errors.gender && <p className="text-[0.7rem] font-medium text-rose-400">{errors.gender.message}</p>}
          </div>
        </div>

        {/* Linha dupla: Altura (cm) & Peso Atual (kg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Altura (cm)
            </label>
            <div className="relative">
              <Ruler className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="number"
                step="1"
                {...register("heightCm", { valueAsNumber: true })}
                placeholder="Ex: 165"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>
            {errors.heightCm && <p className="text-[0.7rem] font-medium text-rose-400">{errors.heightCm.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Peso Atual (kg)
            </label>
            <div className="relative">
              <Scale className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="number"
                step="0.1"
                {...register("weightKg", { valueAsNumber: true })}
                placeholder="Ex: 62.5"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>
            {errors.weightKg && <p className="text-[0.7rem] font-medium text-rose-400">{errors.weightKg.message}</p>}
          </div>
        </div>

        {/* Linha dupla: Cidade & Estado */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Cidade
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                {...register("city")}
                placeholder="Sua cidade"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
              />
            </div>
            {errors.city && <p className="text-[0.7rem] font-medium text-rose-400">{errors.city.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              UF
            </label>
            <input
              type="text"
              maxLength={2}
              {...register("state")}
              placeholder="SP"
              className="w-full h-11 px-4 uppercase rounded-xl border border-[#262626] bg-[#090909] text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
            />
            {errors.state && <p className="text-[0.7rem] font-medium text-rose-400">{errors.state.message}</p>}
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" variant="glow" className="w-full py-6 rounded-full font-black text-xs uppercase tracking-wider">
            <span>SALVAR E CONTINUAR PARA ANAMNESE</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
