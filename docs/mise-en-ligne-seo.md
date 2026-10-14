# Mise en ligne du domaine et référencement

Marche à suivre pour ouvrir le site sur **www.valodigitalbf.com** puis le faire connaître de Google. Aucune clé ni aucun mot de passe ici : le dépôt est public.

Ce qui est déjà prêt dans le code : titres et descriptions de chaque page, adresse canonique, plan du site, `robots.txt`, carte de partage, données structurées (l'agence, les formations, les services), une seule adresse pour Google (`src/middleware.ts`), le tout **fermé aux moteurs** tant que `INDEXABLE` est faux (`src/lib/site.ts`).

## 1. Brancher le domaine

**Dans Vercel** (projet valo-digital, Settings, Domains) :

1. Ajouter `valodigitalbf.com`.
2. Ajouter `www.valodigitalbf.com`. **L'adresse du site est celle avec `www`** : dans Vercel, `valodigitalbf.com` redirige vers `www.valodigitalbf.com` (réglage de Charifa, 308), et le code envoie l'autre forme vers `www` aussi, dans le même sens.
3. Garder cette page ouverte : Vercel affiche les valeurs exactes à copier chez Cloudflare. Les valeurs de Vercel passent avant celles de ce document.

**Dans Cloudflare** (valodigitalbf.com, DNS, Records) :

| Type | Nom | Contenu | Nuage |
| --- | --- | --- | --- |
| A | `@` | l'adresse IP que Vercel affiche (par exemple `216.198.79.1` ou `76.76.21.21`) | gris, « DNS only » |
| CNAME | `www` | la valeur que Vercel affiche (par exemple `cname.vercel-dns.com`) | gris, « DNS only » |

- Il ne doit rester qu'**une seule ligne `A` pour `@`** : supprimer l'ancienne, celle de l'hébergement d'avant (la page « Index of / »).
- **Ne pas toucher** aux lignes `MX` (e-mails), `TXT` (SPF, DKIM, DMARC) ni à `mail`, `webmail`, `cpanel` s'ils existent : les e-mails continueront de fonctionner.

Revenir dans Vercel, cliquer **Refresh** : les deux lignes passent à « Valid Configuration » et le certificat HTTPS se crée tout seul (quelques minutes, parfois une heure).

## 2. Ouvrir le site aux moteurs

Une fois `https://www.valodigitalbf.com` ouvert dans un navigateur et affichant le site, **dire à Claude « domaine ajouté »**. Il fait ceci, dans un seul fichier (`src/lib/site.ts`) :

- `SITE_URL` devient `https://www.valodigitalbf.com` ;
- `INDEXABLE` devient `true`.

Puis il publie et lance la vérification :

```
node scripts/verifier-seo.mjs
```

Le script contrôle, page par page, ce que voit Google : le site est ouvert, les adresses canoniques, le plan du site, un seul H1, les titres et descriptions, la carte de partage, les données structurées, les redirections (l'autre forme du domaine et `http`), et que l'ancienne adresse `valo-digital.vercel.app` est bien marquée `noindex` (sinon Google pourrait lister le site en double).

**Fait le 14 octobre 2026** : le site est ouvert. `robots.txt` est ouvert (sauf `/api/` et `/apercu/`) et nomme le plan du site, les pages sont `index, follow`, `valodigitalbf.com` redirige vers `www.valodigitalbf.com`, `vercel.app` est en `noindex`.

## 3. Google Search Console (gestes de Charifa)

1. Aller sur https://search.google.com/search-console avec le compte Google de VALO DIGITAL.
2. **Ajouter une propriété**, type **Domaine** (pas « Préfixe d'URL »), et saisir `valodigitalbf.com` (une propriété « Domaine » couvre l'adresse avec et sans `www`).
3. Google donne une ligne **TXT** à ajouter chez Cloudflare (DNS, Records) : l'ajouter **sans supprimer** les TXT déjà là (SPF, etc.). Revenir cliquer **Valider**.
4. Menu **Sitemaps** : saisir `sitemap.xml`, **Envoyer**. Google doit répondre « Réussite » et compter 5 pages.
5. Menu **Inspection d'URL** : coller `https://www.valodigitalbf.com/`, puis **Demander une indexation**. Même chose pour `/services`, `/formations` et `/a-propos` (avec `https://www.valodigitalbf.com` devant).
6. Au bout de quelques jours, le rapport **Pages** dit combien sont indexées. Une première indexation prend en général de quelques jours à deux semaines.

Facultatif : https://www.bing.com/webmasters, qui peut importer la propriété depuis la Search Console.

## 4. Fiche Google Business Profile (gestes de Charifa)

C'est ce qui fait apparaître VALO DIGITAL sur Google Maps et dans les recherches « agence marketing digital Ouagadougou ».

1. https://business.google.com, créer la fiche **VALO DIGITAL**.
2. Catégorie principale : agence de marketing (ou de publicité digitale) ; catégorie secondaire : centre de formation.
3. Mêmes informations que sur le site, au caractère près, c'est ce qui compte pour Google :
   - adresse : Wemtenga, Ouagadougou ;
   - téléphone : +226 54 27 77 52 ;
   - site : https://www.valodigitalbf.com ;
   - e-mail : contact@valodigitalbf.com.
4. Ajouter les horaires, des vraies photos (l'équipe, les formations) et la description : seulement ce que VALO affirme déjà sur le site.
5. Google demande de **confirmer** la fiche (appel, SMS ou courrier selon les cas).

## 5. Après la mise en ligne

- Relancer `node scripts/verifier-seo.mjs` après chaque publication importante.
- Les avis clients sur la fiche Google font monter le référencement local : demander aux clients satisfaits d'en laisser un.
- Les liens depuis d'autres sites (réseaux sociaux de VALO, annuaires, sites de partenaires et de clients) vers https://www.valodigitalbf.com aident aussi.
