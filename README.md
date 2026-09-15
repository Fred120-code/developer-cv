# CV — Développeur Full Stack JavaScript

CV interactif en HTML/CSS/JS pur (aucun framework), au design sombre
premium (glassmorphism, dégradés violet/bleu), pensé pour l'écran comme
pour l'export PDF.

## Structure

```
developer-cv/
│
├── index.html          # Conteneurs uniquement — aucun texte du CV
├── style.css           # Design system (variables CSS), layout, print
├── script.js           # Génère tout le contenu à partir de data.js
├── README.md
│
└── assets/
    ├── data.js          # Toutes les données du CV (le seul fichier à éditer)
    └── photo.jpg        # Photo (non utilisée dans la mise en page actuelle)
```

## Personnaliser le contenu

Tout le texte du CV (nom, profil, compétences, projets, formation,
expérience, langues, centres d'intérêt) se modifie **uniquement** dans
`assets/data.js`. Le HTML ne contient aucun texte : `script.js` lit
`cvData` et construit chaque section avec des fonctions dédiées
(`renderHeader`, `renderSkills`, `renderProjects`, etc.) via
`DocumentFragment`, sans répétition de code.

Pense à renseigner un vrai email, numéro de téléphone et pseudo
GitHub/LinkedIn dans `personal` avant de l'envoyer.

## Aperçu local

Ouvrir `index.html` dans un navigateur suffit (aucune dépendance,
aucun build). Pour éviter d'éventuelles restrictions de modules ES6
sur `file://` selon le navigateur, tu peux aussi servir le dossier :

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Export PDF

Le bouton **Download PDF** en haut à droite (masqué à l'impression)
appelle `window.print()`. Choisis "Enregistrer au format PDF" et
active bien l'option **"Graphiques d'arrière-plan"** dans les
paramètres d'impression de ton navigateur pour conserver les couleurs
et le fond sombre.

Note : avec 4 projets détaillés (Problem/Solution/Stack), la fiche
complète dépasse une page A4 — chaque carte est configurée pour ne
jamais être coupée en deux (`break-inside: avoid`), donc le rendu
reste propre sur plusieurs pages plutôt que de tronquer du contenu.
Si tu préfères tenir sur une seule page, le plus simple est de
raccourcir les textes `problem`/`solution` dans `data.js` ou de
retirer un projet.

## Stack technique

- HTML5 sémantique
- CSS3 (variables custom, Grid, glassmorphism, media queries print)
- JavaScript ES6 (modules, `DocumentFragment`, zéro dépendance)
- Police **Inter** (Google Fonts) + **JetBrains Mono** pour les badges
- Icônes SVG inline, style Lucide (traits fins, monochromes)
