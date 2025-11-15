# CLAUDE.md - AI Assistant Guide for Sport Training App

## Project Overview

This is a **sport training tracking web application** for personal use (boxing/strength training). The project is currently in the specification phase with no code yet implemented.

**Primary Language**: French (specifications are in French, but code should follow English conventions)

**Purpose**: Create a simple, professional, and minimalist web app to track workout sessions, exercises, and performance progress.

---

## Tech Stack (Required)

### Frontend
- **Framework**: Next.js 14+ with App Router
- **UI Library**: React
- **Styling**: Tailwind CSS (modern, responsive design)
- **Animations**: Framer Motion (recommended)

### Backend
- **BaaS**: Supabase (free tier, Netlify-compatible)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth (when needed)

### Deployment
- **Platform**: Netlify
- **Mobile**: Responsive-first design, PWA if possible

---

## Repository Structure (To Be Created)

Expected structure for the Next.js app:

```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard (sessions overview)
│   ├── sessions/          # Session management pages
│   └── history/           # Performance history
├── components/            # Reusable React components
│   ├── ExerciseCard.tsx
│   ├── TimerWidget.tsx
│   ├── PerformanceForm.tsx
│   └── ...
├── lib/                   # Utilities and services
│   ├── supabase.ts       # Supabase client
│   ├── youtube.ts        # YouTube embed service
│   └── ...
├── types/                # TypeScript types
│   └── index.ts
├── public/               # Static assets
├── supabase/             # Supabase migrations & seed data
│   ├── migrations/
│   └── seed.sql
├── styles/               # Global styles
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── README.md
```

---

## Data Models

### 1. Seance (Workout Session)
```typescript
interface Seance {
  id: string;                    // UUID
  nom: string;                   // e.g., "Lundi : Force & Puissance"
  jour: string;                  // e.g., "Lundi", "Vendredi", "Samedi"
  type: string;                  // e.g., "Force & Puissance"
  date_creation: Date;
  date_derniere_execution?: Date;
}
```

### 2. Exercice (Exercise)
```typescript
interface Exercice {
  id: string;                    // UUID
  seance_id: string;             // Foreign key
  nom: string;                   // e.g., "Développé couché"
  ordre: number;                 // Display order
  series: number;                // e.g., 4
  repetitions: string;           // e.g., "5 reps", "8-10 reps"
  charge: string;                // e.g., "80-85% 1RM", "poids du corps"
  repos: string;                 // e.g., "2-3 min", "45 sec"
  notes?: string;                // Instructions, alternatives
  video_youtube_url?: string;    // YouTube embed link
  categorie?: string;            // e.g., "A1", "B2", "Finisher"
}
```

### 3. Performance (Workout Log)
```typescript
interface Performance {
  id: string;                    // UUID
  exercice_id: string;           // Foreign key
  date_execution: Date;
  charge_utilisee: string;       // e.g., "50kg"
  series_completees: number;
  repetitions_completees: string;
  notes_perso?: string;          // Personal notes, feeling
}
```

---

## Default Data (Seed Data)

The application must auto-populate **3 default workout sessions** on first launch:

1. **LUNDI: Force & Puissance** (Upper body focus) - 8 exercises
2. **VENDREDI: Explosivité & Puissance** (Explosive power) - 8 exercises
3. **SAMEDI: Jambes & Conditionnement** (Legs & conditioning) - 6 exercise groups

**Important**: See README.md lines 46-93 for complete exercise details with sets, reps, rest times, notes, and alternatives.

### Seed Data Location
Create a SQL migration file: `supabase/migrations/001_seed_default_sessions.sql`

---

## Key Features to Implement

### Phase 1: Setup & Foundation
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Setup Supabase client
- [ ] Create database schema (tables: seances, exercices, performances)
- [ ] Seed 3 default sessions with all exercises

### Phase 2: Session & Exercise Display
- [ ] Dashboard: Grid/card view of 3 sessions
- [ ] Session detail view with exercises organized by category (A1, A2, B1, etc.)
- [ ] Exercise cards showing: name, sets×reps, target load, rest time
- [ ] Accordion/tooltip for notes/alternatives

### Phase 3: Performance Tracking
- [ ] Quick form to log: load used, sets completed, reps done, personal notes
- [ ] Auto-save with timestamp
- [ ] Display "Last time: 3×10 @ 50kg (5 days ago)" when opening an exercise
- [ ] Visual badge for progression (+5kg, +2 reps, etc.)

### Phase 4: Integrated Timer
- [ ] Sticky/floating timer button (always visible)
- [ ] Auto-preset based on current exercise rest time
- [ ] Manual presets: 30s, 45s, 1min, 1:30, 2min, 3min
- [ ] Sound notification + vibration on completion
- [ ] Skip/extend functionality

### Phase 5: YouTube Integration
- [ ] Each exercise can have a YouTube link
- [ ] Modal/embed viewer (no app exit)
- [ ] Secure embed service

### Phase 6: Polish & PWA
- [ ] Mobile-first responsive design
- [ ] Dark mode by default
- [ ] Swipe gestures for exercise navigation
- [ ] Smooth animations (Framer Motion)
- [ ] Offline-first PWA with caching
- [ ] Performance optimization (lazy load videos)

---

## UI/UX Guidelines

### Design System
- **Theme**: Dark mode by default
- **Palette**: Dark tones with colored accents (blue/green for progress)
- **Typography**: Clean, readable fonts
- **Style**: Professional "fitness app" aesthetic

### Navigation Flow
1. **Dashboard** → Session cards (clickable)
2. **Session View** → Exercise list + "Start Session" button
3. **Execution Mode** → Exercise-by-exercise with timer + input form
4. **History** → Charts and stats

### Mobile Considerations
- Swipe gestures between exercises
- Large tap targets (minimum 44×44px)
- Sticky timer widget
- Optimized for one-handed use

---

## Development Workflow

### Git Workflow
- **Main Branch**: `main` (or default branch)
- **Feature Branches**: Use `claude/` prefix for AI-generated branches
- **Commits**: Clear, descriptive messages in English
- **Push**: Always to the designated branch specified in the task

### Code Conventions
- **Language**: Code, comments, and variable names in English
- **Components**: PascalCase (e.g., `ExerciseCard.tsx`)
- **Functions**: camelCase (e.g., `fetchWorkoutData`)
- **Types**: PascalCase with `I` prefix for interfaces (optional)
- **Files**: kebab-case for utilities (e.g., `youtube-service.ts`)

### Code Quality
- Clean, commented code
- TypeScript strict mode enabled
- Proper error handling
- Accessibility standards (WCAG AA)
- Performance optimization (Core Web Vitals)

---

## Environment Setup

### Required Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Installation Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

---

## Supabase Schema

### Tables to Create

```sql
-- Seances table
CREATE TABLE seances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  jour TEXT NOT NULL,
  type TEXT NOT NULL,
  date_creation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date_derniere_execution TIMESTAMP WITH TIME ZONE
);

-- Exercices table
CREATE TABLE exercices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seance_id UUID REFERENCES seances(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  ordre INTEGER NOT NULL,
  series INTEGER NOT NULL,
  repetitions TEXT NOT NULL,
  charge TEXT NOT NULL,
  repos TEXT NOT NULL,
  notes TEXT,
  video_youtube_url TEXT,
  categorie TEXT
);

-- Performances table
CREATE TABLE performances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exercice_id UUID REFERENCES exercices(id) ON DELETE CASCADE,
  date_execution TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  charge_utilisee TEXT NOT NULL,
  series_completees INTEGER NOT NULL,
  repetitions_completees TEXT NOT NULL,
  notes_perso TEXT
);

-- Indexes for performance
CREATE INDEX idx_exercices_seance ON exercices(seance_id);
CREATE INDEX idx_performances_exercice ON performances(exercice_id);
CREATE INDEX idx_performances_date ON performances(date_execution);
```

---

## Key Implementation Notes

### YouTube Embed Security
- Use `youtube-nocookie.com` domain
- Sanitize URLs before embedding
- Lazy load iframes

### Timer Implementation
- Use Web Audio API or Notification API for sound
- Vibration API for mobile haptic feedback
- Service Worker for background timer (PWA)

### Performance Optimization
- Server-side rendering for initial load
- Client-side caching for repeated data
- Lazy load exercise images/videos
- Optimize images (WebP, responsive sizes)

### Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Focus management in modals
- High contrast mode support

---

## Common Tasks for AI Assistants

### When Asked to "Start the Project"
1. Initialize Next.js with TypeScript: `npx create-next-app@latest`
2. Install dependencies: `tailwindcss`, `@supabase/supabase-js`, `framer-motion`
3. Setup project structure (see Repository Structure above)
4. Create Supabase schema and seed data
5. Implement basic routing structure

### When Asked to "Add a Feature"
1. Check which phase the feature belongs to (Phase 1-6)
2. Ensure prerequisites from earlier phases are complete
3. Follow the data models and types defined above
4. Maintain consistency with existing code style
5. Update relevant documentation

### When Asked to "Deploy"
1. Ensure `.env.local` variables are set in Netlify
2. Configure build settings: `npm run build` and `npm run start`
3. Set publish directory to `.next`
4. Enable automatic deployments from main branch

---

## Testing Strategy

### Unit Tests
- Component rendering
- Utility functions
- Data transformations

### Integration Tests
- Supabase operations (CRUD)
- Form submissions
- Timer functionality

### E2E Tests (Optional)
- Complete workout flow
- Performance logging
- History visualization

---

## Troubleshooting

### Common Issues

**Supabase Connection Fails**
- Check environment variables are set correctly
- Verify Supabase project is active
- Check network/firewall settings

**Timer Not Working on Mobile**
- Ensure Service Worker is registered
- Check Notification permissions
- Test vibration API support

**YouTube Embeds Not Loading**
- Verify URL format is correct
- Check Content Security Policy (CSP) headers
- Ensure iframe sandbox attributes are proper

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Netlify Deployment Guide](https://docs.netlify.com/)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)

---

## Questions to Ask Before Implementation

1. **Authentication**: Do we need user authentication, or is this single-user?
2. **Data Persistence**: Should data sync across devices?
3. **Offline Mode**: How critical is offline functionality?
4. **Analytics**: Do we need to track usage patterns?
5. **Export**: Should users be able to export their data (CSV, PDF)?

---

## Current Status

**Repository State**: Specification only (README.md)
**Next Steps**: Begin Phase 1 implementation
**Priority**: Setup project foundation and database schema

---

*This guide is maintained for AI assistants working on the Sport Training App. Update this file as the project evolves.*
