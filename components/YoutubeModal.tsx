'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { extractYoutubeId, getYoutubeEmbedUrl } from '@/lib/youtube';

interface YoutubeModalProps {
  url: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function YoutubeModal({ url, isOpen, onClose }: YoutubeModalProps) {
  if (!url) return null;

  const videoId = extractYoutubeId(url);
  if (!videoId) return null;

  const embedUrl = getYoutubeEmbedUrl(videoId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* YouTube Embed */}
              <iframe
                src={embedUrl}
                title="Exercise Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
