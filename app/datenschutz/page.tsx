import Link from "next/link";

export const metadata = { title: "Datenschutzerklärung | MainBar" };

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen w-full bg-[#faf8f5] px-6 py-20 md:py-28">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-[#a0a0a0] hover:text-[#cda1b1] uppercase tracking-widest text-[10px] md:text-xs transition-colors"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-[#2d2d2d] mt-6 mb-4">
          Datenschutzerklärung
        </h1>
        <div className="w-12 h-px bg-[#cda1b1] mb-10" />

        <div className="space-y-8 text-sm text-[#2d2d2d] leading-relaxed">
          <section>
            <h2 className="font-serif text-lg text-[#2d2d2d] mb-2">1. Verantwortlicher</h2>
            <p className="text-[#4a4a4a]">
              [Name der Inhaberin], MainBar, [Straße und Hausnummer], 97421 Schweinfurt
              <br />
              E-Mail: [E-Mail-Adresse]
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#2d2d2d] mb-2">2. Hosting</h2>
            <p className="text-[#4a4a4a]">
              Diese Website wird bei [Hosting-Anbieter] gehostet. Beim Aufruf der Website erhebt
              der Hosting-Anbieter automatisch technische Informationen (Server-Logfiles), u. a.
              IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite und Browsertyp. Diese
              Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einem sicheren
              und stabilen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#2d2d2d] mb-2">3. Kontaktformular</h2>
            <p className="text-[#4a4a4a]">
              Wenn du uns über das Kontaktformular schreibst, verarbeiten wir deinen Namen, deine
              E-Mail-Adresse und deine Nachricht, um deine Anfrage zu beantworten. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Anfrage) bzw. Art. 6 Abs. 1 lit. a
              DSGVO (Einwilligung). Die Daten werden gelöscht, sobald die Anfrage abschließend
              bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#2d2d2d] mb-2">4. Bewertungen</h2>
            <p className="text-[#4a4a4a]">
              Wenn du über das Bewertungsformular auf unserer Startseite eine Bewertung
              abgibst, speichern wir den von dir angegebenen Vornamen, deine Bewertung
              (Sterne) und deinen Text, um sie auf der Website anzuzeigen. Rechtsgrundlage ist
              deine Einwilligung durch das aktive Absenden des Formulars (Art. 6 Abs. 1 lit. a
              DSGVO). Du kannst die Löschung deiner Bewertung jederzeit per E-Mail an uns
              beantragen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#2d2d2d] mb-2">5. Cookies</h2>
            <p className="text-[#4a4a4a]">
              Wir setzen ausschließlich technisch notwendige Cookies ein, die für den Betrieb der
              Website erforderlich sind (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#2d2d2d] mb-2">6. Deine Rechte</h2>
            <p className="text-[#4a4a4a]">
              Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung deiner
              Daten (Art. 15–21 DSGVO). Zudem hast du das Recht, dich bei einer
              Datenschutz-Aufsichtsbehörde zu beschweren, z. B. beim Bayerischen Landesamt für
              Datenschutzaufsicht.
            </p>
          </section>
        </div>

        <div className="mt-14 rounded-2xl border border-dashed border-[#cda1b1]/40 bg-[#cda1b1]/10 p-4 text-xs text-[#a0a0a0]">
          Hinweis für den Betreiber: Bitte Hosting-Anbieter, E-Mail-Versanddienst und alle eckigen
          Klammern eintragen und die Erklärung vor Veröffentlichung juristisch prüfen lassen.
          Die Abschnitte 3 (Kontaktformular) und 4 (Bewertungen) beziehen sich auf die
          Formulare, die aktuell in deinem Code vorhanden sind — falls sich diese ändern,
          diesen Text entsprechend anpassen.
        </div>
      </div>
    </main>
  );
}
