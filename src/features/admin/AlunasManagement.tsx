"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Plus,
  Dumbbell,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  UserPlus,
  Phone,
  Mail,
  Zap,
  Loader2,
  Eye,
  EyeOff,
  RefreshCw,
  Calendar,
  Save,
  Sparkles,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { createClient } from "@/database/client";

export interface StudentItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  planName: string;
  planPrice: string;
  consultancyStatus: "ACTIVE" | "PENDING" | "PAUSED" | "EXPIRED";
  workoutStatus: "EM_DIA" | "AGUARDANDO_TREINO" | "RENOVACAO_PROXIMA" | "SEM_TREINO";
  startDate: string;
  nextEvaluationDate: string;
  renewalDate: string;
  goal: string;
  weight: string;
  targetWeight: string;
  height: string;
  age: number;
  anamnesisSummary: string;
  lastActive: string;
}

const DEFAULT_ACTIVE_STUDENT: StudentItem = {
  id: "stu-rian",
  name: "Rian Flamengo",
  email: "rianflamengo8@gmail.com",
  phone: "5511999999999",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  planName: "Consultoria VIP Trimestral",
  planPrice: "R$ 660,00",
  consultancyStatus: "ACTIVE",
  workoutStatus: "AGUARDANDO_TREINO",
  startDate: "10/01/2026",
  nextEvaluationDate: "10/02/2026",
  renewalDate: "10/04/2026",
  goal: "Hipertrofia & Definição",
  weight: "68.5 kg",
  targetWeight: "58.0 kg",
  height: "168 cm",
  age: 26,
  anamnesisSummary: "Anamnese completa respondida. Foco em hipertrofia de membros inferiores, sem lesões articulares.",
  lastActive: "Ativo agora",
};

// Converte YYYY-MM-DD para DD/MM/YYYY
function formatDateToBr(isoDate: string): string {
  if (!isoDate) return "--";
  if (isoDate.includes("/")) return isoDate;
  const parts = isoDate.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return isoDate;
}

// Converte DD/MM/YYYY para YYYY-MM-DD
function formatDateToIso(brDate: string): string {
  if (!brDate) return "";
  if (brDate.includes("-")) return brDate;
  const parts = brDate.split("/");
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
  }
  return "";
}

export function AlunasManagement() {
  const [students, setStudents] = useState<StudentItem[]>([DEFAULT_ACTIVE_STUDENT]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedStudent, setSelectedStudent] = useState<StudentItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form de edição da aluna
  const [editNextEvalDate, setEditNextEvalDate] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editTargetWeight, setEditTargetWeight] = useState("");
  const [editHeight, setEditHeight] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editGoal, setEditGoal] = useState("");
  const [editAnamnesis, setEditAnamnesis] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    planName: "Consultoria VIP Trimestral",
    planPrice: "R$ 660,00",
    startDate: new Date().toISOString().split("T")[0],
    nextEvaluationDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    goal: "Emagrecimento & Definição",
    weight: "65.0",
    targetWeight: "58.0",
    height: "165",
    age: "25",
    anamnesisSummary: "Foco em recomposição corporal e ganho de massa magra.",
  });

  // Carregar alunas do localStorage e Supabase
  useEffect(() => {
    async function loadStudents() {
      setIsLoading(true);
      let loadedList: StudentItem[] = [];

      // 1. Tentar ler do localStorage primeiro
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("maria_registered_students");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              loadedList = parsed;
            }
          } catch {}
        }
      }

      // 2. Tentar buscar do Supabase
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("students")
          .select("*, profiles(*)");

        if (!error && data && data.length > 0) {
          const fetchedFromDb: StudentItem[] = data.map((s: any) => ({
            id: s.id,
            name: s.profiles?.full_name || "Aluna Cadastrada",
            email: s.profiles?.email || "--",
            phone: s.profiles?.phone || "5511999999999",
            avatar: s.profiles?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            planName: "Consultoria VIP Trimestral",
            planPrice: "R$ 660,00",
            consultancyStatus: (s.status as any) || "ACTIVE",
            workoutStatus: "AGUARDANDO_TREINO",
            startDate: new Date(s.created_at || Date.now()).toLocaleDateString("pt-BR"),
            nextEvaluationDate: new Date(Date.now() + 30 * 86400000).toLocaleDateString("pt-BR"),
            renewalDate: new Date(Date.now() + 90 * 86400000).toLocaleDateString("pt-BR"),
            goal: "Consultoria Personalizada",
            weight: "65.0 kg",
            targetWeight: "58.0 kg",
            height: s.height_cm ? `${s.height_cm} cm` : "165 cm",
            age: 25,
            anamnesisSummary: "Anamnese cadastrada.",
            lastActive: "Cadastrada no sistema",
          }));

          // Mesclar evitando duplicados por email
          const existingEmails = new Set(loadedList.map((st) => st.email.toLowerCase()));
          fetchedFromDb.forEach((st) => {
            if (!existingEmails.has(st.email.toLowerCase())) {
              loadedList.push(st);
            }
          });
        }
      } catch (err) {
        console.warn("Supabase fetch fallback:", err);
      }

      // Se após ler tudo a lista ainda estiver vazia, garante o aluno ativo Rian Flamengo
      if (loadedList.length === 0) {
        loadedList = [DEFAULT_ACTIVE_STUDENT];
      }

      setStudents(loadedList);
      if (typeof window !== "undefined") {
        localStorage.setItem("maria_registered_students", JSON.stringify(loadedList));
      }
      setIsLoading(false);
    }

    loadStudents();
  }, []);

  // Quando seleciona uma aluna para ver/editar a ficha
  useEffect(() => {
    if (selectedStudent) {
      setEditNextEvalDate(formatDateToIso(selectedStudent.nextEvaluationDate) || new Date().toISOString().split("T")[0]);
      setEditStartDate(formatDateToIso(selectedStudent.startDate) || new Date().toISOString().split("T")[0]);
      setEditWeight(selectedStudent.weight?.replace(" kg", "") || "65.0");
      setEditTargetWeight(selectedStudent.targetWeight?.replace(" kg", "") || "58.0");
      setEditHeight(selectedStudent.height?.replace(" cm", "") || "165");
      setEditAge(selectedStudent.age ? String(selectedStudent.age) : "25");
      setEditGoal(selectedStudent.goal || "Emagrecimento & Definição");
      setEditAnamnesis(selectedStudent.anamnesisSummary || "Anamnese completa respondida.");
      setIsSavedNotice(false);
    }
  }, [selectedStudent]);

  const filteredStudents = students.filter((stu) => {
    const matchesSearch =
      stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stu.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stu.planName.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "ALL") return matchesSearch;
    if (statusFilter === "ACTIVE") return matchesSearch && stu.consultancyStatus === "ACTIVE";
    if (statusFilter === "PENDING") return matchesSearch && (stu.consultancyStatus === "PENDING" || stu.workoutStatus === "AGUARDANDO_TREINO");
    if (statusFilter === "EXPIRED") return matchesSearch && stu.consultancyStatus === "EXPIRED";
    return matchesSearch;
  });

  const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pass = "Maria@";
    for (let i = 0; i < 4; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewStudent((prev) => ({ ...prev, password: pass }));
    setShowPassword(true);
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email || !newStudent.password) return;

    try {
      const supabase = createClient();
      await supabase.auth.signUp({
        email: newStudent.email,
        password: newStudent.password,
        options: {
          data: {
            full_name: newStudent.name,
            role: "aluno",
          },
        },
      });
    } catch (err) {
      console.warn("Cadastrando aluna no estado local:", err);
    }

    const formattedWeight = newStudent.weight ? `${newStudent.weight.trim()} kg` : "--";
    const formattedTargetWeight = newStudent.targetWeight ? `${newStudent.targetWeight.trim()} kg` : "--";
    const formattedHeight = newStudent.height ? `${newStudent.height.trim()} cm` : "--";

    const created: StudentItem = {
      id: `stu-${Date.now()}`,
      name: newStudent.name,
      email: newStudent.email,
      phone: newStudent.phone || "5511999999999",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      planName: newStudent.planName,
      planPrice: newStudent.planPrice,
      consultancyStatus: "ACTIVE",
      workoutStatus: "AGUARDANDO_TREINO",
      startDate: formatDateToBr(newStudent.startDate),
      nextEvaluationDate: formatDateToBr(newStudent.nextEvaluationDate),
      renewalDate: formatDateToBr(new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0]),
      goal: newStudent.goal,
      weight: formattedWeight,
      targetWeight: formattedTargetWeight,
      height: formattedHeight,
      age: parseInt(newStudent.age) || 25,
      anamnesisSummary: newStudent.anamnesisSummary || "Anamnese completa cadastrada.",
      lastActive: "Recém adicionada",
    };

    const updatedList = [created, ...students];
    setStudents(updatedList);

    if (typeof window !== "undefined") {
      localStorage.setItem("maria_registered_students", JSON.stringify(updatedList));
      localStorage.setItem(
        `maria_student_profile_${created.email.toLowerCase()}`,
        JSON.stringify({
          initialWeight: parseFloat(newStudent.weight) || 65.0,
          currentWeight: parseFloat(newStudent.weight) || 65.0,
          targetWeight: parseFloat(newStudent.targetWeight) || 58.0,
          heightCm: parseFloat(newStudent.height) || 165,
          ageYears: parseInt(newStudent.age) || 25,
          goalStr: newStudent.goal,
          anamnesis: newStudent.anamnesisSummary,
        })
      );
    }

    setNewStudent({
      name: "",
      email: "",
      password: "",
      phone: "",
      planName: "Consultoria VIP Trimestral",
      planPrice: "R$ 660,00",
      startDate: new Date().toISOString().split("T")[0],
      nextEvaluationDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      goal: "Emagrecimento & Definição",
      weight: "65.0",
      targetWeight: "58.0",
      height: "165",
      age: "25",
      anamnesisSummary: "Foco em recomposição corporal e ganho de massa magra.",
    });
    setIsAddModalOpen(false);
  };

  // Salvar ficha completa e datas da aluna selecionada
  const handleSaveStudentDetails = (daysOffset?: number) => {
    if (!selectedStudent) return;

    let finalNextEvalIso = editNextEvalDate;
    if (daysOffset) {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + daysOffset);
      finalNextEvalIso = targetDate.toISOString().split("T")[0];
      setEditNextEvalDate(finalNextEvalIso);
    }

    const updatedStudent: StudentItem = {
      ...selectedStudent,
      startDate: formatDateToBr(editStartDate),
      nextEvaluationDate: formatDateToBr(finalNextEvalIso),
      weight: editWeight ? `${editWeight.replace(" kg", "")} kg` : selectedStudent.weight,
      targetWeight: editTargetWeight ? `${editTargetWeight.replace(" kg", "")} kg` : selectedStudent.targetWeight,
      height: editHeight ? `${editHeight.replace(" cm", "")} cm` : selectedStudent.height,
      age: parseInt(editAge) || selectedStudent.age,
      goal: editGoal || selectedStudent.goal,
      anamnesisSummary: editAnamnesis || selectedStudent.anamnesisSummary,
    };

    const updatedList = students.map((s) => (s.id === selectedStudent.id ? updatedStudent : s));
    setStudents(updatedList);
    setSelectedStudent(updatedStudent);

    if (typeof window !== "undefined") {
      localStorage.setItem("maria_registered_students", JSON.stringify(updatedList));
      localStorage.setItem(
        `maria_student_consultancy_${selectedStudent.email.toLowerCase()}`,
        JSON.stringify({
          startDate: formatDateToBr(editStartDate),
          nextEvaluationDate: formatDateToBr(finalNextEvalIso),
          status: selectedStudent.consultancyStatus,
        })
      );
      localStorage.setItem(
        `maria_student_profile_${selectedStudent.email.toLowerCase()}`,
        JSON.stringify({
          initialWeight: parseFloat(editWeight) || 65.0,
          currentWeight: parseFloat(editWeight) || 65.0,
          targetWeight: parseFloat(editTargetWeight) || 58.0,
          heightCm: parseFloat(editHeight) || 165,
          ageYears: parseInt(editAge) || selectedStudent.age,
          goalStr: editGoal,
          anamnesis: editAnamnesis,
        })
      );
    }

    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const getStatusBadge = (status: StudentItem["consultancyStatus"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            Ativa
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" />
            Pendente
          </span>
        );
      case "EXPIRED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3 h-3" />
            Expirada
          </span>
        );
      case "PAUSED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20">
            Pausada
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* 4 Cards Resumo de Alunas Reais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
              Total Alunas Ativas
            </p>
            <h3 className="text-2xl font-black text-white mt-1">
              {students.filter((s) => s.consultancyStatus === "ACTIVE").length}
            </h3>
            <span className="text-[0.65rem] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Consultoria VIP
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
              Aguardando Treino
            </p>
            <h3 className="text-2xl font-black text-amber-400 mt-1">
              {students.filter((s) => s.workoutStatus === "AGUARDANDO_TREINO").length}
            </h3>
            <span className="text-[0.65rem] text-amber-400 font-semibold flex items-center gap-1 mt-1">
              Fila de elaboração
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
              Troca de Treino Próxima
            </p>
            <h3 className="text-2xl font-black text-blue-400 mt-1">
              {students.filter((s) => s.workoutStatus === "RENOVACAO_PROXIMA").length}
            </h3>
            <span className="text-[0.65rem] text-muted-foreground font-semibold flex items-center gap-1 mt-1">
              Acompanhamento mensal
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Dumbbell className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-[#262626] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
              Expiradas / Inativas
            </p>
            <h3 className="text-2xl font-black text-rose-400 mt-1">
              {students.filter((s) => s.consultancyStatus === "EXPIRED").length}
            </h3>
            <span className="text-[0.65rem] text-rose-400 font-semibold flex items-center gap-1 mt-1">
              Contratos encerrados
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Barra de Ações e Filtros */}
      <div className="bg-[#090909] border border-[#262626] rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Campo de Busca */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por aluna, e-mail ou plano..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#121212] border-[#262626] text-xs text-white rounded-xl focus:border-primary"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="glow"
              size="sm"
              className="rounded-full text-xs font-black uppercase tracking-wider w-full sm:w-auto"
            >
              <UserPlus className="mr-1.5 h-3.5 w-3.5" />
              Nova Aluna
            </Button>
          </div>
        </div>

        {/* Tabs de Filtro Rápido */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1a1a1a]">
          {[
            { id: "ALL", label: "Todas as Alunas", count: students.length },
            { id: "ACTIVE", label: "Ativas", count: students.filter((s) => s.consultancyStatus === "ACTIVE").length },
            { id: "PENDING", label: "Pendências", count: students.filter((s) => s.consultancyStatus === "PENDING" || s.workoutStatus === "AGUARDANDO_TREINO").length },
            { id: "EXPIRED", label: "Expiradas", count: students.filter((s) => s.consultancyStatus === "EXPIRED").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab.id
                  ? "bg-primary text-black shadow-lg shadow-primary/20"
                  : "bg-[#141414] text-muted-foreground hover:text-white hover:bg-[#1f1f1f]"
              }`}
            >
              {tab.label} <span className="ml-1 opacity-70">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista / Tabela de Alunas */}
      <div className="bg-[#090909] border border-[#262626] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-muted-foreground space-y-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-xs font-semibold">Carregando alunas da consultoria...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-16 px-4 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-base font-extrabold text-white">Nenhuma aluna encontrada</h3>
                <p className="text-xs text-muted-foreground">
                  Nenhum resultado corresponde ao filtro ou busca selecionada.
                </p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                variant="glow"
                size="sm"
                className="rounded-full text-xs font-black uppercase tracking-wider mt-2"
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Cadastrar Nova Aluna
              </Button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#262626] bg-[#121212]/50 text-[0.65rem] uppercase tracking-wider font-extrabold text-muted-foreground">
                  <th className="py-3.5 px-4">Aluna</th>
                  <th className="py-3.5 px-4">Métricas Físicas</th>
                  <th className="py-3.5 px-4">Status Consultoria</th>
                  <th className="py-3.5 px-4">Início / Reavaliação</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c1c] text-xs">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Aluna */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover border border-primary/30 shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="font-extrabold text-white group-hover:text-primary transition-colors">
                            {student.name}
                          </span>
                          <span className="text-[0.7rem] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Métricas Físicas Reais */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">Peso: {student.weight || "--"}</span>
                        <span className="text-[0.7rem] text-muted-foreground">
                          Meta: {student.targetWeight || "--"} | Altura: {student.height || "--"}
                        </span>
                      </div>
                    </td>

                    {/* Status Consultoria */}
                    <td className="py-4 px-4">{getStatusBadge(student.consultancyStatus)}</td>

                    {/* Datas Reais */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col text-[0.75rem]">
                        <span className="text-muted-foreground">Início: <strong className="text-white">{student.startDate}</strong></span>
                        <span className="font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          Próx. Avaliação: {student.nextEvaluationDate}
                        </span>
                      </div>
                    </td>

                    {/* Ações */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* WhatsApp Direct Link */}
                        <a
                          href={`https://wa.me/${student.phone}?text=Ol%C3%A1%20${encodeURIComponent(
                            student.name
                          )}!%20Aqui%20%C3%A9%20a%20Maria%20Ara%C3%BAjo.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                          title="Falar no WhatsApp"
                        >
                          <Phone className="w-4 h-4" />
                        </a>

                        {/* Editar Ficha & Datas */}
                        <Button
                          variant="glow"
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                          className="rounded-xl text-xs font-bold"
                        >
                          <FileText className="mr-1.5 h-3.5 w-3.5" />
                          Ficha & Anamnese
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL 1: Cadastrar Nova Aluna com Métricas de Anamnese Reais */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Cadastrar Nova Aluna</DialogTitle>
            <DialogDescription>
              Preencha os dados reais da aluna, anamnese e métricas de peso inicial.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddStudent} className="space-y-4 text-left mt-2 max-h-[75vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block mb-1">
                  Nome Completo
                </label>
                <Input
                  required
                  type="text"
                  placeholder="Ex: Maria Silva"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block mb-1">
                  E-mail
                </label>
                <Input
                  required
                  type="email"
                  placeholder="exemplo@email.com"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
                />
              </div>
            </div>

            {/* Campo de Senha */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  Senha de Acesso Inicial
                </label>
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="text-[0.65rem] font-bold text-primary hover:underline flex items-center gap-1 transition-all"
                >
                  <RefreshCw className="w-3 h-3" /> Gerar Senha
                </button>
              </div>
              <div className="relative">
                <Input
                  required
                  minLength={6}
                  type={showPassword ? "text" : "password"}
                  placeholder="Defina uma senha (mínimo 6 caracteres)"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                  className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* MÉTRICAS FÍSICAS REAIS */}
            <div className="p-3.5 bg-[#0f0f0f] border border-[#262626] rounded-2xl space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Métricas Iniciais da Anamnese
              </span>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-[0.62rem] font-extrabold uppercase text-muted-foreground block mb-1">
                    Peso (kg)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="65.0"
                    value={newStudent.weight}
                    onChange={(e) => setNewStudent({ ...newStudent, weight: e.target.value })}
                    className="bg-[#141414] border-[#262626] text-xs text-white rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[0.62rem] font-extrabold uppercase text-emerald-400 block mb-1">
                    Meta (kg)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="58.0"
                    value={newStudent.targetWeight}
                    onChange={(e) => setNewStudent({ ...newStudent, targetWeight: e.target.value })}
                    className="bg-[#141414] border-[#262626] text-xs text-emerald-400 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[0.62rem] font-extrabold uppercase text-muted-foreground block mb-1">
                    Altura (cm)
                  </label>
                  <Input
                    type="number"
                    placeholder="165"
                    value={newStudent.height}
                    onChange={(e) => setNewStudent({ ...newStudent, height: e.target.value })}
                    className="bg-[#141414] border-[#262626] text-xs text-white rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[0.62rem] font-extrabold uppercase text-muted-foreground block mb-1">
                    Idade (anos)
                  </label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={newStudent.age}
                    onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                    className="bg-[#141414] border-[#262626] text-xs text-white rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-[0.65rem] font-extrabold uppercase text-muted-foreground block mb-1">
                  Resumo da Anamnese / Observações Físicas
                </label>
                <textarea
                  rows={2}
                  placeholder="Descreva lesões, restrições alimentares ou preferências de treino..."
                  value={newStudent.anamnesisSummary}
                  onChange={(e) => setNewStudent({ ...newStudent, anamnesisSummary: e.target.value })}
                  className="w-full bg-[#141414] border border-[#262626] text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Datas do Ciclo */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block mb-1">
                  Data de Início
                </label>
                <Input
                  type="date"
                  value={newStudent.startDate}
                  onChange={(e) => setNewStudent({ ...newStudent, startDate: e.target.value })}
                  className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block mb-1">
                  Próxima Avaliação
                </label>
                <Input
                  type="date"
                  value={newStudent.nextEvaluationDate}
                  onChange={(e) => setNewStudent({ ...newStudent, nextEvaluationDate: e.target.value })}
                  className="bg-[#121212] border-amber-500/40 text-xs text-white rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block mb-1">
                  Plano
                </label>
                <select
                  value={newStudent.planName}
                  onChange={(e) => {
                    const val = e.target.value;
                    let price = "R$ 660,00";
                    if (val === "Consultoria Mensal") price = "R$ 250,00";
                    if (val === "Protocolo Express") price = "R$ 150,00";
                    setNewStudent({ ...newStudent, planName: val, planPrice: price });
                  }}
                  className="w-full bg-[#121212] border border-[#262626] text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-primary"
                >
                  <option value="Consultoria VIP Trimestral">Consultoria VIP Trimestral</option>
                  <option value="Consultoria Mensal">Consultoria Mensal</option>
                  <option value="Protocolo Express">Protocolo Express</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block mb-1">
                  Objetivo Principal
                </label>
                <Input
                  type="text"
                  placeholder="Emagrecimento / Hipertrofia"
                  value={newStudent.goal}
                  onChange={(e) => setNewStudent({ ...newStudent, goal: e.target.value })}
                  className="bg-[#121212] border-[#262626] text-xs text-white rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-[#262626]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-xl border-white/10 text-xs font-bold"
              >
                Cancelar
              </Button>
              <Button type="submit" variant="glow" size="sm" className="rounded-xl text-xs font-black uppercase tracking-wider">
                Salvar Aluna Completa
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Gestão de Datas & Ficha da Aluna */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        {selectedStudent && (
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <DialogTitle className="text-xl">{selectedStudent.name}</DialogTitle>
                  <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span>{selectedStudent.email}</span> • <span>{selectedStudent.planName}</span>
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5 text-left border-t border-[#262626] pt-4 max-h-[75vh] overflow-y-auto pr-1">
              {/* PAINEL DE DEFINIÇÃO DA PRÓXIMA AVALIAÇÃO */}
              <div className="bg-[#090909] border border-amber-500/30 p-4 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-white">
                      Definir Datas da Consultoria
                    </h4>
                  </div>
                  {isSavedNotice && (
                    <span className="text-[0.65rem] font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3 h-3" /> Ficha Salva com Sucesso!
                    </span>
                  )}
                </div>

                {/* Seletores de Data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[0.65rem] font-extrabold uppercase text-muted-foreground block mb-1">
                      Data de Início do Ciclo
                    </label>
                    <Input
                      type="date"
                      value={editStartDate}
                      onChange={(e) => setEditStartDate(e.target.value)}
                      className="bg-[#141414] border-[#262626] text-xs text-white rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[0.65rem] font-extrabold uppercase text-amber-400 block mb-1">
                      Próxima Avaliação
                    </label>
                    <Input
                      type="date"
                      value={editNextEvalDate}
                      onChange={(e) => setEditNextEvalDate(e.target.value)}
                      className="bg-[#141414] border-amber-500/50 text-xs text-white font-bold rounded-xl"
                    />
                  </div>
                </div>

                {/* Atalhos Rápidos de Prazo */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[0.62rem] font-bold uppercase text-muted-foreground block">
                    Atalhos de Prazo a partir de hoje:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveStudentDetails(30)}
                      className="rounded-xl text-[0.7rem] font-bold border-white/10 hover:border-amber-400 hover:text-amber-400"
                    >
                      + 30 Dias (Mensal)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveStudentDetails(45)}
                      className="rounded-xl text-[0.7rem] font-bold border-white/10 hover:border-amber-400 hover:text-amber-400"
                    >
                      + 45 Dias
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveStudentDetails(60)}
                      className="rounded-xl text-[0.7rem] font-bold border-white/10 hover:border-amber-400 hover:text-amber-400"
                    >
                      + 60 Dias
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveStudentDetails(90)}
                      className="rounded-xl text-[0.7rem] font-bold border-white/10 hover:border-amber-400 hover:text-amber-400"
                    >
                      + 90 Dias (Trimestral)
                    </Button>
                  </div>
                </div>
              </div>

              {/* EDIÇÃO DAS MÉTRICAS FÍSICAS REAIS DA ALUNA */}
              <div className="bg-[#090909] border border-[#262626] p-4 rounded-2xl space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-primary" /> Editar Métricas Físicas & Anamnese
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[0.62rem] font-bold uppercase text-muted-foreground block mb-1">
                      Peso Atual (kg)
                    </label>
                    <Input
                      type="text"
                      value={editWeight}
                      onChange={(e) => setEditWeight(e.target.value)}
                      className="bg-[#141414] border-[#262626] text-xs text-white rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[0.62rem] font-bold uppercase text-emerald-400 block mb-1">
                      Peso Meta (kg)
                    </label>
                    <Input
                      type="text"
                      value={editTargetWeight}
                      onChange={(e) => setEditTargetWeight(e.target.value)}
                      className="bg-[#141414] border-[#262626] text-xs text-emerald-400 font-bold rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[0.62rem] font-bold uppercase text-muted-foreground block mb-1">
                      Altura (cm)
                    </label>
                    <Input
                      type="text"
                      value={editHeight}
                      onChange={(e) => setEditHeight(e.target.value)}
                      className="bg-[#141414] border-[#262626] text-xs text-white rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[0.62rem] font-bold uppercase text-muted-foreground block mb-1">
                      Idade (anos)
                    </label>
                    <Input
                      type="text"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="bg-[#141414] border-[#262626] text-xs text-white rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[0.65rem] font-bold uppercase text-muted-foreground block mb-1">
                    Objetivo Principal
                  </label>
                  <Input
                    type="text"
                    value={editGoal}
                    onChange={(e) => setEditGoal(e.target.value)}
                    className="bg-[#141414] border-[#262626] text-xs text-white rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[0.65rem] font-bold uppercase text-muted-foreground block mb-1">
                    Resumo da Anamnese
                  </label>
                  <textarea
                    rows={2}
                    value={editAnamnesis}
                    onChange={(e) => setEditAnamnesis(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Botão de Salvar Ficha Completa */}
              <div className="pt-2">
                <Button
                  onClick={() => handleSaveStudentDetails()}
                  variant="glow"
                  className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Ficha & Anamnese da Aluna
                </Button>
              </div>

              <div className="pt-2 flex justify-end border-t border-[#262626]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedStudent(null)}
                  className="rounded-xl border-white/10 text-xs font-bold"
                >
                  Fechar Ficha
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
