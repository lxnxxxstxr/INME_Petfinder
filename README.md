# INME_Petfinder
Finde dein Perfektes Haustier (Tierheim) Beschreibung: Quiz hilft Nutzern basierend auf Lebensstil &amp; Vorlieben, das passende Haustier (Hund, Katze etc.) zu finden.
🐾 PfotenfindER – Finde dein perfektes Haustier


Eine interaktive Webseite zur verantwortungsvollen Tiervermittlung.

Entwickelt als Studienprojekt mit HTML, CSS, JavaScript und Supabase.




📌 Projektbeschreibung

PfotenfindER ist ein interaktives Quiz, das Nutzerinnen und Nutzern dabei hilft, das passende Haustier für ihren Lebensstil zu finden — und sie mit echten (hier: fiktiven) Tierheimen in ihrer Nähe zu verbinden.

Das Projekt verbindet emotionales Storytelling mit verantwortungsvoller Aufklärung:

Wer ein Tier adoptiert, soll das bewusst und informiert tun — zum Wohl des Tieres.


🌐 Live Demo

👉 Zur Webseite


🛠️ Technologien

TechnologieVerwendungHTML5Struktur & SemantikCSS3Design, Layout, AnimationenJavaScript (Vanilla)Quiz-Logik, API-KommunikationSupabaseDatenbank mit fiktiven TierprofilenNominatim / OpenStreetMapPLZ → Koordinaten (kostenlos, kein API-Key)Google FontsPlayfair Display + Inter


📁 Projektstruktur

pfotenfinder/
│
├── index.html       → Startseite, Quiz, Ergebnis-Modal (gesamte HTML-Struktur)
├── styles.css       → Komplettes Styling inkl. Farbpalette & Responsive Design
├── app.js           → Quiz-Logik, Supabase-Anbindung, Empfehlungsalgorithmus
└── README.md        → Diese Datei


🧠 Das zweistufige Empfehlungssystem

Stufe 1 — Tierartklassifikation

Nach Abschluss des Quiz werden die Antworten lokal im JavaScript ausgewertet.

Jede Antwort vergibt gewichtete Punkte auf ein Konto für:
Hund · Katze · Kleintier · Vogel · Fisch

Die Gewichtungen basieren auf dem Einfluss der jeweiligen Frage:


Gewichtung 5 (z.B. Wohnsituation, Stunden außer Haus, Allergie) → entscheidend
Gewichtung 4 (z.B. Aktivitätslevel, Kuschelbedarf) → sehr wichtig
Gewichtung 3 (z.B. Reisen, Geräusche, Erfahrung) → relevant
Gewichtung 2 (z.B. Budget) → ergänzend


Die Tierart mit dem höchsten Score = Empfehlung.

Stufe 2 — Rassenranking via Supabase

Nach der Tierartklassifikation werden alle Tiere der empfohlenen Art aus der Supabase-Datenbank geladen.

Jedes Tier bekommt dann einen individuellen Rassen-Score basierend auf:


Platzbedarf vs. Wohnsituation
Aktivitätslevel des Tieres vs. Nutzer
Erfahrungsanforderung vs. Tierhalter-Erfahrung
Allergierisiko
Lärmempfindlichkeit
Kuschelfaktor


Die Top 3 Tiere mit den höchsten Scores (und kürzester Entfernung) werden angezeigt.

Wunsch-Weg

Hat der Nutzer zu Beginn ein bestimmtes Tier angegeben, das von der Empfehlung abweicht, erscheint zusätzlich ein „Wunsch-Weg" — mit dem besten Tier der gewünschten Art und einem Appell zum Tierwohl.


🗄️ Datenbank (Supabase)

Tabelle: tierprofile

Die Datenbank enthält 35 fiktive Tierprofile (je 7 pro Tierart):


🐶 7 Hunde
🐱 7 Katzen
🐹 7 Kleintiere
🐦 7 Vögel
🐟 7 Fische


Wichtige Spalten für das Empfehlungssystem:

SpalteBeschreibungartTierart (hund, katze, kleintier, vogel, fisch)platzbedarfklein / mittel / grossaktivitaetniedrig / mittel / hoch / sehr_hocherfahrung_noetiggering / mittel / hochallergierisikogering / mittel / hoch / keinlaerm_levelniedrig / mittel / hoch / sehr_hochkuschelfaktorgering / mittel / hoch / sehr_hoch / keintierheim_lat / tierheim_lngKoordinaten für Entfernungsberechnungtierheim_telefonKontakttelefontierheim_emailKontakt-E-Mailtierheim_maps_urlGoogle Maps Link

Supabase Row Level Security (RLS)

Damit die Datenbank öffentlich lesbar aber nicht schreibbar ist, muss folgende Policy gesetzt sein:

sqlALTER TABLE tierprofile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Öffentlich lesbar"
ON tierprofile
FOR SELECT
TO anon
USING (true);


📍 Entfernungsberechnung

Die vom Nutzer eingegebene Postleitzahl wird über die kostenlose Nominatim API (OpenStreetMap) in Koordinaten umgewandelt.

Die Entfernung zu jedem Tierheim wird dann mit der Haversine-Formel berechnet.

Tierheime mit mehr als 200 km Entfernung (~2 Stunden Fahrt) werden ausgeblendet.


🎨 Design

ElementWertHintergrund#fffaeaPrimärfarbe (Dunkel)#4a3f35Akzentfarbe (Grün)#8a9e78Display-SchriftPlayfair DisplayBody-SchriftInter


📊 Datenquellen (Startseite)

Die auf der Startseite angezeigten Statistiken stammen aus offiziellen Quellen:


Deutscher Tierschutzbund – Tierheime
Thieme Tiermedizin – Tierheime überfüllt
Tierschutzbund – Animal Hoarding Bericht 2024



⚠️ Hinweis

Alle Tierprofile, Tierheim-Namen, Kontaktdaten und Adressen sind fiktiv und dienen ausschließlich Demonstrationszwecken. Die dargestellten Tierheime existieren in dieser Form nicht.


👩‍💻 Entwicklung

Entwickelt im Rahmen eines Hochschulprojekts.

Technische Umsetzung: HTML · CSS · JavaScript · Supabase


https://DEIN-GITHUB-USERNAME.github.io/DEIN-REPOSITORY-NAME
Weil jedes Tier die Chance verdient, geliebt zu werden. 🐾
