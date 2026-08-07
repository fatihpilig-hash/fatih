# PLG Media Website

Marketing-Landingpage für PLG Media (Next.js App Router + Tailwind v4).

## Entwicklung

```bash
npm install
npm run dev
```

Seite läuft unter [http://localhost:3000](http://localhost:3000).

## Kontaktformular einrichten

Das Kontaktformular (`/#kontakt`) sendet Anfragen über [Resend](https://resend.com)
per Route Handler unter `src/app/api/contact/route.ts`.

1. `.env.local.example` nach `.env.local` kopieren
2. Bei [resend.com](https://resend.com) einen API-Key erstellen und als
   `RESEND_API_KEY` eintragen
3. `CONTACT_TO_EMAIL` auf die Zieladresse für Anfragen setzen
4. Für den Produktivbetrieb: eigene Domain (`plg-media.de`) in Resend
   verifizieren und `CONTACT_FROM_EMAIL` entsprechend anpassen — ohne
   verifizierte Domain funktioniert nur der Resend-Sandbox-Absender
   `onboarding@resend.dev`, und E-Mails kommen ausschließlich beim
   eigenen Resend-Account-Postfach an

Ohne gesetzte Umgebungsvariablen antwortet die Route mit `503` und einer
verständlichen Fehlermeldung im Formular, statt fehlzuschlagen.

## Build

```bash
npm run build
npm run lint
```

## Deployment

Empfohlen: [Vercel](https://vercel.com/new) — `RESEND_API_KEY`,
`CONTACT_TO_EMAIL` und `CONTACT_FROM_EMAIL` dort als Environment
Variables hinterlegen.
