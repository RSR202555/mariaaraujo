"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User, Phone, Calendar, Ruler, Scale, MapPin } from "lucide-react";
import { personalDataSchema } from "@/schemas/onboardingSchema";
import { PersonalData } from "@/types/onboarding";
import { Button } from "@/components/ui/button";

interface Step2PersonalDataProps {
  initialValues: PersonalData;
  onNext: (data: PersonalData) => void;
}

export function Step2PersonalData({ initialValues, onNext }: Step2PersonalDataProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalData>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: initialValues,
  });

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-10 text-left space-y-6 shadow-2xl">
      <div className="space-y-1">
        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
          Etapa 2 de 8 • Perfil
        </span>
        <h2 className="text-2xl font-black uppercase text-white tracking-tight">Dados Pessoais</h2>
        <p className="text-xs text-muted-foreground">
          Preencha suas informações para que possamos personalizar suas métricas.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        {/* Nome Completo */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              {...register("fullName")}
              placeholder="Seu nome completo"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
          {errors.fullName && <p className="text-[0.7rem] font-medium text-rose-400">{errors.fullName.message}</p>}
        </div>

        {/* Telefone */}
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
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
          {errors.phone && <p className="text-[0.7rem] font-medium text-rose-400">{errors.phone.message}</p>}
        </div>

        {/* Linha Dupla: Data de Nascimento e Sexo */}
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
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
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
              className="w-full h-11 px-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>

        {/* Linha Dupla: Altura e Peso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
              Altura (cm)
            </label>
            <div className="relative">
              <Ruler className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="number"
                {...register("heightCm", { valueAsNumber: true })}
                placeholder="Ex: 165"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
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
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
            {errors.weightKg && <p className="text-[0.7rem] font-medium text-rose-400">{errors.weightKg.message}</p>}
          </div>
        </div>

        {/* Cidade e Estado */}
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
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
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
              className="w-full h-11 px-4 uppercase rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none"
            />
            {errors.state && <p className="text-[0.7rem] font-medium text-rose-400">{errors.state.message}</p>}
          </div>
        </div>

        {/* Quadrado de escrita livre ao final da etapa */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-200 block">
            Observações / Escreva mais detalhes sobre você
          </label>
          <textarea
            rows={3}
            {...register("additionalNotes" as any)}
            placeholder="Escreva aqui qualquer observação adicional, dúvida ou detalhe pessoal que considere importante..."
            className="w-full p-3.5 rounded-xl border border-[#262626] bg-[#090909] text-sm text-white focus:border-primary focus:outline-none resize-none"
          />
        </div>

        <div className="pt-4">
          <Button type="submit" variant="glow" className="w-full py-6 rounded-full font-black text-xs uppercase tracking-wider">
            <span>CONTINUAR PARA OBJETIVOS</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
