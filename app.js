<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tiermatcher – Finde dein perfektes Haustier</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <!-- ═══════════════════════════════════════
       NAVBAR
  ═══════════════════════════════════════ -->
  <nav class="navbar" id="navbar">
    <div class="nav-inner">
      <a href="#hero" class="nav-logo">
        <img src="assets/logo.png" alt="Tiermatcher – Finde dein perfektes Haustier" class="nav-logo-img" />
      </a>
      <ul class="nav-links">
        <li><a href="#hero" class="nav-link active">Startseite</a></li>
        <li><a href="#fakten" class="nav-link">Fakten</a></li>
        <li><a href="#quiz-section" class="nav-link">Quiz</a></li>
      </ul>
      <button class="nav-burger" id="navBurger" aria-label="Menü öffnen">
        <span></span><span></span><span></span>
      </button>
    </div>
    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
      <a href="#hero" class="mobile-link">Startseite</a>
      <a href="#fakten" class="mobile-link">Fakten</a>
      <a href="#quiz-section" class="mobile-link">Quiz</a>
    </div>
  </nav>

  <!-- ═══════════════════════════════════════
       HERO
  ═══════════════════════════════════════ -->
  <section class="hero" id="hero">

    <!-- Header Image - full width -->
    <div class="hero-header-img-wrap">
      <img
        src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600&q=80"
        alt="Hund und Katze zusammen"
        class="hero-header-img"
      />
    </div>

    <!-- Content grid below image -->
    <div class="hero-grid">
      <div class="hero-content">
        <span class="hero-eyebrow">Verantwortungsvolle Tiervermittlung</span>
        <h1 class="hero-title">
          Jedes Tier verdient<br />
          <em>ein Zuhause voller Liebe.</em>
        </h1>
        <p class="hero-subtitle">
          Tausende Tiere warten in deutschen Tierheimen auf eine zweite Chance.
          <span class="highlight">Unser Quiz zeigt dir, welches Tier wirklich zu deinem Leben passt — für dich und das Tier.</span>
        </p>
        <p class="hero-subtitle">
          Du erhältst direkt passende Tierprofile aus Tierheimen in deiner Nähe,
          inklusive Fotos, Infos und Kontaktdaten. So kannst du sofort den
          ersten Schritt Richtung Adoption machen.
        </p>
        <div class="hero-actions">
          <a href="#quiz-section" class="btn-primary">Hier geht's zum Quiz</a>
          <a href="#fakten" class="btn-ghost">Mehr erfahren</a>
        </div>
      </div>

      <div class="hero-note">
        <h3 class="hero-note-title">Ehrlichkeit ist die größte Form von Fürsorge.</h3>
        <p class="hero-note-text">
          Bitte nimm dir einen Moment Zeit und beantworte die Fragen so ehrlich
          und gewissenhaft wie möglich. Es geht bei diesem Quiz nicht darum,
          das „perfekte" Haustier zu finden. Viel wichtiger ist, herauszufinden,
          welches Tier wirklich zu deinem Alltag, deiner Wohnsituation, deinem
          Zeitbudget und deinen Erwartungen passt.
        </p>
        <p class="hero-note-text">
          Jedes Tier hat einen eigenen Charakter, individuelle Bedürfnisse und
          verdient ein Zuhause, in dem es langfristig glücklich sein kann.
        </p>
        <p class="hero-note-text">
          Auf Grundlage deiner Antworten zeigen wir dir passende Tierprofile
          aus Tierheimen, die aktuell auf ein neues Zuhause warten. Je
          ehrlicher du antwortest, desto besser können wir Tiere finden, die
          zu deinem Lebensstil passen – und denen du die besten
          Voraussetzungen für ein glückliches Leben bieten kannst.
        </p>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       FAKTEN & ZAHLEN
  ═══════════════════════════════════════ -->
  <section class="fakten" id="fakten">
    <div class="section-inner">
      <span class="section-eyebrow">Zahlen & Fakten</span>
      <h2 class="section-title">Die Realität in deutschen Tierheimen</h2>

      <!-- Full-width appell box including source text -->
      <div class="fakten-appell">
        <h3 class="fakten-appell-title">Diese Zahlen haben einen Grund.</h3>
        <p>
          Tiere werden oft unüberlegt angeschafft und dann abgegeben, wenn der
          Alltag die Realität einholt. <strong>Unser Quiz soll das verhindern</strong> —
          durch ehrliche Fragen, die helfen, die richtige Entscheidung zu treffen.
          Diese Zahlen stammen aus offiziellen Quellen des
          <a href="https://www.tierschutzbund.de" target="_blank" rel="noopener" class="source-link">Deutschen Tierschutzbundes</a>.
          Sie zeigen, warum eine durchdachte Tiervermittlung so wichtig ist.
        </p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <!-- Haus Icon -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 11.5 12 4l9 7.5"/>
              <path d="M5 10v9.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
              <path d="M9.5 20.5V14h5v6.5"/>
            </svg>
          </div>
          <div class="stat-num">~550</div>
          <div class="stat-label">Tierheime in Deutschland</div>
          <p class="stat-desc">
            Dem Deutschen Tierschutzbund sind über 740 Tierschutzvereine
            mit rund 550 vereinseigenen Tierheimen angeschlossen.
          </p>
          <a href="https://www.tierschutzbund.de/tiere-themen/heimtiere/tierheime/" target="_blank" rel="noopener" class="stat-source">Quelle: Tierschutzbund.de →</a>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <!-- Warnzeichen Icon -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2 2 20h20L12 2Z"/>
              <line x1="12" y1="9" x2="12" y2="14"/>
              <line x1="12" y1="17" x2="12" y2="17.01"/>
            </svg>
          </div>
          <div class="stat-num">100%</div>
          <div class="stat-label">Tierheime sind voll</div>
          <p class="stat-desc">
            Dem Tierschutzbund ist aktuell kein einziges Tierheim in
            Deutschland bekannt, das nicht voll oder sogar überfüllt ist.
            Viele verhängen Aufnahmestopps.
          </p>
          <a href="https://tiermedizin.thieme.de/aktuelles/vet-news/detail/deutschlands-tierheime-dramatisch-ueberfuellt-1076" target="_blank" rel="noopener" class="stat-source">Quelle: Thieme Tiermedizin →</a>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <!-- Alarm/Glocke Icon -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
          <div class="stat-num">8.911</div>
          <div class="stat-label">Tiere durch Animal Hoarding (2024)</div>
          <p class="stat-desc">
            147 Fälle von <abbr title="Animal Hoarding: krankhaftes Tiersammeln. Menschen häufen unkontrolliert immer mehr Tiere an, ohne sie angemessen versorgen zu können. Die Tiere leben oft auf engstem Raum, unterernährt und krank.">Animal Hoarding</abbr>
            mit 8.911 betroffenen Tieren wurden 2024 erfasst — ein trauriger Rekord.
            Die überfüllten Tierheime müssen diese Tiere zusätzlich aufnehmen.
          </p>
          <a href="https://www.tierschutzbund.de/ueber-uns/aktuelles/presse/meldung/tierschutzbund-veroeffentlicht-animal-hoarding-bericht-fuer-2024/" target="_blank" rel="noopener" class="stat-source">Quelle: Tierschutzbund.de →</a>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <!-- Stopp-Schild Icon -->
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7.5 2h9L21 6.5v9L16.5 20h-9L3 15.5v-9L7.5 2Z"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
            </svg>
          </div>
          <div class="stat-num">Wochen</div>
          <div class="stat-label">Wartezeit für Abgabe in München</div>
          <p class="stat-desc">
            Wer sein Tier in München abgeben möchte, wartet teilweise mehrere
            Wochen oder Monate — so überfüllt sind die Kapazitäten.
            Ein klares Zeichen: Jede Adoption muss wohlüberlegt sein.
          </p>
          <a href="https://tiermedizin.thieme.de/aktuelles/vet-news/detail/deutschlands-tierheime-dramatisch-ueberfuellt-1076" target="_blank" rel="noopener" class="stat-source">Quelle: Thieme Tiermedizin →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       QUIZ SECTION
  ═══════════════════════════════════════ -->
  <section class="quiz-section" id="quiz-section">
    <div class="section-inner">
      <span class="section-eyebrow">Das Quiz</span>
      <h2 class="section-title">Welches Tier passt zu dir?</h2>
      <p class="section-sub">
        Beantworte alle Fragen so ehrlich wie möglich.
        Am Ende findest du dein persönliches Tier-Match aus echten Tierheimen in deiner Nähe.
      </p>

      <!-- Progress Bar -->
      <div class="quiz-progress-wrap" id="quizProgressWrap">
        <div class="quiz-progress-info">
          <span id="progressLabel">Frage 1 von 15</span>
          <span id="progressPercent">0%</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" id="progressFill"></div>
        </div>
      </div>

      <!-- Quiz Container -->
      <div class="quiz-container" id="quizContainer">

        <!-- F0: Standort -->
        <div class="quiz-step active" data-step="0">
          <div class="step-header">
            <span class="step-tag">Einstieg</span>
            <h3 class="step-title">Wo wohnst du?</h3>
            <p class="step-desc">Damit wir Tierheime in deiner Nähe finden können (max. 2h Fahrt).</p>
          </div>
          <div class="input-group">
            <label for="inputPlz">Deine Postleitzahl</label>
            <input type="text" id="inputPlz" placeholder="z.B. 97070" maxlength="5" class="text-input" />
            <span class="input-hint">Nur für die Entfernungsberechnung — wird nicht gespeichert.</span>
          </div>
          <div class="step-nav">
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F0b: Wunschtier -->
        <div class="quiz-step" data-step="1">
          <div class="step-header">
            <span class="step-tag">Dein Wunsch</span>
            <h3 class="step-title">Hast du schon ein Tier im Kopf?</h3>
            <p class="step-desc">Das beeinflusst nicht das Ergebnis — aber wir zeigen dir am Ende auch einen "Wunsch-Weg" wenn dein Traumtier etwas anders ist als die Empfehlung.</p>
          </div>
          <div class="choice-grid" data-question="wunschtier">
            <button class="choice-card" data-value="offen">Ich bin offen</button>
            <button class="choice-card" data-value="hund">Hund</button>
            <button class="choice-card" data-value="katze">Katze</button>
            <button class="choice-card" data-value="kleintier">Kleintier</button>
            <button class="choice-card" data-value="vogel">Vogel</button>
            <button class="choice-card" data-value="fisch">Fisch</button>
            <button class="choice-card" data-value="unsicher">Noch unsicher</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F1: Wohnsituation -->
        <div class="quiz-step" data-step="2">
          <div class="step-header">
            <span class="step-tag">Kategorie 1 · Wohnsituation</span>
            <h3 class="step-title">Wie wohnst du aktuell?</h3>
            <p class="step-desc">Der Platz, den du zur Verfügung hast, ist einer der wichtigsten Faktoren.</p>
          </div>
          <div class="choice-grid" data-question="wohnsituation">
            <button class="choice-card" data-value="klein_ohne">Kleine Wohnung ohne Balkon</button>
            <button class="choice-card" data-value="wohnung_balkon">Wohnung mit Balkon / Terrasse</button>
            <button class="choice-card" data-value="haus_garten">Haus mit Garten</button>
            <button class="choice-card" data-value="haus_grosser_garten">Haus mit großem Garten</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F2: Haushalt -->
        <div class="quiz-step" data-step="3">
          <div class="step-header">
            <span class="step-tag">Kategorie 1 · Wohnsituation</span>
            <h3 class="step-title">Wer lebt noch in deinem Haushalt?</h3>
            <p class="step-desc">Das soziale Umfeld beeinflusst, welche Tiere gut passen.</p>
          </div>
          <div class="choice-grid choice-grid--wide" data-question="haushalt">
            <button class="choice-card" data-value="allein">Ich lebe allein</button>
            <button class="choice-card" data-value="partner">Mit Partner/in</button>
            <button class="choice-card" data-value="kinder_klein">Mit Kindern (unter 12)</button>
            <button class="choice-card" data-value="kinder_gross">Mit Kindern (über 12)</button>
            <button class="choice-card" data-value="wg">WG / Mitbewohner</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F3: Vorhandene Tiere -->
        <div class="quiz-step" data-step="4">
          <div class="step-header">
            <span class="step-tag">Kategorie 1 · Wohnsituation</span>
            <h3 class="step-title">Gibt es bereits andere Haustiere bei dir?</h3>
            <p class="step-desc">Die Verträglichkeit mit anderen Tieren ist wichtig.</p>
          </div>
          <div class="choice-grid choice-grid--wide" data-question="vorhandene_tiere">
            <button class="choice-card" data-value="keine">Nein, keine</button>
            <button class="choice-card" data-value="hund">Hund</button>
            <button class="choice-card" data-value="katze">Katze</button>
            <button class="choice-card" data-value="fische">Fische</button>
            <button class="choice-card" data-value="hamster">Hamster</button>
            <button class="choice-card" data-value="hase">Hase / Kaninchen</button>
            <button class="choice-card" data-value="vogel">Vogel</button>
            <button class="choice-card choice-card--dashed" data-value="sonstiges">Sonstiges</button>
          </div>
          <div class="sonstiges-input" id="sonstigesInput" style="display:none;">
            <input type="text" id="sonstigesText" placeholder="z.B. Schlange, Ratte …" class="text-input" />
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F4: Stunden außer Haus -->
        <div class="quiz-step" data-step="5">
          <div class="step-header">
            <span class="step-tag">Kategorie 2 · Zeit & Alltag</span>
            <h3 class="step-title">Wie viele Stunden bist du täglich außer Haus?</h3>
            <p class="step-desc">Tiere reagieren sehr unterschiedlich auf Alleinsein.</p>
          </div>
          <div class="choice-grid" data-question="stunden_weg">
            <button class="choice-card" data-value="unter4">Unter 4 Stunden</button>
            <button class="choice-card" data-value="vier_acht">4–8 Stunden</button>
            <button class="choice-card" data-value="ueber8">Über 8 Stunden</button>
            <button class="choice-card" data-value="unregelmaessig">Sehr unregelmäßig</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F5: Aktive Zeit -->
        <div class="quiz-step" data-step="6">
          <div class="step-header">
            <span class="step-tag">Kategorie 2 · Zeit & Alltag</span>
            <h3 class="step-title">Wie viel Zeit kannst du täglich aktiv mit einem Tier verbringen?</h3>
            <p class="step-desc">Spielen, Gassi gehen, Beschäftigung — wie viel ist realistisch?</p>
          </div>
          <div class="choice-grid" data-question="aktive_zeit">
            <button class="choice-card" data-value="unter30">Unter 30 Minuten</button>
            <button class="choice-card" data-value="dreissig_sechzig">30–60 Minuten</button>
            <button class="choice-card" data-value="ein_drei">1–3 Stunden</button>
            <button class="choice-card" data-value="ueber3">Über 3 Stunden</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F6: Reisen -->
        <div class="quiz-step" data-step="7">
          <div class="step-header">
            <span class="step-tag">Kategorie 2 · Zeit & Alltag</span>
            <h3 class="step-title">Wie oft verreist du im Jahr?</h3>
            <p class="step-desc">Tiere brauchen auch in deiner Abwesenheit Betreuung.</p>
          </div>
          <div class="choice-grid" data-question="reisen">
            <button class="choice-card" data-value="kaum">Kaum / nie</button>
            <button class="choice-card" data-value="ein_zwei">1–2x kurz (unter 1 Woche)</button>
            <button class="choice-card" data-value="mehrmals">Mehrmals im Jahr</button>
            <button class="choice-card" data-value="sehr_oft">Sehr oft / langfristig</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F7: Aktivitätslevel -->
        <div class="quiz-step" data-step="8">
          <div class="step-header">
            <span class="step-tag">Kategorie 3 · Aktivität & Lebensstil</span>
            <h3 class="step-title">Wie würdest du deinen Aktivitätslevel beschreiben?</h3>
            <p class="step-desc">Das passende Tier sollte deiner eigenen Energie entsprechen.</p>
          </div>
          <div class="choice-grid" data-question="aktivitaet">
            <button class="choice-card" data-value="ruhig">Eher ruhig / homebody</button>
            <button class="choice-card" data-value="moderat">Moderat aktiv</button>
            <button class="choice-card" data-value="aktiv">Sehr aktiv / Sport</button>
            <button class="choice-card" data-value="outdoor">Outdoor-begeistert</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F8: Alltag mit Tier -->
        <div class="quiz-step" data-step="9">
          <div class="step-header">
            <span class="step-tag">Kategorie 3 · Aktivität & Lebensstil</span>
            <h3 class="step-title">Was stellst du dir als Alltag mit deinem Tier vor?</h3>
            <p class="step-desc">Deine Vision vom gemeinsamen Leben ist der wichtigste Anhaltspunkt.</p>
          </div>
          <div class="choice-grid" data-question="alltag">
            <button class="choice-card" data-value="ruhig">Ruhige Gesellschaft</button>
            <button class="choice-card" data-value="spiel">Spiel & Interaktion</button>
            <button class="choice-card" data-value="draussen">Draußen-Abenteuer</button>
            <button class="choice-card" data-value="training">Training & Aufgaben</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F9: Geräusche -->
        <div class="quiz-step" data-step="10">
          <div class="step-header">
            <span class="step-tag">Kategorie 3 · Aktivität & Lebensstil</span>
            <h3 class="step-title">Wie empfindlich reagierst du auf Geräusche zu Hause?</h3>
            <p class="step-desc">Hunde bellen, Vögel sind laut — das ist wichtig zu bedenken.</p>
          </div>
          <div class="choice-grid" data-question="geraeusche">
            <button class="choice-card" data-value="kein_problem">Kein Problem, gerne lebhaft</button>
            <button class="choice-card" data-value="etwas_ok">Etwas Lärm ist ok</button>
            <button class="choice-card" data-value="viel_ruhe">Ich brauche viel Ruhe</button>
            <button class="choice-card" data-value="nachbarn">Nachbarn könnten ein Problem sein</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F10: Erfahrung -->
        <div class="quiz-step" data-step="11">
          <div class="step-header">
            <span class="step-tag">Kategorie 4 · Erfahrung & Bereitschaft</span>
            <h3 class="step-title">Hast du schon Erfahrung mit Haustieren?</h3>
            <p class="step-desc">Manche Tiere brauchen erfahrenere Halter als andere.</p>
          </div>
          <div class="choice-grid" data-question="erfahrung">
            <button class="choice-card" data-value="keine">Noch gar keine</button>
            <button class="choice-card" data-value="kind">Als Kind gehabt</button>
            <button class="choice-card" data-value="etwas">Einige Erfahrung</button>
            <button class="choice-card" data-value="erfahren">Erfahrener Tierhalter</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F11: Kuscheln -->
        <div class="quiz-step" data-step="12">
          <div class="step-header">
            <span class="step-tag">Kategorie 4 · Erfahrung & Bereitschaft</span>
            <h3 class="step-title">Wie wichtig ist dir körperlicher Kontakt / Kuscheln?</h3>
            <p class="step-desc">Nicht alle Tiere mögen engen Körperkontakt.</p>
          </div>
          <div class="choice-grid" data-question="kuscheln">
            <button class="choice-card" data-value="sehr_wichtig">Sehr wichtig</button>
            <button class="choice-card" data-value="schoen">Schön, aber nicht nötig</button>
            <button class="choice-card" data-value="unwichtig">Eher unwichtig</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F12: Budget -->
        <div class="quiz-step" data-step="13">
          <div class="step-header">
            <span class="step-tag">Kategorie 4 · Erfahrung & Bereitschaft</span>
            <h3 class="step-title">Wie groß ist dein monatliches Budget für ein Haustier?</h3>
            <p class="step-desc">
              Bitte sei ehrlich — Tiere kosten mehr als viele denken.
              Neben monatlichen Kosten empfehlen wir eine
              <strong>Notfallreserve von 500–2.000 €</strong> für unvorhergesehene Tierarztkosten.
            </p>
          </div>
          <div class="budget-info">
            <div class="budget-row">
              <span>Hund</span><span class="budget-val">ca. 80–150 €/Monat</span>
            </div>
            <div class="budget-row">
              <span>Katze</span><span class="budget-val">ca. 50–90 €/Monat</span>
            </div>
            <div class="budget-row">
              <span>Kleintier</span><span class="budget-val">ca. 20–35 €/Monat</span>
            </div>
            <div class="budget-row">
              <span>Vogel</span><span class="budget-val">ca. 35–60 €/Monat</span>
            </div>
            <div class="budget-row">
              <span>Fische</span><span class="budget-val">ca. 15–25 €/Monat</span>
            </div>
          </div>
          <div class="choice-grid" data-question="budget">
            <button class="choice-card" data-value="unter50">Unter 50 €</button>
            <button class="choice-card" data-value="fuenfzig_150">50–150 €</button>
            <button class="choice-card" data-value="ein50_300">150–300 €</button>
            <button class="choice-card" data-value="kein_limit">Kein festes Limit</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F13: Charaktereigenschaft -->
        <div class="quiz-step" data-step="14">
          <div class="step-header">
            <span class="step-tag">Kategorie 5 · Persönlichkeit</span>
            <h3 class="step-title">Welche Eigenschaft ist dir bei einem Tier am wichtigsten?</h3>
            <p class="step-desc">Dein persönliches Herz-Kriterium.</p>
          </div>
          <div class="choice-grid" data-question="charakter">
            <button class="choice-card" data-value="treue">Treue / starke Bindung</button>
            <button class="choice-card" data-value="selbststaendig">Selbstständigkeit</button>
            <button class="choice-card" data-value="verspielt">Verspieltheit</button>
            <button class="choice-card" data-value="ruhe">Ruhe & Sanftheit</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-next" onclick="App.nextStep()">Weiter →</button>
          </div>
        </div>

        <!-- F14: Allergie -->
        <div class="quiz-step" data-step="15">
          <div class="step-header">
            <span class="step-tag">Kategorie 5 · Persönlichkeit</span>
            <h3 class="step-title">Hast du Allergien oder Empfindlichkeiten gegenüber Tierhaaren?</h3>
            <p class="step-desc">Das ist gesundheitsrelevant und beeinflusst die Empfehlung direkt.</p>
          </div>
          <div class="choice-grid" data-question="allergie">
            <button class="choice-card" data-value="nein">Nein</button>
            <button class="choice-card" data-value="leicht">Leichte Allergie</button>
            <button class="choice-card" data-value="stark">Starke Allergie</button>
            <button class="choice-card" data-value="unsicher">Bin unsicher</button>
          </div>
          <div class="step-nav">
            <button class="btn-back" onclick="App.prevStep()">← Zurück</button>
            <button class="btn-submit" onclick="App.submitQuiz()">
              Mein Match finden
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div class="quiz-step quiz-loading" data-step="loading" style="display:none;">
          <div class="loading-inner">
            <div class="loading-paw">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <ellipse cx="12" cy="16" rx="5.5" ry="4.5"/>
                <ellipse cx="6" cy="9" rx="2" ry="2.6"/>
                <ellipse cx="10.5" cy="6" rx="2" ry="2.6"/>
                <ellipse cx="15.5" cy="6" rx="2" ry="2.6"/>
                <ellipse cx="18.5" cy="9" rx="2" ry="2.6"/>
              </svg>
            </div>
            <h3>Wir suchen dein perfektes Tier…</h3>
            <p>Wir gleichen deine Antworten mit unserer Datenbank ab und berechnen die Entfernung zu Tierheimen in deiner Nähe.</p>
            <div class="loading-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

      </div><!-- /quiz-container -->
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       ERGEBNIS MODAL
  ═══════════════════════════════════════ -->
  <div class="modal-overlay" id="resultModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal" id="modalInner">
      <button class="modal-close" onclick="App.closeModal()" aria-label="Schließen">✕</button>

      <div class="modal-content" id="modalContent">
        <!-- wird dynamisch befüllt -->
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════
       FOOTER
  ═══════════════════════════════════════ -->
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="assets/logo_negativ.png" alt="Tiermatcher – Finde dein perfektes Haustier" class="footer-logo-img" />
      </div>
      <div class="footer-links">
        <p>Datenquellen</p>
        <a href="https://www.tierschutzbund.de" target="_blank" rel="noopener">Deutscher Tierschutzbund</a>
        <a href="https://tiermedizin.thieme.de" target="_blank" rel="noopener">Thieme Tiermedizin</a>
      </div>
      <div class="footer-note">
        <p>
          Alle Tierprofile sind fiktiv und dienen ausschließlich
          Demonstrations­zwecken. Die dargestellten Tierheime,
          Kontaktdaten und Tiere existieren in dieser Form nicht.
        </p>
      </div>
    </div>
  </footer>

  <script src="app.js"></script>
</body>
</html>
