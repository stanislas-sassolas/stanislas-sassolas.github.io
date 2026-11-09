# Portfolio de Stanislas Sassolas — refonte IA / Data

Refonte du 6 novembre 2026. Site statique compatible avec GitHub Pages, sans installation de dépendances.

## Voir le site

Ouvrir `index.html` dans un navigateur. Pour un aperçu HTTP local : lancer `node preview.mjs`, puis ouvrir http://127.0.0.1:4173. Arrêter avec Ctrl+C.

## Intention

Un recruteur doit comprendre rapidement : le profil IA/data, l'expérience Meelo, la disponibilité pour six mois en Amérique latine début 2027, et les preuves consultables derrière chaque projet.

- RAG financier en premier : lien direct entre LLM, finance et espagnol. Les 29/32 mesurent la recherche de pages, pas l'exactitude de réponses générées.
- MeteoVelo : pipeline de données et comparaison sur une semaine ultérieure, avec périmètre explicite.
- PPO : résultat négatif expliqué, qui démontre la capacité à évaluer sans enjoliver.
- NLP et Duo : preuves complémentaires, sans diluer le positionnement.
- Meelo et parcours : contribution personnelle, confidentialité préservée, compétences situées dans un contexte.

Le dossier `projects/` contient une étude de cas du RAG avec résultats et sources. Le dépôt GitHub RAG renvoyait 404 sans authentification lors de la vérification : le portfolio utilise donc cette étude locale, sans promettre un dépôt accessible.

## Design

Le skill [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill/tree/9b4bf937a1f69348126959c15d2f99a73e65699b/skills/taste-skill), version déclarée `2.5.0`, a été lu et appliqué localement à la demande de Stanislas. La provenance, les références consultées et la sortie du générateur de tokens sont conservées dans la copie de travail locale `design-research/taste-skill/` (non versionnée). La feuille `assets/vendor/taste-motion.css` provient du dépôt ; sa licence est conservée avec elle.

La direction est un portfolio personnel compact : fond blanc, Instrument Sans locale, largeur de 860 px, petit portrait et projets présentés en lignes. Le brief minimaliste remplace les réglages du skill destinés aux sites d'entreprise, notamment la navigation fixe et les sections occupant un écran entier. `DESIGN.md` détaille les choix et leur adaptation. La vérification visuelle utilise CUA ; aucun passage des scripts d'audit Chrome du skill n'est revendiqué.

## Fichiers

- `index.html` : page principale en anglais, espagnol via sélecteur.
- `assets/styles.css` : identité visuelle, mobile, thèmes clair/sombre et impression.
- `assets/app.js` : interactions, traduction, graphiques et préférences locales.
- `assets/es.json` : traductions espagnoles.
- `assets/evidence.json` : séries et valeurs réelles avec provenance et limites.
- `assets/rag-evaluation.json` : les 36 questions annotées du projet RAG.
- `assets/rag-retrieval.csv` : résultats complets de retrieval.
- `projects/financial-rag.html` : étude de cas bilingue autonome.
- `cv/` : les deux PDF existants, conservés.
- `DESIGN.md` : brief minimaliste, usage du skill et décisions de composition.
- `THIRD-PARTY.md` : ressources GitHub intégrées et licences.

Le comparatif `REFERENCES.md`, l'audit `AUDIT-CONTENU.md`, la vérification `VALIDATION.md` et l'aperçu sont conservés dans le dossier `projet portfolio/refonte-2026-11-06`, à côté des dépôts. La sauvegarde de l'ancienne page est dans `projet portfolio/sauvegardes`.

Les données et traductions sont aussi embarquées dans `index.html` pour permettre une ouverture directe sans serveur. Après modification des JSON, lancer `node embed-data.mjs` pour synchroniser ces copies.

## Publication

Site public : https://stanislas-sassolas.github.io/ - GitHub Pages publie la branche main. Le site est statique : index.html, assets/, projects/ et cv/. Le fichier .nojekyll désactive le traitement Jekyll. Conserver les licences des ressources réutilisées.

## Prochaines améliorations de fond

1. Publier le dépôt RAG après contrôle de ses fichiers, puis ajouter le lien au portfolio.
2. Exécuter l'évaluation complète des réponses et des citations, déjà prévue dans le projet.
3. Élargir le jeu d'évaluation et ajouter une annotation indépendante.
4. Confirmer le périmètre exact des métriques d'impact Meelo avant de les mettre davantage en avant.

Pas de suivi publicitaire, d'API de génération, de secret ni de formulaire externe. Les exemples financiers affichés sont des réponses annotées fixes. Les préférences langue/thème sont enregistrées uniquement dans le navigateur.

Les interactions comprennent le survol du graphique, les flèches de liens, le zoom discret du portrait et l'ouverture des détails. Elles respectent la préférence de mouvement réduit. Thème et langue sont transmis dans les liens entre les deux pages, afin de conserver le contexte même lorsque le stockage local n'est pas partagé entre fichiers.
