# VALO DIGITAL

Site one-page de VALO DIGITAL, agence de croissance digitale basée à Ouagadougou.

- **Textes** : la partie « Copywriting » du document « VALO (COPYWRITING + STRUCTURE) », à la lettre, dans l'ordre de la partie « Structure ». Tout est dans `src/lib/content.ts`.
- **Détails des offres et des formations** : repris du catalogue « Catalogue des formations et solutions de croissance », accents restaurés. Ils s'ouvrent dans un panneau (`src/components/site/Sheet.tsx`).
- **Rien n'est inventé** : pas de chiffres, de témoignages ni de références clients.
- **Identité** : bleu électrique, jaune et navy de la couverture 2026, Montserrat.
- **Visuels** : le monogramme VD en 3D, rendu avec three.js puis enregistré en images légères ; les photos de Valentin, détourées ; des petites scènes animées en code (`src/components/visuals/Visuals.tsx`).
- **Logo** : le monogramme VD est redessiné en vectoriel d'après la couverture. Il est à remplacer par le fichier officiel dès que le client le fournit (`src/components/brand/Logo.tsx`).
- **Contact** : les boutons ouvrent WhatsApp avec un message déjà écrit (`src/lib/links.ts`).
- **Indexation** : le site est en `noindex` tant qu'il reste un site test (`src/app/layout.tsx`).

## Démarrer

```bash
npm install
npm run dev
```

Pour le déploiement sur Vercel, importer ce dépôt : le site est à la racine,
il n'y a pas de dossier racine à régler.

## Organisation

- `src/app/page.tsx` : l'ordre des sections.
- `src/components/site/` : une section par fichier, plus l'en-tête, le panneau de détails et le défilement doux (Lenis, sur ordinateur).
- `public/images/v3/` : les rendus 3D et les photos.
