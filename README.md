# VALO DIGITAL

Site de VALO DIGITAL, agence de croissance digitale basée à Ouagadougou : l'accueil et la page « À propos ».

- **Textes** : la partie « Copywriting » du document « VALO (COPYWRITING + STRUCTURE) », à la lettre, dans l'ordre de la partie « Structure ». Tout est dans `src/lib/content.ts`.
- **Détails des offres et des formations** : repris du catalogue « Catalogue des formations et solutions de croissance », accents restaurés. Ils s'ouvrent dans un panneau (`src/components/site/Sheet.tsx`).
- **Portfolio** : la page À propos, les logos clients, les chiffres et les photos de l'équipe et du terrain viennent du portfolio de VALO, avec les corrections validées par Charifa.
- **Rien n'est inventé** : pas de chiffres, de témoignages ni de références clients en dehors du portfolio.
- **Identité** : bleu électrique, jaune et navy de la couverture 2026, Montserrat.
- **Accueil** : l'orbite dans le bleu (version C) : le monogramme, le titre centré, le bouton, et quatre petites fenêtres d'application sur une orbite en pointillés (`HeroOrbite.tsx`). Pas de 3D, pour rester léger sur téléphone. Les autres versions restent à des adresses cachées : `/apercu/vague`, `/apercu/orbite` et `/apercu/ancien`.
- **Menu** : Accueil, Services, Formations, À propos, Contact. L'entrée de la page ou de la section en cours s'allume ; depuis À propos, les entrées ramènent à la bonne section de l'accueil. Le lien « Aller au contenu » ne s'affiche qu'au clavier (`src/app/layout.tsx`).
- **Ils nous ont fait confiance** : les 37 logos clients sur deux rangées qui défilent, chargés un écran à l'avance, puis les trois chiffres sur une ligne (`src/components/site/Confiance.tsx`).
- **À propos** : l'agence, le fondateur, son parcours, ses compétences, l'équipe, les moments de terrain en diaporama (`src/components/apropos/Terrain.tsx`), les logos et la mission.
- **Mise en page** : une page claire et posée (titres en graisse moyenne, nom de chaque section sur un filet fin, cartes blanches à filet fin, deux fines lignes de lumière sur les fonds clairs), une forme différente par section, un bloc bleu en haut et un à la fin.
- **Animations** : une entrée différente par type de contenu (`data-reveal` dans `src/app/globals.css`, titres découpés par `src/components/ui/Words.tsx`), en CSS avec des ressorts. « Réduire les animations » garde un simple fondu.
- **Pied de page** : une carte bleu nuit avec les colonnes Services, Formations et Contact, et le grand VALO détouré qui se trace puis s'illumine sous la souris.
- **Visuels** : de vraies petites interfaces pour les prestations (`src/components/previews/`), une vraie photo par formation, la vraie photo de l'équipe, les photos de Valentin détourées. Icônes Tabler (`src/components/ui/Icons.tsx`).
- **Formes** : sections droites et pleine largeur, cartes 16 px, tuiles 10 px, petits éléments 6 à 8 px, boutons en pilule. Quelques sections finissent par une vague douce (`src/components/ui/Wave.tsx`).
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

- `src/app/page.tsx` : l'ordre des sections de l'accueil ; `src/app/a-propos/page.tsx` : celui de la page À propos.
- `src/components/site/` : une section par fichier, plus l'en-tête, le panneau de détails et le défilement doux (Lenis, sur ordinateur).
- `src/components/apropos/` : les sections de la page À propos.
- `public/images/` : les photos détourées (`v3/`), les photos des formations (`formations/`), celles des interfaces (`ui/`), les logos clients (`clients/`), l'équipe (`apropos/`) et le terrain (`terrain/`).
