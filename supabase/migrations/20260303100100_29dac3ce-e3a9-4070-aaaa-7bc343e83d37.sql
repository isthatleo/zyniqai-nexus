
-- Leads table for AI receptionist qualification
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  industry text,
  monthly_revenue text,
  team_size int,
  score float DEFAULT 0,
  recommended_tier text DEFAULT 'core',
  status text NOT NULL DEFAULT 'new',
  tags jsonb DEFAULT '[]'::jsonb,
  ops_complexity_score int DEFAULT 1,
  ai_maturity_score int DEFAULT 1,
  urgency_score int DEFAULT 1,
  budget_signal text DEFAULT 'low',
  multi_department boolean DEFAULT false,
  data_volume boolean DEFAULT false,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage leads" ON public.leads FOR ALL USING (is_admin());
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Conversations table for chat history
CREATE TABLE public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view conversations" ON public.conversations FOR SELECT USING (is_admin());
CREATE POLICY "Anyone can insert conversations" ON public.conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read own session" ON public.conversations FOR SELECT USING (true);

-- Trigger for leads updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
