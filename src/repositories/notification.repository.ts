import { createServerSupabaseClient } from '@/database/server';
import { createAdminClient } from '@/database/service-role';

export class NotificationRepository {
  static async createNotification(notificationData: {
    profile_id: string;
    title: string;
    message: string;
    type?: 'SYSTEM' | 'PAYMENT' | 'PROTOCOL' | 'EVALUATION' | 'MESSAGE';
    link?: string;
  }) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('notifications')
      .insert(notificationData)
      .select()
      .single();

    if (error) throw new Error(`NotificationRepository.createNotification: ${error.message}`);
    return data;
  }

  static async findUnreadByProfileId(profileId: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('profile_id', profileId)
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`NotificationRepository.findUnreadByProfileId: ${error.message}`);
    return data;
  }

  static async markAsRead(notificationId: string) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) throw new Error(`NotificationRepository.markAsRead: ${error.message}`);
    return data;
  }
}
