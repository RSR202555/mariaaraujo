-- ==========================================================
-- MARIA ARAÚJO PERSONAL - RLS SECURITY MIGRATION (002)
-- Row Level Security (RLS) Helper Functions & Policies (25 Tables)
-- ==========================================================

-- Helper SQL Functions (SECURITY DEFINER for fast, cached execution)

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role AS $$
BEGIN
  RETURN COALESCE(
    (current_setting('request.jwt.claims', true)::jsonb->'user_metadata'->>'role')::public.user_role,
    (SELECT role FROM public.profiles WHERE id = auth.uid()),
    'ALUNO'::public.user_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.get_user_role() = 'ADMIN'::public.user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_personal()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.get_user_role() IN ('PERSONAL'::public.user_role, 'ADMIN'::public.user_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_student_id(p_profile_id UUID)
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT id FROM public.students WHERE profile_id = p_profile_id LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================================
-- ENABLE RLS ON ALL 25 TABLES
-- ==========================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anamneses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anamnesis_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocol_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- ==========================================================
-- 1. PROFILES POLICIES
-- ==========================================================
CREATE POLICY "Users can read own profile or admin/personal read all" ON public.profiles
  FOR SELECT USING (id = auth.uid() OR public.is_personal());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admin can delete profiles" ON public.profiles
  FOR DELETE USING (public.is_admin());

-- ==========================================================
-- 2. PERSONAL TRAINERS POLICIES
-- ==========================================================
CREATE POLICY "Public read personal trainers" ON public.personal_trainers
  FOR SELECT USING (true);

CREATE POLICY "Admin manage personal trainers" ON public.personal_trainers
  FOR ALL USING (public.is_admin());

-- ==========================================================
-- 3. STUDENTS POLICIES
-- ==========================================================
CREATE POLICY "Students read own record or personal/admin read assigned" ON public.students
  FOR SELECT USING (
    profile_id = auth.uid() OR public.is_personal()
  );

CREATE POLICY "Students update own height/birth_date" ON public.students
  FOR UPDATE USING (profile_id = auth.uid());

CREATE POLICY "Admin/Personal insert/manage students" ON public.students
  FOR ALL USING (public.is_personal());

-- ==========================================================
-- 4. PLANS POLICIES (Public read active plans)
-- ==========================================================
CREATE POLICY "Public read active plans" ON public.plans
  FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Admin manage plans" ON public.plans
  FOR ALL USING (public.is_admin());

-- ==========================================================
-- 5. CONSULTANCIES POLICIES
-- ==========================================================
CREATE POLICY "Students read own consultancies" ON public.consultancies
  FOR SELECT USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

CREATE POLICY "Admin/Personal manage consultancies" ON public.consultancies
  FOR ALL USING (public.is_personal());

-- ==========================================================
-- 6. SUBSCRIPTIONS POLICIES
-- ==========================================================
CREATE POLICY "Students read own subscriptions" ON public.subscriptions
  FOR SELECT USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

CREATE POLICY "Admin/Service role manage subscriptions" ON public.subscriptions
  FOR ALL USING (public.is_admin());

-- ==========================================================
-- 7. PAYMENTS POLICIES
-- ==========================================================
CREATE POLICY "Students read own payments" ON public.payments
  FOR SELECT USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

CREATE POLICY "Admin/Service role manage payments" ON public.payments
  FOR ALL USING (public.is_admin());

-- ==========================================================
-- 8 & 9. ANAMNESES & ANSWERS POLICIES
-- ==========================================================
CREATE POLICY "Students read/write own anamneses" ON public.anamneses
  FOR ALL USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

CREATE POLICY "Students read/write own anamnesis answers" ON public.anamnesis_answers
  FOR ALL USING (
    anamnesis_id IN (SELECT id FROM public.anamneses WHERE student_id = public.get_student_id(auth.uid()))
    OR public.is_personal()
  );

-- ==========================================================
-- 10 & 11. EVALUATION REQUESTS & EVALUATIONS POLICIES
-- ==========================================================
CREATE POLICY "Students read/write own evaluation requests" ON public.evaluation_requests
  FOR ALL USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

CREATE POLICY "Students read own evaluations" ON public.evaluations
  FOR SELECT USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

CREATE POLICY "Personal manage evaluations" ON public.evaluations
  FOR ALL USING (public.is_personal());

-- ==========================================================
-- 12. EVALUATION PHOTOS POLICIES
-- ==========================================================
CREATE POLICY "Students read/insert own evaluation photos" ON public.evaluation_photos
  FOR ALL USING (
    evaluation_id IN (SELECT id FROM public.evaluations WHERE student_id = public.get_student_id(auth.uid()))
    OR public.is_personal()
  );

-- ==========================================================
-- 13 & 14. BODY MEASUREMENTS & WEIGHT HISTORY POLICIES
-- ==========================================================
CREATE POLICY "Students read/insert own measurements" ON public.body_measurements
  FOR ALL USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

CREATE POLICY "Students read/insert own weight history" ON public.weight_history
  FOR ALL USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

-- ==========================================================
-- 15 & 16. STUDENT PROGRESS & GOALS POLICIES
-- ==========================================================
CREATE POLICY "Students read/write own progress" ON public.student_progress
  FOR ALL USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

CREATE POLICY "Students read/write own goals" ON public.goals
  FOR ALL USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

-- ==========================================================
-- 17, 18, 19, 20. PROTOCOLS, VERSIONS & LINKS POLICIES
-- ==========================================================
CREATE POLICY "Students read own protocols" ON public.protocols
  FOR SELECT USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

CREATE POLICY "Personal manage protocols" ON public.protocols
  FOR ALL USING (public.is_personal());

CREATE POLICY "Students read own protocol versions" ON public.protocol_versions
  FOR SELECT USING (
    protocol_id IN (SELECT id FROM public.protocols WHERE student_id = public.get_student_id(auth.uid()))
    OR public.is_personal()
  );

CREATE POLICY "Personal manage protocol versions" ON public.protocol_versions
  FOR ALL USING (public.is_personal());

CREATE POLICY "Students read training links" ON public.training_links
  FOR SELECT USING (true);

CREATE POLICY "Personal manage training links" ON public.training_links
  FOR ALL USING (public.is_personal());

CREATE POLICY "Students read nutrition links" ON public.nutrition_links
  FOR SELECT USING (true);

CREATE POLICY "Personal manage nutrition links" ON public.nutrition_links
  FOR ALL USING (public.is_personal());

-- ==========================================================
-- 21. MESSAGES POLICIES
-- ==========================================================
CREATE POLICY "Users read own conversation messages" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users insert own sent messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Receiver mark as read" ON public.messages
  FOR UPDATE USING (receiver_id = auth.uid());

-- ==========================================================
-- 22. NOTIFICATIONS POLICIES
-- ==========================================================
CREATE POLICY "Users read own notifications" ON public.notifications
  FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "Users update own notification read status" ON public.notifications
  FOR UPDATE USING (profile_id = auth.uid());

-- ==========================================================
-- 23. APPOINTMENTS POLICIES
-- ==========================================================
CREATE POLICY "Students read/manage own appointments" ON public.appointments
  FOR ALL USING (student_id = public.get_student_id(auth.uid()) OR public.is_personal());

-- ==========================================================
-- 24. FILES POLICIES
-- ==========================================================
CREATE POLICY "Users read own uploaded files or public files" ON public.files
  FOR SELECT USING (uploaded_by = auth.uid() OR public.is_personal());

CREATE POLICY "Users upload files" ON public.files
  FOR INSERT WITH CHECK (uploaded_by = auth.uid());

-- ==========================================================
-- 25. ACTIVITY LOGS POLICIES
-- ==========================================================
CREATE POLICY "Admin read all activity logs" ON public.activity_logs
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users insert activity logs" ON public.activity_logs
  FOR INSERT WITH CHECK (user_id = auth.uid());
