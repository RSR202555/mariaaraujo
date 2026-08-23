import { createServerSupabaseClient } from '@/database/server';
import { createAdminClient } from '@/database/service-role';
import { ConsultancyStatus } from '@/types/database.types';

export class StudentRepository {
  static async findById(id: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('students')
      .select('*, profiles(*)')
      .eq('id', id)
      .single();

    if (error) throw new Error(`StudentRepository.findById: ${error.message}`);
    return data;
  }

  static async findByProfileId(profileId: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('students')
      .select('*, profiles(*)')
      .eq('profile_id', profileId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`StudentRepository.findByProfileId: ${error.message}`);
    }
    return data;
  }

  static async findByAsaasCustomerId(asaasCustomerId: string) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('students')
      .select('*, profiles(*)')
      .eq('asaas_customer_id', asaasCustomerId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`StudentRepository.findByAsaasCustomerId: ${error.message}`);
    }
    return data;
  }

  static async updateStatus(studentId: string, status: ConsultancyStatus) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('students')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', studentId)
      .select()
      .single();

    if (error) throw new Error(`StudentRepository.updateStatus: ${error.message}`);
    return data;
  }

  static async updateAsaasCustomerId(studentId: string, asaasCustomerId: string) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('students')
      .update({ asaas_customer_id: asaasCustomerId, updated_at: new Date().toISOString() })
      .eq('id', studentId)
      .select()
      .single();

    if (error) throw new Error(`StudentRepository.updateAsaasCustomerId: ${error.message}`);
    return data;
  }

  static async listAll(page = 1, pageSize = 20) {
    const supabase = await createServerSupabaseClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('students')
      .select('*, profiles(*)', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`StudentRepository.listAll: ${error.message}`);
    return { data, count };
  }
}
