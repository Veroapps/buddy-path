# Supabase Setup

## 1. Create a project

1. Go to https://supabase.com and sign in
2. Click **New project**, fill in name + password + region
3. Wait for the project to be ready

## 2. Get your keys

In the Supabase dashboard: **Project Settings → API**

- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Run SQL migrations

In the Supabase dashboard: **SQL Editor → New query** — paste and run:

```sql
-- Profiles
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar text not null default '🦊',
  streak integer not null default 0,
  record integer not null default 0,
  last_active date,
  created_at timestamptz not null default now()
);

-- Progress
create table if not exists progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  node_id text not null,
  completed_at timestamptz not null default now(),
  unique(profile_id, node_id)
);

-- Diary entries
create table if not exists diary_entries (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  mood text not null,
  text text not null,
  created_at timestamptz not null default now()
);

-- Coach notes
create table if not exists coach_notes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);
```

## 4. Row Level Security (optional for MVP)

For now, RLS is disabled — all rows are accessible via the anon key.
To enable it later, run `alter table profiles enable row level security;` etc.

## 5. Start dev server

```
npm run dev
```

The app will connect to Supabase automatically once `.env.local` is in place.
