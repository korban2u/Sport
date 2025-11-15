# Sport Training Tracker 🏋️‍♂️

Application web de suivi d'entraînement sportif pour la boxe et la musculation. Interface moderne, PWA-ready, avec timer intégré et tracking de performances.

## 🚀 Stack Technique

- **Frontend**: Next.js 14 (App Router) + React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Déploiement**: Netlify
- **PWA**: Progressive Web App ready

## ✨ Fonctionnalités

### 📋 Gestion des séances
- 3 séances pré-configurées (Force, Explosivité, Jambes)
- Vue détaillée avec exercices organisés par catégorie (A1, B1, etc.)
- Affichage complet : séries, reps, charge, temps de repos

### 📊 Suivi des performances
- Enregistrement rapide après chaque exercice
- Historique avec dernière performance affichée
- Comparaison automatique (progression visible)

### ⏱️ Timer intégré
- Floating button accessible partout
- Préréglages intelligents basés sur l'exercice
- Presets manuels (30s, 45s, 1min, 1:30, 2min, 3min)
- Notification sonore + vibration à la fin

### 🎥 Vidéos YouTube
- Intégration sécurisée (youtube-nocookie.com)
- Modal fullscreen sans quitter l'app
- Lazy loading pour performances optimales

### 🎨 Interface moderne
- Dark mode par défaut
- Design responsive mobile-first
- Animations fluides
- Swipe gestures entre exercices

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Supabase (gratuit)

### 1. Cloner le projet

```bash
git clone <repository-url>
cd Sport
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration Supabase

#### a. Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre **URL** et **anon key**

#### b. Exécuter les migrations SQL

Dans le SQL Editor de Supabase, exécutez dans l'ordre :

1. `supabase/migrations/001_create_schema.sql` - Crée les tables
2. `supabase/migrations/002_seed_default_sessions.sql` - Insère les 3 séances par défaut

#### c. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_ici
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) 🎉

## 🗂️ Structure du projet

```
Sport/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Dashboard (liste des séances)
│   ├── globals.css              # Styles globaux
│   └── session/
│       └── [id]/
│           ├── page.tsx         # Détail d'une séance
│           └── execute/
│               └── page.tsx     # Mode exécution (exercice par exercice)
├── components/                   # Composants React
│   ├── SessionCard.tsx          # Card de séance
│   ├── ExerciseCard.tsx         # Card d'exercice
│   ├── PerformanceForm.tsx      # Formulaire de perf
│   ├── Timer.tsx                # Timer flottant
│   └── YoutubeModal.tsx         # Modal vidéo YouTube
├── lib/                         # Utilitaires
│   ├── supabase.ts             # Client Supabase
│   ├── youtube.ts              # Helpers YouTube
│   └── utils.ts                # Fonctions utilitaires
├── types/                       # Types TypeScript
│   └── index.ts
├── supabase/                    # Migrations SQL
│   └── migrations/
│       ├── 001_create_schema.sql
│       └── 002_seed_default_sessions.sql
├── public/                      # Assets statiques
│   ├── manifest.json           # PWA manifest
│   └── robots.txt
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── netlify.toml                # Config Netlify
└── README.md
```

## 🎯 Utilisation

### Dashboard
- Affiche les 3 séances disponibles
- Stats rapides (nombre de séances, cette semaine, progression)
- Cliquez sur une séance pour voir le détail

### Vue Séance
- Liste complète des exercices par catégorie
- Dernière performance affichée pour chaque exercice
- Notes et alternatives en accordéon
- Bouton "Démarrer la séance" → Mode exécution

### Mode Exécution
- Exercices un par un avec barre de progression
- Formulaire rapide pour enregistrer les performances
- Timer automatique basé sur le temps de repos
- Bouton vidéo si disponible
- Navigation Précédent/Suivant

### Timer
- Cliquez sur le bouton flottant (en bas à droite)
- Sélectionnez un preset ou utilisez le temps de l'exercice en cours
- Démarrer/Pause/Reset
- Extend +30s ou +1min pendant l'exécution
- Notification sonore + vibration à la fin

## 🚢 Déploiement sur Netlify

### Option 1 : Via l'interface Netlify

1. Push votre code sur GitHub
2. Connectez-vous sur [netlify.com](https://netlify.com)
3. "New site from Git" → Sélectionnez votre repo
4. Build settings :
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy!

### Option 2 : Via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Configuration automatique

Le fichier `netlify.toml` est déjà configuré avec :
- Build command
- Redirects pour Next.js
- Plugin Next.js officiel

## 📱 PWA (Progressive Web App)

L'app est PWA-ready avec :
- `manifest.json` configuré
- Mode standalone (comme une app native)
- Dark theme
- Icons (nécessite `icon-192.png` et `icon-512.png` dans `/public`)

Pour générer les icons :
1. Créez une image 512×512 de votre logo
2. Utilisez un outil comme [realfavicongenerator.net](https://realfavicongenerator.net)
3. Placez les fichiers dans `/public`

## 📊 Données par défaut

### Séance 1 - LUNDI : Force & Puissance
6 exercices focus haut du corps (développé couché, tractions, overhead press, etc.)

### Séance 2 - VENDREDI : Explosivité & Puissance
8 exercices explosifs (landmine press, pompes plio, jump squats, etc.)

### Séance 3 - SAMEDI : Jambes & Conditionnement
9 exercices jambes + core circuit

Toutes les séances incluent :
- Séries et répétitions détaillées
- Charges cibles (% 1RM ou descriptif)
- Temps de repos spécifiques
- Notes et alternatives

## 🛠️ Développement

### Commandes disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run start    # Serveur production local
npm run lint     # Linter
```

### Ajouter une nouvelle séance

1. Via l'interface Supabase SQL Editor :

```sql
INSERT INTO seances (nom, jour, type) VALUES
('Mardi : Cardio', 'Mardi', 'Cardio');

-- Récupérez l'ID généré puis ajoutez les exercices :
INSERT INTO exercices (seance_id, nom, ordre, series, repetitions, charge, repos, categorie) VALUES
('id-de-la-seance', 'Burpees', 1, 3, '15 reps', 'Poids du corps', '1 min', 'A');
```

2. Les nouvelles séances apparaîtront automatiquement sur le dashboard

### Modifier le design

- **Couleurs** : `tailwind.config.js` → section `extend.colors`
- **Animations** : `tailwind.config.js` → section `extend.animation`
- **Layout** : `app/layout.tsx`
- **Styles globaux** : `app/globals.css`

## 🔧 Troubleshooting

### Erreur "Aucune séance trouvée"
- Vérifiez que les migrations SQL ont été exécutées dans Supabase
- Vérifiez les variables d'environnement dans `.env.local`
- Consultez la console Supabase pour les erreurs

### Timer ne fonctionne pas sur mobile
- Assurez-vous que le navigateur supporte les notifications
- Vérifiez les permissions du navigateur
- La vibration nécessite HTTPS (fonctionne en localhost)

### Vidéos YouTube ne chargent pas
- Vérifiez le format de l'URL (doit être une URL YouTube valide)
- Vérifiez la console pour les erreurs CSP
- Testez avec une URL différente

## 📝 Roadmap

- [ ] Graphiques de progression par exercice
- [ ] Export des données (CSV)
- [ ] Mode offline complet (Service Worker)
- [ ] Notifications push pour rappels d'entraînement
- [ ] Partage de séances entre utilisateurs
- [ ] Calculateur de 1RM
- [ ] Templates de programmes avancés

## 🤝 Contribution

Ce projet est pour usage personnel, mais les suggestions sont bienvenues !

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Projet personnel - Utilisation libre

## 🙏 Remerciements

- [Next.js](https://nextjs.org) - Framework React
- [Supabase](https://supabase.com) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://www.framer.com/motion) - Animations
- [Netlify](https://netlify.com) - Hosting

---

Made with 💪 for gains
