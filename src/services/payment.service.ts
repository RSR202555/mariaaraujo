import { AsaasProvider } from '@/providers/asaas.provider';
import { PaymentRepository } from '@/repositories/payment.repository';
import { StudentRepository } from '@/repositories/student.repository';
import { EmailService } from '@/services/email.service';
import { NotificationRepository } from '@/repositories/notification.repository';

export class PaymentService {
  /**
   * Processa o evento de webhook enviado pelo Asaas
   */
  static async handleAsaasWebhook(event: string, paymentData: any) {
    console.log(`[PaymentService.handleAsaasWebhook] Event: ${event}`, paymentData);

    const asaasPaymentId = paymentData.id;
    const asaasCustomerId = paymentData.customer;
    const asaasSubscriptionId = paymentData.subscription;
    const value = paymentData.value;
    const billingType = paymentData.billingType;
    const status = paymentData.status;

    // Buscar aluno pelo Asaas Customer ID
    const student = await StudentRepository.findByAsaasCustomerId(asaasCustomerId);
    if (!student) {
      console.warn(`Student not found for Asaas customer ID: ${asaasCustomerId}`);
      return;
    }

    // Gravar/atualizar pagamento no banco
    await PaymentRepository.recordPayment({
      student_id: student.id,
      asaas_payment_id: asaasPaymentId,
      amount: value,
      status: status,
      billing_type: billingType,
      invoice_url: paymentData.invoiceUrl,
      paid_at: paymentData.paymentDate ? new Date(paymentData.paymentDate).toISOString() : undefined,
    });

    // Eventos de Pagamento Confirmado / Recebido
    if (event === 'PAYMENT_RECEIVED' || event === 'PAYMENT_CONFIRMED') {
      // 1. Ativar conta do aluno
      await StudentRepository.updateStatus(student.id, 'ACTIVE');

      // 2. Atualizar status da assinatura se vinculada
      if (asaasSubscriptionId) {
        await PaymentRepository.updateSubscriptionStatus(asaasSubscriptionId, 'ACTIVE');
      }

      // 3. Enviar e-mail de confirmação de pagamento via Resend
      if (student.profiles?.email) {
        await EmailService.sendPaymentConfirmedEmail(
          student.profiles.email,
          student.profiles.full_name,
          value,
          billingType
        );
      }

      // 4. Criar notificação in-app
      await NotificationRepository.createNotification({
        profile_id: student.profile_id,
        title: 'Pagamento Confirmado!',
        message: 'Seu pagamento foi confirmado com sucesso. Sua consultoria VIP está ativa!',
        type: 'PAYMENT',
        link: '/aluno',
      });
    }

    // Eventos de Inadimplência / Atraso
    if (event === 'PAYMENT_OVERDUE') {
      await StudentRepository.updateStatus(student.id, 'EXPIRED');

      if (asaasSubscriptionId) {
        await PaymentRepository.updateSubscriptionStatus(asaasSubscriptionId, 'OVERDUE');
      }

      await NotificationRepository.createNotification({
        profile_id: student.profile_id,
        title: 'Aviso de Pagamento Atrasado',
        message: 'Constatamos pendência no seu pagamento. Regularize para manter o acesso aos treinos.',
        type: 'PAYMENT',
        link: '/checkout',
      });
    }
  }
}
