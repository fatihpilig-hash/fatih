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
3. `CONTACT_TO_EMAIL` auf die Zieladresse für Anfragen setzen (z. B.
   `info@plgmedia.de`)
4. `CONTACT_FROM_EMAIL` auf eine Adresse der eigenen Domain setzen (z. B.
   `info@plgmedia.de`) — **`plgmedia.de` ist in Resend bereits
   verifiziert**, dafür reicht jede Adresse auf dieser Domain

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
