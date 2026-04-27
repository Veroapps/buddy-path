import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  record: number;
  last_active: string | null;
  created_at: string;
};

export type Progress = {
  id: string;
  profile_id: string;
  node_id: string;
  completed_at: string;
};

export type DiaryEntry = {
  id: string;
  profile_id: string;
  mood: string;
  text: string;
  created_at: string;
};

export type CoachNote = {
  id: string;
  profile_id: string;
  note: string;
  created_at: string;
};
