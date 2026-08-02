export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export class ResendProvider {
  private static apiKey = process.env.RESEND_API_KEY || '';
  private static defaultFrom = process.env.RESEND_DEFAULT_FROM || 'Maria Araújo Personal <contato@mariaaraujopersonal.com.br>';

  static async sendEmail(input: SendEmailInput) {
    if (!this.apiKey) {
      console.log(`[ResendProvider Mock] Email to ${input.to} | Subject: ${input.subject}`);
      return { id: 'mock_resend_id_' + Date.now() };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: input.from || this.defaultFrom,
        to: [input.to],
        subject: input.subject,
        html: input.html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`ResendProvider.sendEmail error: ${data.message || 'Erro ao enviar e-mail via Resend'}`);
    }

    return { id: data.id as string };
  }
}
