import { createServerSupabaseClient } from '@/database/server';
import { createAdminClient } from '@/database/service-role';
import { SubscriptionStatus, PaymentStatus, PaymentMethod } from '@/types/database.types';

export class PaymentRepository {
  static async createSubscription(subscriptionData: {
    student_id: string;
    plan_id: string;
    asaas_subscription_id: string;
    asaas_customer_id: string;
    status: SubscriptionStatus;
    billing_type: PaymentMethod;
    current_period_start: string;
    current_period_end: string;
  }) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('subscriptions')
      .insert(subscriptionData)
      .select()
      .single();

    if (error) throw new Error(`PaymentRepository.createSubscription: ${error.message}`);
    return data;
  }

  static async findSubscriptionByAsaasId(asaasSubscriptionId: string) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('asaas_subscription_id', asaasSubscriptionId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`PaymentRepository.findSubscriptionByAsaasId: ${error.message}`);
    }
    return data;
  }

  static async updateSubscriptionStatus(asaasSubscriptionId: string, status: SubscriptionStatus) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('asaas_subscription_id', asaasSubscriptionId)
      .select()
      .single();

    if (error) throw new Error(`PaymentRepository.updateSubscriptionStatus: ${error.message}`);
    return data;
  }

  static async recordPayment(paymentData: {
    subscription_id?: string;
    student_id: string;
    asaas_payment_id: string;
    amount: number;
    status: PaymentStatus;
    billing_type: PaymentMethod;
    invoice_url?: string;
    paid_at?: string;
  }) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('payments')
      .upsert(paymentData, { onConflict: 'asaas_payment_id' })
      .select()
      .single();

    if (error) throw new Error(`PaymentRepository.recordPayment: ${error.message}`);
    return data;
  }

  static async findPaymentsByStudent(studentId: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`PaymentRepository.findPaymentsByStudent: ${error.message}`);
    return data;
  }
}
