-- ─────────────────────────────────────────────
--  ClearForge Reviews — initial schema
-- ─────────────────────────────────────────────

-- businesses
CREATE TABLE businesses (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                      TEXT NOT NULL,
  google_review_url         TEXT NOT NULL DEFAULT '',
  logo_url                  TEXT,
  brand_color               TEXT NOT NULL DEFAULT '#3B82F6',
  sms_enabled               BOOLEAN NOT NULL DEFAULT true,
  email_enabled             BOOLEAN NOT NULL DEFAULT true,
  plan                      TEXT NOT NULL DEFAULT 'starter'
                              CHECK (plan IN ('starter', 'pro', 'unlimited')),
  monthly_request_limit     INTEGER NOT NULL DEFAULT 100,
  requests_used_this_period INTEGER NOT NULL DEFAULT 0,
  stripe_customer_id        TEXT,
  stripe_subscription_id    TEXT,
  subscription_status       TEXT
                              CHECK (subscription_status IN
                                ('trialing','active','past_due','canceled','incomplete')),
  trial_ends_at             TIMESTAMPTZ,
  sms_template              TEXT,
  email_template_subject    TEXT,
  email_template_body       TEXT,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- profiles (one row per auth.users row)
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'owner'
                CHECK (role IN ('owner','admin')),
  full_name   TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- customers
CREATE TABLE customers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  phone       TEXT,
  email       TEXT,
  consent     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT phone_or_email CHECK (phone IS NOT NULL OR email IS NOT NULL)
);

-- review_requests
CREATE TABLE review_requests (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id  UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id  UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  channel      TEXT NOT NULL CHECK (channel IN ('sms','email','both')),
  token        TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  status       TEXT NOT NULL DEFAULT 'queued'
                 CHECK (status IN ('queued','sent','opened','rated','completed')),
  rating       INTEGER CHECK (rating BETWEEN 1 AND 5),
  sent_at      TIMESTAMPTZ,
  responded_at TIMESTAMPTZ
);

-- feedback (private capture for low ratings)
CREATE TABLE feedback (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  request_id  UUID NOT NULL REFERENCES review_requests(id) ON DELETE CASCADE,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT NOT NULL DEFAULT '',
  resolved    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- opt_outs (STOP handling)
CREATE TABLE opt_outs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  phone       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (business_id, phone)
);

-- ─── Row-Level Security ───────────────────────

ALTER TABLE businesses    ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers     ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback      ENABLE ROW LEVEL SECURITY;
ALTER TABLE opt_outs      ENABLE ROW LEVEL SECURITY;

-- profiles: users see/edit only their own row
CREATE POLICY "profiles_select_own"  ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "profiles_update_own"  ON profiles FOR UPDATE USING (id = auth.uid());

-- helper: is this user an admin?
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
$$;

-- helper: get current user's business_id
CREATE OR REPLACE FUNCTION my_business_id()
RETURNS UUID LANGUAGE sql SECURITY DEFINER AS $$
  SELECT business_id FROM profiles WHERE id = auth.uid()
$$;

-- businesses
CREATE POLICY "businesses_select" ON businesses FOR SELECT
  USING (id = my_business_id() OR is_admin());

CREATE POLICY "businesses_update" ON businesses FOR UPDATE
  USING (id = my_business_id() OR is_admin());

CREATE POLICY "businesses_insert" ON businesses FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- customers
CREATE POLICY "customers_all" ON customers FOR ALL
  USING (business_id = my_business_id() OR is_admin());

-- review_requests
CREATE POLICY "requests_all" ON review_requests FOR ALL
  USING (business_id = my_business_id() OR is_admin());

-- feedback
CREATE POLICY "feedback_all" ON feedback FOR ALL
  USING (business_id = my_business_id() OR is_admin());

-- opt_outs
CREATE POLICY "opt_outs_all" ON opt_outs FOR ALL
  USING (business_id = my_business_id() OR is_admin());

-- ─── Trigger: create business + profile on signup ───

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  new_business_id UUID;
BEGIN
  INSERT INTO businesses (name, trial_ends_at)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'business_name', 'My Business'),
    NOW() + INTERVAL '14 days'
  )
  RETURNING id INTO new_business_id;

  INSERT INTO profiles (id, business_id, role, full_name)
  VALUES (
    NEW.id,
    new_business_id,
    'owner',
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Indexes ─────────────────────────────────

CREATE INDEX idx_customers_business        ON customers(business_id);
CREATE INDEX idx_review_requests_business  ON review_requests(business_id);
CREATE INDEX idx_review_requests_token     ON review_requests(token);
CREATE INDEX idx_feedback_business         ON feedback(business_id);
CREATE INDEX idx_feedback_resolved         ON feedback(business_id, resolved);
CREATE INDEX idx_opt_outs_phone            ON opt_outs(business_id, phone);
