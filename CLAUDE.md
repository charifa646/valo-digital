# Mémoire de Charifa (Ghostdesignco)

Claude Code lit ce fichier au début de chaque conversation sur ce dépôt. Il résume mon agence, mon stack de création de design et ma façon de travailler. La même mémoire générale est dans le dépôt sites-pratiques (`CLAUDE.md`) : si tu changes l'une, change l'autre.

## Mon agence

- Ghostdesignco crée des sites web sur mesure pour les entrepreneurs et les entreprises francophones : sites vitrines, landing pages, pages de vente.
- Site : https://www.ghostdesignco.com
- Chaque site a un but : faire demander un devis, sur WhatsApp ou par e-mail.

## Ce dépôt : VALO DIGITAL

- Le site de VALO DIGITAL, agence de croissance digitale basée à Ouagadougou : formations, prestations, conseil. C'est un projet pour un client, pas pour Ghostdesignco.
- Site test en deux pages, l'accueil et « À propos » (`/a-propos`), en `noindex` (`src/app/layout.tsx`).
- Les textes viennent de mon document « VALO (COPYWRITING + STRUCTURE) » : la partie Copywriting donne les mots, à la lettre ; la partie Structure donne l'ordre et le rôle des sections. Tout est dans `src/lib/content.ts`.
- N'ajoute un texte que s'il est vraiment utile, et toujours après mon accord.
- La page À propos, les logos clients, les chiffres et les photos de l'équipe et du terrain viennent du portfolio de VALO. Corrections validées le 2 octobre 2026 : accents (« découvert », « métiers »), « disciplines », « développées », « TikTok », titre de la formation du ministère remis d'aplomb, majuscules ramenées en minuscules, tirets remplacés par des virgules.
- Les tirets du document (« 01 — Comprendre », « Cohorte métiers du digital — 2 mois ») sont rendus par la mise en page : le numéro à part, « 2 mois » en étiquette. Les mots ne changent pas.
- Les détails des offres et des formations (formules, contenu des formations, prix du diagnostic et de l'accompagnement) viennent du catalogue du client, accents restaurés. Ils s'ouvrent dans un panneau pour ne pas alourdir la page.
- Rien n'est inventé : ni chiffres, ni témoignages, ni références clients, ni promesses de résultat.
- Direction visuelle : une page claire et posée, dans l'esprit des maquettes Fondo, Relink et Dataluz, et pas une page de vente. Titres en graisse moyenne (500 ; 48 px au plus pour les sections), le nom de chaque section en petites capitales sur un filet fin qui s'efface (jamais dans une pastille), cartes blanches à filet fin, une seule carte bleue par section, un grand bloc bleu en haut (l'accueil) et un à la fin (contact et pied de page). Sur les fonds clairs, deux fines lignes de lumière (`.light-lines`), jamais une grille chargée.
- Chaque section a sa propre forme, pour que rien ne se répète : besoins en quatre portes (sur téléphone, un sommaire numéroté de 01 à 04), prestations en bento avec de vraies petites interfaces, formations en catalogue avec une photo par formation, solutions en liste posée à côté d'un titre qui reste en place, méthode en escalier qui monte avec une courbe de croissance par-dessus (`GrowthCurve.tsx`), pourquoi VALO sur une grande photo d'équipe, fondateur en portrait.
- Les interfaces des prestations (`src/components/previews/`) sont de vrais petits écrans d'application : libellés en français tirés des offres et du catalogue, vraies photos, aucun chiffre ni client inventé. Elles sont décoratives (aria-hidden) et ont leur mise en page pour les petits écrans (requêtes de conteneur).
- Menu : Accueil, Services, Formations, À propos, Contact, puis « Parlons de votre projet » (`nav` dans `content.ts`). L'entrée de la page ou de la section en cours s'allume : pastille sur ordinateur, jaune dans le menu du téléphone. Accueil couvre le haut de page et « De quoi avez-vous besoin » ; depuis À propos, les autres entrées ramènent à la bonne section de l'accueil (`NavLink` et `Anchor` dans `Scroll.tsx`).
- Le lien « Aller au contenu » est dans `layout.tsx`, hors des pages, et ne s'affiche qu'au clavier : après un changement de page, Next.js donne le focus au premier élément de la page, et sur téléphone ce lien apparaissait en jaune.
- Accueil (version C, choisie le 1er octobre 2026) : l'orbite dans le bleu, façon quso.ai, texte centré. Le monogramme VD dans une tuile, le titre en blanc avec « levier de croissance. » en jaune, la phrase et le bouton blanc ; autour, sur une orbite en pointillés, quatre petites fenêtres d'application (Marketing, Publicité, Vente, Formation) avec du vrai contenu du catalogue, et les icônes des réseaux en bas. Le bleu prend toute la section, sans photo de fond, et finit par une vague (`HeroOrbite.tsx`, `blue`). Pas de 3D dans l'accueil : je l'ai trouvée trop lourde.
- Les autres accueils restent visibles à des adresses cachées, non indexées : `/apercu/vague` (A, façon Polushcoin), `/apercu/orbite` (B, l'orbite claire) et `/apercu/ancien` (l'accueil précédent, la femme à la tablette devant le grand nom VALO). Ne les supprime pas sans mon accord.
- « Ils nous ont fait confiance » : le monogramme dans des cercles, puis les 37 logos clients du portfolio sur deux rangées qui défilent en sens opposé, façon Dataly, juste après l'accueil (`confiance.logos` dans `content.ts`, fichiers dans `public/images/clients/`). Ils sont chargés un écran à l'avance (`data-preload`), pour ne jamais montrer de case vide. Le logo VALO DIGITAL CONNECT est laissé de côté : c'est un événement de VALO, pas un client.
- Les chiffres du portfolio (Depuis 2022, +1000, +100) tiennent sur une ligne sur tous les écrans : sur téléphone, un mot du portfolio au-dessus de chaque chiffre, à partir de la tablette la phrase complète en dessous (`Figures` dans `Confiance.tsx`, aussi sur la page À propos).
- Page À propos (`src/app/a-propos/`, `src/components/apropos/`) : l'agence, « Qui suis-je ? », « Mon parcours digital », les 11 compétences, l'équipe, « Quelques clichés de nos formations à succès » en diaporama façon reportage (d'après « Slideshow » et « Lumina Interactive List » de 21st.dev : une photo à la fois, date, titre et lieu, flèches, vignettes, glisser au doigt, défile seul tant qu'il est à l'écran ; seules la photo affichée et ses deux voisines se chargent), puis les logos et la mission. Le bouton « À propos du fondateur » de l'accueil ouvre la page sur « Qui suis-je ? ».
- Numéro de VALO : +226 54 27 77 52 (confirmé le 2 octobre 2026). Le portfolio donne aussi le +226 79 35 29 44 : ne pas l'utiliser.
- Arrondis dosés, pour ne pas faire « site IA » : sections droites et pleine largeur, cartes 16 px, tuiles 10 px, petits éléments 6 à 8 px, boutons en pilule. Le flou de verre est réservé à la barre du menu.
- Des vagues douces à la fin de quelques sections (accueil, Prestations, Méthode, Fondateur), en trois formes, une vague pâle derrière la vague pleine (`src/components/ui/Wave.tsx`). Les découpes en marches ne me plaisaient pas.
- Au défilement, rien ne disparaît : les blocs apparaissent une fois et restent.
- Pas le même fondu qui monte partout, ça fait « site IA » : chaque type de contenu a sa propre entrée, réglée par `data-reveal` dans `globals.css`. `words` pour les titres (les mots sortent du flou, découpés par `Words.tsx`), `rule` pour les intitulés, `flip`, `wipe`, `photo`, `slide`, `curtain`, `blur`, `tilt`, `pop`, `zoom`, et `draw` pour le VALO du pied de page. Les ressorts sont ceux de Framer Motion (raideur 100, amortissement 20, ou 12 pour un petit rebond), écrits en CSS pour rester légers. Les dévoilements par découpe passent par un masque : un élément coupé par clip-path n'est jamais détecté et resterait caché. « Réduire les animations » garde un simple fondu.
- Pied de page : une carte bleu nuit (d'après « Hover Footer » et « Footer Section 4 » sur 21st.dev) avec la marque, les colonnes Services, Formations et Contact, le menu, et le grand VALO détouré qui se trace puis s'illumine sous la souris (`Final.tsx`, `FooterWordmark.tsx`).
- Identité du client : bleu électrique `#0714D8`, jaune `#FDEC05`, navy `#071F78`, Montserrat.
- Le logo (monogramme VD) est redessiné d'après la couverture. Il sera remplacé par le fichier officiel dès que le client le fournit (`src/components/brand/Logo.tsx`).
- Les photos de Valentin viennent de moi. La femme à la tablette (banque d'images) sert dans les accueils gardés en réserve ; `personne-telephone.webp` reste aussi dans le dossier. Toutes sont détourées dans `public/images/v3/`.
- En attente de ma part : les dates à vérifier dans le diaporama (« IA & Marketing Digital » datée du 20 décembre 2026, l'ordre de CONNECT II et « Acte II », les années des sessions de mars et du 31 janvier) et les noms de trois logos (la goutte, les cauris, l'arobase), laissés vides pour l'instant.
- Les photos des formations (`public/images/formations/`) et des interfaces (`public/images/ui/`) viennent de la banque d'images et d'Unsplash : des personnes qui ressemblent au public de VALO, une photo par formation, sans doublon. « Pourquoi VALO » montre la vraie équipe (`public/images/apropos/equipe-casquettes.webp`) ; les photos de l'équipe et du terrain sont dans `public/images/apropos/` et `public/images/terrain/`.
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
