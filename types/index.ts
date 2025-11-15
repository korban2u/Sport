// Database models matching Supabase schema
export interface Seance {
  id: string;
  nom: string;
  jour: string;
  type: string;
  date_creation: string;
  date_derniere_execution?: string | null;
}

export interface Exercice {
  id: string;
  seance_id: string;
  nom: string;
  ordre: number;
  series: number;
  repetitions: string;
  charge: string;
  repos: string;
  notes?: string | null;
  video_youtube_url?: string | null;
  categorie?: string | null;
}

export interface Performance {
  id: string;
  exercice_id: string;
  date_execution: string;
  charge_utilisee: string;
  series_completees: number;
  repetitions_completees: string;
  notes_perso?: string | null;
}

// Extended types with relations
export interface ExerciceWithPerformances extends Exercice {
  performances?: Performance[];
  lastPerformance?: Performance | null;
}

export interface SeanceWithExercices extends Seance {
  exercices?: ExerciceWithPerformances[];
}

// Timer presets
export type TimerPreset = 30 | 45 | 60 | 90 | 120 | 180;

// Execution mode state
export interface ExecutionState {
  seanceId: string;
  currentExerciceIndex: number;
  isActive: boolean;
}
