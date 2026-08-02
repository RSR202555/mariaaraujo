/**
 * Core Data Models and Interfaces for Maria Araújo Personal
 * Enforces strict typing according to TypeScript Architect (05-typescript-architect).
 */

export interface ConsultoriaPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  whatsappMessage: string;
}

export interface Depoimento {
  id: string;
  nome: string;
  resultado: string;
  texto: string;
  tempo: string;
  avatarUrl?: string;
  imagemTransformacaoUrl?: string;
}

export interface FAQItem {
  id: string;
  pergunta: string;
  resposta: string;
  categoria?: "geral" | "consultoria" | "treinos" | "nutricao";
}

export interface TransformacaoItem {
  id: string;
  nome: string;
  tempo: string;
  pesoPerdidoOuMassa: string;
  descricao: string;
  imagemAntes: string;
  imagemDepois: string;
}

export interface FeedbackWhatsapp {
  id: string;
  alunaNome: string;
  mensagem: string;
  horario: string;
  tag: string;
  printUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "aluno";
  avatar?: string;
  planoAtivo?: string;
  proximaAvaliacao?: string;
}

export interface TreinoAluno {
  id: string;
  titulo: string;
  grupoMuscular: string;
  exerciciosCount: number;
  duracaoEstimada: string;
  concluido?: boolean;
}
