'use client';

import { motion } from 'framer-motion';
import type { Seance } from '@/types';
import { formatDate } from '@/lib/utils';

interface SessionCardProps {
  seance: Seance;
}

export default function SessionCard({ seance }: SessionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card cursor-pointer hover:border-accent-blue transition-all h-full"
    >
      {/* Day Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full">
          {seance.jour}
        </span>
        {seance.date_derniere_execution && (
          <span className="text-xs text-gray-500">
            {formatDate(seance.date_derniere_execution)}
          </span>
        )}
      </div>

      {/* Session Name */}
      <h3 className="text-xl font-bold mb-2 line-clamp-2">
        {seance.nom}
      </h3>

      {/* Session Type */}
      <p className="text-gray-400 text-sm mb-4">
        {seance.type}
      </p>

      {/* Action Indicator */}
      <div className="flex items-center text-accent-blue text-sm font-medium">
        <span>Voir la séance</span>
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </motion.div>
  );
}
