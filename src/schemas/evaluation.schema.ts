import { z } from 'zod';

export const evaluationPhotoUploadSchema = z.object({
  evaluationId: z.string().uuid('ID de avaliação inválido'),
  cloudinaryPublicId: z.string().min(1, 'Public ID do Cloudinary é obrigatório'),
  secureUrl: z.string().url('URL segura inválida'),
  photoType: z.enum(['FRONT', 'BACK', 'SIDE_LEFT', 'SIDE_RIGHT', 'EXTRA']),
});

export const createEvaluationSchema = z.object({
  studentId: z.string().uuid('ID de aluno inválido'),
  evaluationRequestId: z.string().uuid().optional(),
  notes: z.string().optional(),
  feedback: z.string().optional(),
});

export type EvaluationPhotoUploadInput = z.infer<typeof evaluationPhotoUploadSchema>;
export type CreateEvaluationInput = z.infer<typeof createEvaluationSchema>;
