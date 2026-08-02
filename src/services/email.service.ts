import { ResendProvider } from '@/providers/resend.provider';

export class EmailService {
  static async sendWelcomeEmail(to: string, name: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #090909; color: #ffffff; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #141414; border: 1px solid #262626; border-radius: 16px; padding: 32px;">
          <h1 style="color: #D85C8A; margin-bottom: 8px;">MARIA ARAÚJO PERSONAL.</h1>
          <h2 style="color: #ffffff; font-size: 20px;">Bem-vinda, ${name}!</h2>
          <p style="color: #b8b8b8; line-height: 1.6;">
            Sua conta na consultoria fitness VIP foi criada com sucesso. Estamos prontos para iniciar sua transformação com base científica e acompanhamento estratégico.
          </p>
          <div style="margin-top: 32px;">
            <a href="https://mariaaraujopersonal.com.br/login" style="background-color: #D85C8A; color: #ffffff; padding: 14px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; display: inline-block;">
              ACESSAR ÁREA DO ALUNO
            </a>
          </div>
        </div>
      </div>
    `;

    return ResendProvider.sendEmail({
      to,
      subject: 'Bem-vinda à Consultoria VIP | Maria Araújo Personal',
      html,
    });
  }

  static async sendPaymentConfirmedEmail(to: string, name: string, amount: number, method: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #090909; color: #ffffff; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #141414; border: 1px solid #262626; border-radius: 16px; padding: 32px;">
          <h1 style="color: #D85C8A; margin-bottom: 8px;">MARIA ARAÚJO PERSONAL.</h1>
          <h2 style="color: #4ADE80; font-size: 20px;">Pagamento Confirmado!</h2>
          <p style="color: #b8b8b8; line-height: 1.6;">
            Olá, ${name}! Confirmamos o recebimento do seu pagamento no valor de <strong>R$ ${amount.toFixed(2)}</strong> via ${method}.
          </p>
          <p style="color: #b8b8b8; line-height: 1.6;">
            Sua consultoria está ativa. Acesse o aplicativo para visualizar seu protocolo de treinos.
          </p>
          <div style="margin-top: 32px;">
            <a href="https://mariaaraujopersonal.com.br/aluno" style="background-color: #D85C8A; color: #ffffff; padding: 14px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; display: inline-block;">
              VER MEUS TREINOS
            </a>
          </div>
        </div>
      </div>
    `;

    return ResendProvider.sendEmail({
      to,
      subject: 'Pagamento Confirmado | Maria Araújo Personal',
      html,
    });
  }

  static async sendNewProtocolEmail(to: string, name: string, protocolTitle: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #090909; color: #ffffff; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #141414; border: 1px solid #262626; border-radius: 16px; padding: 32px;">
          <h1 style="color: #D85C8A; margin-bottom: 8px;">MARIA ARAÚJO PERSONAL.</h1>
          <h2 style="color: #ffffff; font-size: 20px;">Novo Protocolo de Treinos Liberado!</h2>
          <p style="color: #b8b8b8; line-height: 1.6;">
            Olá, ${name}! O seu novo protocolo <strong>"${protocolTitle}"</strong> foi prescrito e já está disponível no seu app.
          </p>
          <div style="margin-top: 32px;">
            <a href="https://mariaaraujopersonal.com.br/aluno/meu-treino" style="background-color: #D85C8A; color: #ffffff; padding: 14px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; display: inline-block;">
              ACESSAR NOVO TREINO
            </a>
          </div>
        </div>
      </div>
    `;

    return ResendProvider.sendEmail({
      to,
      subject: 'Novo Treino Liberado | Maria Araújo Personal',
      html,
    });
  }
}
