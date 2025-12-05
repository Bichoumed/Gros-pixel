# **Gros-Pixel — Plateforme Gamifiée d’Initiation à la Cybersécurité**
## 1-Présentation du Projet 

Ce projet a été développé dans le cadre du Défi Principal de la Nuit de l’Info 2025.
Gros-Pixel est une plateforme éducative et ludique inspirée de l’univers rétro gaming des années 80 Grâce à son interface pixelisée, ses effets néon et son ambiance arcade, l’utilisateur apprend les bases de la cybersécurité tout en s’amusant.

La Plateforme propose : 
Une introduction générale à la cybersécurité
Des mini-modules thématiques pour découvrir des notions avancées
Un quiz final de 6 questions permettant d’évaluer les connaissances de l’utilisateur
Une expérience immersive et motivante pour encourager l’apprentissage

## 2-Architecture Techniques : 

Le projet repose sur une architecture front-end légère, optimisée et facile à déployer

Technologies Utilisees :

• HTML5 — Structure du contenu

Organisation des modules éducatifs

Mise en page des sections texte + quiz

Navigation simple et intuitive

• CSS3 — Design rétro-gaming

Palette néon inspirée des années 80

Typographies pixelisées

Animations légères rappelant les bornes arcade

Design responsive

• JavaScript — Interactivité et logique du quiz

Gestion de l’affichage des modules

Déclenchement du quiz final

Validation des réponses et calcul du score

Messages interactifs pour renforcer l’apprentissage

## 3-Diagramme dArchitecture : 

Utilisateur
   │
   ▼
Interface HTML (index.html)
   │
   ├── Module éducatif (section HTML)
   │       └─ Contenu pédagogique sur la cybersécurité
   │
   ├── Quiz Engine (script.js)
   │       ├─ Chargement des 6 questions
   │       ├─ Contrôle des réponses
   │       └─ Calcul du score + feedback
   │
   └── Système graphique (style.css)
           ├─ Effet pixel art
           ├─ Palette néon rétro
           └─ Responsive design


## 4-Arborescence du Projet:

Gros-Pixel/
│
├── index.html         # Structure principale du site (cours + quiz)
├── script.js          # Logique du quiz et interactions utilisateur
└── style.css          # Styles rétro-gaming, animations et mise en page

## 5-Deploiement 
La plateforme est entièrement statique, ce qui permet un déploiement simple sur:

5-1-GitHub Pages
5-2-Serveur web classique
Le projet peut être mis en ligne en quelques secondes grâce à son architecture légère.
*Acceder a la plateforme deployee : 
https://gros-pixel.vercel.app/

## 6-Mise en valeur du Projet 
Ce projet met en avant une approche simple et ludique pour sensibiliser à la cybersécurité. Grâce à son design rétro-gaming, ses mini-modules pédagogiques et son quiz final, la plateforme permet d’apprendre les bases de manière accessible et motivante. L’application est légère, responsive et sans collecte de données, offrant ainsi une expérience agréable, éducative et respectueuse des bonnes pratiques numérique.




