/**
 * VALO DIGITAL : réception des demandes du site dans un Google Sheet.
 *
 * Mise en place (5 minutes) :
 * 1. Dans le Google Sheet de VALO : Extensions > Apps Script. Remplacez tout le code par celui-ci.
 * 2. Remplacez CLE par un mot de passe long et unique (20 caractères ou plus, sans espace). Gardez-le : le site en a besoin.
 * 3. Déployer > Nouveau déploiement > type « Application Web » > Exécuter en tant que : Moi > Qui a accès : Tout le monde
 *    > Déployer. Acceptez les autorisations. Copiez l'adresse qui se termine par /exec.
 * 4. Dans Vercel (projet valo-digital > Settings > Environment Variables) : DEMANDES_WEBHOOK_URL = cette adresse,
 *    DEMANDES_WEBHOOK_TOKEN = la clé. Puis Deployments > Redeploy.
 *
 * Chaque demande est ajoutée en bas de l'onglet « Prestations » ou « Formations » (créés au premier envoi), et un courriel
 * part vers EMAIL. Ouvrir l'adresse /exec dans un navigateur affiche {"ok":true} : le script est bien en ligne.
 * Ce fichier ne contient aucun secret : la clé ci-dessous est à remplacer, jamais à publier.
 */
const CLE = "REMPLACEZ-MOI-PAR-UNE-CLE-LONGUE";
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

    const classeur = SpreadsheetApp.getActiveSpreadsheet();
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
