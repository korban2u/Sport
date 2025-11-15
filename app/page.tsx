import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Seance } from '@/types';
import SessionCard from '@/components/SessionCard';

export const dynamic = 'force-dynamic';

async function getSeances(): Promise<Seance[]> {
  const { data, error } = await supabase
    .from('seances')
    .select('*')
    .order('jour', { ascending: true });

  if (error) {
    console.error('Error fetching seances:', error);
    return [];
  }

  return data || [];
}

export default async function Dashboard() {
  const seances = await getSeances();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Mes Séances</h2>
        <p className="text-gray-400">
          Sélectionnez une séance pour commencer votre entraînement
        </p>
      </div>

      {/* Sessions Grid */}
      {seances.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400 mb-4">
            Aucune séance trouvée. Assurez-vous que votre base de données Supabase est configurée et que les données de seed sont chargées.
          </p>
          <p className="text-sm text-gray-500">
            Consultez le fichier <code className="bg-dark-bg px-2 py-1 rounded">supabase/migrations/002_seed_default_sessions.sql</code>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seances.map((seance) => (
            <Link key={seance.id} href={`/session/${seance.id}`}>
              <SessionCard seance={seance} />
            </Link>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-gray-400 text-sm mb-1">Séances Totales</p>
          <p className="text-3xl font-bold text-accent-blue">{seances.length}</p>
        </div>
        <div className="card text-center">
          <p className="text-gray-400 text-sm mb-1">Cette Semaine</p>
          <p className="text-3xl font-bold text-accent-green">0</p>
        </div>
        <div className="card text-center">
          <p className="text-gray-400 text-sm mb-1">Progression</p>
          <p className="text-3xl font-bold text-gradient">+0%</p>
        </div>
      </div>
    </div>
  );
}
