# Protection du formulaire contre les robots

Le formulaire (« Parlons de votre projet ») est protégé par plusieurs couches. Aucune clé ici : le dépôt est public, les clés vont seulement dans les réglages de Vercel.

## Ce qui est en place dans le code

1. Un champ invisible que seuls les robots remplissent (la demande est jetée sans bruit).
2. Un formulaire envoyé en moins d'une seconde et demie est jeté.
3. Tout est revérifié côté serveur (`src/app/api/demande/route.ts`) : e-mail, téléphone, longueurs maximales, choix pris dans les listes seulement.
4. **Cloudflare Turnstile**, gratuit, sans cookie, presque toujours invisible : le visiteur ne résout rien, sauf si Cloudflare doute de lui. Il n'est chargé que lorsque le formulaire s'ouvre (jamais avec la page). Le serveur confirme le jeton auprès de Cloudflare avant de passer la demande au Google Sheet. **Inerte tant que les deux clés ci-dessous ne sont pas posées** : sans elles, le formulaire marche comme avant.

## Poser Turnstile (une fois)

**1. Dans Cloudflare**
1. Menu de gauche : **Turnstile**, puis **Add widget**.
2. Nom : `VALO DIGITAL formulaire`.
3. Domaines : `valodigitalbf.com` (et `valo-digital.vercel.app` pour tester avant que le domaine ne soit branché).
4. Mode : **Managed**. Valider avec **Create**.
5. Cloudflare affiche deux clés : la **Site Key** (publique) et la **Secret Key** (privée).

**2. Dans Vercel** (projet valo-digital, Settings, Environment Variables)

| Nom | Valeur | Environnement |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | la Site Key | Production |
| `TURNSTILE_SECRET_KEY` | la Secret Key (cocher « Sensitive ») | Production |

Seulement **Production** : les adresses d'aperçu de chaque branche changent à chaque fois, Cloudflare les refuserait.

**3. Redéployer** : Deployments, les trois points du dernier déploiement, **Redeploy** (la clé publique est lue à la construction du site, un simple enregistrement ne suffit pas).

**4. Vérifier** : ouvrir le site, remplir le formulaire, envoyer, voir la ligne arriver dans le Google Sheet.

La **Secret Key** ne se colle jamais dans un message, une capture ni un fichier du dépôt. Si elle fuit : Cloudflare, Turnstile, le widget, **Rotate secret key**, puis la remettre dans Vercel.

## Limiter le nombre d'envois (réglage Vercel, facultatif mais conseillé)

Vercel, projet valo-digital, **Firewall**, **Add Rule** :
- si le chemin vaut `/api/demande` ;
- limite : 5 requêtes par 60 secondes par adresse IP ;
- action : refuser (ou « challenge »).

Selon l'offre de Vercel, le nombre de règles est limité ; une seule suffit.

## Protéger le quota d'e-mails du script du Sheet

Un compte Gmail ne peut envoyer qu'environ 100 e-mails par jour par un script. Une version du script qui arrête d'envoyer des e-mails au-delà d'un seuil journalier (les lignes continuent d'être écrites) et qui change la clé secrète entre le site et le script est à faire ensemble, avec le changement de la clé faible : à planifier.

## Voir les tentatives refusées

Dans Cloudflare, Turnstile, le widget : le tableau de bord compte les vérifications réussies et refusées.
