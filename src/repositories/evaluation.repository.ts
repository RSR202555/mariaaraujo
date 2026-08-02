import { createServerSupabaseClient } from '@/database/server';

export class EvaluationRepository {
  static async createRequest(studentId: string, notes?: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('evaluation_requests')
      .insert({ student_id: studentId, notes, status: 'PENDING' })
      .select()
      .single();

    if (error) throw new Error(`EvaluationRepository.createRequest: ${error.message}`);
    return data;
  }

  static async createEvaluation(evalData: {
    student_id: string;
    personal_trainer_id?: string;
    evaluation_request_id?: string;
    notes?: string;
    feedback?: string;
  }) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('evaluations')
      .insert(evalData)
      .select()
      .single();

    if (error) throw new Error(`EvaluationRepository.createEvaluation: ${error.message}`);
    return data;
  }

  static async addPhoto(photoData: {
    evaluation_id: string;
    cloudinary_public_id: string;
    secure_url: string;
    photo_type: 'FRONT' | 'BACK' | 'SIDE_LEFT' | 'SIDE_RIGHT' | 'EXTRA';
    ai_analysis_json?: any;
  }) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('evaluation_photos')
      .insert(photoData)
      .select()
      .single();

    if (error) throw new Error(`EvaluationRepository.addPhoto: ${error.message}`);
    return data;
  }

  static async findLatestByStudentId(studentId: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('evaluations')
      .select(`
        *,
        evaluation_photos (*),
        body_measurements (*)
      `)
      .eq('student_id', studentId)
      .order('evaluated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw new Error(`EvaluationRepository.findLatestByStudentId: ${error.message}`);
    return data;
  }
}
