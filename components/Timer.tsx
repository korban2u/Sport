'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatTime, parseRestTime } from '@/lib/utils';

interface TimerProps {
  defaultTime?: number; // in seconds
  onComplete?: () => void;
}

const PRESETS = [30, 45, 60, 90, 120, 180] as const;

export default function Timer({ defaultTime = 60, onComplete }: TimerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(defaultTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setTimeLeft(defaultTime);
    setInitialTime(defaultTime);
  }, [defaultTime]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleComplete = () => {
    setIsRunning(false);

    // Play sound
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGnODyvmwhBSuBzvLZiTYIG2m98OScTgwOUKnk77RgGgU7k9nyw3ElBSh+zPDZkEILEl2y6OunUhMKRJvd8sFuJAUqgs/z2Ik3CBxqvvDim00OD1Go5O+yXhoFPJPZ88NwJAYpfczw2I9DCBB=');
      audio.play().catch(() => {});
    } catch (e) {}

    // Vibrate
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }

    onComplete?.();
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const handlePreset = (seconds: number) => {
    setIsRunning(false);
    setTimeLeft(seconds);
    setInitialTime(seconds);
  };

  const handleExtend = (seconds: number) => {
    setTimeLeft((prev) => prev + seconds);
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <>
      {/* Floating Timer Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-accent-blue rounded-full shadow-lg flex items-center justify-center text-white font-bold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.button>

      {/* Timer Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-50"
            />

            {/* Timer Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-dark-card rounded-t-3xl p-6 max-w-2xl mx-auto border-t border-dark-border"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-xl font-bold mb-6 text-center">Timer de Repos</h3>

              {/* Timer Display */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                {/* Progress Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-dark-border"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                    className="text-accent-blue transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Time Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold">{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center mb-6">
                {!isRunning ? (
                  <button onClick={handleStart} className="btn-primary px-8">
                    Démarrer
                  </button>
                ) : (
                  <button onClick={handlePause} className="btn-secondary px-8">
                    Pause
                  </button>
                )}
                <button onClick={handleReset} className="btn-secondary px-8">
                  Reset
                </button>
              </div>

              {/* Extend Buttons */}
              {isRunning && (
                <div className="flex gap-2 justify-center mb-6">
                  <button
                    onClick={() => handleExtend(30)}
                    className="text-sm px-4 py-2 bg-dark-bg rounded-lg border border-dark-border hover:border-accent-green transition-colors"
                  >
                    +30s
                  </button>
                  <button
                    onClick={() => handleExtend(60)}
                    className="text-sm px-4 py-2 bg-dark-bg rounded-lg border border-dark-border hover:border-accent-green transition-colors"
                  >
                    +1min
                  </button>
                </div>
              )}

              {/* Presets */}
              <div className="border-t border-dark-border pt-4">
                <p className="text-sm text-gray-400 mb-3">Préréglages :</p>
                <div className="grid grid-cols-3 gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handlePreset(preset)}
                      className={`py-2 rounded-lg transition-colors ${
                        initialTime === preset
                          ? 'bg-accent-blue text-white'
                          : 'bg-dark-bg border border-dark-border hover:border-accent-blue'
                      }`}
                    >
                      {formatTime(preset)}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
