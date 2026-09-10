-- ==========================================================
-- MARIA ARAÚJO PERSONAL - SEED DATA MIGRATION (003)
-- Initial active plans and configuration defaults
-- ==========================================================

INSERT INTO public.plans (id, title, slug, description, price_monthly, price_quarterly, features_json, is_active)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'Consultoria Mensal',
    'consultoria-mensal',
    'Acompanhamento mensal personalizado de treino, ideal para quem deseja flexibilidade e resultados rápidos com suporte direto da Maria.',
    250.00,
    675.00,
    '[
      "Ficha de Treino 100% Personalizada",
      "Suporte Direto via WhatsApp / Chat Interno",
      "Avaliação Física Completa (Fotos & Medidas)",
      "Ajustes Ilimitados de Cargas e Exercícios",
      "Acesso ao Aplicativo Exclusivo"
    ]'::jsonb,
    TRUE
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Consultoria VIP Trimestral',
    'consultoria-trimestral-vip',
    'O plano mais popular. Acompanhamento completo por 3 meses com foco em hipertrofia, emagrecimento ou definição.',
    220.00,
    660.00,
    '[
      "Ficha de Treino Personalizada com Troca Mensal",
      "Avaliação Corporal Quinzenal com Análise de Progresso",
      "Suporte Prioritário no WhatsApp com a Maria",
      "Guia Complementar de Nutrição & Suplementação",
      "Vídeos Demonstrativos em Alta Definição para cada Exercício",
      "Desconto Exclusivo na Renovação"
    ]'::jsonb,
    TRUE
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Protocolo Express',
    'protocolo-express',
    'Plano focado em prescrição rápida de treino para alunos autônomos que buscam apenas organização dos seus treinos.',
    150.00,
    400.00,
    '[
      "Ficha de Treino Personalizada",
      "Acesso ao App por 30 dias",
      "Vídeos demonstrativos de execução",
      "1 Ajuste de ficha no período"
    ]'::jsonb,
    TRUE
  )
ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price_monthly = EXCLUDED.price_monthly,
  price_quarterly = EXCLUDED.price_quarterly,
  features_json = EXCLUDED.features_json,
  is_active = EXCLUDED.is_active,
  updated_at = timezone('utc'::text, now());
