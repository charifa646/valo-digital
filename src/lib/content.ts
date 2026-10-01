/**
 * The site's words, exactly as in « VALO COPYWRITING + STRUCTURE » (the
 * Copywriting part for the text, the Structure part for the order). The
 * details behind « Découvrir les offres », « En savoir plus » and « Voir toutes
 * les formations » come from the client's catalogue, accents restored.
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
 * lights up while one of its sections is on screen.
 */
export const nav = typeset([
  { id: "prestations", label: "Services", sections: ["prestations", "solutions"] },
  { id: "formations", label: "Formations", sections: ["formations"] },
  { id: "methode", label: "À propos", sections: ["methode", "pourquoi", "fondateur"] },
  { id: "contact", label: "Contact", sections: ["contact"] },
]);

export const hero = typeset({
  title: ["Faites du digital un véritable", "levier de croissance."],
  lead: "VALO DIGITAL accompagne les entrepreneurs et entreprises dans leur marketing, leur acquisition et leur développement.",
  cta: "Parlons de votre projet",
  tags: ["Marketing", "Publicité", "Vente", "Formation"],
});

/**
 * « Ils nous ont fait confiance »: the clients' logos, given by Charifa (files in
 * public/images/clients/). The band stays hidden until there is at least one.
 */
export type ClientLogo = { name: string; src: string; width: number; height: number };
export const confiance = typeset({
  title: "Ils nous ont fait confiance",
  logos: [] as ClientLogo[],
});

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
