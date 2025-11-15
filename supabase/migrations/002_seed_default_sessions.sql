-- Seed default workout sessions
-- This file contains the 3 default workout sessions with all exercises

-- ============================================
-- SÉANCE 1: LUNDI - Force & Puissance
-- ============================================
INSERT INTO seances (id, nom, jour, type) VALUES
('a1111111-1111-1111-1111-111111111111', 'LUNDI : Force & Puissance', 'Lundi', 'Force & Puissance');

-- Exercises for Session 1
INSERT INTO exercices (seance_id, nom, ordre, series, repetitions, charge, repos, notes, categorie) VALUES
('a1111111-1111-1111-1111-111111111111', 'Développé couché', 1, 4, '5 reps', '80-85% 1RM', '2-3 min', NULL, 'A1'),
('a1111111-1111-1111-1111-111111111111', 'Tractions lestées', 2, 3, '5-6 reps', 'Lesté', '2-3 min', NULL, 'A2'),
('a1111111-1111-1111-1111-111111111111', 'Overhead Press (Militaire)', 3, 3, '6 reps', 'Modéré', '2 min', NULL, 'B1'),
('a1111111-1111-1111-1111-111111111111', 'Rowing barre', 4, 3, '6-8 reps', 'Modéré', '2 min', NULL, 'B2'),
('a1111111-1111-1111-1111-111111111111', 'Cable/Poulie Anti-Rotation Press', 5, 3, '10 reps chaque côté', 'Léger', '45 sec', 'Alternative Pallof Press : Si pas de poulie → Planks latéraux dynamiques (side plank avec rotation du buste, 3×12 reps/côté)', 'C'),
('a1111111-1111-1111-1111-111111111111', 'Farmer Walk', 6, 3, '30-40 mètres', 'Haltères lourds', '1-2 min', 'Alternative : Haltères/kettlebells en main OU Dead Hangs (suspension à la barre, 3×30-45 sec) pour force de préhension', 'D');

-- ============================================
-- SÉANCE 2: VENDREDI - Explosivité & Puissance
-- ============================================
INSERT INTO seances (id, nom, jour, type) VALUES
('b2222222-2222-2222-2222-222222222222', 'VENDREDI : Explosivité & Puissance', 'Vendredi', 'Explosivité & Puissance');

-- Exercises for Session 2
INSERT INTO exercices (seance_id, nom, ordre, series, repetitions, charge, repos, notes, categorie) VALUES
('b2222222-2222-2222-2222-222222222222', 'Landmine Press (unilatéral)', 1, 4, '8-10 reps par bras', 'Modéré (vitesse max)', '1 min', 'Charge modérée, focus sur la vitesse d''exécution maximale', 'A'),
('b2222222-2222-2222-2222-222222222222', 'Pompes pliométriques (clap push-ups)', 2, 4, '8-10 reps', 'Poids du corps', '1 min 30', 'Alternative medicine ball slams : Les pompes pliométriques développent la même explosivité du haut du corps', 'B'),
('b2222222-2222-2222-2222-222222222222', 'Woodchoppers avec haltère', 3, 3, '10 reps par côté', 'Léger (explosif)', '1 min 30', 'Alternative medicine ball rotational throws : Mouvement diagonal explosif avec un haltère, reproduit la rotation du tronc', 'C'),
('b2222222-2222-2222-2222-222222222222', 'Landmine Rotation', 4, 3, '6 reps par côté', 'Modéré (explosif)', '1 min 30', 'Rotation explosive du tronc', 'D'),
('b2222222-2222-2222-2222-222222222222', 'Jump Squats', 5, 3, '10 reps', 'Poids du corps ou léger', '1 min 30', 'Alternative aux exercices explosifs avec medicine ball : Développe la puissance des jambes pour transférer la force vers le haut du corps', 'E'),
('b2222222-2222-2222-2222-222222222222', 'Pull-ups explosifs', 6, 3, '6-8 reps', 'Poids du corps', '1 min 30', 'Tractions avec phase concentrique explosive', 'F'),
('b2222222-2222-2222-2222-222222222222', 'Mountain Climbers explosifs', 7, 3, '30 secondes', 'Poids du corps', '1 min', 'Complément cardio/explosivité : Travaille le core, l''endurance et simule le mouvement constant de la boxe', 'G'),
('b2222222-2222-2222-2222-222222222222', 'Assault Bike 45/15', 8, 1, '5-8 rounds', 'Variable', '0 sec', 'Alternative : Jump rope intervals (45 sec vitesse modérée / 15 sec sprints maximaux × 5-8 rounds)', 'Finisher');

-- ============================================
-- SÉANCE 3: SAMEDI - Jambes & Conditionnement
-- ============================================
INSERT INTO seances (id, nom, jour, type) VALUES
('c3333333-3333-3333-3333-333333333333', 'SAMEDI : Jambes & Conditionnement (Optionnel)', 'Samedi', 'Jambes & Conditionnement');

-- Exercises for Session 3
INSERT INTO exercices (seance_id, nom, ordre, series, repetitions, charge, repos, notes, categorie) VALUES
('c3333333-3333-3333-3333-333333333333', 'Trap Bar Deadlift', 1, 4, '8 reps', '70-75% 1RM', '2 min', NULL, 'A'),
('c3333333-3333-3333-3333-333333333333', 'Box Jumps', 2, 4, '5 reps', 'Hauteur modérée', '2 min', 'Focus sur la puissance, pas la vitesse', 'B'),
('c3333333-3333-3333-3333-333333333333', 'Bulgarian Split Squats', 3, 3, '8 reps par jambe', 'Haltères', '1 min 30', 'Travail unilatéral pour équilibre et force', 'C'),
('c3333333-3333-3333-3333-333333333333', 'Broad Jumps (sauts en longueur)', 4, 3, '5 reps', 'Poids du corps', '1 min 30', 'Alternative jump squats : Plus spécifique pour la puissance horizontale, essentielle pour les déplacements en boxe', 'D'),
('c3333333-3333-3333-3333-333333333333', 'Glute Bridges', 5, 3, '12 reps', 'Barre ou poids du corps', '1 min', 'Activation des fessiers', 'E'),
('c3333333-3333-3333-3333-333333333333', 'Hanging Leg Raises', 6, 3, '15 reps', 'Poids du corps', '30 sec', 'OU Leg raises au sol si pas de barre disponible', 'F1'),
('c3333333-3333-3333-3333-333333333333', 'Russian Twists', 7, 3, '20 reps (10/côté)', 'Haltère ou poids', '30 sec', 'Alternative medicine ball : Tenez un haltère, disque de poids, ou même un sac à dos rempli', 'F2'),
('c3333333-3333-3333-3333-333333333333', 'Planche', 8, 3, '45-60 secondes', 'Poids du corps', '30 sec', 'Maintien strict, corps aligné', 'F3'),
('c3333333-3333-3333-3333-333333333333', 'Bicycle Crunches', 9, 3, '20 reps', 'Poids du corps', '30 sec', 'Mouvement contrôlé', 'F4');
