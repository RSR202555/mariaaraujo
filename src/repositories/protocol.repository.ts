import { createServerSupabaseClient } from '@/database/server';

export class ProtocolRepository {
  static async findActiveByStudentId(studentId: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('protocols')
      .select(`
        *,
        protocol_versions (
          *,
          training_links (*),
          nutrition_links (*)
        )
      `)
      .eq('student_id', studentId)
      .eq('status', 'ACTIVE')
      .order('created_at', { ascending: false })
      .maybeSingle();

    if (error) throw new Error(`ProtocolRepository.findActiveByStudentId: ${error.message}`);
    return data;
  }

  static async createProtocol(protocolData: {
    student_id: string;
    personal_trainer_id?: string;
    title: string;
    description?: string;
    status?: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  }) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('protocols')
      .insert(protocolData)
      .select()
      .single();

    if (error) throw new Error(`ProtocolRepository.createProtocol: ${error.message}`);
    return data;
  }

  static async createProtocolVersion(versionData: {
    protocol_id: string;
    version_number: number;
    notes?: string;
  }) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('protocol_versions')
      .insert(versionData)
      .select()
      .single();

    if (error) throw new Error(`ProtocolRepository.createProtocolVersion: ${error.message}`);
    return data;
  }

  static async addTrainingLink(trainingData: {
    protocol_version_id: string;
    exercise_name: string;
    video_url?: string;
    sets: number;
    reps: string;
    rest_seconds?: number;
    notes?: string;
    order_index: number;
  }) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('training_links')
      .insert(trainingData)
      .select()
      .single();

    if (error) throw new Error(`ProtocolRepository.addTrainingLink: ${error.message}`);
    return data;
  }
}
