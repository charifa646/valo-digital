/**
 * VALO DIGITAL : réception des demandes du site dans un Google Sheet.
 *
 * DEUX FAÇONS DE LE METTRE EN PLACE (une seule suffit)
 *
 * A. Depuis le Sheet : dans le Google Sheet de VALO, menu Extensions > Apps Script. Remplacez tout le code par celui-ci
 *    et laissez ID_DU_SHEET vide.
 *
 * B. Sans passer par le Sheet (si « Extensions > Apps Script » affiche « Page introuvable ») : ouvrez
 *    https://script.google.com avec le compte Google qui possède le Sheet, cliquez « Nouveau projet », remplacez tout le
 *    code par celui-ci, et collez dans ID_DU_SHEET l'identifiant du Sheet : c'est la longue suite de lettres et de chiffres
 *    de son adresse, entre « /d/ » et « /edit ».
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
 * Chaque demande est ajoutée en bas de l'onglet « Prestations » ou « Formations » (créés au premier envoi), et un courriel
 * part vers EMAIL. Ouvrir l'adresse /exec dans un navigateur affiche {"ok":true} : le script est bien en ligne.
 * Ce fichier ne contient aucun secret : la clé ci-dessous est à remplacer, jamais à publier.
 */
const CLE = "REMPLACEZ-MOI-PAR-UNE-CLE-LONGUE";
const ID_DU_SHEET = ""; // laissez vide si le script est ouvert depuis le Sheet (façon A) ; sinon, l'identifiant du Sheet (façon B)
const EMAIL = "contact@valodigitalbf.com"; // reçoit un courriel à chaque demande ; laissez vide pour ne pas en recevoir
const COLONNES = ["Date", "Type", "Choix", "Situation", "Projet", "Nom", "Entreprise", "WhatsApp", "E-mail", "Page"];

function doGet() {
  return sortie_(true);
}

function doPost(e) {
  const verrou = LockService.getScriptLock();
  try {
    const d = JSON.parse(e.postData.contents);
    if (!CLE || CLE.indexOf("REMPLACEZ") === 0 || d.token !== CLE) return sortie_(false);
    verrou.waitLock(10000);

    const classeur = ID_DU_SHEET ? SpreadsheetApp.openById(ID_DU_SHEET) : SpreadsheetApp.getActiveSpreadsheet();
    const nom = d.type === "Formation" ? "Formations" : "Prestations";
    const feuille = classeur.getSheetByName(nom) || classeur.insertSheet(nom);
    if (feuille.getLastRow() === 0) {
      feuille.appendRow(COLONNES);
      feuille.setFrozenRows(1);
      feuille.getRange(1, 1, 1, COLONNES.length).setFontWeight("bold");
    }

    const ligne = [
      formaterDate_(d.date),
      d.type,
      d.choix,
      d.situation,
      d.projet,
      d.nom,
      d.entreprise,
      d.whatsapp,
      d.email,
      d.page,
    ].map(function (v) {
      return String(v == null ? "" : v);
    });
    // en texte brut : un message qui commencerait par = ou + ne devient jamais une formule
    feuille.getRange(feuille.getLastRow() + 1, 1, 1, ligne.length).setNumberFormat("@").setValues([ligne]);

    if (EMAIL) {
      try {
        MailApp.sendEmail({
          to: EMAIL,
          replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email || "") ? d.email : undefined,
          subject: "Nouvelle demande VALO DIGITAL : " + d.type + " (" + d.choix + ")",
          body: COLONNES.map(function (c, i) {
            return c + " : " + ligne[i];
          }).join("\n"),
        });
      } catch (erreurCourriel) {
        // la demande est déjà dans le Sheet : un courriel qui échoue ne doit pas la faire refuser
      }
    }
    return sortie_(true);
  } catch (erreur) {
    return sortie_(false);
  } finally {
    try {
      verrou.releaseLock();
    } catch (x) {}
  }
}

// la date envoyée par le site (ISO), écrite à l'heure de Ouagadougou (GMT)
function formaterDate_(iso) {
  const t = new Date(iso);
  return isNaN(t.getTime()) ? "" : Utilities.formatDate(t, "GMT", "dd/MM/yyyy HH:mm");
}

function sortie_(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok })).setMimeType(ContentService.MimeType.JSON);
}
