import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sport Training Tracker',
  description: 'Track your boxing and strength training workouts',
  manifest: '/manifest.json',
  themeColor: '#0f0f0f',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Sport Tracker',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-sm border-b border-dark-border">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gradient">
                Sport Training Tracker
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-dark-card border-t border-dark-border py-4 mt-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
              © 2025 Sport Training Tracker - Your Personal Workout Companion
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
