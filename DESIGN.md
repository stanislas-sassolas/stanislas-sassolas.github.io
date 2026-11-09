# Portfolio — direction minimale, 6 novembre 2026

## Brief

Stanislas juge la première refonte trop reconnaissable comme une page produite par IA. Il veut un portfolio minimaliste mais beau, au service d'un stage IA/data en Amérique latine. Le contenu vérifié est conservé ; le langage visuel et les textes de présentation sont repris.

## Skill appliqué

Le skill choisi par Stanislas est [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), version déclarée `2.5.0`, fichier `skills/taste-skill/SKILL.md` au commit `9b4bf937a1f69348126959c15d2f99a73e65699b`. Sa copie locale, sa licence MIT et sa provenance sont dans `design-research/taste-skill/`.

Le `SKILL.md` et les références `copy.md`, `system.md`, `layout-v4.md`, `sections.md` et `motion.md` ont été lus intégralement. Le skill est appliqué localement à cette révision, sans installation globale. Le type retenu est `service`, le sous-type `other` : cette page présente une personne à recruter, pas un logiciel à acheter.

Les outils du dépôt ont effectivement servi : le tirage de composition a donné `split` ; le générateur `start.mjs brand` a produit les tokens avec `--page service --type instrument --radius soft` et la palette indiquée ci-dessous. Le résultat est conservé dans `design-research/taste-skill/selected-tokens.html`. Les trois palettes proposées initialement (`greenmat`, `offwhitebottleyellow`, `blush`) ont été écartées au profit des couleurs du brief minimaliste. La feuille de micro-interactions originale est intégrée, sans modification, dans `assets/vendor/taste-motion.css` et utilisée par les liens `.m-link` et les boutons `.btn`.

## Adaptation au portfolio personnel

Le brief explicite de Stanislas prime sur les réglages du skill pour les sites d'entreprise. Le `split` devient un nom et une petite photo sur une même ouverture, dans une largeur de 860 px. Les sections suivent leur contenu : ni hauteur forcée d'un écran, ni navigation fixe, ni pied de page monumental. Les projets sont des lignes de texte, pas des cartes. Aucune photographie de stock ou image ajoutée pour remplir le quota de visuels d'une page commerciale.

Les principes conservés sont la précision des textes, les preuves réelles, une seule famille typographique, les couleurs neutres, les alignements communs, les contrastes lisibles, le focus clavier et les interactions déclenchées par le lecteur. Le portrait et les coordonnées sont ceux de Stanislas. Aucun client, témoignage, chiffre ou contact fictif n'est ajouté.

La copie du dépôt est une sélection de fichiers de référence et de ressources utilisées, pas le kit complet. Les CSS de mise en page commerciale et le JavaScript de mouvement du kit ne sont pas chargés. Le contrôle visuel passe par le navigateur via CUA, conformément aux outils de la session, plutôt que par les scripts Chrome du dépôt. Aucun résultat de ses audits de cohérence, de layout ou de performance n'est revendiqué.

## Choix avant construction

- Palette : papier `#ffffff`, texte `#242424`, texte secondaire `#6c6c6c`, séparateur `#e9e9e9`, lien `#2954c5`, zone de lecture secondaire `#f7f7f7`.
- Typographie : Instrument Sans locale, une seule famille. Nom 54 px maximum ; titres de section et de projet 17–21 px ; texte principal 17 px, lignes courtes. Pas de serif italique, de capitales espacées ou de monospace décoratif.
- Composition : contenu centré dans une largeur de 860 px, aligné à gauche. Petite colonne de repérage à gauche, colonne principale de 650 px. Le nom et le portrait ouvrent la page ; une présentation factuelle suit. Les liens sont du texte, les projets sont des entrées lisibles. Sur mobile, la colonne de repérage rejoint le flux.

```
                                  EN ES   thème
       Stanislas Sassolas                 portrait
       AI & Data / CPE Lyon
       Courte présentation personnelle
       email   GitHub   LinkedIn   CV

Travaux    RAG financier                 année
           Problème, contribution, résultat
           Lire l'étude / exemple à ouvrir

           MeteoVelo                    année
           Contexte + résultat / graphique à ouvrir

           PPO                          année
           Résultat négatif + lien

Parcours   Meelo, rôle et contribution
           Odyssée, CPE

À propos   Pourquoi l'Amérique latine, langues

Contact    Adresse et disponibilité
```

## Révision critique du plan

Une mise en page très éditoriale pourrait encore produire un template : supprimer les slogans, les titres narratifs, les grosses métriques isolées, les badges et le faux document de démonstration. Le portrait réel et les choix techniques concrets sont les éléments propres à Stanislas. Les figures deviennent des détails activés par le lecteur ; elles ne doivent pas encombrer le premier écran. Aucune animation au chargement. Les gestes utiles : ouvrir un exemple, lire un graphique, copier l'adresse.

Une seule petite ligne suffit pour la disponibilité ; ne pas la transformer en badge marketing. Le thème sombre reste neutre. Les informations techniques détaillées se trouvent dans les développements et dans l'étude RAG.

## Interactions ajoutées

- Flèches de liens Taste : déplacement de 3 px au survol et au focus ; le changement de langue conserve les SVG.
- Portrait : zoom de 3 % dans un cadre fixe, lien vers la section À propos.
- Détails : apparition de 200 ms après ouverture volontaire, sans animation de hauteur.
- MeteoVelo : lecture au pointeur ou au toucher avec valeurs réelles, curseur clavier conservé. Échap masque l'infobulle ; aucun flux d'annonces vocales au survol.
- Mouvement réduit respecté par les effets ajoutés et par les correctifs de focus sur les flèches.
- Thème et langue transmis dans les liens entre pages, avec priorité explicite sur le stockage. Le thème est appliqué avant le premier affichage.
