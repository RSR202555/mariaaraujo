-- ==========================================================
-- MARIA ARAÚJO PERSONAL - DATABASE SCHEMA MIGRATION (001)
-- PostgreSQL / Supabase Migration: 26 Tables, Indexes, Triggers & Auth Sync
-- ==========================================================

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum Types (Idempotent Creation)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('ADMIN', 'PERSONAL', 'ALUNO');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'consultancy_status') THEN
    CREATE TYPE consultancy_status AS ENUM ('PENDING', 'ACTIVE', 'PAUSED', 'EXPIRED', 'CANCELLED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_status') THEN
    CREATE TYPE subscription_status AS ENUM ('PENDING', 'ACTIVE', 'OVERDUE', 'CANCELLED', 'EXPIRED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
    CREATE TYPE payment_status AS ENUM ('PENDING', 'CONFIRMED', 'RECEIVED', 'OVERDUE', 'REFUNDED', 'FAILED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_method') THEN
    CREATE TYPE payment_method AS ENUM ('PIX', 'CREDIT_CARD', 'BOLETO');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'anamnesis_status') THEN
    CREATE TYPE anamnesis_status AS ENUM ('DRAFT', 'SUBMITTED', 'REVIEWED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'evaluation_request_status') THEN
    CREATE TYPE evaluation_request_status AS ENUM ('PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'photo_type') THEN
    CREATE TYPE photo_type AS ENUM ('FRONT', 'BACK', 'SIDE_LEFT', 'SIDE_RIGHT', 'EXTRA');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'protocol_status') THEN
    CREATE TYPE protocol_status AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type') THEN
    CREATE TYPE notification_type AS ENUM ('SYSTEM', 'PAYMENT', 'PROTOCOL', 'EVALUATION', 'MESSAGE');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
    CREATE TYPE appointment_status AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED');
  END IF;
END $$;

-- Trigger Function for Updated At
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==========================================================
-- 1. PROFILES (Extends auth.users)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'ALUNO',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==========================================================
-- 2. PERSONAL TRAINERS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.personal_trainers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  cref TEXT,
  bio TEXT,
  specialties TEXT[],
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS tr_personal_trainers_updated_at ON public.personal_trainers;
CREATE TRIGGER tr_personal_trainers_updated_at
  BEFORE UPDATE ON public.personal_trainers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==========================================================
-- 3. STUDENTS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE SET NULL,
  asaas_customer_id TEXT UNIQUE,
  birth_date DATE,
  gender TEXT,
  height_cm NUMERIC(5,2),
  status consultancy_status DEFAULT 'PENDING' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_students_trainer ON public.students(personal_trainer_id);
CREATE INDEX IF NOT EXISTS idx_students_asaas_customer ON public.students(asaas_customer_id);

DROP TRIGGER IF EXISTS tr_students_updated_at ON public.students;
CREATE TRIGGER tr_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==========================================================
-- 4. PLANS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price_monthly NUMERIC(10,2) NOT NULL,
  price_quarterly NUMERIC(10,2) NOT NULL,
  features_json JSONB DEFAULT '[]'::jsonb NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 5. CONSULTANCIES
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.consultancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE SET NULL,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  status consultancy_status DEFAULT 'ACTIVE' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_consultancies_student ON public.consultancies(student_id);

-- ==========================================================
-- 6. SUBSCRIPTIONS (ASAAS API)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  asaas_subscription_id TEXT UNIQUE NOT NULL,
  asaas_customer_id TEXT NOT NULL,
  status subscription_status DEFAULT 'PENDING' NOT NULL,
  billing_type payment_method NOT NULL DEFAULT 'PIX',
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_student ON public.subscriptions(student_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_asaas ON public.subscriptions(asaas_subscription_id);

-- ==========================================================
-- 7. PAYMENTS (ASAAS Transactions)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  asaas_payment_id TEXT UNIQUE NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  status payment_status DEFAULT 'PENDING' NOT NULL,
  billing_type payment_method NOT NULL,
  invoice_url TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payments_student ON public.payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_asaas ON public.payments(asaas_payment_id);

-- ==========================================================
-- 8. ANAMNESES
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.anamneses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Anamnese de Início',
  status anamnesis_status DEFAULT 'DRAFT' NOT NULL,
  ai_summary TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_anamneses_student ON public.anamneses(student_id);

-- ==========================================================
-- 9. ANAMNESIS ANSWERS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.anamnesis_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anamnesis_id UUID NOT NULL REFERENCES public.anamneses(id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  answer_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_anamnesis_answers_anamnesis ON public.anamnesis_answers(anamnesis_id);

-- ==========================================================
-- 10. EVALUATION REQUESTS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.evaluation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  status evaluation_request_status DEFAULT 'PENDING' NOT NULL,
  notes TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_evaluation_requests_student ON public.evaluation_requests(student_id);

-- ==========================================================
-- 11. EVALUATIONS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE SET NULL,
  evaluation_request_id UUID REFERENCES public.evaluation_requests(id) ON DELETE SET NULL,
  notes TEXT,
  feedback TEXT,
  evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_evaluations_student ON public.evaluations(student_id);

-- ==========================================================
-- 12. EVALUATION PHOTOS (Cloudinary Managed)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.evaluation_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID NOT NULL REFERENCES public.evaluations(id) ON DELETE CASCADE,
  cloudinary_public_id TEXT NOT NULL,
  secure_url TEXT NOT NULL,
  photo_type photo_type NOT NULL,
  ai_analysis_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_evaluation_photos_eval ON public.evaluation_photos(evaluation_id);

-- ==========================================================
-- 13. BODY MEASUREMENTS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.body_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES public.evaluations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  chest_cm NUMERIC(5,2),
  waist_cm NUMERIC(5,2),
  hips_cm NUMERIC(5,2),
  arms_cm NUMERIC(5,2),
  thighs_cm NUMERIC(5,2),
  calves_cm NUMERIC(5,2),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_body_measurements_student ON public.body_measurements(student_id);

-- ==========================================================
-- 14. WEIGHT HISTORY
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.weight_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  weight_kg NUMERIC(5,2) NOT NULL,
  fat_percentage NUMERIC(4,2),
  muscle_mass_kg NUMERIC(5,2),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_weight_history_student ON public.weight_history(student_id);

-- ==========================================================
-- 15. STUDENT PROGRESS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  summary_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_student_progress_student ON public.student_progress(student_id);

-- ==========================================================
-- 16. GOALS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  target_value NUMERIC(10,2),
  current_value NUMERIC(10,2) DEFAULT 0,
  unit TEXT,
  deadline DATE,
  status TEXT DEFAULT 'IN_PROGRESS' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_goals_student ON public.goals(student_id);

-- ==========================================================
-- 17. PROTOCOLS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status protocol_status DEFAULT 'ACTIVE' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_protocols_student ON public.protocols(student_id);

-- ==========================================================
-- 18. PROTOCOL VERSIONS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.protocol_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_id UUID NOT NULL REFERENCES public.protocols(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_protocol_versions_protocol ON public.protocol_versions(protocol_id);

-- ==========================================================
-- 19. TRAINING LINKS (Exercises)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.training_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_version_id UUID NOT NULL REFERENCES public.protocol_versions(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  video_url TEXT,
  sets INT NOT NULL DEFAULT 3,
  reps TEXT NOT NULL DEFAULT '10-12',
  rest_seconds INT DEFAULT 60,
  notes TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_training_links_version ON public.training_links(protocol_version_id);

-- ==========================================================
-- 20. NUTRITION LINKS (Complementary Guidelines)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.nutrition_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_version_id UUID NOT NULL REFERENCES public.protocol_versions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  external_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 21. MESSAGES (Internal Chat)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(sender_id, receiver_id);

-- ==========================================================
-- 22. NOTIFICATIONS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type DEFAULT 'SYSTEM' NOT NULL,
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_profile ON public.notifications(profile_id);

-- ==========================================================
-- 23. APPOINTMENTS
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status appointment_status DEFAULT 'SCHEDULED' NOT NULL,
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_appointments_student ON public.appointments(student_id);

-- ==========================================================
-- 24. FILES
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INT NOT NULL,
  storage_provider TEXT DEFAULT 'CLOUDINARY' NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 25. ACTIVITY LOGS (Security & Audit)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  ip_address TEXT,
  details_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON public.activity_logs(action);

-- ==========================================================
-- 26. ONBOARDING DRAFTS (Draft saves for onboarding form)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.onboarding_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_step INT NOT NULL DEFAULT 1,
  step_data JSONB DEFAULT '{}'::jsonb NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_onboarding_drafts_user ON public.onboarding_drafts(user_id);

DROP TRIGGER IF EXISTS tr_onboarding_drafts_updated_at ON public.onboarding_drafts;
CREATE TRIGGER tr_onboarding_drafts_updated_at
  BEFORE UPDATE ON public.onboarding_drafts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==========================================================
-- AUTOMATIC AUTH SYNC TRIGGER
-- Syncs auth.users insertions into public.profiles & public.students
-- ==========================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  assigned_role public.user_role;
  user_full_name TEXT;
BEGIN
  -- Extract metadata or default
  assigned_role := COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'ALUNO');
  user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));

  -- Insert profile
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (NEW.id, user_full_name, NEW.email, assigned_role);

  -- Insert student or personal trainer record based on role
  IF assigned_role = 'ALUNO' THEN
    INSERT INTO public.students (profile_id, status)
    VALUES (NEW.id, 'PENDING');
  ELSIF assigned_role = 'PERSONAL' OR assigned_role = 'ADMIN' THEN
    INSERT INTO public.personal_trainers (profile_id)
    VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger firing on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
