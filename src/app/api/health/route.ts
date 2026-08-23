import { NextResponse } from 'next/server';
import { AsaasProvider } from '@/providers/asaas.provider';
import { createAdminClient } from '@/database/service-role';

export async function GET() {
  const servicesStatus = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      supabase: {
        configured: Boolean(
          process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ),
        serviceRoleConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
        connection: 'untested',
      },
      asaas: AsaasProvider.getStatus(),
      resend: {
        configured: Boolean(process.env.RESEND_API_KEY),
        defaultFrom: process.env.RESEND_DEFAULT_FROM || 'Maria Araújo Personal <contato@mariaaraujopersonal.com.br>',
      },
      cloudinary: {
        configured: Boolean(
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
            process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET
        ),
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'not_configured',
      },
    },
  };

  // Test Supabase Admin Connection if keys are defined
  if (
    servicesStatus.services.supabase.configured &&
    servicesStatus.services.supabase.serviceRoleConfigured &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')
  ) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase.from('plans').select('id, title').limit(1);
      if (error) {
        servicesStatus.services.supabase.connection = `error: ${error.message}`;
      } else {
        servicesStatus.services.supabase.connection = `connected (${data?.length ?? 0} plans queryable)`;
      }
    } catch (err: any) {
      servicesStatus.services.supabase.connection = `error: ${err.message}`;
    }
  } else {
    servicesStatus.services.supabase.connection = 'placeholder_mode (keys not set)';
  }

  return NextResponse.json(servicesStatus, { status: 200 });
}
