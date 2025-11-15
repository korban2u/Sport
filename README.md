Tu es un développeur full-stack expert spécialisé en applications web modernes et performantes.

CONTEXTE :
Je souhaite créer une application web de suivi d'entraînement sportif pour mon usage personnel (boxe/force). L'app doit être simple, professionnelle et épurée.

STACK TECHNIQUE REQUISE :
- Frontend : Next.js 14+ (App Router) avec React
- Styling : Tailwind CSS pour une interface moderne et responsive
- Base de données : Supabase (backend-as-a-service gratuit, parfait pour Netlify)
- Déploiement : Netlify
- Mobile : Design responsive-first (PWA si possible)

STRUCTURE DE DONNÉES :

Modèle Séance :
- id (UUID)
- nom (string) - ex: "Lundi : Force & Puissance"
- jour (string) - ex: "Lundi", "Vendredi", "Samedi"
- type (string) - ex: "Force & Puissance", "Explosivité & Puissance"
- date_creation (timestamp)
- date_derniere_execution (timestamp)

Modèle Exercice :
- id (UUID)
- seance_id (foreign key)
- nom (string) - ex: "Développé couché"
- ordre (int) - pour l'affichage séquentiel
- series (int) - ex: 4
- repetitions (string) - ex: "5 reps", "8-10 reps"
- charge (string) - ex: "80-85% 1RM", "poids du corps"
- repos (string) - ex: "2-3 min", "45 sec"
- notes (text) - instructions, alternatives
- video_youtube_url (string) - lien embed YouTube
- categorie (string) - ex: "A1", "B2", "Finisher"

Modèle Performance :
- id (UUID)
- exercice_id (foreign key)
- date_execution (timestamp)
- charge_utilisee (string) - ex: "50kg"
- series_completees (int)
- repetitions_completees (string)
- notes_perso (text) - ressenti, difficulté

DONNÉES PAR DÉFAUT À INTÉGRER :

Crée automatiquement 3 séances avec leurs exercices complets :

SÉANCE 1 - LUNDI : Force & Puissance (Haut du corps focus)
Échauffement (non tracké)

A1. Développé couché : 4×5 reps (80-85% 1RM) | Repos 2-3 min
A2. Tractions lestées : 3×5-6 reps | Repos 2-3 min
B1. Overhead Press (Militaire) : 3×6 reps | Repos 2 min
B2. Rowing barre : 3×6-8 reps | Repos 2 min
C. Cable/Poulie Anti-Rotation Press : 3×10 reps chaque côté | Repos 45 sec
   Note: "Alternative Pallof Press : Si pas de poulie → Planks latéraux dynamiques (side plank avec rotation du buste, 3×12 reps/côté)"
D. Farmer Walk : 3×30-40 mètres
   Note: "Alternative : Haltères/kettlebells en main OU Dead Hangs (suspension à la barre, 3×30-45 sec) pour force de préhension"

SÉANCE 2 - VENDREDI : Explosivité & Puissance
Échauffement explosif (non tracké)

A. Landmine Press (unilatéral) : 4×8-10 reps par bras (charge modérée, vitesse maximale) | Repos 1 min
B. Pompes pliométriques (clap push-ups) : 4×8-10 reps | Repos 1,5 min
   Note: "Alternative medicine ball slams : Les pompes pliométriques développent la même explosivité du haut du corps"
C. Woodchoppers avec haltère : 3×10 reps par côté (explosif) | Repos 1,5 min
   Note: "Alternative medicine ball rotational throws : Mouvement diagonal explosif avec un haltère, reproduit la rotation du tronc"
D. Landmine Rotation : 3×6 reps par côté (explosif) | Repos 1,5 min
E. Jump Squats (poids du corps ou léger) : 3×10 reps | Repos 1,5 min
   Note: "Alternative aux exercices explosifs avec medicine ball : Développe la puissance des jambes pour transférer la force vers le haut du corps"
F. Pull-ups explosifs : 3×6-8 reps | Repos 1,5 min
G. Mountain Climbers explosifs : 3×30 secondes | Repos 1 min
   Note: "Complément cardio/explosivité : Travaille le core, l'endurance et simule le mouvement constant de la boxe"
Finisher : Assault Bike 45/15
   Note: "Alternative : Jump rope intervals (45 sec vitesse modérée / 15 sec sprints maximaux × 5-8 rounds)"

SÉANCE 3 - SAMEDI (Optionnelle) : Jambes & Conditionnement

A. Trap Bar Deadlift : 4×8 reps (70-75% 1RM) | Repos 2 min
B. Box Jumps : 4×5 reps (hauteur modérée) | Repos 2 min
C. Bulgarian Split Squats : 3×8 reps par jambe | Repos 1,5 min
D. Broad Jumps (sauts en longueur) : 3×5 reps | Repos 1,5 min
   Note: "Alternative jump squats : Plus spécifique pour la puissance horizontale, essentielle pour les déplacements en boxe"
E. Glute Bridges : 3×12 reps | Repos 1 min
F. Core Circuit (2-3 tours) :
   - Hanging Leg Raises : 15 reps (OU Leg raises au sol si pas de barre)
   - Russian Twists au poids du corps ou avec haltère/poids : 20 reps (10 chaque côté)
     Note: "Alternative medicine ball : Tenez un haltère, disque de poids, ou même un sac à dos rempli"
   - Plank : 45-60 sec
   - Bicycle Crunches : 20 reps
   Repos 30 sec entre exercices

FONCTIONNALITÉS PRINCIPALES :

1. GESTION DES SÉANCES
   - Affichage en grille/cartes des 3 séances par défaut
   - Vue détaillée par séance avec tous les exercices organisés par catégorie (A1, A2, B1, etc.)
   - Possibilité de créer de nouvelles séances personnalisées
   - Chaque exercice affiche : nom, séries×reps, charge cible, temps de repos
   - Affichage des notes/alternatives en accordéon ou tooltip

2. ENREGISTREMENT DES PERFORMANCES
   - Lors de l'exécution d'une séance : formulaire rapide pour noter par exercice :
     * Charge utilisée (ex: 50kg, poids du corps)
     * Séries complétées
     * Reps effectuées
     * Notes personnelles (ressenti, difficulté)
   - Sauvegarde automatique avec timestamp

3. COMPARAISON & HISTORIQUE
   - Lors de l'ouverture d'un exercice : affichage "Dernière fois : 3×10 @ 50kg (il y a 5 jours)"
   - Vue historique par exercice (graphique simple d'évolution de la charge)
   - Badge visuel si progression (+5kg, +2 reps, etc.)

4. TIMER INTÉGRÉ
   - Timer de repos visible en permanence (sticky/floating button)
   - Presets selon l'exercice en cours (lecture auto du temps de repos)
   - Presets manuels : 30s, 45s, 1min, 1min30, 2min, 3min
   - Notification sonore + vibration en fin de timer
   - Possibilité de skip ou extend

5. VIDÉOS YOUTUBE
   - Chaque exercice peut avoir un lien YouTube
   - Visualisation en modal/embed (sans quitter l'app)
   - Suggestions par défaut pour les exercices standards (optionnel)

6. INTERFACE
   - Design professionnel type "fitness app" moderne
   - Palette : tons sombres (dark mode par défaut) avec accents colorés (ex: bleu/vert pour progression)
   - Navigation :
     * Dashboard : liste des séances (cards cliquables)
     * Vue séance : liste exercices avec bouton "Démarrer la séance"
     * Mode exécution : exercice par exercice avec timer + form de saisie
     * Historique : graphiques et stats
   - Mobile-first, swipe gestures pour naviguer entre exercices
   - Animations fluides (Framer Motion recommandé)

CONTRAINTES :
- Seed automatique des 3 séances au premier lancement
- Code propre et commenté
- Performance optimale (lazy loading des vidéos)
- Offline-first si possible (PWA avec cache)

LIVRABLES ATTENDUS :
1. Projet Next.js complet avec structure claire
2. Schéma Supabase (SQL) avec migration pour les 3 séances par défaut
3. Composants React réutilisables (ExerciseCard, TimerWidget, PerformanceForm, etc.)
4. Service d'embed YouTube sécurisé
5. Instructions de déploiement Netlify
6. README détaillé

APPROCHE DE DÉVELOPPEMENT :
Phase 1 : Setup projet + Supabase + seed des séances par défaut
Phase 2 : Affichage des séances et exercices (lecture seule)
Phase 3 : Enregistrement des performances + comparaison "dernière fois"
Phase 4 : Timer intégré avec presets
Phase 5 : Intégration vidéos YouTube
Phase 6 : Optimisation mobile + PWA + design final

Fait tout d'un coups je sais que tu es chaud en code
