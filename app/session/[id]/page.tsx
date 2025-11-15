import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Seance, Exercice, Performance, ExerciceWithPerformances } from '@/types';
import ExerciseCard from '@/components/ExerciseCard';
import Timer from '@/components/Timer';
import { parseRestTime } from '@/lib/utils';

export const dynamic = 'force-dynamic';

async function getSeanceWithExercices(id: string): Promise<{
  seance: Seance | null;
  exercices: ExerciceWithPerformances[];
}> {
  // Get seance
  const { data: seance, error: seanceError } = await supabase
    .from('seances')
    .select('*')
    .eq('id', id)
    .single();

  if (seanceError || !seance) {
    return { seance: null, exercices: [] };
  }

  // Get exercices
  const { data: exercices, error: exercicesError } = await supabase
    .from('exercices')
    .select('*')
    .eq('seance_id', id)
    .order('ordre', { ascending: true });

  if (exercicesError) {
    return { seance, exercices: [] };
  }

  // Get last performance for each exercise
  const exercicesWithPerf: ExerciceWithPerformances[] = await Promise.all(
    (exercices || []).map(async (exercice) => {
      const { data: performances } = await supabase
        .from('performances')
        .select('*')
        .eq('exercice_id', exercice.id)
        .order('date_execution', { ascending: false })
        .limit(1);

      return {
        ...exercice,
        lastPerformance: performances?.[0] || null,
      };
    })
  );

  return { seance, exercices: exercicesWithPerf };
}

export default async function SessionPage({ params }: { params: { id: string } }) {
  const { seance, exercices } = await getSeanceWithExercices(params.id);

  if (!seance) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Séance non trouvée</h2>
          <Link href="/" className="btn-primary inline-block">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  // Group exercises by category
  const groupedExercices = exercices.reduce((acc, ex) => {
    const cat = ex.categorie || 'Autres';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(ex);
    return acc;
  }, {} as Record<string, ExerciceWithPerformances[]>);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour
      </Link>

      {/* Session Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full">
            {seance.jour}
          </span>
          <span className="text-sm text-gray-400">{seance.type}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{seance.nom}</h1>
        <p className="text-gray-400">
          {exercices.length} exercice{exercices.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Start Session Button */}
      <Link
        href={`/session/${params.id}/execute`}
        className="btn-primary inline-flex items-center mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Démarrer la séance
      </Link>

      {/* Exercises by Category */}
      <div className="space-y-8">
        {Object.entries(groupedExercices).map(([category, exs]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold mb-4 text-gradient">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exs.map((exercice) => (
                <ExerciseCard key={exercice.id} exercice={exercice} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Timer Widget */}
      <Timer defaultTime={120} />
    </div>
  );
}
