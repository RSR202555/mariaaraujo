import { NextRequest, NextResponse } from 'next/server';
import { AsaasProvider } from '@/providers/asaas.provider';
import { PaymentService } from '@/services/payment.service';

export async function POST(req: NextRequest) {
  try {
    const accessToken = req.headers.get('asaas-access-token');

    // Validação de Segurança do Header do Webhook Asaas
    if (!AsaasProvider.validateWebhookToken(accessToken)) {
      console.warn('[Asaas Webhook] Token de acesso inválido ou ausente.');
      return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 });
    }

    const body = await req.json();
    const { event, payment } = body;

    if (!event || !payment) {
      return NextResponse.json({ error: 'Invalid webhook payload structure' }, { status: 400 });
    }

    // Processamento Idempotente no PaymentService
    await PaymentService.handleAsaasWebhook(event, payment);

    return NextResponse.json({ success: true, event }, { status: 200 });
  } catch (error: any) {
    console.error('[Asaas Webhook Error]:', error);
    return NextResponse.json(
      { error: 'Internal webhook processing error', details: error.message },
      { status: 500 }
    );
  }
}
