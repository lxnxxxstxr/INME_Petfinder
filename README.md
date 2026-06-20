Tiermatcher – Finde dein perfektes Haustier
Eine interaktive Webseite zur verantwortungsvollen Tiervermittlung.
Entwickelt als Studienprojekt mit HTML, CSS, JavaScript und Supabase.
---
Projektbeschreibung
Tiermatcher ist ein interaktives Quiz, das Nutzerinnen und Nutzern dabei hilft,
das passende Haustier für ihren Lebensstil zu finden – und sie mit passenden
Tierheim-Profilen in ihrer Nähe zu verbinden.
Das Projekt verbindet emotionales Storytelling mit verantwortungsvoller
Aufklärung: Wer ein Tier adoptiert, soll das bewusst und informiert tun –
zum Wohl des Tieres.
---
Live Demo
Zur Webseite: https://DEIN-GITHUB-USERNAME.github.io/DEIN-REPOSITORY-NAME
---
Technologien
Technologie	Verwendung
HTML5	Struktur und Semantik
CSS3	Design, Layout, Animationen
JavaScript (Vanilla)	Quiz-Logik, API-Kommunikation
Supabase	Datenbank mit fiktiven Tierprofilen
Nominatim / OpenStreetMap	PLZ zu Koordinaten, kostenlos, ohne API-Key
Google Fonts	Playfair Display und Inter
---
Projektstruktur
```
tiermatcher/
│
├── index.html              Startseite, Quiz, Ergebnis-Modal
├── styles.css               Komplettes Styling inklusive Farbpalette und Responsive Design
├── app.js                    Quiz-Logik, Supabase-Anbindung, Empfehlungsalgorithmus
├── assets/
│   ├── logo.png              Logo für Navbar und helle Hintergründe
│   └── logo_negativ.png      Logo-Variante für den dunklen Footer
└── README.md                 Diese Datei
```
---
Entstehungsgeschichte des Projekts
Das Projekt wurde Schritt für Schritt entwickelt. Die folgende Übersicht
zeigt den chronologischen Ablauf der wichtigsten Entscheidungen.
1. Konzeption des Quiz
Zunächst wurde der Fragenkatalog entwickelt: 15 Fragen in 5 Kategorien
(Wohnsituation, Zeit und Alltag, Aktivität und Lebensstil, Erfahrung und
Bereitschaft, Persönlichkeit), ergänzt um eine Eröffnungsfrage zur
Postleitzahl und eine Frage zum Wunschtier. Jede Frage erhielt eine
Gewichtung von 1 bis 5, je nachdem wie stark sie zwischen den Tierarten
unterscheidet.
2. Auswertungslogik
Auf Basis der Fragen wurde eine zweistufige Punktelogik entworfen:
Stufe 1 ordnet jeder Antwort Punkte für die fünf Tierarten zu
(Hund, Katze, Kleintier, Vogel, Fisch). Stufe 2 verfeinert das Ergebnis
anhand individueller Rasseneigenschaften aus der Datenbank. Ergänzt wurde
ein "Wunsch-Weg": Wenn das gewünschte Tier von der Empfehlung abweicht,
wird zusätzlich das am besten passende Tier der Wunsch-Tierart angezeigt,
verbunden mit einem Appell zum Tierwohl.
3. Aufbau der Datenbank
Es wurden fiktive Tierprofile für alle fünf Tierarten erstellt, zunächst
35 Profile (7 pro Tierart), später erweitert auf 95 Profile mit deutlich
mehr Hunden und Katzen, da diese in der Realität die mit Abstand häufigsten
Tiere in deutschen Tierheimen sind. Die Tierheime wurden über ganz
Deutschland verteilt (unter anderem München, Hamburg, Berlin, Köln,
Stuttgart, Dresden, Leipzig sowie kleinere Städte wie Lohr am Main und
Gemünden am Main), inklusive realistischer Adressen, Telefonnummern,
E-Mail-Adressen und Geokoordinaten für die Entfernungsberechnung.
4. Anbindung an Supabase
Die Tierprofile wurden in eine Supabase-Tabelle namens `tierprofile`
importiert. Über Row Level Security wurde sichergestellt, dass die
Datenbank von außen nur lesend zugänglich ist.
5. Umsetzung als Webseite
Die Inhalte wurden in eine Startseite mit Hero-Bereich, einer Fakten-Sektion
mit Quellenangaben des Deutschen Tierschutzbundes, dem mehrstufigen Quiz
und einem Ergebnis-Modal überführt. Die Datenbankanbindung erfolgt direkt
im Frontend über die Supabase-API, die Entfernungsberechnung über die
Nominatim-API und die Haversine-Formel.
6. Designanpassungen
Im letzten Schritt wurde das Corporate Design verfeinert: ein eigens
erstelltes Logo wurde eingebunden, die Farbpalette und Typografie
abgestimmt, Inhalte wie der Hinweistext zur Ehrlichkeit beim Ausfüllen
des Quiz mehrfach überarbeitet, und kleinere Darstellungsfehler
(zum Beispiel bei der Bildausrichtung in den Tierkarten) behoben.
---
Das zweistufige Empfehlungssystem
Stufe 1: Tierartklassifikation
Nach Abschluss des Quiz werden die Antworten lokal im JavaScript ausgewertet.
Jede Antwort vergibt gewichtete Punkte auf ein Konto für Hund, Katze,
Kleintier, Vogel und Fisch. Die Gewichtungen richten sich danach, wie stark
die jeweilige Frage zwischen den Tierarten unterscheidet:
Gewichtung 5 (zum Beispiel Wohnsituation, Stunden außer Haus, Allergie): entscheidend
Gewichtung 4 (zum Beispiel Aktivitätslevel, Kuschelbedarf): sehr wichtig
Gewichtung 3 (zum Beispiel Reisen, Geräusche, Erfahrung): relevant
Gewichtung 2 (zum Beispiel Budget): ergänzend
Zusätzlich erhalten Hund und Katze einen kleinen Realitäts-Bonus, da sie in
deutschen Tierheimen mit Abstand am häufigsten vertreten sind. Die
Wohnsituations-Frage wirkt sich nur noch auf Hund und Katze aus, da Fisch,
Vogel und Kleintier in Aquarium, Käfig oder Gehege leben und nicht von
Garten oder Wohnungsgröße abhängen.
Die Tierart mit dem höchsten Score ergibt die Empfehlung.
Stufe 2: Rassenranking über Supabase
Nach der Tierartklassifikation werden alle Tiere der empfohlenen Art aus
der Supabase-Datenbank geladen. Jedes Tier erhält einen individuellen
Rassen-Score basierend auf:
Platzbedarf im Verhältnis zur Wohnsituation
Aktivitätslevel des Tieres im Verhältnis zum Nutzer
Erfahrungsanforderung im Verhältnis zur Tierhalter-Erfahrung
Allergierisiko
Lärmempfindlichkeit
Kuschelfaktor
Die drei Tiere mit den höchsten Scores und der kürzesten Entfernung werden
als Top-3-Empfehlung angezeigt.
Der Wunsch-Weg
Hat die Person zu Beginn ein bestimmtes Tier angegeben, das von der
Empfehlung abweicht, erscheint zusätzlich ein eigener Abschnitt mit dem
am besten passenden Tier der gewünschten Art, verbunden mit einem Appell
zum Tierwohl und dem Hinweis, dass jede Adoption eine Verpflichtung auf
Lebenszeit ist.
---
Datenbank (Supabase)
Tabelle: `tierprofile`
Die Datenbank enthält 95 fiktive Tierprofile, davon 37 Hunde, 37 Katzen,
7 Kleintiere, 7 Vögel und 7 Fische. Diese Verteilung spiegelt die reale
Situation in deutschen Tierheimen wider, in denen Hunde und Katzen die
mit Abstand größte Gruppe darstellen.
Wichtige Spalten für das Empfehlungssystem:
Spalte	Beschreibung
art	Tierart: hund, katze, kleintier, vogel, fisch
platzbedarf	klein, mittel, gross
aktivitaet	niedrig, mittel, hoch, sehr_hoch
erfahrung_noetig	gering, mittel, hoch
allergierisiko	gering, mittel, hoch, kein
laerm_level	niedrig, mittel, hoch, sehr_hoch
kuschelfaktor	gering, mittel, hoch, sehr_hoch, kein
tierheim_lat / tierheim_lng	Koordinaten für die Entfernungsberechnung
tierheim_telefon	Kontakttelefon
tierheim_email	Kontakt-E-Mail
tierheim_maps_url	Link zu Google Maps
Row Level Security
Damit die Datenbank öffentlich lesbar, aber nicht schreibbar ist, ist
folgende Policy gesetzt:
```sql
ALTER TABLE tierprofile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Oeffentlich lesbar"
ON tierprofile
FOR SELECT
TO anon
USING (true);
```
---
Entfernungsberechnung
Die eingegebene Postleitzahl wird über die kostenlose Nominatim-API
(OpenStreetMap) in Koordinaten umgewandelt. Die Entfernung zu jedem
Tierheim wird anschließend mit der Haversine-Formel berechnet. Tierheime
mit mehr als 200 Kilometern Entfernung, also etwa mehr als zwei Stunden
Fahrtzeit, werden ausgeblendet.
---
Design
Element	Wert
Hintergrund	#fdfcf5
Primärfarbe, dunkel	#4a3f35
Akzentfarbe, grün	#8a9e78
Hinweisfarbe, hell	#e8dcc7
Display-Schrift	Playfair Display
Body-Schrift	Inter
---
Datenquellen für die Startseite
Die auf der Startseite angezeigten Statistiken stammen aus offiziellen
Quellen:
Deutscher Tierschutzbund, Tierheime: https://www.tierschutzbund.de/tiere-themen/heimtiere/tierheime/
Deutscher Tierschutzbund, Animal Hoarding: https://www.tierschutzbund.de/tiere-themen/tiernotfaelle/animal-hoarding/
Thieme Tiermedizin, überfüllte Tierheime: https://tiermedizin.thieme.de/aktuelles/vet-news/detail/deutschlands-tierheime-dramatisch-ueberfuellt-1076
---
Hinweis
Alle Tierprofile, Tierheim-Namen, Kontaktdaten und Adressen sind fiktiv
und dienen ausschließlich Demonstrationszwecken. Die dargestellten
Tierheime existieren in dieser Form nicht.
---
Entwicklung
Entwickelt im Rahmen eines Hochschulprojekts.
Technische Umsetzung: HTML, CSS, JavaScript, Supabase.
