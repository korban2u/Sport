'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Seance, ExerciceWithPerformances } from '@/types';
import PerformanceForm from '@/components/PerformanceForm';
import YoutubeModal from '@/components/YoutubeModal';
import Timer from '@/components/Timer';
import { parseRestTime } from '@/lib/utils';

export default function ExecutePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [seance, setSeance] = useState<Seance | null>(null);
  const [exercices, setExercices] = useState<ExerciceWithPerformances[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      // Get seance
      const { data: seanceData } = await supabase
        .from('seances')
        .select('*')
        .eq('id', params.id)
        .single();

      if (seanceData) {
        setSeance(seanceData);
      }

      // Get exercices
      const { data: exercicesData } = await supabase
        .from('exercices')
        .select('*')
        .eq('seance_id', params.id)
        .order('ordre', { ascending: true });

      if (exercicesData) {
        // Load last performance for each
        const withPerf = await Promise.all(
          exercicesData.map(async (ex) => {
            const { data: perfs } = await supabase
              .from('performances')
              .select('*')
              .eq('exercice_id', ex.id)
              .order('date_execution', { ascending: false })
              .limit(1);

            return {
              ...ex,
              lastPerformance: perfs?.[0] || null,
            };
          })
        );

        setExercices(withPerf);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentExercice = exercices[currentIndex];
  const progress = ((currentIndex + 1) / exercices.length) * 100;

  const handleNext = () => {
    if (currentIndex < exercices.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = async () => {
    // Update session last execution date
    if (seance) {
      await supabase
        .from('seances')
        .update({ date_derniere_execution: new Date().toISOString() })
        .eq('id', seance.id);
    }

    router.push(`/session/${params.id}`);
  };

  const handleOpenVideo = () => {
    if (currentExercice?.video_youtube_url) {
      setVideoUrl(currentExercice.video_youtube_url);
      setShowVideo(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!currentExercice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Aucun exercice trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header with Progress */}
      <div className="sticky top-0 z-40 bg-dark-bg border-b border-dark-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => router.push(`/session/${params.id}`)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span className="text-sm text-gray-400">
              {currentIndex + 1} / {exercices.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-dark-border rounded-full h-2">
            <motion.div
              className="bg-accent-blue h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Category Badge */}
            {currentExercice.categorie && (
              <div className="inline-block px-3 py-1 bg-accent-green/20 text-accent-green text-sm font-semibold rounded-full mb-4">
                {currentExercice.categorie}
              </div>
            )}

            {/* Exercise Name */}
            <h1 className="text-3xl font-bold mb-6">{currentExercice.nom}</h1>

            {/* Exercise Details Card */}
            <div className="card mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Séries</p>
                  <p className="text-2xl font-bold">{currentExercice.series}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Répétitions</p>
                  <p className="text-2xl font-bold">{currentExercice.repetitions}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Charge</p>
                  <p className="text-xl font-semibold">{currentExercice.charge}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Repos</p>
                  <p className="text-xl font-semibold">{currentExercice.repos}</p>
                </div>
              </div>

              {/* Last Performance */}
              {currentExercice.lastPerformance && (
                <div className="border-t border-dark-border pt-4">
                  <p className="text-sm text-gray-400 mb-2">Dernière performance :</p>
                  <p className="font-medium">
                    {currentExercice.lastPerformance.series_completees}×
                    {currentExercice.lastPerformance.repetitions_completees} @ {currentExercice.lastPerformance.charge_utilisee}
                  </p>
                </div>
              )}
            </div>

            {/* Notes */}
            {currentExercice.notes && (
              <div className="card mb-6">
                <h3 className="font-semibold mb-2 text-accent-blue">Notes & Alternatives</h3>
                <p className="text-sm text-gray-300">{currentExercice.notes}</p>
              </div>
            )}

            {/* Video Button */}
            {currentExercice.video_youtube_url && (
              <button
                onClick={handleOpenVideo}
                className="w-full btn-secondary mb-6 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Voir la vidéo de démonstration
              </button>
            )}

            {/* Performance Form */}
            <PerformanceForm
              exercice={currentExercice}
              onSuccess={handleNext}
              onSkip={handleNext}
            />

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="btn-secondary flex-1 disabled:opacity-30"
              >
                ← Précédent
              </button>
              <button
                onClick={handleNext}
                className="btn-secondary flex-1"
              >
                {currentIndex === exercices.length - 1 ? 'Terminer' : 'Suivant →'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timer */}
      <Timer defaultTime={parseRestTime(currentExercice.repos)} />

      {/* YouTube Modal */}
      <YoutubeModal
        url={videoUrl}
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
      />
    </div>
  );
}
