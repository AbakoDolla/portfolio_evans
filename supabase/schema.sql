-- ============================================================
-- Portfolio Evans — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Messages from contact form
CREATE TABLE IF NOT EXISTS messages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  service     TEXT,
  budget      TEXT,
  message     TEXT        NOT NULL,
  read        BOOLEAN     NOT NULL DEFAULT false,
  archived    BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Theme configuration (single row, id = 1)
CREATE TABLE IF NOT EXISTS theme_config (
  id              INTEGER     PRIMARY KEY DEFAULT 1,
  primary_color   TEXT        NOT NULL DEFAULT '#00ffff',
  secondary_color TEXT        NOT NULL DEFAULT '#00ff96',
  accent_color    TEXT        NOT NULL DEFAULT '#ff9900',
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default theme row
INSERT INTO theme_config (id, primary_color, secondary_color, accent_color)
VALUES (1, '#00ffff', '#00ff96', '#ff9900')
ON CONFLICT (id) DO NOTHING;

-- Row Level Security
ALTER TABLE messages     ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_config ENABLE ROW LEVEL SECURITY;

-- Anyone can read theme (for live theme fetching without auth)
CREATE POLICY "Public read theme" ON theme_config
  FOR SELECT USING (true);

-- Only service_role can write theme (via server-side API)
CREATE POLICY "Service write theme" ON theme_config
  FOR ALL USING (auth.role() = 'service_role');

-- Only service_role can access messages (via server-side API)
CREATE POLICY "Service messages" ON messages
  FOR ALL USING (auth.role() = 'service_role');
