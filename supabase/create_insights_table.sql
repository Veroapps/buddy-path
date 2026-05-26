-- Spust tento SQL v Supabase SQL editoru: https://app.supabase.com → SQL Editor
-- Tabulka pro ulozeni odpovedi uzivatele (reflexe, hry, shrnuti)

CREATE TABLE IF NOT EXISTS insights (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id  text        NOT NULL,
  node_id     text        NOT NULL,
  input_data  jsonb       DEFAULT '{}',
  text_response text      DEFAULT '',
  status      text        DEFAULT 'completed',
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_insights_profile ON insights(profile_id);
CREATE INDEX IF NOT EXISTS idx_insights_node    ON insights(node_id);

-- RLS (Row Level Security) — volitelne, pokud ho pouzivas
-- ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
