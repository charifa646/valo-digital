/**
 * The site's words, exactly as in « VALO COPYWRITING + STRUCTURE » (the
 * Copywriting part for the text, the Structure part for the order). The
 * details behind « Découvrir les offres », « En savoir plus » and « Voir toutes
 * les formations » come from the client's catalogue, accents restored. The
 * figures, the references, the founder's story, the team and the events come
 * from the client's portfolio (« PORTFOLIO VALO », 2026), spelling restored.
 * Nothing here is invented: no figures, testimonials or promises.
 */

/** French typography: narrow spaces before ? ! ; and inside « », no break inside prices. */
const fr = (s: string) =>
  s
    .replace(/ ([?!;»])/g, " $1")
    .replace(/« /g, "« ")
    .replace(/ :/g, " :")
    .replace(/(\d) (\d{3})/g, "$1 $2")
    .replace(/ F CFA/g, " F CFA")
    .replace(/ \/ /g, " / ")
    .replace(/(\d) ([a-zà-ÿ])/g, "$1 $2");

function typeset<T>(v: T): T {
  if (typeof v === "string") return fr(v) as T;
  if (Array.isArray(v)) return v.map(typeset) as T;
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, typeset(x)])) as T;
  return v;
}

export const contact = typeset({
  name: "Gueswendyam Valentin WAONGO",
  phone: "+226 54 27 77 52",
  phoneHref: "tel:+22654277752",
  whatsapp: "22654277752",
  email: "contact@valodigitalbf.com",
  address: "Wemtenga, Ouagadougou",
  mapHref: "https://www.google.com/maps/search/?api=1&query=Wemtenga%2C%20Ouagadougou",
});

/**
 * The menu: four plain entries, then « Parlons de votre projet ». Each entry
 * lights up while one of its sections is on screen; « À propos » is a page of
 * its own (/a-propos) and lights up there.
 */
export type NavItem = { id: string; label: string; sections: string[]; href?: string };
export const nav: NavItem[] = typeset([
  { id: "prestations", label: "Services", sections: ["prestations", "solutions"] },
  { id: "formations", label: "Formations", sections: ["formations"] },
  { id: "a-propos", label: "À propos", sections: [], href: "/a-propos" },
  { id: "contact", label: "Contact", sections: ["contact"] },
]);

export const hero = typeset({
  title: ["Faites du digital un véritable", "levier de croissance."],
  lead: "VALO DIGITAL accompagne les entrepreneurs et entreprises dans leur marketing, leur acquisition et leur développement.",
  cta: "Parlons de votre projet",
  tags: ["Marketing", "Publicité", "Vente", "Formation"],
});

/**
 * « Ils nous ont fait confiance »: the clients' logos, from the portfolio's own
 * page of references (files in public/images/clients/). Three names are not
 * written on their logo yet: the alt text falls back to « Client de VALO DIGITAL ».
 */
export type ClientLogo = { name: string; src: string; width: number; height: number };
export const confiance = typeset({
  title: "Ils nous ont fait confiance",
  logos: [
    { name: "Ministère des Sports, de la Jeunesse et de l’Emploi", src: "/images/clients/msje.webp", width: 279, height: 320 },
    { name: "SONABEL", src: "/images/clients/sonabel.webp", width: 320, height: 246 },
    { name: "Simplon Burkina Faso", src: "/images/clients/simplon.webp", width: 320, height: 92 },
    { name: "CAGEFIC", src: "/images/clients/cagefic.webp", width: 320, height: 301 },
    { name: "Elite Afrique", src: "/images/clients/elite-afrique.webp", width: 445, height: 198 },
    { name: "Faso Télécom", src: "/images/clients/faso-telecom.webp", width: 320, height: 180 },
    { name: "Tiligre Agro SARL", src: "/images/clients/tiligre.webp", width: 320, height: 320 },
    { name: "Winner Professional School", src: "/images/clients/winner.webp", width: 293, height: 320 },
    { name: "Les Gais Lurons", src: "/images/clients/gais-lurons.webp", width: 311, height: 320 },
    { name: "", src: "/images/clients/goutte.webp", width: 258, height: 320 },
    { name: "", src: "/images/clients/cauris.webp", width: 315, height: 320 },
    { name: "Bee Management", src: "/images/clients/bee-management.webp", width: 320, height: 288 },
    { name: "Les Petites Élites", src: "/images/clients/petites-elites.webp", width: 301, height: 320 },
    { name: "P’tits Chérubins", src: "/images/clients/ptits-cherubins.webp", width: 320, height: 290 },
    { name: "Reliant Livraison", src: "/images/clients/reliant-livraison.webp", width: 320, height: 280 },
    { name: "SavonEKO", src: "/images/clients/savoneko.webp", width: 286, height: 271 },
    { name: "Les Écoles Marie Rose", src: "/images/clients/emr.webp", width: 320, height: 164 },
    { name: "École maternelle bilingue Le Nid des Tout-Petits", src: "/images/clients/nid-des-tout-petits.webp", width: 320, height: 320 },
    { name: "E.S.A.F Zoignandé", src: "/images/clients/esaf.webp", width: 320, height: 204 },
    { name: "SmartSank", src: "/images/clients/smartsank.webp", width: 320, height: 290 },
    { name: "Complexe scolaire Les Héritiers du Savoir", src: "/images/clients/heritiers-du-savoir.webp", width: 320, height: 299 },
    { name: "Cosmos Management", src: "/images/clients/cosmos.webp", width: 320, height: 255 },
    { name: "Wend Yiida Négoce", src: "/images/clients/wend-yiida.webp", width: 320, height: 186 },
    { name: "Carrefour du Schengen", src: "/images/clients/carrefour-schengen.webp", width: 293, height: 320 },
    { name: "MysterH, les vins du Burkina", src: "/images/clients/mysterh.webp", width: 320, height: 277 },
    { name: "Prestige Hair", src: "/images/clients/prestige-hair.webp", width: 320, height: 218 },
    { name: "Le Paradis des Bout’chou", src: "/images/clients/paradis-des-boutchou.webp", width: 320, height: 211 },
    { name: "", src: "/images/clients/arobase.webp", width: 320, height: 320 },
    { name: "SETECK, Salon de l’entrepreneuriat technologique de Koudougou", src: "/images/clients/seteck.webp", width: 320, height: 229 },
    { name: "Espace Soleo", src: "/images/clients/espace-soleo.webp", width: 320, height: 293 },
    { name: "L’univers de Moli", src: "/images/clients/univers-de-moli.webp", width: 320, height: 320 },
    { name: "ISPPI, Institut supérieur privé des professions immobilières", src: "/images/clients/isppi.webp", width: 320, height: 287 },
    { name: "NebSond Shop", src: "/images/clients/nebsond.webp", width: 320, height: 135 },
    { name: "Chez Zaza", src: "/images/clients/chez-zaza.webp", width: 320, height: 316 },
    { name: "Hôriyombo Agrobusiness", src: "/images/clients/horiyombo.webp", width: 320, height: 320 },
    { name: "Ferme African Dream", src: "/images/clients/ferme-african-dream.webp", width: 318, height: 320 },
    { name: "Green Star Bio", src: "/images/clients/green-star-bio.webp", width: 320, height: 268 },
  ] as ClientLogo[],
  mission: "Notre mission est d’accompagner dans la ==croissance digitale== des entreprises africaines.",
});

/** The figures of the portfolio (« Mon parcours digital », « Qui suis-je ? »), in its own words. */
export type Figure = { pre?: string; value: string; text: string; count?: number };
export const chiffres: Figure[] = typeset([
  { pre: "Depuis", value: "2022", text: "auprès des entrepreneurs, PME, institutions publiques, ONG et écoles d’Afrique de l’Ouest" },
  { value: "+1000", count: 1000, text: "entrepreneurs formés et accompagnés aux métiers du digital" },
  { value: "+100", count: 100, text: "projets digitaux accompagnés au lancement" },
]);

export type Door = { id: string; name: string; text: string; target: string };

export const needs = typeset({
  label: "UNE SOLUTION SELON VOTRE BESOIN",
  title: "De quoi avez-vous besoin aujourd’hui ?",
  doors: [
    { id: "apprendre", name: "APPRENDRE", text: "Développez vos compétences avec des formations pratiques.", target: "formations" },
    { id: "comprendre", name: "COMPRENDRE", text: "Identifiez ce qui bloque et repartez avec un plan d’action.", target: "diagnostic" },
    { id: "deleguer", name: "DÉLÉGUER", text: "Confiez votre marketing et votre présence digitale à une équipe.", target: "prestations" },
    { id: "accelerer", name: "ACCÉLÉRER", text: "Structurez votre activité et faites avancer votre croissance.", target: "accompagnement" },
  ] as Door[],
  cta: "Découvrir nos solutions",
});

export type SheetId = "reseaux" | "publicite" | "video" | "diagnostic" | "accompagnement" | "formations";

export type Offer = {
  id: string;
  name: string;
  text: string;
  price: string;
  note?: string;
  link: string;
  sheet?: SheetId;
};

export const prestations = typeset({
  label: "PRESTATIONS",
  title: "Vous préférez déléguer ?",
  lead: "Des solutions digitales pensées pour développer votre visibilité, votre acquisition et vos ventes.",
  offers: [
    {
      id: "reseaux",
      name: "Gestion des réseaux sociaux",
      text: "Une présence professionnelle, régulière et pensée pour votre activité.",
      price: "À partir de 80 000 F CFA / mois",
      link: "Découvrir les offres",
      sheet: "reseaux",
    },
    {
      id: "publicite",
      name: "Publicité Facebook & Instagram",
      text: "Des campagnes conçues pour générer visibilité, prospects ou ventes.",
      price: "À partir de 100 000 F CFA",
      note: "Hors budget publicitaire",
      link: "En savoir plus",
      sheet: "publicite",
    },
    {
      id: "video",
      name: "Content vidéo",
      text: "Transformez vos idées, votre expertise et vos offres en contenus vidéo adaptés aux réseaux sociaux.",
      price: "À partir de 80 000 F CFA / 4 vidéos",
      link: "Découvrir",
      sheet: "video",
    },
    {
      id: "direction",
      name: "Direction marketing externalisée",
      text: "Un pilotage marketing pour structurer, coordonner et accélérer votre croissance.",
      price: "À partir de 750 000 F CFA",
      link: "Parlons de votre projet",
    },
  ] as Offer[],
});

export type Formation = { id: string; name: string; tag?: string; price: string; format: string; modules: string };

export const formations = typeset({
  label: "FORMATIONS",
  title: ["Apprenez.", "Appliquez.", "Progressez."],
  lead: "Des formations pratiques pour développer les compétences qui font avancer votre activité.",
  items: [
    {
      id: "ads",
      name: "Facebook & Instagram Ads",
      price: "75 000 F CFA",
      format: "Formation pratique",
      modules: "Page Facebook, Meta Business Suite, Business Manager, ciblage, campagnes, budget, analyse et optimisation.",
    },
    {
      id: "vente",
      name: "Vente en ligne",
      price: "65 000 F CFA",
      format: "Formation pratique",
      modules: "Facebook, TikTok, WhatsApp Business, acquisition clients, contenus, messages de vente, tunnel WhatsApp.",
    },
    {
      id: "marketing",
      name: "Marketing digital",
      price: "65 000 F CFA",
      format: "Formation ou accompagnement",
      modules: "Stratégie digitale, positionnement, acquisition, contenu, réseaux sociaux, conversion, plan d’action.",
    },
    {
      id: "ia",
      name: "Intelligence artificielle pour le business",
      price: "65 000 F CFA",
      format: "Formation pratique",
      modules: "ChatGPT, création de contenus, recherche, productivité, prompts business, automatisation des tâches.",
    },
    {
      id: "contenu",
      name: "Création de contenu",
      price: "50 000 F CFA",
      format: "Formation pratique",
      modules: "Stratégie de contenu, idées, copywriting, visuels, vidéos, calendrier éditorial, contenu qui vend.",
    },
    {
      id: "cm",
      name: "Community management",
      price: "Tarif selon format",
      format: "Formation pratique",
      modules: "Stratégie réseaux sociaux, création, publication, animation, engagement, Meta Business Suite, reporting.",
    },
    {
      id: "cohorte",
      name: "Cohorte métiers du digital",
      tag: "2 mois",
      price: "150 000 F CFA",
      format: "2 mois",
      modules: "Community management, création de contenu, Facebook Ads, Canva, IA, vente en ligne, mise en pratique.",
    },
    {
      id: "prive",
      name: "Accompagnement privé",
      price: "50 000 à 100 000 F CFA",
      format: "Individuel",
      modules: "Diagnostic, stratégie, offre, acquisition, Facebook Ads, contenu, IA, plan d’action personnalisé.",
    },
  ] as Formation[],
  cta: "Voir toutes les formations",
  /** The catalogue's column names. */
  columns: { format: "Format", modules: "Modules principaux", price: "Tarif" },
});

export type Solution = { id: string; name: string; text: string; sheet: SheetId };

export const solutions = typeset({
  label: "SOLUTIONS SPÉCIALISÉES",
  title: "Besoin d’un accompagnement plus ciblé ?",
  items: [
    {
      id: "diagnostic",
      name: "DIAGNOSTIC DIGITAL",
      text: "Identifiez vos blocages et repartez avec des priorités claires et un plan d’action.",
      sheet: "diagnostic",
    },
    {
      id: "accompagnement",
      name: "ACCOMPAGNEMENT BUSINESS & CROISSANCE",
      text: "Structurez votre offre, votre acquisition, votre marketing et votre parcours de vente.",
      sheet: "accompagnement",
    },
    {
      id: "content-video",
      name: "CONTENT VIDÉO",
      text: "Des contenus pensés pour attirer l’attention et valoriser votre activité.",
      sheet: "video",
    },
  ] as Solution[],
  cta: "Discutons de votre besoin",
});

export const methode = typeset({
  label: "MÉTHODE VALO",
  title: ["Une méthode simple.", "Des actions concrètes."],
  steps: [
    { n: "01", name: "COMPRENDRE", text: "Partir de votre situation réelle." },
    { n: "02", name: "STRUCTURER", text: "Identifier les priorités et construire une stratégie claire." },
    { n: "03", name: "EXÉCUTER", text: "Mettre en œuvre les bonnes actions sur les bons canaux." },
    { n: "04", name: "OPTIMISER", text: "Mesurer, améliorer et faire progresser les résultats." },
  ],
});

export const pourquoi = typeset({
  label: "POURQUOI VALO",
  title: "Le digital ne se résume pas à être visible.",
  lead: "Nous vous aidons à transformer votre présence digitale en véritable levier pour votre activité.",
  pillars: [
    { name: "STRATÉGIE", text: "Des priorités adaptées à vos objectifs." },
    { name: "EXÉCUTION", text: "Des actions concrètes, pas seulement des recommandations." },
    { name: "CROISSANCE", text: "Une approche pensée pour la visibilité, l’acquisition et le développement." },
  ],
});

export const fondateur = typeset({
  label: "FONDATEUR",
  title: "Derrière VALO DIGITAL",
  name: "Gueswendyam Valentin WAONGO",
  roles: ["Consultant formateur aux métiers du digital", "Fondateur de VALO DIGITAL"],
  text: "VALO DIGITAL accompagne entrepreneurs, TPE, PME, équipes et institutions dans la structuration de leur présence digitale, l’acquisition de prospects et le développement des ventes.",
  /** Charifa's words: the button that opens the « À propos » page at the founder. */
  cta: "À propos du fondateur",
});

export const final = typeset({
  title: "Prêt à faire avancer votre activité ?",
  text: "Parlez-nous de votre projet, de vos objectifs et de vos enjeux.",
  cta: "Parlons de votre projet",
});

export const footer = typeset({
  name: "VALO DIGITAL",
  tagline: "Agence de croissance digitale",
  tags: ["Marketing", "Publicité", "Vente", "Formation"],
  copyright: "© VALO DIGITAL",
});

/* ---------------------------------------------------------------------------
 * The « À propos » page, from the portfolio. **…** marks the words the
 * portfolio sets in bold, ==…== the words it highlights in yellow.
 * ------------------------------------------------------------------------- */

export type Member = { name: string; role: string; photo: string };
export type Moment = { title: string; date: string; place?: string; note?: string; photo: string; width: number; height: number };

export const apropos = typeset({
  meta: "VALO DIGITAL, agence de marketing et de publicité digitale et centre de formation aux métiers du numérique, à Ouagadougou.",
  label: "À PROPOS",
  title: ["À propos de", "VALO DIGITAL"],
  intro: "VALO DIGITAL est une agence de marketing et de publicité digitale basée au Burkina Faso.",
  text: [
    "Nous aidons les entrepreneurs, PME et marques locales à accroître leur visibilité, structurer leur communication et augmenter leurs ventes grâce à des stratégies digitales performantes et adaptées au contexte africain.",
    "Nous sommes également un centre de formation aux métiers du numérique, spécialisé dans la montée en compétences des jeunes et des professionnels.",
  ],
  domaines: ["Stratégie", "Formation", "Campagnes", "Création de contenu"],
  base: "Ouagadougou (Wemtenga), Burkina Faso",
  photoAlt: "L’équipe de VALO DIGITAL",

  fondateur: {
    label: "FONDATEUR",
    title: "Qui suis-je ?",
    text: [
      "**Gueswendyam Valentin WAONGO** est le Fondateur et Directeur Stratégique de **VALO DIGITAL**, une **agence de croissance digitale** et un **centre de formation aux métiers du numérique** basés à Ouagadougou (Wemtenga), Burkina Faso. Il se positionne professionnellement comme **Consultant Formateur aux Métiers du Digital, Média Buyer et Spécialiste certifié en Facebook Ads.**",
      "**Autodidacte et praticien** de terrain, il accompagne depuis 2022 **les entrepreneurs, PME, institutions publiques, ONG et écoles** d’Afrique de l’Ouest dans leur **croissance digitale,** à travers des **stratégies publicitaires sur mesure, la gestion de leur présence en ligne et la formation pratique aux outils du marketing digital.**",
    ],
  },

  parcours: {
    label: "MON PARCOURS DIGITAL",
    text: "J’ai découvert internet ==en 2010==, je me suis formé dans plusieurs disciplines en ==autodidacte==. Aujourd’hui, j’ai formé et accompagné de 2022 à nos jours ==+1000 entrepreneurs== (débutants-confirmés) aux métiers du digital et ==accompagné au lancement de +100 projets digitaux==.",
  },

  competences: {
    label: "COMPÉTENCES",
    title: "Entre autres compétences que j’ai développées en autodidacte",
    items: [
      "Social Media Manager",
      "Community Manager",
      "Média Buying",
      "E-commerce",
      "Vente en ligne",
      "Publicité Facebook",
      "Copywriting",
      "Infographie",
      "Montage vidéo",
      "Intelligence artificielle",
      "Formateur",
    ],
  },

  equipe: {
    label: "ÉQUIPE",
    title: "Notre équipe",
    members: [
      { name: "Gueswendyam Valentin WAONGO", role: "Manager", photo: "/images/apropos/membre-valentin.webp" },
      { name: "Zourkaïnani Sankara", role: "Graphiste & Vidéaste", photo: "/images/apropos/membre-zourkainani.webp" },
      { name: "Bayala Bavilou", role: "Community Manager", photo: "/images/apropos/membre-bayala.webp" },
      { name: "Nema KOLOGO", role: "Community Manager", photo: "/images/apropos/membre-nema.webp" },
      { name: "Irène K Roussou", role: "Assistante administrative", photo: "/images/apropos/membre-irene.webp" },
    ] as Member[],
  },

  terrain: {
    label: "TERRAIN",
    title: "Quelques clichés de nos formations à succès",
    moments: [
      { title: "VALO DIGITAL CONNECT, Acte II", date: "31 janvier", place: "Sonia Hôtel, Ouagadougou", photo: "valo-connect-acte-2", width: 1100, height: 539 },
      {
        title: "Formation en marketing digital & IA",
        date: "14 mars 2026",
        place: "Gouvernement Jeunesse Burkina en partenariat avec Simplon Burkina Faso",
        photo: "simplon-ia",
        width: 869,
        height: 567,
      },
      {
        title: "Session de formation IA et marketing digital",
        date: "28 et 29 mars",
        place: "Bobo-Dioulasso",
        photo: "bobo-dioulasso",
        width: 733,
        height: 500,
      },
      {
        title: "Session de formation community management au profit des jeunes en reconversion",
        date: "13 au 20 mars",
        place: "Yam Pukri Nouvelles-Technologies, Ouagadougou",
        photo: "yam-pukri",
        width: 1100,
        height: 494,
      },
      {
        title: "Session de formation aux métiers du digital au profit des jeunes en reconversion",
        date: "19 au 20 mars",
        place: "Simplon Burkina Faso, Ouagadougou",
        photo: "simplon-reconversion",
        width: 915,
        height: 596,
      },
      {
        title: "IA & Marketing Digital",
        date: "20 décembre 2026",
        place: "Pavillon K1 de l’Université Joseph Ki-Zerbo",
        photo: "universite-ki-zerbo",
        width: 1100,
        height: 568,
      },
      {
        title: "Forum national d’insertion socio-professionnelle",
        date: "25 octobre 2025",
        place: "ISTAPEM",
        photo: "forum-insertion",
        width: 992,
        height: 753,
      },
      {
        title: "Stratégies de vente sur TikTok",
        date: "21 septembre 2025",
        place: "Maison de la femme de Ouagadougou",
        photo: "tiktok",
        width: 1100,
        height: 555,
      },
      { title: "VALO DIGITAL CONNECT II", date: "31 août 2025", place: "Stadium Bar", photo: "valo-connect-2", width: 648, height: 356 },
      {
        title: "Formation pratique, publicité digitale (Facebook et Instagram)",
        date: "18 juin 2025",
        place: "Cellule communication de la SONABEL",
        photo: "sonabel",
        width: 648,
        height: 486,
      },
      {
        title: "Programme ADA : Akili Digital Academy",
        date: "10 mai 2025",
        note: "Invité à la cérémonie de remise des attestations lors du meet-up de clôture.",
        photo: "akili",
        width: 890,
        height: 568,
      },
      { title: "Rendez-vous des vendeurs en ligne", date: "19 avril 2025", place: "Pacific Hôtel", photo: "vendeurs-en-ligne", width: 1002, height: 525 },
      { title: "Forum du Digital", date: "8 mars 2025", photo: "forum-du-digital", width: 576, height: 386 },
      {
        title: "Entreprendre au féminin",
        date: "1er mars 2025",
        place: "Maison de la femme de Ouagadougou",
        photo: "entreprendre-au-feminin",
        width: 1024,
        height: 633,
      },
      {
        title: "Projet de renforcement des capacités des incubés FICEL ACADEMY 2023, piloté par le cabinet CAGEFIC",
        date: "7 au 9 décembre 2024",
        place: "Ouagadougou",
        photo: "ficel-academy",
        width: 661,
        height: 536,
      },
      {
        title: "Formation en entrepreneuriat, marketing digital et e-commerce des cadres du Ministère des Sports, de la Jeunesse et de l’Emploi",
        date: "11 au 14 novembre 2024",
        place: "Kaya",
        photo: "kaya-msje",
        width: 1100,
        height: 499,
      },
      { title: "SETECK Koudougou", date: "1er novembre 2024", place: "Koudougou", photo: "seteck", width: 682, height: 497 },
      { title: "Formation en marketing digital", date: "10 mars 2024", place: "Koudougou", photo: "koudougou-marketing", width: 720, height: 480 },
    ] as Moment[],
  },

  references: { label: "RÉFÉRENCES" },
});

/* ---------------------------------------------------------------------------
 * Details from the catalogue, opened in a panel so the page stays light.
 * ------------------------------------------------------------------------- */

export type Formule = { name: string; for: string; pitch: string; points: string[]; price: string };
export type Detail = { title: string; for?: string; pitch?: string; points?: string[]; price?: string; formules?: Formule[] };

export const detailLabels = typeset({ for: "Pour qui" });

export const details: Record<Exclude<SheetId, "formations">, Detail> = typeset({
  reseaux: {
    title: "Gestion des réseaux sociaux",
    formules: [
      {
        name: "Offre Standard",
        for: "Entreprises souhaitant être régulières",
        pitch: "Pour maintenir une présence professionnelle et régulière.",
        points: [
          "Stratégie éditoriale de base",
          "Calendrier de contenu",
          "Publications régulières",
          "Création de visuels",
          "Animation et modération",
          "Suivi mensuel",
        ],
        price: "À partir de 80 000 F CFA / mois",
      },
      {
        name: "Offre Business",
        for: "Entreprises en développement",
        pitch: "Pour transformer les réseaux sociaux en outil de communication et d’acquisition.",
        points: [
          "Audit et stratégie digitale",
          "Calendrier éditorial",
          "Création de contenus",
          "Visuels professionnels et contenus vidéo",
          "Programmation, animation et modération",
          "Reporting mensuel",
        ],
        price: "À partir de 150 000 F CFA / mois",
      },
      {
        name: "Offre Premium Growth",
        for: "Entreprises ambitieuses",
        pitch: "Pour soutenir la croissance avec une gestion complète et optimisée.",
        points: [
          "Stratégie digitale",
          "Gestion complète des réseaux sociaux",
          "Production de contenus vidéo",
          "Community management",
          "Publicité Facebook et Instagram",
          "Reporting stratégique et optimisation continue",
        ],
        price: "À partir de 300 000 F CFA / mois",
      },
    ],
  },
  publicite: {
    title: "Publicité Facebook & Instagram",
    for: "Entreprises souhaitant acquérir",
    pitch: "Générer plus de visibilité, de prospects ou de ventes avec des campagnes pilotées.",
    points: [
      "Audit du compte publicitaire",
      "Stratégie publicitaire",
      "Définition des objectifs",
      "Ciblage",
      "Création et paramétrage des campagnes",
      "Suivi, optimisation et reporting",
    ],
    price: "À partir de 100 000 F CFA hors budget publicitaire",
  },
  video: {
    title: "Content vidéo",
    for: "Marques, experts, entreprises",
    pitch: "Transformer l’expertise, les produits et les offres en vidéos adaptées aux réseaux sociaux.",
    points: ["Recherche d’idées", "Stratégie de contenu", "Scripts", "Tournage ou production", "Montage et sous-titrage", "Adaptation aux plateformes"],
    price: "À partir de 80 000 F CFA pour 4 vidéos",
  },
  diagnostic: {
    title: "Diagnostic digital",
    for: "TPE, PME, entrepreneurs",
    pitch: "Comprendre pourquoi la présence digitale ne produit pas suffisamment de résultats.",
    points: [
      "Analyse du positionnement",
      "Analyse de l’offre",
      "Audit des réseaux sociaux et contenus",
      "Analyse de l’acquisition et du parcours client",
      "Recommandations prioritaires",
      "Plan d’action personnalisé",
    ],
    price: "150 000 F CFA",
  },
  accompagnement: {
    title: "Accompagnement business & croissance",
    for: "Dirigeants et entrepreneurs",
    pitch: "Accompagner les dirigeants dans la construction et la mise en œuvre de leur stratégie.",
    points: [
      "Positionnement et offre",
      "Acquisition et marketing",
      "Contenu et publicité",
      "Vente et parcours client",
      "KPI et plan d’action",
      "Optimisation continue",
    ],
    price: "À partir de 150 000 F CFA",
  },
});
