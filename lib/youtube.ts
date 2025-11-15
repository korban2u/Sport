/**
 * YouTube utility functions for secure embedding
 */

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYoutubeId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Generate secure YouTube embed URL using youtube-nocookie.com
 */
export function getYoutubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

/**
 * Get YouTube thumbnail URL
 */
export function getYoutubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'mq' = 'hq'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    mq: 'mqdefault',
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}
