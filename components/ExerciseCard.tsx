'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExerciceWithPerformances } from '@/types';
import { formatDate } from '@/lib/utils';

interface ExerciseCardProps {
  exercice: ExerciceWithPerformances;
  onStartExercise?: () => void;
}

export default function ExerciseCard({ exercice, onStartExercise }: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const lastPerf = exercice.lastPerformance;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:border-accent-blue/50 transition-colors"
    >
      {/* Category Badge */}
      {exercice.categorie && (
        <div className="inline-block px-2 py-1 bg-accent-green/20 text-accent-green text-xs font-semibold rounded mb-2">
          {exercice.categorie}
        </div>
      )}

      {/* Exercise Name */}
      <h4 className="text-lg font-bold mb-3">{exercice.nom}</h4>

      {/* Exercise Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-gray-500 text-xs mb-1">Séries</p>
          <p className="font-semibold">{exercice.series}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Répétitions</p>
          <p className="font-semibold">{exercice.repetitions}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Charge</p>
          <p className="font-semibold">{exercice.charge}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Repos</p>
          <p className="font-semibold">{exercice.repos}</p>
        </div>
      </div>

      {/* Last Performance */}
      {lastPerf && (
        <div className="bg-dark-bg rounded-lg p-3 mb-3 border border-accent-green/30">
          <p className="text-xs text-gray-400 mb-1">Dernière fois :</p>
          <p className="text-sm font-medium">
            {lastPerf.series_completees}×{lastPerf.repetitions_completees} @ {lastPerf.charge_utilisee}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {formatDate(lastPerf.date_execution)}
          </p>
        </div>
      )}

      {/* Notes Toggle */}
      {exercice.notes && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left text-sm text-accent-blue hover:text-blue-400 transition-colors mb-2"
        >
          {isExpanded ? '▼' : '▶'} Notes & Alternatives
        </button>
      )}

      <AnimatePresence>
        {isExpanded && exercice.notes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-400 bg-dark-bg rounded p-3 mb-3">
              {exercice.notes}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Link */}
      {exercice.video_youtube_url && (
        <a
          href={exercice.video_youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-red-500 hover:text-red-400 transition-colors mb-3"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Voir la vidéo
        </a>
      )}

      {/* Start Exercise Button */}
      {onStartExercise && (
        <button
          onClick={onStartExercise}
          className="w-full btn-primary mt-2"
        >
          Commencer l'exercice
        </button>
      )}
    </motion.div>
  );
}
