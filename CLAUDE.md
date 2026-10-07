# Mémoire de Charifa (Ghostdesignco)

Claude Code lit ce fichier au début de chaque conversation sur ce dépôt. Il résume mon agence, mon stack de création de design et ma façon de travailler. La même mémoire générale est dans le dépôt sites-pratiques (`CLAUDE.md`) : si tu changes l'une, change l'autre.

## Mon agence

- Ghostdesignco crée des sites web sur mesure pour les entrepreneurs et les entreprises francophones : sites vitrines, landing pages, pages de vente.
- Site : https://www.ghostdesignco.com
- Chaque site a un but : faire demander un devis, sur WhatsApp ou par e-mail.

## Ce dépôt : VALO DIGITAL

- Le site de VALO DIGITAL, agence de croissance digitale basée à Ouagadougou : formations, prestations, conseil. C'est un projet pour un client, pas pour Ghostdesignco.
- Site test en quatre pages, en `noindex` (`src/app/layout.tsx`) : l'accueil, « Services » (`/services`), « Formations » (`/formations`) et « À propos » (`/a-propos`).
- Les textes viennent de mon document « VALO (COPYWRITING + STRUCTURE) » : la partie Copywriting donne les mots, à la lettre ; la partie Structure donne l'ordre et le rôle des sections. Tout est dans `src/lib/content.ts`.
- N'ajoute un texte que s'il est vraiment utile, et toujours après mon accord.
- La page À propos, les logos clients, les chiffres et les photos de l'équipe et du terrain viennent du portfolio de VALO. Corrections validées le 2 octobre 2026 : accents (« découvert », « métiers »), « disciplines », « développées », « TikTok », titre de la formation du ministère remis d'aplomb, majuscules ramenées en minuscules, tirets remplacés par des virgules.
- Les tirets du document (« 01 — Comprendre », « Cohorte métiers du digital — 2 mois ») sont rendus par la mise en page : le numéro à part, « 2 mois » en étiquette. Les mots ne changent pas.
- Les détails des offres et des formations (formules, contenu des formations, prix du diagnostic et de l'accompagnement) viennent du catalogue du client, accents restaurés. Ils s'ouvrent dans un panneau pour ne pas alourdir la page. Les noms des formations et des prestations suivent le catalogue 2026 (« Attirer des clients avec la publicité Facebook et Instagram », « Bilan digital et plan d'action », formules Essentiel, Développement et Premium…), validés le 7 octobre 2026.
- Boutons : sur les fonds et les cartes clairs, jamais blanc sur blanc. Les boutons discrets sont bleu clair avec le texte bleu (`btn-ghost`, liens des cartes de services), la flèche des cartes de formation est dans un rond bleu plein.
- Rien n'est inventé : ni chiffres, ni témoignages, ni références clients, ni promesses de résultat.
- Direction visuelle : une page claire et posée, dans l'esprit des maquettes Fondo, Relink et Dataluz, et pas une page de vente. Titres en graisse moyenne (500 ; 48 px au plus pour les sections), pas de petit intitulé au-dessus des titres (ça faisait « site IA », surtout avec le filet qui le suivait : retirés le 7 octobre 2026) ; seuls « Mot du fondateur » et « Mon parcours digital » gardent le leur, parce que c'est leur titre, en petites capitales grasses et sans filet, comme chez Wpromote. Cartes blanches à filet fin, une seule carte bleue par section, un grand bloc bleu en haut (l'accueil) et un à la fin (contact et pied de page). Sur les fonds clairs, un grain très fin (`.paper`, sous le contenu : les cartes restent d'un blanc net) et, dans quelques sections seulement, un halo de bleu très léger (`halo-*`) : trop de bleu et le blanc paraît sale. Deux grands mots en filigrane, « BESOIN » et « MÉTHODE » (`Filigrane.tsx`), pas plus, et jamais dans la section du fondateur. Les lignes de lumière sont retirées des pages : elles traversaient les textes.
- Chaque section a sa propre forme, pour que rien ne se répète : besoins en quatre portes (sur téléphone, un sommaire numéroté de 01 à 04), prestations en bento avec de vraies petites interfaces, formations en catalogue avec une photo par formation, méthode en escalier qui monte avec une courbe de croissance par-dessus (`GrowthCurve.tsx`), puis le « Mot du fondateur » du catalogue 2026 : Valentin en portrait avec son nom et ses trois titres, et le début de sa lettre à côté. Sur la page Services, les solutions en liste posée à côté d'un titre qui reste en place ; sur la page À propos, pourquoi VALO sur une grande photo d'équipe. Une seule phrase de la lettre est adaptée, avec mon accord : « Ce catalogue présente » devient « Ce site présente ».
- Accueil simplifié le 7 octobre 2026 (on me reprochait trop d'informations à la fois ; mise en page inspirée de RNO1, Wpromote, Instrument et The Alien) : l'accueil ne garde que l'essentiel, le reste est à un clic. Les deux premières offres et les quatre premières formations sont entières, la suite se devine sous un flou progressif qui s'efface, avec le bouton vers la page complète (« Voir tous les services », « Voir toutes les formations ») ; le mot du fondateur montre son premier paragraphe, la suite floutée, et « En savoir plus » ouvre la lettre entière sur la page À propos (`#mot`). C'est `Suite.tsx`, d'après « Progressive Blur » (Magic UI, 21st.dev) : ce qui est sous le flou n'est qu'un aperçu, caché aux lecteurs d'écran et hors d'atteinte du clavier ; un texte y est flouté en entier, jamais par couches (les lettres paraissaient grasses et tachées). « Pourquoi VALO » est passé sur la page À propos, les solutions spécialisées sur la page Services ; la méthode reste sur l'accueil. « COMPRENDRE » et « ACCÉLÉRER », dans les besoins, ouvrent le détail de leur offre dans le panneau. L'accueil mesure 8 400 px sur ordinateur (11 400 avant) et 10 200 px sur téléphone (15 400 avant).
- Pages Services et Formations : leur nom du menu en très grand, qui monte à l'arrivée comme chez RNO1 (`src/components/pages/PageTitle.tsx`), puis tout le contenu, sans halo sous le titre (son bord faisait une bande). Services : les quatre offres entières, puis les trois solutions. Formations : les huit formations deux par deux, avec photo, format, modules principaux, tarif et « M'inscrire à cette formation », qui ouvre le formulaire avec la formation choisie (`Catalogue.tsx`). Chaque offre et chaque formation a son ancre (`/services#diagnostic`, `/formations#formation-ads`) : le menu et le pied de page y mènent, et la page y glisse à l'arrivée (`PageLink` et l'effet d'arrivée dans `Scroll.tsx`).
- Les interfaces des prestations (`src/components/previews/`) sont de vrais petits écrans d'application : libellés en français tirés des offres et du catalogue, vraies photos, aucun chiffre ni client inventé. Elles sont décoratives (aria-hidden) et ont leur mise en page pour les petits écrans (requêtes de conteneur).
- Menu : Accueil, Services, Formations, À propos, Contact, puis « Parlons de votre projet » (`nav` dans `content.ts`). L'entrée de la page ou de la section en cours s'allume : pastille sur ordinateur, jaune dans le menu du téléphone. Accueil couvre le haut de page et « De quoi avez-vous besoin » ; depuis une autre page, les autres entrées ramènent à la bonne section de l'accueil (`NavLink` et `Anchor` dans `Scroll.tsx`) ; sur les pages Services et Formations, leur entrée s'allume. « Services » et « Formations » ont un sous-menu (7 octobre 2026) : sur ordinateur, au survol ou par leur petite flèche, un panneau blanc avec le nom de la page et le lien vers elle sur une carte bleue, puis chaque offre ou formation avec son prix ; sur téléphone, la flèche déplie la liste sous l'entrée (`menus` dans `content.ts`, `Header.tsx`).
- Le lien « Aller au contenu » est dans `layout.tsx`, hors des pages, et ne s'affiche qu'au clavier : après un changement de page, Next.js donne le focus au premier élément de la page, et sur téléphone ce lien apparaissait en jaune.
- Accueil (version B, l'orbite claire, choisie par le client le 7 octobre 2026) : façon quso.ai, texte centré dans une grande carte claire. Le monogramme VD dans une tuile, le titre avec « levier de croissance. » en bleu, la phrase et le bouton bleu ; autour, sur une orbite en pointillés, quatre petites fenêtres d'application (Marketing digital, Publicité, Vente, Formation) avec du vrai contenu du catalogue, et les icônes des réseaux en bas (`HeroOrbite.tsx`). Pas de 3D dans l'accueil : je l'ai trouvée trop lourde.
- Les autres accueils restent visibles à des adresses cachées, non indexées : `/apercu/vague` (A, façon Polushcoin), `/apercu/orbite` (B, la même que l'accueil), `/apercu/orbite-bleue` (C, l'orbite dans le bleu, accueil du 1er au 7 octobre 2026) et `/apercu/ancien` (l'accueil précédent, la femme à la tablette devant le grand nom VALO). Ne les supprime pas sans mon accord.
- Pied de page, deux propositions du 7 octobre 2026 (je n'aimais plus l'ancien), visibles sur tout l'accueil à des adresses cachées : `/apercu/pied/scene` (A, « la scène » : le dernier appel est un rideau bleu dont l'ourlet est une vague ; en bas de page il se lève et découvre, fixée dessous, une scène bleu nuit où le nom VALO se dresse sur un sol qui reflète comme un miroir, Valentin dans son fauteuil devant ; la lumière s'allume et les lettres montent pendant que le rideau se lève) et `/apercu/pied/appel` (B, « le grand appel » : le bloc bleu, le titre en très grand avec Valentin, puis les quatre métiers de VALO qui défilent en très grand). Les deux écrivent en grand le téléphone, l'e-mail et l'adresse. Code dans `src/components/site/pied/`. En attente de mon choix : l'ancien pied (`Final.tsx`) reste en place d'ici là.
- « Ils nous ont fait confiance » : le monogramme dans des cercles, puis les 37 logos clients du portfolio sur deux rangées qui défilent en sens opposé, façon Dataly, juste après l'accueil (`confiance.logos` dans `content.ts`, fichiers dans `public/images/clients/`). Ils sont chargés un écran à l'avance (`data-preload`), pour ne jamais montrer de case vide. Le logo VALO DIGITAL CONNECT est laissé de côté : c'est un événement de VALO, pas un client.
- Les chiffres clés, dans mes mots du 7 octobre 2026 : « +1 000 ENTREPRENEURS FORMÉS 2022-2026 », « +100 PROJETS RÉALISÉS », « +70 000 $ BUDGETS DE CAMPAGNES PUBLICITAIRES (FB & INST) GÉRÉS ». Mise en page d'après le bloc « Bold moves pay off » de Wpromote (mon choix du 7 octobre 2026, à la place du « Stats Bento » avec la photo) : un bloc bleu nuit à angles droits, aussi large que la page, « VOTRE CROISSANCE MAINTENANT » du catalogue en titre et la mission du portfolio en phrase, puis les trois chiffres en grand et en léger, leur « + » en couleur, ce qu'ils comptent écrit en dessous et les années sur leur propre ligne ; ils défilent une fois à l'écran, groupés à la française (`Chiffres.tsx`, `Counter.tsx`), sur l'accueil et sur la page À propos. La carte blanche à ombre, le bandeau à filets et le Stats Bento ont été écartés.
- Les prix du site sont ceux du catalogue 2026 (vérifiés un par un le 7 octobre 2026). On garde la formulation du site (« À partir de », « Tarif selon format ») plutôt que celle du catalogue (« Dès », « Selon format »). Les milliers sont séparés par une espace insécable normale : l'espace fine disparaissait sur téléphone dans les petits prix (« 75000 F CFA », 7 octobre 2026).
- Page À propos (`src/app/a-propos/`, `src/components/apropos/`) : l'agence, « Qui suis-je ? », le « Mot du fondateur » en entier (`Mot.tsx`, `#mot`, sur le même bleu clair que « Qui suis-je ? », comme une lettre), « Mon parcours digital » et les chiffres, les 11 compétences en liste numérotée sans icônes, « Être visible ne suffit pas. » (pourquoi VALO, venu de l'accueil le 7 octobre 2026, ses trois piliers sans icônes), l'équipe, « Quelques clichés de nos formations à succès » en diaporama façon reportage (d'après « Slideshow » et « Lumina Interactive List » de 21st.dev : une photo à la fois, date, titre et lieu, flèches, vignettes, glisser au doigt, défile seul tant qu'il est à l'écran ; seules la photo affichée et ses deux voisines se chargent), puis les logos et la mission. Le bouton « En savoir plus » du mot du fondateur, sur l'accueil, ouvre cette page sur la lettre entière.
- Numéro de VALO : +226 54 27 77 52, le numéro de la direction (confirmé le 2 octobre 2026, redit par VALO le 7 octobre). Le portfolio donne aussi le +226 79 35 29 44 : ne pas l'utiliser.
- Angles droits depuis le 7 octobre 2026 (un site d'agence, pas une page de vente) : sections droites et pleine largeur ; cartes, blocs, tuiles, photos et champs à 4 px (`rounded-xl` et `rounded-2xl` valent 4 px dans `tailwind.config.ts`) ; boutons, pastilles et barre du menu en pilule. Seules les petites interfaces des offres et de l'accueil gardent leurs coins d'écran. Le flou de verre est réservé à la barre du menu.
- Des vagues douces entre quelques sections (sur l'accueil après Prestations, Méthode et le mot du fondateur ; cinq sur la page À propos ; une avant le contact sur les pages Services et Formations), en trois formes. Depuis le 7 octobre 2026 elles sont ancrées : la section suivante remonte sur la fin de la précédente et son bord haut est découpé en vague par un masque, avec son propre blanc, son grain ou son bleu ; plus de vague pâle derrière ni de ligne droite dessous (`waveTop` et `WaveSpace` dans `src/components/ui/Wave.tsx`, `.wave-top` dans `globals.css`). Entre deux sections claires, un filet fin suit le bord de la vague. Le menu passe au verre sombre au milieu de la vague. Les découpes en marches ne me plaisaient pas.
- Au défilement, rien ne disparaît : les blocs apparaissent une fois et restent.
- Pas le même fondu qui monte partout, ça fait « site IA » : chaque type de contenu a sa propre entrée, réglée par `data-reveal` dans `globals.css`. `words` pour les titres (les mots sortent du flou, découpés par `Words.tsx`), `rule` pour les intitulés, `flip`, `wipe`, `photo`, `slide`, `curtain`, `blur`, `tilt`, `pop`, `zoom`, et `draw` pour le VALO du pied de page. Les ressorts sont ceux de Framer Motion (raideur 100, amortissement 20, ou 12 pour un petit rebond), écrits en CSS pour rester légers. Les dévoilements par découpe passent par un masque : un élément coupé par clip-path n'est jamais détecté et resterait caché. « Réduire les animations » garde un simple fondu.
- Pied de page : une carte bleu nuit (d'après « Hover Footer » et « Footer Section 4 » sur 21st.dev) avec la marque, les colonnes Services, Formations et Contact (titres pris dans le menu par leur identifiant ; les offres et les formations mènent à leur place sur leur page, puis « Voir tous les services » et « Voir toutes les formations »), le menu, et le grand VALO détouré qui se trace puis s'illumine sous la souris (`Final.tsx`, `FooterWordmark.tsx`).
- Identité du client : bleu électrique `#0714D8`, jaune `#FDEC05`, navy `#071F78`, Montserrat.
- Le logo (monogramme VD) est redessiné d'après la couverture. Il sera remplacé par le fichier officiel dès que le client le fournit (`src/components/brand/Logo.tsx`).
- Les photos de Valentin viennent de moi. La femme à la tablette (banque d'images) sert dans les accueils gardés en réserve ; `personne-telephone.webp` reste aussi dans le dossier. Toutes sont détourées dans `public/images/v3/`.
- En attente de ma part : les dates à vérifier dans le diaporama (« IA & Marketing Digital » datée du 20 décembre 2026, l'ordre de CONNECT II et « Acte II », les années des sessions de mars et du 31 janvier) et les noms de trois logos (la goutte, les cauris, l'arobase), laissés vides pour l'instant.
- Les photos des formations (`public/images/formations/`) et des interfaces (`public/images/ui/`) viennent de la banque d'images et d'Unsplash : des personnes qui ressemblent au public de VALO, une photo par formation, sans doublon. « Pourquoi VALO », sur la page À propos, montre la vraie équipe (`public/images/apropos/equipe-casquettes.webp`) ; les photos de l'équipe et du terrain sont dans `public/images/apropos/` et `public/images/terrain/`.
- Une seule famille d'icônes pour tout le site : Tabler (`src/components/ui/Icons.tsx`), pas d'icônes dessinées à la main. Depuis le 7 octobre 2026, plus d'icônes décoratives dans les sections (portes des besoins, solutions, piliers, compétences, choix du formulaire) : elles faisaient « site IA ». Restent les flèches, la fermeture, le contact, les réseaux et les petites interfaces.
- Formulaires plutôt que WhatsApp (choix de VALO, 7 octobre 2026) : chaque « Parlons de votre projet » et « Discutons de votre besoin » ouvre, dans le panneau des offres, le choix « Commander une prestation » ou « M'inscrire à une formation » ; les boutons des offres et des formations ouvrent directement le bon formulaire, l'offre déjà choisie. Prestation : la prestation (dont « Je ne sais pas encore »), où en est la personne en un clic, son projet en quelques mots (facultatif), nom, entreprise ou activité, WhatsApp, e-mail (facultatif). Formation : la formation et son tarif, « Vous êtes » en un clic, ses attentes (facultatif), nom, WhatsApp, e-mail (facultatif). Confirmation de Charifa : « L'équipe VALO DIGITAL vous recontacte dans les prochaines heures. » (`Demande.tsx`, textes `demande` dans `content.ts`). Les demandes passent par `/api/demande`, qui les vérifie puis les transmet au Google Sheet de VALO (script Google Apps Script) dont l'adresse et la clé sont dans les variables Vercel `DEMANDES_WEBHOOK_URL` et `DEMANDES_WEBHOOK_TOKEN`, jamais dans le code. Tant qu'il n'est pas branché, les aperçus montrent la confirmation sans rien enregistrer, et le vrai site affiche une erreur : ne pas publier avant de l'avoir branché. Un champ invisible et un délai minimum écartent les robots.

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
