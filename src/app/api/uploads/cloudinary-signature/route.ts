import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/database/server';
import { CloudinaryProvider } from '@/providers/cloudinary.provider';

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: 'Não autorizado para upload' }, { status: 401 });
    }

    const signatureData = CloudinaryProvider.generateSignature('maria-araujo/evaluations');

    return NextResponse.json({
      success: true,
      ...signatureData,
    });
  } catch (error: any) {
    console.error('[Cloudinary Signature Error]:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar assinatura de upload', details: error.message },
      { status: 500 }
    );
  }
}
