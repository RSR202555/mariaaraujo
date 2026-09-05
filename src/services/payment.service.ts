import { PaymentRepository } from '@/repositories/payment.repository';
import { StudentRepository } from '@/repositories/student.repository';
import { EmailService } from '@/services/email.service';
import { NotificationRepository } from '@/repositories/notification.repository';
import { PaymentStatus, PaymentMethod } from '@/types/database.types';

export class PaymentService {
  /**
   * Processa o evento de webhook enviado pelo Mercado Pago
   */
  static async handleMercadoPagoWebhook(paymentData: any) {
    console.log(`[PaymentService.handleMercadoPagoWebhook] Payment Data:`, paymentData.id);

    const mpPaymentId = paymentData.id.toString();
    const payerEmail = paymentData.payer?.email;
    const value = paymentData.transaction_amount;
    
    // Mapeia o tipo de pagamento do Mercado Pago
    let billingType: PaymentMethod = 'CREDIT_CARD';
    if (paymentData.payment_type_id === 'ticket') {
      billingType = 'BOLETO';
    } else if (paymentData.payment_method_id === 'pix') {
      billingType = 'PIX';
    }

    // Mapeia o status do Mercado Pago
    let status: PaymentStatus = 'PENDING';
    if (paymentData.status === 'approved') {
      status = 'RECEIVED';
    } else if (paymentData.status === 'rejected' || paymentData.status === 'cancelled') {
      status = 'OVERDUE';
    }

    if (!payerEmail) {
      console.warn(`Payer email not found in Mercado Pago payment data`);
      return;
    }

    // Buscar aluno pelo email
    const student = await StudentRepository.findByEmail(payerEmail);
    if (!student) {
      console.warn(`Student not found for email: ${payerEmail}. Maybe they haven't registered yet.`);
      // Se não encontrou, o usuário pode ainda não ter completado o cadastro no sistema.
      // Nesse caso, o pagamento fica registrado apenas no Mercado Pago até que possamos vincular ou ignoramos
      return;
    }

    // Gravar/atualizar pagamento no banco
    await PaymentRepository.recordPayment({
      student_id: student.id,
      asaas_payment_id: mpPaymentId, // reaproveitando a coluna para guardar o ID do Mercado Pago
      amount: value,
      status: status,
      billing_type: billingType,
      invoice_url: paymentData.transaction_details?.external_resource_url,
      paid_at: paymentData.date_approved ? new Date(paymentData.date_approved).toISOString() : undefined,
    });

    const studentProfile = (student as any).profiles;

    // Eventos de Pagamento Confirmado / Recebido
    if (status === 'RECEIVED') {
      // 1. Ativar conta do aluno
      await StudentRepository.updateStatus(student.id, 'ACTIVE');

      // 3. Enviar e-mail de confirmação de pagamento via Resend
      if (studentProfile?.email) {
        await EmailService.sendPaymentConfirmedEmail(
          studentProfile.email,
          studentProfile.full_name,
          value,
          billingType
        );
      }

      // 4. Criar notificação in-app
      await NotificationRepository.createNotification({
        profile_id: student.profile_id,
        title: 'Pagamento Confirmado!',
        message: 'Seu pagamento via Mercado Pago foi confirmado com sucesso. Sua consultoria VIP está ativa!',
        type: 'PAYMENT',
        link: '/aluno',
      });
    }

    // Eventos de Inadimplência / Atraso ou Rejeitado
    if (status === 'OVERDUE') {
      await StudentRepository.updateStatus(student.id, 'EXPIRED');

      await NotificationRepository.createNotification({
        profile_id: student.profile_id,
        title: 'Problema com Pagamento',
        message: 'Seu último pagamento não foi aprovado ou foi cancelado. Regularize para manter o acesso.',
        type: 'PAYMENT',
        link: '/checkout',
      });
    }
  }
}
