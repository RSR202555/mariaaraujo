import { NextResponse } from 'next/server';
import { createAdminClient } from '@/database/service-role';

export async function GET(request: Request) {
  // Opcional: Proteger a rota para que não seja acessada por qualquer pessoa,
  // verificando um token secreto se estiver configurado.
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    
    // Faz uma query muito leve para "acordar" o banco de dados (ex: consultar um único plano ou perfil)
    const { data, error } = await supabase.from('plans').select('id').limit(1);

    if (error) {
      console.error('Keep-alive cron error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection is active.',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Keep-alive cron exception:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
