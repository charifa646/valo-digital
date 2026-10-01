# Mémoire de Charifa (Ghostdesignco)

Claude Code lit ce fichier au début de chaque conversation sur ce dépôt. Il résume mon agence, mon stack de création de design et ma façon de travailler. La même mémoire générale est dans le dépôt sites-pratiques (`CLAUDE.md`) : si tu changes l'une, change l'autre.

## Mon agence

- Ghostdesignco crée des sites web sur mesure pour les entrepreneurs et les entreprises francophones : sites vitrines, landing pages, pages de vente.
- Site : https://www.ghostdesignco.com
- Chaque site a un but : faire demander un devis, sur WhatsApp ou par e-mail.

## Ce dépôt : VALO DIGITAL

- Le site de VALO DIGITAL, agence de croissance digitale basée à Ouagadougou : formations, prestations, conseil. C'est un projet pour un client, pas pour Ghostdesignco.
- Site test en one-page, en `noindex` (`src/app/layout.tsx`).
- Les textes viennent de mon document « VALO (COPYWRITING + STRUCTURE) » : la partie Copywriting donne les mots, à la lettre ; la partie Structure donne l'ordre et le rôle des sections. Tout est dans `src/lib/content.ts`.
- N'ajoute un texte que s'il est vraiment utile, et toujours après mon accord.
- Les tirets du document (« 01 — Comprendre », « Cohorte métiers du digital — 2 mois ») sont rendus par la mise en page : le numéro à part, « 2 mois » en étiquette. Les mots ne changent pas.
- Les détails des offres et des formations (formules, contenu des formations, prix du diagnostic et de l'accompagnement) viennent du catalogue du client, accents restaurés. Ils s'ouvrent dans un panneau pour ne pas alourdir la page.
- Rien n'est inventé : ni chiffres, ni témoignages, ni références clients, ni promesses de résultat.
- Direction visuelle : une page claire et posée, dans l'esprit des maquettes Fondo, Relink et Dataluz, et pas une page de vente. Titres de section en gras mais petits (48 px au plus), le nom de la section dans une petite pastille, cartes blanches à filet fin, une seule carte bleue par section, un seul grand bloc bleu à la fin (contact et pied de page).
- Chaque section a sa propre forme, pour que rien ne se répète : besoins en quatre portes, prestations en bento avec de vraies petites interfaces, formations en catalogue avec une photo par formation, solutions en liste posée à côté d'un titre qui reste en place, méthode en ligne qui se trace, pourquoi VALO sur une grande photo d'équipe, fondateur en portrait.
- Les interfaces des prestations (`src/components/previews/`) sont de vrais petits écrans d'application : libellés en français tirés des offres et du catalogue, vraies photos, aucun chiffre ni client inventé. Elles sont décoratives (aria-hidden) et ont leur mise en page pour les petits écrans (requêtes de conteneur).
- Accueil : le titre, la phrase et le bouton en haut, comme AirLume ; en dessous, une vraie photo détourée (la femme à la tablette) qui monte d'un socle taillé droit, devant le grand nom VALO, avec les quatre étiquettes autour, comme Payrot. Pas de 3D dans l'accueil : je l'ai trouvée trop lourde.
- Arrondis dosés, pour ne pas faire « site IA » : sections droites et pleine largeur, cartes 16 px, tuiles 10 px, petits éléments 6 à 8 px, boutons en pilule. Le flou de verre est réservé à la barre du menu.
- Bas de section géométriques et irréguliers, en marches ou en ligne brisée qui monte, comme une courbe de résultats (`src/components/ui/Edge.tsx`).
- Au défilement, rien ne disparaît : les blocs apparaissent une fois et restent, les mots des grands titres s'allument une fois.
- Identité du client : bleu électrique `#0714D8`, jaune `#FDEC05`, navy `#071F78`, Montserrat.
- Le logo (monogramme VD) est redessiné d'après la couverture. Il sera remplacé par le fichier officiel dès que le client le fournit (`src/components/brand/Logo.tsx`).
- Les photos de Valentin viennent de moi. La photo de l'accueil vient de la banque d'images (j'ai choisi la version A, la femme à la tablette ; la version B, `personne-telephone.webp`, reste dans le dossier). Toutes sont détourées dans `public/images/v3/`.
- Les photos des formations (`public/images/formations/`), de l'équipe (`public/images/v3/equipe.webp`) et des interfaces (`public/images/ui/`) viennent de la banque d'images et d'Unsplash : des personnes qui ressemblent au public de VALO, une photo par formation, sans doublon.
- Une seule famille d'icônes pour tout le site : Tabler (`src/components/ui/Icons.tsx`), pas d'icônes dessinées à la main.
- Les boutons ouvrent WhatsApp avec un message déjà écrit, validé avec moi (`src/lib/links.ts`).

## Travailler avec moi

- Réponds en français et tutoie-moi. Sur les sites, les textes vouvoient le visiteur.
- Avant un changement important, dis-moi ce que tu vas faire et attends mon accord, sauf si je te donne carte blanche.
- Montre-moi des captures ordinateur et téléphone avant toute mise en ligne.
- Ne pousse rien sans que je dise « publie » ou « pousse » : ce dépôt est relié à Vercel, pousser sur `main` met https://valo-digital.vercel.app à jour.

## Mon stack de création de design

### Méthode

1. Inspiration : je t'envoie des captures ou des sites de référence. Analyse-les en détail avant d'écrire du code : enchaînement des sections, composition, effets de lumière et de profondeur, typographie, grilles.
2. Cadrage : mes textes, la direction visuelle et, s'il faut choisir des polices, une planche de comparaison.
3. Construction section par section, avec ma validation à chaque étape.
4. Audit final : textes intacts, affichage sur tous les écrans, vitesse sur téléphone, règles des skills de design.
5. Captures, puis mise en ligne quand je dis « publie ».

### Code

- Next.js 14 (App Router), React 18, TypeScript.
- Tailwind CSS 3.
- Framer Motion 11 : animations en ressort (stiffness 100, damping 20), composants animés en `'use client'`.
- Lenis pour le défilement fluide.
- Three.js avec React Three Fiber, Drei et Postprocessing, seulement si la 3D apporte vraiment quelque chose, avec une version allégée pour les appareils faibles.
- Écrans : téléphone sous 768 px, tablette de 768 à 1024 px, ordinateur au-dessus de 1024 px.

### Composants animés

- Bibliothèques : Magic UI, 21st.dev, shadcn/ui, Aceternity UI, Animata, Cult UI, Motion Primitives.
- Pour chaque animation : trouve le composant le plus proche, adapte-le à la palette et propose-le-moi avant de l'intégrer.
- Magic UI s'installe avec `pnpm dlx @magicuidesign/cli@latest install claude`. 21st.dev demande une clé API personnelle, qui ne va jamais dans le dépôt.

### Skills

- Design : taste-skill et ui-ux-pro-max. S'ils manquent, ils sont dans `.claude/skills/` sur la branche `claude/eager-bohr-wqm4l` du dépôt sites-pratiques.
- Textes : humanizer, pour enlever les tics d'écriture IA.
- Images et vidéos : les skills Higgsfield, dans `.claude/skills/` du dépôt sites-pratiques.

### Visuels, vidéo et son

- Higgsfield : images, maquettes, vidéos, acteur IA. Vérifie le coût en crédits avant de lancer.
- Unsplash : vraies photos pour les fonds et les décors.
- Pubs animées : codées en Next.js, rendues image par image avec Playwright et ffmpeg, avec musique et bruitages composés en Python.

### Typographie et couleurs

- Mes sites : Clash Display pour les titres. Ghostdesignco ajoute DM Sans pour le texte et Instrument Serif pour les mots en italique. Kora Transit utilise Inter.
- Une seule couleur signature, utilisée avec mesure. Ghostdesignco : vert acide `#B6FF3B` sur fond presque noir.
- Pour un client, sa charte graphique passe avant.

### Mise en ligne et suivi

- GitHub, puis Vercel qui déploie automatiquement.
- Domaine acheté chez Hostinger, serveurs de noms réglés sur Vercel.
- Vercel Analytics et Google Search Console.
- Formulaires : WhatsApp, et e-mail via FormSubmit. Vidéos de témoignages : Wistia.

## Mes règles de design

- Mes textes mot pour mot : pas de paraphrase, rien de raccourci. S'il manque un texte, demande-le.
- Aucun contenu inventé : ni chiffres, ni témoignages, ni promesses.
- Pas de loader, d'écran de chargement ni de barre de chargement.
- Pas d'emojis dans l'interface.
- Pas de tirets dans les textes des sites : ça fait IA.
- Rien qui fasse « site IA » : pas les mêmes cartes, pastilles et intitulés répétés d'une section à l'autre.
- Impressionnant mais léger : le site doit rester fluide, surtout sur téléphone.
- De vraies images plutôt que des illustrations génériques.
- Aucune clé ni aucun mot de passe dans le dépôt : il est public.

## Ce que j'aime

- Une expérience immersive dès l'arrivée, sans lourdeur, comme la V1 de Ghostdesignco.
- Les en-têtes spectaculaires façon Makedo : grille de cartes et texte centré.
- L'effet miroir.
- Les vagues en bas de section.
- Les grands textes en arrière-plan, dosés, adoucis et fondus dans le décor.
