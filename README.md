# VALO DIGITAL

Site one-page de VALO DIGITAL, agence de croissance digitale basée à Ouagadougou.

- **Textes** : la partie « Copywriting » du document « VALO (COPYWRITING + STRUCTURE) », à la lettre, dans l'ordre de la partie « Structure ». Tout est dans `src/lib/content.ts`.
- **Détails des offres et des formations** : repris du catalogue « Catalogue des formations et solutions de croissance », accents restaurés. Ils s'ouvrent dans un panneau (`src/components/site/Sheet.tsx`).
- **Rien n'est inventé** : pas de chiffres, de témoignages ni de références clients.
- **Identité** : bleu électrique, jaune et navy de la couverture 2026, Montserrat.
- **Accueil** : le texte en haut, puis une photo détourée qui monte d'un socle taillé droit, devant le grand nom VALO. Pas de 3D dans l'accueil, pour rester léger sur téléphone.
- **Mise en page** : une page claire et posée (titres en gras mais petits, nom de chaque section dans une pastille, cartes blanches à filet fin), une forme différente par section, un seul grand bloc bleu à la fin.
- **Visuels** : de vraies petites interfaces pour les prestations (`src/components/previews/`), une vraie photo par formation, une photo d'équipe, les photos de Valentin détourées. Icônes Tabler (`src/components/ui/Icons.tsx`).
- **Formes** : sections droites et pleine largeur, cartes 16 px, tuiles 10 px, petits éléments 6 à 8 px, boutons en pilule. Les bas de section sont taillés en marches ou en ligne brisée (`src/components/ui/Edge.tsx`).
- **Logo** : le monogramme VD est redessiné en vectoriel d'après la couverture. Il est à remplacer par le fichier officiel dès que le client le fournit (`src/components/brand/Logo.tsx`).
- **Contact** : les boutons ouvrent WhatsApp avec un message déjà écrit (`src/lib/links.ts`).
- **Indexation** : le site est en `noindex` tant qu'il reste un site test (`src/app/layout.tsx`).

## Démarrer

```bash
npm install
npm run dev
```

En ligne sur https://valo-digital.vercel.app : Vercel déploie chaque push sur
`main`. Le site est à la racine du dépôt, il n'y a pas de dossier racine à régler.

## Organisation

- `src/app/page.tsx` : l'ordre des sections.
- `src/components/site/` : une section par fichier, plus l'en-tête, le panneau de détails et le défilement doux (Lenis, sur ordinateur).
- `public/images/` : les photos détourées (`v3/`), les photos des formations (`formations/`) et celles des interfaces (`ui/`).
