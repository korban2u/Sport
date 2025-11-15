-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create seances table
CREATE TABLE seances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  jour TEXT NOT NULL,
  type TEXT NOT NULL,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date_derniere_execution TIMESTAMP WITH TIME ZONE
);

-- Create exercices table
CREATE TABLE exercices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seance_id UUID REFERENCES seances(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  ordre INTEGER NOT NULL,
  series INTEGER NOT NULL,
  repetitions TEXT NOT NULL,
  charge TEXT NOT NULL,
  repos TEXT NOT NULL,
  notes TEXT,
  video_youtube_url TEXT,
  categorie TEXT
);

-- Create performances table
CREATE TABLE performances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exercice_id UUID REFERENCES exercices(id) ON DELETE CASCADE,
  date_execution TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  charge_utilisee TEXT NOT NULL,
  series_completees INTEGER NOT NULL,
  repetitions_completees TEXT NOT NULL,
  notes_perso TEXT
);

-- Create indexes for performance
CREATE INDEX idx_exercices_seance ON exercices(seance_id);
CREATE INDEX idx_exercices_ordre ON exercices(ordre);
CREATE INDEX idx_performances_exercice ON performances(exercice_id);
CREATE INDEX idx_performances_date ON performances(date_execution DESC);

-- Enable Row Level Security (optional for single-user app)
ALTER TABLE seances ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercices ENABLE ROW LEVEL SECURITY;
ALTER TABLE performances ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for single-user app)
CREATE POLICY "Allow all operations on seances" ON seances FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on exercices" ON exercices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on performances" ON performances FOR ALL USING (true) WITH CHECK (true);
