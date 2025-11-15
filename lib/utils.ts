/**
 * Utility functions
 */

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;

  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Parse rest time string to seconds
 */
export function parseRestTime(restString: string): number {
  const match = restString.match(/(\d+)/);
  if (!match) return 60;

  const value = parseInt(match[1]);

  if (restString.includes('min')) {
    return value * 60;
  } else if (restString.includes('sec')) {
    return value;
  }

  return value * 60; // default to minutes
}

/**
 * Format seconds to MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Class name utility (simple version of clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
