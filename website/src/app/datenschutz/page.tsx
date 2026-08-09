import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal/LegalArticle";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – PLG Media",
  description: "Datenschutzerklärung von PLG Media.",
};

export default function DatenschutzPage() {
  return (
    <LegalArticle title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
      </p>
      <p>
        PLG Media
        <br />
        Sümeyra Pilig
        <br />
        Matthäusstraße 22
        <br />
        52457 Aldenhoven
        <br />
        Deutschland
        <br />
        Telefon: <a href="tel:+4917646103320">+49 176 46103320</a>
        <br />
        E-Mail: <a href="mailto:info@plgmedia.de">info@plgmedia.de</a>
      </p>

      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich
        nur, soweit dies zur Bereitstellung einer funktionsfähigen Website
        sowie unserer Inhalte und Leistungen erforderlich ist. Die
        Verarbeitung erfolgt regelmäßig nur nach Einwilligung der Nutzer oder
        wenn eine Rechtsgrundlage nach der DSGVO vorliegt.
      </p>

      <h2>3. Hosting</h2>
      <p>Diese Website wird bei folgendem Anbieter gehostet:</p>
      <p>
        Vercel Inc.
        <br />
        340 S Lemon Ave #4133
        <br />
        Walnut, CA 91789
        <br />
        USA
      </p>
      <p>
        Vercel erhebt beim Aufruf der Website automatisch Server-Logfiles:
      </p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>Aufgerufene Seite / Datei</li>
        <li>Referrer-URL</li>
        <li>Verwendeter Browser und Betriebssystem</li>
      </ul>
      <p>
        Die Erfassung dieser Daten ist technisch erforderlich, um die
        Website auszuliefern sowie ihre Stabilität und Sicherheit zu
        gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse).
      </p>
      <p>
        Die Verarbeitung kann eine Übermittlung in die USA umfassen. Vercel
        Inc. ist unter dem EU-U.S. Data Privacy Framework zertifiziert.
        Zusätzlich bestehen Standardvertragsklauseln gemäß Art. 46 Abs. 2
        lit. c DSGVO. Wir haben mit Vercel einen Vertrag zur
        Auftragsverarbeitung gemäß Art. 28 DSGVO geschlossen.
      </p>

      <h2>4. E-Mail-Versand (Kontaktformular)</h2>
      <p>
        Für den Versand der über das Kontaktformular eingehenden Nachrichten
        nutzen wir den Dienst Resend:
      </p>
      <p>
        Resend, Inc.
        <br />
        2261 Market Street #5039
        <br />
        San Francisco, CA 94114
        <br />
        USA
      </p>
      <p>
        Beim Absenden des Formulars werden die eingegebenen Daten zur
        Zustellung an uns über die Server von Resend verarbeitet.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Auch hier
        kann eine Übermittlung in die USA erfolgen, abgesichert durch
        Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO.
      </p>

      <h2>5. Kontaktformular und Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns über das Kontaktformular, per E-Mail oder telefonisch
        kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten:
      </p>
      <ul>
        <li>Name</li>
        <li>E-Mail-Adresse</li>
        <li>Telefonnummer</li>
        <li>Unternehmen (sofern angegeben)</li>
        <li>Inhalt Ihrer Nachricht</li>
      </ul>
      <p>Zweck: Bearbeitung Ihrer Anfrage und Anschlusskommunikation.</p>
      <p>Rechtsgrundlage:</p>
      <ul>
        <li>
          Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage auf die Anbahnung
          oder Erfüllung eines Vertrages gerichtet ist
        </li>
        <li>
          Art. 6 Abs. 1 lit. f DSGVO in allen übrigen Fällen (berechtigtes
          Interesse an der Beantwortung von Anfragen)
        </li>
      </ul>
      <p>
        Speicherdauer: Wir löschen Ihre Daten, sobald Ihre Anfrage
        abschließend bearbeitet ist und keine gesetzlichen
        Aufbewahrungspflichten entgegenstehen. Handels- und steuerrechtliche
        Aufbewahrungsfristen bleiben unberührt.
      </p>
      <p>
        Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht ohne Ihre
        ausdrückliche Einwilligung.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Diese Website verwendet keine Cookies zu Analyse- oder
        Marketingzwecken. Es findet kein Tracking statt. Es sind weder
        Google Analytics noch ein Meta-Pixel oder vergleichbare Dienste
        eingebunden.
      </p>

      <h2>7. Schriftarten</h2>
      <p>
        Schriftarten werden lokal von unserem Server ausgeliefert. Es
        erfolgt keine Verbindung zu Servern Dritter (z. B. Google Fonts).
        Ihre IP-Adresse wird dadurch nicht an Dritte übermittelt.
      </p>

      <h2>8. Social-Media-Verlinkungen</h2>
      <p>
        Auf unserer Website finden Sie Verlinkungen zu unseren Profilen bei
        Instagram, Facebook, LinkedIn und TikTok. Es handelt sich dabei um
        einfache Hyperlinks, nicht um eingebundene Social-Media-Plugins. Eine
        Datenübertragung an die jeweiligen Anbieter findet erst statt, wenn
        Sie aktiv auf einen dieser Links klicken. Für die Datenverarbeitung
        auf den verlinkten Plattformen ist der jeweilige Anbieter
        verantwortlich.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten zu verlangen (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
        <li>Der Verarbeitung zu widersprechen (Art. 21 DSGVO)</li>
        <li>
          Eine erteilte Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3
          DSGVO)
        </li>
      </ul>
      <p>
        Wenden Sie sich dafür an:{" "}
        <a href="mailto:info@plgmedia.de">info@plgmedia.de</a>
      </p>

      <h2>10. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
        beschweren. Zuständig für uns ist:
      </p>
      <p>
        Landesbeauftragte für Datenschutz und Informationsfreiheit
        Nordrhein-Westfalen
        <br />
        Kavalleriestraße 2-4
        <br />
        40213 Düsseldorf
        <br />
        Telefon: 0211 38424-0
        <br />
        E-Mail:{" "}
        <a href="mailto:poststelle@ldi.nrw.de">poststelle@ldi.nrw.de</a>
      </p>

      <h2>11. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Website nutzt aus Sicherheitsgründen eine
        SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
        daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf
        &quot;https://&quot; wechselt und am Schloss-Symbol in Ihrer
        Browserzeile.
      </p>

      <h2>12. Aktualität dieser Datenschutzerklärung</h2>
      <p>Stand: August 2026</p>
      <p>
        Durch die Weiterentwicklung unserer Website oder aufgrund geänderter
        gesetzlicher Vorgaben kann es notwendig werden, diese
        Datenschutzerklärung anzupassen.
      </p>
    </LegalArticle>
  );
}
