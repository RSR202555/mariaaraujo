'use server';

import { createServerSupabaseClient } from '@/database/server';
import { EvaluationRepository } from '@/repositories/evaluation.repository';
import { evaluationPhotoUploadSchema, EvaluationPhotoUploadInput } from '@/schemas/evaluation.schema';
import { AzureAIProvider } from '@/providers/azure-ai.provider';

export async function requestEvaluationAction(notes?: string) {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { success: false, error: 'Usuário não autenticado' };
  }

  // Buscar ID do aluno a partir do perfil
  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('profile_id', user.id)
    .single();

  if (!student) {
    return { success: false, error: 'Perfil de aluno não encontrado' };
  }

  const request = await EvaluationRepository.createRequest(student.id, notes);
  return { success: true, request };
}

export async function registerEvaluationPhotoAction(input: EvaluationPhotoUploadInput) {
  const validation = evaluationPhotoUploadSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const { evaluationId, cloudinaryPublicId, secureUrl, photoType } = validation.data;

  // Analisar imagem usando Azure AI em background (qualidade, iluminação)
  let aiAnalysis = {};
  try {
    aiAnalysis = await AzureAIProvider.analyzeEvaluationPhoto(secureUrl);
  } catch (aiErr) {
    console.error('Erro na análise Azure AI:', aiErr);
  }

  const photo = await EvaluationRepository.addPhoto({
    evaluation_id: evaluationId,
    cloudinary_public_id: cloudinaryPublicId,
    secure_url: secureUrl,
    photo_type: photoType,
    ai_analysis_json: aiAnalysis,
  });

  return { success: true, photo };
}
