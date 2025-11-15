'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Exercice } from '@/types';

interface PerformanceFormProps {
  exercice: Exercice;
  onSuccess?: () => void;
  onSkip?: () => void;
}

export default function PerformanceForm({ exercice, onSuccess, onSkip }: PerformanceFormProps) {
  const [charge, setCharge] = useState('');
  const [series, setSeries] = useState(exercice.series.toString());
  const [reps, setReps] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from('performances')
        .insert({
          exercice_id: exercice.id,
          charge_utilisee: charge || exercice.charge,
          series_completees: parseInt(series),
          repetitions_completees: reps || exercice.repetitions,
          notes_perso: notes || null,
        });

      if (insertError) throw insertError;

      // Reset form
      setCharge('');
      setSeries(exercice.series.toString());
      setReps('');
      setNotes('');

      onSuccess?.();
    } catch (err) {
      console.error('Error saving performance:', err);
      setError('Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="card"
    >
      <h3 className="text-lg font-bold mb-4">Enregistrer votre performance</h3>

      {error && (
        <div className="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Charge */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Charge utilisée
          </label>
          <input
            type="text"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
            placeholder={exercice.charge}
            className="input w-full"
          />
        </div>

        {/* Series */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Séries complétées
          </label>
          <input
            type="number"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            min="0"
            max="20"
            required
            className="input w-full"
          />
        </div>

        {/* Reps */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Répétitions effectuées
          </label>
          <input
            type="text"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder={exercice.repetitions}
            className="input w-full"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Notes personnelles (optionnel)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ressenti, difficulté, observations..."
            rows={3}
            className="input w-full resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="btn-secondary"
          >
            Passer
          </button>
        )}
      </div>
    </motion.form>
  );
}
