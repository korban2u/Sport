import { createClient } from '@supabase/supabase-js';
import type { Seance, Exercice, Performance } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      seances: {
        Row: Seance;
        Insert: Omit<Seance, 'id' | 'date_creation'>;
        Update: Partial<Omit<Seance, 'id'>>;
      };
      exercices: {
        Row: Exercice;
        Insert: Omit<Exercice, 'id'>;
        Update: Partial<Omit<Exercice, 'id'>>;
      };
      performances: {
        Row: Performance;
        Insert: Omit<Performance, 'id' | 'date_execution'>;
        Update: Partial<Omit<Performance, 'id'>>;
      };
    };
  };
};
