/**
 * VALO DIGITAL : le CRM de VALO. Reçoit les demandes du site dans un Google Sheet mis en forme (tableau de bord, onglet
 * « Prestations », onglet « Formations », un statut par demande) et envoie un courriel aux couleurs de VALO à chaque demande.
 *
 * DEUX FAÇONS DE LE METTRE EN PLACE (une seule suffit)
 *
 * A. Depuis le Sheet : dans le Google Sheet de VALO, menu Extensions > Apps Script. Remplacez tout le code par celui-ci
 *    et laissez ID_DU_SHEET vide.
 *
 * B. Sans passer par le Sheet (si « Extensions > Apps Script » affiche « Page introuvable ») : ouvrez
 *    https://script.google.com avec le compte Google qui possède le Sheet (le plus sûr : une fenêtre de navigation privée
 *    où vous ne vous connectez qu'à ce compte), cliquez « Nouveau projet », remplacez tout le code par celui-ci, et collez
 *    dans ID_DU_SHEET l'identifiant du Sheet : la longue suite de lettres et de chiffres de son adresse, entre « /d/ » et
 *    « /edit ». Vous pouvez aussi y coller l'adresse entière du Sheet : le script en sort l'identifiant.
 *
 * PUIS, DANS LES DEUX CAS
 * 1. Remplacez CLE par un mot de passe long et unique (20 caractères ou plus, sans espace). Gardez-le : le site en a besoin.
 * 2. Déployer > Nouveau déploiement > roue dentée « Sélectionner le type » > Application Web > Exécuter en tant que : Moi >
 *    Qui a accès : Tout le monde > Déployer. Google demande une autorisation : choisissez votre compte, « Paramètres
 *    avancés », « Accéder à ... (non sécurisé) », « Autoriser ». Cet avertissement est normal pour un script qu'on a écrit
 *    soi-même. Copiez l'« URL de l'application Web » qui se termine par /exec.
 * 3. Dans Vercel (projet valo-digital > Settings > Environment Variables) : DEMANDES_WEBHOOK_URL = cette adresse,
 *    DEMANDES_WEBHOOK_TOKEN = la clé. Puis Deployments > Redeploy.
 *
 * POUR METTRE À JOUR UN SCRIPT DÉJÀ EN LIGNE : gardez votre CLE et votre ID_DU_SHEET, remplacez le reste du code, puis
 * Déployer > Gérer les déploiements > crayon > Version : « Nouvelle version » > Déployer. L'adresse /exec ne change pas :
 * rien à toucher dans Vercel.
 *
 * LE CRM. Au premier envoi (ou en lançant la fonction « mettreEnForme » depuis l'éditeur), le script crée et habille trois
 * onglets : « Tableau de bord », « Prestations » et « Formations ». Chaque demande arrive en haut de son onglet avec le
 * statut « Nouveau » ; on le change dans la première colonne (liste déroulante colorée) et le tableau de bord se met à
 * jour tout seul. La colonne « Notes » est libre. Un onglet qui existait déjà avec une autre disposition n'est pas
 * effacé : il est renommé « Ancien ... (à supprimer) ». Si la mise en forme échoue pour une raison quelconque, la demande
 * est quand même enregistrée et le courriel part quand même.
 *
 * Le courriel part à l'adresse du compte Google qui a créé le script, et à EMAIL_EN_PLUS si vous en mettez une. Regardez
 * les courriers indésirables au premier envoi et marquez-le « pas un spam ». Ouvrir l'adresse /exec dans un navigateur
 * affiche {"ok":true} : le script est bien en ligne.
 * Ce fichier ne contient aucun secret : la clé ci-dessous est à remplacer, jamais à publier.
 */
const CLE = "REMPLACEZ-MOI-PAR-UNE-CLE-LONGUE";
const ID_DU_SHEET = ""; // laissez vide si le script est ouvert depuis le Sheet (façon A) ; sinon, l'identifiant du Sheet (façon B)
const EMAIL_EN_PLUS = ""; // une adresse de plus qui reçoit aussi chaque demande (par exemple contact@votredomaine) ; vide : le compte Google du script suffit

const FUSEAU = "Africa/Ouagadougou"; // l'heure affichée dans le Sheet et dans les courriels
const FORMAT_DATE = "dd/MM/yyyy HH:mm";
const VERSION_FORME = "6"; // à changer quand on modifie la mise en forme : le script la refait une fois
const NOM_TABLEAU = "Tableau de bord";
const LIGNES = 1000; // lignes mises en forme d'avance dans chaque onglet

// la charte de VALO : bleu électrique #0714D8, jaune #FDEC05, marine #071F78, nuit #040B52
const C = {
  bleu: "#0714D8",
  marine: "#071F78",
  nuit: "#040B52",
  jaune: "#FDEC05",
  texte: "#1B2352",
  discret: "#6B7299",
  trait: "#E3E6F4",
  bande: "#F5F6FD",
  tuile: "#EEF0FF",
  fond: "#EEF0FA",
  blanc: "#FFFFFF",
};

const STATUTS = [
  { nom: "Nouveau", fond: "#DDE2FF", texte: "#0714D8" },
  { nom: "Contacté", fond: "#FFF3A8", texte: "#6B5700" },
  { nom: "Devis envoyé", fond: "#D3E3FF", texte: "#071F78" },
  { nom: "Gagné", fond: "#D5F2DF", texte: "#14703A" },
  { nom: "Perdu", fond: "#E9EAF1", texte: "#5A6180" },
];

// les colonnes de chaque onglet : « cle » dit quelle information du site y va, « l » est la largeur en pixels
const ONGLETS = {
  Prestation: {
    nom: "Prestations",
    colonnes: [
      { cle: "statut", titre: "Statut", l: 132 },
      { cle: "date", titre: "Reçue le", l: 138 },
      { cle: "nom", titre: "Nom", l: 190 },
      { cle: "entreprise", titre: "Entreprise", l: 190 },
      { cle: "whatsapp", titre: "WhatsApp", l: 150 },
      { cle: "email", titre: "E-mail", l: 220 },
      { cle: "choix", titre: "Offre choisie", l: 270 },
      { cle: "situation", titre: "Situation", l: 250 },
      { cle: "projet", titre: "Objectif", l: 400 },
      { cle: "notes", titre: "Notes", l: 280 },
      { cle: "page", titre: "Page d'origine", l: 150 },
    ],
  },
  Formation: {
    nom: "Formations",
    colonnes: [
      { cle: "statut", titre: "Statut", l: 132 },
      { cle: "date", titre: "Reçue le", l: 138 },
      { cle: "nom", titre: "Nom", l: 190 },
      { cle: "whatsapp", titre: "WhatsApp", l: 150 },
      { cle: "email", titre: "E-mail", l: 220 },
      { cle: "choix", titre: "Formation choisie", l: 270 },
      { cle: "situation", titre: "Profil", l: 160 },
      { cle: "projet", titre: "Situation et objectif", l: 400 },
      { cle: "notes", titre: "Notes", l: 280 },
      { cle: "page", titre: "Page d'origine", l: 150 },
    ],
  },
};

function doGet() {
  return sortie_(true);
}

function doPost(e) {
  const verrou = LockService.getScriptLock();
  try {
    const d = JSON.parse(e.postData.contents);
    if (!CLE || CLE.indexOf("REMPLACEZ") === 0 || d.token !== CLE) return sortie_(false);
    verrou.waitLock(10000);

    const classeur = ouvrir_();
    const def = d.type === "Formation" ? ONGLETS.Formation : ONGLETS.Prestation;
    const feuilles = preparer_(classeur, false);
    const feuille = feuilles[def.nom];
    const quand = new Date(d.date);
    const date = isNaN(quand.getTime()) ? new Date() : quand;

    // 1. l'essentiel : la demande est écrite en haut de l'onglet, en texte brut (un message qui commencerait par = ou +
    //    ne devient jamais une formule)
    feuille.insertRowAfter(1);
    const n = def.colonnes.length;
    const ligne = feuille.getRange(2, 1, 1, n);
    ligne.setNumberFormats([def.colonnes.map(function (c) { return c.cle === "date" ? FORMAT_DATE : "@"; })]);
    ligne.setValues([def.colonnes.map(function (c) { return valeur_(c.cle, d, date); })]);

    // 2. la mise en forme de la ligne : si elle échoue, la demande est déjà là
    try {
      habillerLigne_(feuille, def, d);
    } catch (erreurForme) {}

    // 3. le courriel : s'il échoue, la demande est déjà dans le Sheet
    try {
      prevenir_(classeur, feuille, def, d, date);
    } catch (erreurCourriel) {}

    return sortie_(true);
  } catch (erreur) {
    return sortie_(false);
  } finally {
    try {
      verrou.releaseLock();
    } catch (x) {}
  }
}

// à lancer depuis l'éditeur (menu « Exécuter ») pour voir tout de suite le CRM, sans attendre une première demande
function mettreEnForme() {
  preparer_(ouvrir_(), true, true);
}

function ouvrir_() {
  return ID_DU_SHEET.trim() ? SpreadsheetApp.openById(identifiant_(ID_DU_SHEET)) : SpreadsheetApp.getActiveSpreadsheet();
}

// l'identifiant du Sheet, qu'on ait collé l'identifiant seul ou l'adresse entière du Sheet
function identifiant_(texte) {
  const t = String(texte).trim();
  const m = /\/d\/([a-zA-Z0-9_-]+)/.exec(t);
  return m ? m[1] : t;
}

function sortie_(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok })).setMimeType(ContentService.MimeType.JSON);
}

function valeur_(cle, d, date) {
  if (cle === "statut") return STATUTS[0].nom;
  if (cle === "date") return date;
  if (cle === "notes") return "";
  return String(d[cle] == null ? "" : d[cle]);
}

// ---------- les onglets ----------

// les trois onglets : créés au besoin (l'essentiel), puis habillés une fois par version de mise en forme (le décor)
function preparer_(classeur, forcer, strict) {
  const feuilles = {};
  Object.keys(ONGLETS).forEach(function (k) {
    feuilles[ONGLETS[k].nom] = onglet_(classeur, ONGLETS[k]);
  });
  try {
    const tableau = classeur.getSheetByName(NOM_TABLEAU) || classeur.insertSheet(NOM_TABLEAU);
    let refait = false;
    if (forcer || !aJour_(tableau)) {
      habillerTableau_(classeur, tableau);
      marquer_(tableau);
      refait = true;
    }
    Object.keys(ONGLETS).forEach(function (k) {
      const f = feuilles[ONGLETS[k].nom];
      if (forcer || !aJour_(f)) {
        habillerOnglet_(classeur, f, ONGLETS[k]);
        marquer_(f);
        refait = true;
      }
    });
    if (refait) ranger_(classeur, tableau, feuilles);
  } catch (erreurForme) {
    // en automatique, un décor qui échoue ne doit jamais bloquer une demande ; à la main, on veut voir l'erreur
    if (strict) throw erreurForme;
  }
  return feuilles;
}

// l'onglet de ce nom ; s'il existait avec une autre disposition (avant le CRM), il est mis de côté, pas effacé
function onglet_(classeur, def) {
  let f = classeur.getSheetByName(def.nom);
  if (f && f.getLastRow() > 0 && String(f.getRange(1, 1).getValue()) !== def.colonnes[0].titre) {
    let nom = "Ancien " + def.nom + " (à supprimer)";
    for (let i = 2; classeur.getSheetByName(nom); i++) nom = "Ancien " + def.nom + " " + i + " (à supprimer)";
    f.setName(nom);
    f = null;
  }
  if (!f) f = classeur.insertSheet(def.nom);
  if (f.getLastRow() === 0) {
    f.getRange(1, 1, 1, def.colonnes.length).setNumberFormat("@").setValues([def.colonnes.map(function (c) { return c.titre; })]);
  }
  return f;
}

function aJour_(f) {
  try {
    return f.getDeveloperMetadata().some(function (m) {
      return m.getKey() === "valo_forme" && m.getValue() === VERSION_FORME;
    });
  } catch (x) {
    return false;
  }
}

function marquer_(f) {
  try {
    f.getDeveloperMetadata().forEach(function (m) {
      if (m.getKey() === "valo_forme") m.remove();
    });
    f.addDeveloperMetadata("valo_forme", VERSION_FORME);
  } catch (x) {}
}

function ranger_(classeur, tableau, feuilles) {
  [tableau, feuilles[ONGLETS.Prestation.nom], feuilles[ONGLETS.Formation.nom]].forEach(function (f, i) {
    f.activate();
    classeur.moveActiveSheet(i + 1);
  });
  tableau.activate();
}

// ---------- la mise en forme d'un onglet de demandes ----------

function habillerOnglet_(classeur, f, def) {
  try {
    classeur.setSpreadsheetTimeZone(FUSEAU);
  } catch (x) {}
  const n = def.colonnes.length;
  if (f.getMaxRows() < LIGNES) f.insertRowsAfter(f.getMaxRows(), LIGNES - f.getMaxRows());
  if (f.getMaxColumns() > n) f.deleteColumns(n + 1, f.getMaxColumns() - n);
  if (f.getMaxColumns() < n) f.insertColumnsAfter(f.getMaxColumns(), n - f.getMaxColumns());

  f.setHiddenGridlines(true);
  f.setTabColor(C.bleu);
  f.setFrozenRows(1);
  f.setFrozenColumns(3);
  def.colonnes.forEach(function (c, i) {
    f.setColumnWidth(i + 1, c.l);
  });

  // le corps : police du site, texte marine, centré en hauteur, retour à la ligne
  f.getRange(2, 1, LIGNES - 1, n)
    .setFontFamily("Montserrat")
    .setFontSize(10)
    .setFontColor(C.texte)
    .setVerticalAlignment("middle")
    .setHorizontalAlignment("left")
    .setWrap(true)
    .setBorder(null, null, true, null, null, null, C.trait, SpreadsheetApp.BorderStyle.SOLID);

  // la ligne de titres : bleu électrique, texte blanc (le texte est réécrit à chaque refonte : un titre renommé suit)
  f.getRange(1, 1, 1, n).setNumberFormat("@").setValues([def.colonnes.map(function (c) { return c.titre; })]);
  f.setRowHeight(1, 46);
  f.getRange(1, 1, 1, n)
    .setBackground(C.bleu)
    .setFontFamily("Montserrat")
    .setFontSize(10)
    .setFontWeight("bold")
    .setFontColor(C.blanc)
    .setVerticalAlignment("middle")
    .setHorizontalAlignment("left")
    .setWrap(false);
  f.getRange(1, 1).setHorizontalAlignment("center");

  // le statut : liste déroulante, au centre, en gras
  const regle = SpreadsheetApp.newDataValidation()
    .requireValueInList(
      STATUTS.map(function (s) { return s.nom; }),
      true
    )
    .setAllowInvalid(false)
    .build();
  f.getRange(2, 1, LIGNES - 1, 1).setDataValidation(regle).setHorizontalAlignment("center").setFontWeight("bold");

  f.setConditionalFormatRules(regles_(f, n));
}

// les couleurs : un fond par statut, le nom en bleu et en gras tant que la demande est « Nouveau », une ligne sur deux très
// claire. Réappliquées à chaque demande : l'insertion en ligne 2 décale les plages des règles, la ligne neuve en sortirait
function regles_(f, n) {
  const h = Math.max(LIGNES, f.getMaxRows()) - 1;
  const regles = STATUTS.map(function (s) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(s.nom)
      .setBackground(s.fond)
      .setFontColor(s.texte)
      .setBold(true)
      .setRanges([f.getRange(2, 1, h, 1)])
      .build();
  });
  regles.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$A2="' + STATUTS[0].nom + '"')
      .setFontColor(C.bleu)
      .setBold(true)
      .setRanges([f.getRange(2, 3, h, 1)])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=ISEVEN(ROW())*($C2<>"")')
      .setBackground(C.bande)
      .setRanges([f.getRange(2, 1, h, n)])
      .build()
  );
  return regles;
}

// la ligne qui vient d'arriver (ligne 2) : même mise en forme que le reste, liens cliquables, hauteur à la mesure du texte
function habillerLigne_(f, def, d) {
  const n = def.colonnes.length;
  const r = f.getRange(2, 1, 1, n);
  r.setBackground(null)
    .setFontFamily("Montserrat")
    .setFontSize(10)
    .setFontColor(C.texte)
    .setFontWeight("normal")
    .setFontStyle("normal")
    .setFontLine("none")
    .setVerticalAlignment("middle")
    .setHorizontalAlignment("left")
    .setWrap(true)
    .setBorder(null, null, true, null, null, null, C.trait, SpreadsheetApp.BorderStyle.SOLID);
  const statut = f.getRange(2, 1);
  statut.setHorizontalAlignment("center").setFontWeight("bold");
  statut.setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(
        STATUTS.map(function (s) { return s.nom; }),
        true
      )
      .setAllowInvalid(false)
      .build()
  );

  def.colonnes.forEach(function (c, i) {
    if (c.cle !== "whatsapp" && c.cle !== "email") return;
    const texte = String(d[c.cle] == null ? "" : d[c.cle]);
    const lien = c.cle === "whatsapp" ? lienWhatsApp_(texte) : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texte) ? "mailto:" + texte : "";
    if (texte && lien) f.getRange(2, i + 1).setRichTextValue(SpreadsheetApp.newRichTextValue().setText(texte).setLinkUrl(lien).build());
  });

  f.setConditionalFormatRules(regles_(f, n));

  f.setRowHeight(2, 56);
  try {
    f.autoResizeRows(2, 1);
    if (f.getRowHeight(2) < 56) f.setRowHeight(2, 56);
  } catch (x) {}
}

// ---------- le tableau de bord ----------

function habillerTableau_(classeur, f) {
  f.clear();
  f.clearConditionalFormatRules();
  f.setHiddenGridlines(true);
  f.setTabColor(C.jaune);
  // étalé sur la largeur d'un écran d'ordinateur portable (environ 1 300 pixels utiles) ; les colonnes au-delà restent
  // blanches (quadrillage masqué) au lieu de laisser la zone grise de fin de feuille sur les grands écrans
  if (f.getMaxRows() < 24) f.insertRowsAfter(f.getMaxRows(), 24 - f.getMaxRows());
  if (f.getMaxColumns() < 20) f.insertColumnsAfter(f.getMaxColumns(), 20 - f.getMaxColumns());
  f.setColumnWidth(1, 36);
  [2, 3, 4, 5].forEach(function (c) {
    f.setColumnWidth(c, 300);
  });
  f.setColumnWidth(6, 36);
  f.getRange(1, 1, f.getMaxRows(), 6).setFontFamily("Montserrat").setFontColor(C.texte).setVerticalAlignment("middle");

  // le bandeau bleu du haut
  f.setRowHeight(1, 22);
  f.setRowHeight(2, 46);
  f.setRowHeight(3, 62);
  f.setRowHeight(4, 44);
  f.getRange("B2:E4").setBackground(C.bleu);
  f.getRange("B2:E2").merge();
  f.getRange("B3:E3").merge();
  f.getRange("B4:E4").merge();
  f.getRange("B2").setValue("VALO DIGITAL").setFontColor(C.jaune).setFontWeight("bold").setFontSize(11).setVerticalAlignment("bottom").setHorizontalAlignment("left");
  f.getRange("B3").setValue("Vos demandes, en direct").setFontColor(C.blanc).setFontWeight("bold").setFontSize(24).setHorizontalAlignment("left");
  f.getRange("B4")
    .setValue("Chaque demande envoyée depuis le site arrive ici, la plus récente en haut de son onglet.")
    .setFontColor("#C9CEFF")
    .setFontSize(10)
    .setVerticalAlignment("top")
    .setHorizontalAlignment("left")
    .setWrap(true);

  // les quatre tuiles. Entre deux arguments, Google attend une virgule ou un point-virgule selon la langue du Sheet :
  // le script le teste lui-même (voir separateur_)
  const sep = separateur_(f);
  // colonnes entières (les titres ne comptent pas) : une plage « à partir de la ligne 2 » serait décalée vers le bas par
  // chaque nouvelle demande insérée en ligne 2, et la plus récente ne serait jamais comptée
  const P = "Prestations!$A:$A";
  const F = "Formations!$A:$A";
  const compte = function (statut) {
    return "COUNTIF(" + P + sep + '"' + statut + '")+COUNTIF(' + F + sep + '"' + statut + '")';
  };
  const tuiles = [
    ["À traiter", "=" + compte("Nouveau")],
    ["En cours", "=" + compte("Contacté") + "+" + compte("Devis envoyé")],
    ["Gagnées", "=" + compte("Gagné")],
    ["Reçues ces 7 jours", "=COUNTIF(Prestations!$B:$B" + sep + '">"&(NOW()-7))+COUNTIF(Formations!$B:$B' + sep + '">"&(NOW()-7))'],
  ];
  f.setRowHeight(5, 22);
  f.setRowHeight(6, 34);
  f.setRowHeight(7, 70);
  tuiles.forEach(function (t, i) {
    f.getRange(6, 2 + i).setValue(t[0]).setFontSize(9).setFontWeight("bold").setFontColor(C.discret).setVerticalAlignment("bottom").setHorizontalAlignment("left");
    f.getRange(7, 2 + i).setFormula(t[1]).setNumberFormat("0").setFontSize(36).setFontWeight("bold").setFontColor(C.bleu).setVerticalAlignment("top").setHorizontalAlignment("left");
  });
  f.getRange("B6:E7").setBackground(C.tuile);
  [2, 3, 4].forEach(function (c) {
    f.getRange(6, c, 2, 1).setBorder(null, null, null, true, null, null, C.blanc, SpreadsheetApp.BorderStyle.SOLID_THICK);
  });
  f.getRange("B6:B7").setBorder(null, true, null, null, null, null, C.blanc, SpreadsheetApp.BorderStyle.SOLID_THICK);

  // le détail par statut
  f.setRowHeight(8, 26);
  f.setRowHeight(9, 34);
  f.getRange("B9").setValue("Par statut").setFontWeight("bold").setFontSize(13).setFontColor(C.marine).setVerticalAlignment("bottom");
  f.setRowHeight(10, 34);
  f.getRange("B10:E10").setValues([["Statut", "Prestations", "Formations", "Total"]]).setBackground(C.marine).setFontColor(C.blanc).setFontWeight("bold").setFontSize(10);
  f.getRange("C10:E10").setHorizontalAlignment("center");
  STATUTS.forEach(function (s, i) {
    const r = 11 + i;
    f.setRowHeight(r, 34);
    f.getRange(r, 2).setValue(s.nom).setBackground(s.fond).setFontColor(s.texte).setFontWeight("bold");
    f.getRange(r, 3).setFormula("=COUNTIF(" + P + sep + '"' + s.nom + '")');
    f.getRange(r, 4).setFormula("=COUNTIF(" + F + sep + '"' + s.nom + '")');
    f.getRange(r, 5).setFormula("=C" + r + "+D" + r);
  });
  const fin = 11 + STATUTS.length;
  f.setRowHeight(fin, 36);
  f.getRange(fin, 2).setValue("Toutes les demandes");
  f.getRange(fin, 3).setFormula("=SUM(C11:C" + (fin - 1) + ")");
  f.getRange(fin, 4).setFormula("=SUM(D11:D" + (fin - 1) + ")");
  f.getRange(fin, 5).setFormula("=SUM(E11:E" + (fin - 1) + ")");
  f.getRange(fin, 2, 1, 4).setFontWeight("bold").setBackground(C.tuile).setFontColor(C.marine);
  f.getRange(11, 3, STATUTS.length + 1, 3).setHorizontalAlignment("center").setNumberFormat("0");
  f.getRange(11, 2, STATUTS.length + 1, 4).setBorder(null, null, true, null, null, true, C.trait, SpreadsheetApp.BorderStyle.SOLID);

  f.setRowHeight(fin + 1, 20);
  f.setRowHeight(fin + 2, 44);
  f.getRange(fin + 2, 2, 1, 4).merge();
  f.getRange(fin + 2, 2)
    .setValue("Pour suivre une demande, changez son statut dans la première colonne de l'onglet Prestations ou Formations. Ce tableau se met à jour tout seul.")
    .setFontColor(C.discret)
    .setFontSize(10)
    .setWrap(true)
    .setVerticalAlignment("top")
    .setHorizontalAlignment("left");
}

// la virgule ou le point-virgule entre deux arguments : on écrit =MAX(1,2) dans une cellule vide ; si la réponse est 2,
// la virgule sépare bien les arguments ; sinon (un Sheet en français lit « 1,2 » comme un nombre), c'est le point-virgule
function separateur_(f) {
  try {
    const cellule = f.getRange(1, 6);
    cellule.setFormula("=MAX(1,2)");
    SpreadsheetApp.flush();
    const bon = cellule.getValue() === 2;
    cellule.clear();
    return bon ? "," : ";";
  } catch (x) {
    return ",";
  }
}

// ---------- le courriel ----------

function prevenir_(classeur, feuille, def, d, date) {
  const destinataires = [Session.getEffectiveUser().getEmail(), EMAIL_EN_PLUS].filter(Boolean).join(",");
  if (!destinataires) return;
  const formation = d.type === "Formation";
  const nonVide = function (v) {
    return String(v == null ? "" : v).trim() !== "";
  };
  const nom = nonVide(d.nom) ? String(d.nom).trim() : "Sans nom";
  const choix = String(d.choix == null ? "" : d.choix).trim();
  const projet = String(d.projet == null ? "" : d.projet).trim();
  // « Formation X (50 000 F CFA) » : le nom en italique, le prix à part, jamais coupé en deux lignes
  const morceaux = /^(.*\S)\s*\(([^()]*\d[^()]*)\)$/.exec(choix);
  const intitule = morceaux ? morceaux[1] : choix;
  const prix = morceaux ? morceaux[2] : "";
  const mailClient = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || "") ? String(d.email) : "";
  const whatsapp = lienWhatsApp_(d.whatsapp);
  const quand = dateFr_(date, false);
  let crm = "";
  try {
    crm = classeur.getUrl() + "#gid=" + feuille.getSheetId();
  } catch (x) {}

  // ce que la boîte de réception montre avant l'ouverture : l'objet, puis la première ligne du message
  const sujet = ("Nouvelle demande : " + nom + (choix ? ", " + choix : "")).replace(/[\r\n]+/g, " ");
  const apercu = [d.type, formation ? "" : d.entreprise].filter(nonVide).join(" · ") + (projet ? " · « " + raccourcir_(projet, 110) + " »" : "");

  const details = [
    formation ? null : ["Entreprise", d.entreprise, ""],
    [formation ? "Profil" : "Situation", d.situation, ""],
    ["WhatsApp", d.whatsapp, whatsapp],
    ["E-mail", d.email, mailClient ? "mailto:" + mailClient : ""],
  ].filter(function (c) {
    return c && nonVide(c[1]);
  });

  // le texte brut, pour les messageries qui n'affichent pas la mise en forme
  const texte = [d.type + " : " + choix, "De : " + nom, ""]
    .concat(projet ? [(formation ? "Situation et objectif : " : "Son objectif : ") + projet, ""] : [])
    .concat(details.map(function (c) { return c[0] + " : " + c[1]; }))
    .concat(["", whatsapp ? "Répondre sur WhatsApp : " + whatsapp : "", crm ? "Ouvrir le CRM : " + crm : "", "", "Reçue le " + quand + "."])
    .join("\n");

  const sans = "Montserrat,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  const serif = "Georgia,'Times New Roman',serif";
  const e = echapper_;
  const libelle = function (t) {
    return '<div style="font:700 10px/1.4 ' + sans + ';letter-spacing:1.2px;text-transform:uppercase;color:#7A80A6;padding-bottom:4px;">' + e(t) + "</div>";
  };

  // les détails, deux par ligne (l'un sous l'autre sur téléphone)
  let grille = "";
  for (let i = 0; i < details.length; i += 2) {
    grille += "<tr>";
    [details[i], details[i + 1]].forEach(function (c, j) {
      if (!c) {
        grille += '<td class="col" width="50%" style="width:50%;"></td>';
        return;
      }
      let v = e(c[1]);
      if (c[2]) v = '<a href="' + e(c[2]) + '" style="color:#0714D8;text-decoration:none;">' + v + "</a>";
      grille +=
        '<td class="col" valign="top" width="50%" style="width:50%;padding:0 ' + (j === 0 ? "14px" : "0") + ' 20px 0;">' +
        libelle(c[0]) +
        '<div style="font:600 14px/1.45 ' + sans + ';color:#141A4A;word-break:break-word;overflow-wrap:anywhere;">' + v + "</div></td>";
    });
    grille += "</tr>";
  }

  const bouton = function (lien, mot, principal) {
    return (
      '<a class="btn" href="' + e(lien) + '" style="display:inline-block;margin:0 10px 10px 0;padding:15px 22px;font:700 14px/1 ' + sans + ";text-decoration:none;" +
      (principal ? "background:#0714D8;color:#FFFFFF;" : "background:#EEF0FF;color:#071F78;") +
      '">' + e(mot) + "</a>"
    );
  };
  const boutons = whatsapp ? bouton(whatsapp, "Répondre sur WhatsApp", true) + (crm ? bouton(crm, "Ouvrir le CRM", false) : "") : crm ? bouton(crm, "Ouvrir le CRM", true) : "";

  const logo = logo_();
  const marque = logo
    ? '<img src="cid:logo" width="120" height="20" alt="ValoDigital" style="display:block;border:0;outline:none;width:120px;height:20px;">'
    : '<span style="font:700 18px/1 ' + sans + ';color:#0714D8;">ValoDigital</span>';
  let remplissage = "";
  for (let i = 0; i < 60; i++) remplissage += "&#847;&zwnj;&nbsp;";
  const page = nonVide(d.page) ? (String(d.page).trim() === "/" ? ", depuis la page d’accueil" : ", depuis la page " + e(d.page)) : "";
  const cellule = function (haut, bas, contenu, fond) {
    return '<tr><td class="px" bgcolor="' + (fond || "#FFFFFF") + '" style="background:' + (fond || "#FFFFFF") + ";padding:" + haut + "px 32px " + bas + 'px;">' + contenu + "</td></tr>";
  };

  // Gmail ignore les dégradés et ne découpe pas les formes : couleurs unies et angles droits, qui s'affichent partout pareil
  const html =
    '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">' +
    "<style>@media (max-width:520px){.px{padding-left:22px!important;padding-right:22px!important}" +
    ".col{display:block!important;width:100%!important;padding-right:0!important}.btn{display:block!important;text-align:center!important;margin-right:0!important}}</style>" +
    '</head><body style="margin:0;padding:0;background:#EDEFF7;">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">' + e(apercu) + remplissage + "</div>" +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#EDEFF7" style="background:#EDEFF7;"><tr><td align="center" style="padding:20px 10px 24px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;border-collapse:separate;">' +
    // le logo et la date
    cellule(
      22, 0,
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td valign="middle">' + marque + "</td>" +
        '<td align="right" valign="middle" style="font:500 11px/1 ' + sans + ';color:#8A90B0;white-space:nowrap;">' + e(dateFr_(date, true)) + "</td></tr></table>"
    ) +
    // l'étiquette, le nom, le choix en italique, le prix
    cellule(
      22, 0,
      '<span style="display:inline-block;padding:6px 10px;background:#EEF0FF;font:700 10px/1 ' + sans + ';letter-spacing:1.1px;text-transform:uppercase;color:#0714D8;white-space:nowrap;">Nouvelle demande · ' + e(d.type) + "</span>" +
        '<div style="font:700 22px/1.25 ' + sans + ';letter-spacing:-0.2px;color:#071F78;padding-top:14px;overflow-wrap:anywhere;">' + e(nom) + "</div>" +
        (intitule ? '<div style="font:italic 400 17px/1.4 ' + serif + ';color:#0714D8;padding-top:4px;">' + e(intitule) + "</div>" : "") +
        (prix ? '<div style="padding-top:10px;"><span style="display:inline-block;padding:6px 10px;background:#FDEC05;font:700 12px/1 ' + sans + ';color:#040B52;white-space:nowrap;">' + e(prix).replace(/ /g, "&nbsp;") + "</span></div>" : "")
    ) +
    // le message du client
    (projet
      ? cellule(
          22, 0,
          libelle(formation ? "Situation et objectif" : "Son objectif") +
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
            '<td style="border-left:3px solid #FDEC05;padding:2px 0 2px 14px;font:400 15px/1.6 ' + sans + ';color:#141A4A;word-break:break-word;overflow-wrap:anywhere;">' + e(projet).replace(/\n/g, "<br>") + "</td></tr></table>"
        )
      : "") +
    // les détails
    (grille ? cellule(22, 4, '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' + grille + "</table>") : "") +
    // les actions
    (boutons ? cellule(2, 24, boutons) : cellule(0, 20, "")) +
    // le pied
    '<tr><td class="px" bgcolor="#F6F7FC" style="background:#F6F7FC;border-top:1px solid #E6E8F2;padding:16px 32px;font:400 11px/1.6 ' + sans + ';color:#6A7094;">' +
    "Reçue le " + e(quand) + page + ". Statut Nouveau, onglet " + e(def.nom) + " du CRM." + (mailClient ? " Répondez à ce courriel pour lui écrire." : "") +
    "</td></tr></table></td></tr></table></body></html>";

  const message = {
    to: destinataires,
    name: "VALO DIGITAL",
    subject: sujet,
    body: texte,
    htmlBody: html,
  };
  if (mailClient) message.replyTo = mailClient;
  if (logo) message.inlineImages = { logo: logo };
  MailApp.sendEmail(message);
}

// la date en français, à l'heure de Ouagadougou : « 13 octobre 2026 » ou « 13 octobre 2026 à 09:12 »
function dateFr_(date, court) {
  const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const jour = Utilities.formatDate(date, FUSEAU, "d") + " " + mois[Number(Utilities.formatDate(date, FUSEAU, "M")) - 1] + " " + Utilities.formatDate(date, FUSEAU, "yyyy");
  return court ? jour : jour + " à " + Utilities.formatDate(date, FUSEAU, "HH:mm");
}

// un texte coupé proprement à la fin d'un mot
function raccourcir_(texte, max) {
  const t = String(texte).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const coupe = t.slice(0, max);
  return coupe.slice(0, Math.max(coupe.lastIndexOf(" "), max - 20)) + "…";
}

// le logo du site (monogramme et « ValoDigital » en bleu), joint au courriel ; sans lui, le nom s'écrit en texte
function logo_() {
  try {
    return Utilities.newBlob(Utilities.base64Decode(LOGO_PNG), "image/png", "valodigital.png");
  } catch (x) {
    return null;
  }
}

function echapper_(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// le lien qui ouvre la conversation WhatsApp ; huit chiffres seuls sont un numéro du Burkina Faso (indicatif 226)
function lienWhatsApp_(tel) {
  let chiffres = String(tel == null ? "" : tel).replace(/\D/g, "");
  if (chiffres.indexOf("00") === 0) chiffres = chiffres.slice(2);
  if (chiffres.length === 8) chiffres = "226" + chiffres;
  return chiffres.length >= 9 ? "https://wa.me/" + chiffres : "";
}

// le logo en image PNG (monogramme et « ValoDigital » en bleu électrique, dessinés avec la police du site), 2 Ko
const LOGO_PNG = "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";
