/* ═══════════════════════════════════════════════
   PFOTENFINDER – APP.JS
   Zweistufiges Empfehlungssystem:
   1. Tierartklassifikation (Scoring)
   2. Rassenranking via Supabase API
═══════════════════════════════════════════════ */

/* ── Supabase Konfiguration ── */
const SUPABASE_URL = 'https://fmkxzfplndztpqagojyj.supabase.co';
const SUPABASE_KEY = 'sb_publishable__ZSVo2dDpjPMQsDAiCUwXw_xU7KeZL7';
const TABLE_NAME   = 'tierprofile';

/* ── App Namespace ── */
const App = (() => {

  /* ─── State ─── */
  let currentStep = 0;
  const TOTAL_STEPS = 16; // 0–15
  const answers = {};

  /* ─────────────────────────────────────────
     QUIZ NAVIGATION
  ───────────────────────────────────────── */
  function nextStep() {
    // Validierung
    if (!validateStep(currentStep)) return;

    const steps = document.querySelectorAll('.quiz-step[data-step]');

    // Aktuellen Step verstecken
    steps.forEach(s => s.classList.remove('active'));

    currentStep++;
    const nextEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    if (nextEl) {
      nextEl.style.display = '';
      nextEl.classList.add('active');
    }

    updateProgress();
    window.scrollTo({ top: document.getElementById('quiz-section').offsetTop - 80, behavior: 'smooth' });
  }

  function prevStep() {
    if (currentStep <= 0) return;
    const steps = document.querySelectorAll('.quiz-step[data-step]');
    steps.forEach(s => s.classList.remove('active'));
    currentStep--;
    const prevEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    if (prevEl) {
      prevEl.style.display = '';
      prevEl.classList.add('active');
    }
    updateProgress();
  }

  function updateProgress() {
    const percent = Math.round((currentStep / (TOTAL_STEPS - 1)) * 100);
    const fill = document.getElementById('progressFill');
    const label = document.getElementById('progressLabel');
    const pct = document.getElementById('progressPercent');
    if (fill)  fill.style.width = percent + '%';
    if (pct)   pct.textContent = percent + '%';
    if (label) {
      const questionNum = Math.max(1, currentStep);
      label.textContent = `Frage ${questionNum} von ${TOTAL_STEPS - 1}`;
    }
  }

  function validateStep(step) {
    // Step 0: PLZ
    if (step === 0) {
      const plz = document.getElementById('inputPlz').value.trim();
      if (!plz || !/^\d{5}$/.test(plz)) {
        showInputError('inputPlz', 'Bitte gib eine gültige 5-stellige Postleitzahl ein.');
        return false;
      }
      answers.plz = plz;
      return true;
    }

    // Choice-Grid Steps: Auswahl prüfen
    const stepEl = document.querySelector(`.quiz-step[data-step="${step}"]`);
    if (!stepEl) return true;

    const grid = stepEl.querySelector('.choice-grid');
    if (!grid) return true;

    const question = grid.dataset.question;
    const selected = grid.querySelector('.choice-card.selected');

    if (!selected) {
      flashGrid(grid);
      return false;
    }

    // Sonstiges Freitext
    if (question === 'vorhandene_tiere' && selected.dataset.value === 'sonstiges') {
      const text = document.getElementById('sonstigesText')?.value.trim() || '';
      answers[question] = 'sonstiges:' + text;
    } else {
      answers[question] = selected.dataset.value;
    }

    return true;
  }

  function showInputError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '#e74c3c';
    el.focus();
    let hint = el.parentElement.querySelector('.error-hint');
    if (!hint) {
      hint = document.createElement('span');
      hint.className = 'input-hint error-hint';
      hint.style.color = '#e74c3c';
      el.parentElement.appendChild(hint);
    }
    hint.textContent = msg;
    setTimeout(() => { el.style.borderColor = ''; if(hint) hint.remove(); }, 3000);
  }

  function flashGrid(grid) {
    grid.style.outline = '2px solid #e74c3c';
    grid.style.borderRadius = '12px';
    setTimeout(() => { grid.style.outline = ''; }, 1200);
  }

  /* ─────────────────────────────────────────
     QUIZ SUBMIT
  ───────────────────────────────────────── */
  async function submitQuiz() {
    if (!validateStep(currentStep)) return;

    // Loading anzeigen
    const steps = document.querySelectorAll('.quiz-step[data-step]');
    steps.forEach(s => { s.classList.remove('active'); s.style.display = 'none'; });
    const loading = document.querySelector('.quiz-loading');
    if (loading) { loading.style.display = 'flex'; loading.style.flexDirection = 'column'; loading.style.alignItems = 'center'; }

    try {
      /* ── STUFE 1: Tierartklassifikation ── */
      const tierartScores = berechneTierartScore(answers);
      const empfohleneTierart = Object.entries(tierartScores)
        .sort((a, b) => b[1] - a[1])[0][0];

      const wunschtier = answers.wunschtier || 'offen';
      const wunschWegAktiv = (wunschtier !== 'offen' && wunschtier !== 'unsicher' && wunschtier !== empfohleneTierart);

      /* ── PLZ → Koordinaten via Nominatim ── */
      const userCoords = await geocodePLZ(answers.plz);

      /* ── STUFE 2: Supabase API → Tiere der empfohlenen Art ── */
      const alleTiere = await fetchTiereByArt(empfohleneTierart);

      // Tiere mit Entfernung anreichern & nach Rassenranking sortieren
      const bewerteteTiere = alleTiere
        .map(tier => {
          const dist = userCoords
            ? haversineKm(userCoords.lat, userCoords.lng, tier.tierheim_lat, tier.tierheim_lng)
            : null;
          const rasseScore = berechneRasseScore(tier, answers);
          return { ...tier, distanzKm: dist, rasseScore };
        })
        .filter(t => !t.distanzKm || t.distanzKm <= 200) // max ~2h
        .sort((a, b) => {
          // Primär: Rassenranking, Sekundär: Entfernung
          const scoreDiff = b.rasseScore - a.rasseScore;
          if (Math.abs(scoreDiff) > 5) return scoreDiff;
          return (a.distanzKm || 999) - (b.distanzKm || 999);
        });

      const top3 = bewerteteTiere.slice(0, 3);

      // Wunsch-Weg: bestes Tier der Wunsch-Tierart
      let wunschtierResult = null;
      if (wunschWegAktiv) {
        const wunschTiere = await fetchTiereByArt(wunschtier);
        const bewertetWunsch = wunschTiere
          .map(tier => {
            const dist = userCoords
              ? haversineKm(userCoords.lat, userCoords.lng, tier.tierheim_lat, tier.tierheim_lng)
              : null;
            return { ...tier, distanzKm: dist, rasseScore: berechneRasseScore(tier, answers) };
          })
          .filter(t => !t.distanzKm || t.distanzKm <= 200)
          .sort((a, b) => b.rasseScore - a.rasseScore);
        wunschtierResult = bewertetWunsch[0] || null;
      }

      /* ── Loading verstecken & Ergebnis zeigen ── */
      if (loading) loading.style.display = 'none';
      zeigeErgebnis({ top3, tierartScores, empfohleneTierart, wunschtier, wunschWegAktiv, wunschtierResult });

    } catch (err) {
      console.error('Fehler beim Laden der Ergebnisse:', err);
      if (loading) loading.style.display = 'none';
      zeigeError();
    }
  }

  /* ─────────────────────────────────────────
     STUFE 1 – TIERARTKLASSIFIKATION
  ───────────────────────────────────────── */
  function berechneTierartScore(a) {
    const scores = { hund: 0, katze: 0, kleintier: 0, vogel: 0, fisch: 0 };

    /* F1 – Wohnsituation (Gewichtung 5) */
    const wohnMap = {
      klein_ohne:         { hund:-2, katze:2, kleintier:3, vogel:1, fisch:3 },
      wohnung_balkon:     { hund:1,  katze:3, kleintier:2, vogel:2, fisch:2 },
      haus_garten:        { hund:3,  katze:2, kleintier:2, vogel:1, fisch:1 },
      haus_grosser_garten:{ hund:3,  katze:2, kleintier:2, vogel:2, fisch:1 },
    };
    addWeighted(scores, wohnMap[a.wohnsituation], 5);

    /* F2 – Haushalt (Gewichtung 3) */
    const haushaltMap = {
      allein:       { hund:2, katze:3, kleintier:2, vogel:2, fisch:2 },
      partner:      { hund:3, katze:2, kleintier:2, vogel:2, fisch:2 },
      kinder_klein: { hund:3, katze:1, kleintier:1, vogel:-1, fisch:1 },
      kinder_gross: { hund:3, katze:2, kleintier:2, vogel:1,  fisch:1 },
      wg:           { hund:1, katze:2, kleintier:2, vogel:1,  fisch:2 },
    };
    addWeighted(scores, haushaltMap[a.haushalt], 3);

    /* F3 – Vorhandene Tiere (Gewichtung 4) */
    const tierMap = {
      keine:   { hund:2, katze:2, kleintier:2, vogel:2,  fisch:2  },
      hund:    { hund:3, katze:1, kleintier:-1, vogel:-1, fisch:1  },
      katze:   { hund:1, katze:3, kleintier:-2, vogel:-2, fisch:2  },
      fische:  { hund:2, katze:2, kleintier:2,  vogel:1,  fisch:3  },
      hamster: { hund:1, katze:-1, kleintier:3, vogel:1,  fisch:2  },
      hase:    { hund:1, katze:-2, kleintier:2, vogel:1,  fisch:2  },
      vogel:   { hund:1, katze:-1, kleintier:1, vogel:3,  fisch:2  },
    };
    const tierKey = a.vorhandene_tiere?.startsWith('sonstiges') ? null : a.vorhandene_tiere;
    if (tierKey && tierMap[tierKey]) addWeighted(scores, tierMap[tierKey], 4);

    /* F4 – Stunden weg (Gewichtung 5) */
    const wegMap = {
      unter4:       { hund:3,  katze:2, kleintier:2, vogel:3,  fisch:1 },
      vier_acht:    { hund:1,  katze:3, kleintier:2, vogel:1,  fisch:2 },
      ueber8:       { hund:-3, katze:2, kleintier:1, vogel:-1, fisch:3 },
      unregelmaessig:{ hund:-1, katze:2, kleintier:2, vogel:-1, fisch:3 },
    };
    addWeighted(scores, wegMap[a.stunden_weg], 5);

    /* F5 – Aktive Zeit (Gewichtung 4) */
    const zeitMap = {
      unter30:         { hund:-2, katze:1, kleintier:2, vogel:1, fisch:3 },
      dreissig_sechzig:{ hund:1,  katze:3, kleintier:2, vogel:2, fisch:2 },
      ein_drei:        { hund:3,  katze:2, kleintier:2, vogel:3, fisch:1 },
      ueber3:          { hund:3,  katze:1, kleintier:1, vogel:2, fisch:1 },
    };
    addWeighted(scores, zeitMap[a.aktive_zeit], 4);

    /* F6 – Reisen (Gewichtung 3) */
    const reisenMap = {
      kaum:      { hund:3,  katze:2, kleintier:2, vogel:3,  fisch:2 },
      ein_zwei:  { hund:2,  katze:3, kleintier:2, vogel:1,  fisch:3 },
      mehrmals:  { hund:-1, katze:2, kleintier:1, vogel:-1, fisch:3 },
      sehr_oft:  { hund:-2, katze:1, kleintier:1, vogel:-2, fisch:2 },
    };
    addWeighted(scores, reisenMap[a.reisen], 3);

    /* F7 – Aktivitätslevel (Gewichtung 4) */
    const aktivMap = {
      ruhig:   { hund:1, katze:3, kleintier:2, vogel:2, fisch:3 },
      moderat: { hund:2, katze:2, kleintier:2, vogel:2, fisch:1 },
      aktiv:   { hund:3, katze:1, kleintier:1, vogel:1, fisch:1 },
      outdoor: { hund:3, katze:1, kleintier:1, vogel:1, fisch:0 },
    };
    addWeighted(scores, aktivMap[a.aktivitaet], 4);

    /* F8 – Alltag (Gewichtung 5) */
    const alltagMap = {
      ruhig:    { hund:1,  katze:3, kleintier:2, vogel:1, fisch:3  },
      spiel:    { hund:3,  katze:2, kleintier:3, vogel:3, fisch:-1 },
      draussen: { hund:3,  katze:1, kleintier:1, vogel:0, fisch:0  },
      training: { hund:3,  katze:1, kleintier:1, vogel:2, fisch:0  },
    };
    addWeighted(scores, alltagMap[a.alltag], 5);

    /* F9 – Geräusche (Gewichtung 3) */
    const geraeuschMap = {
      kein_problem: { hund:3,  katze:2, kleintier:2, vogel:3,  fisch:1 },
      etwas_ok:     { hund:2,  katze:2, kleintier:2, vogel:1,  fisch:2 },
      viel_ruhe:    { hund:-2, katze:2, kleintier:1, vogel:-2, fisch:3 },
      nachbarn:     { hund:-3, katze:2, kleintier:1, vogel:-3, fisch:3 },
    };
    addWeighted(scores, geraeuschMap[a.geraeusche], 3);

    /* F10 – Erfahrung (Gewichtung 3) */
    const erfahrungMap = {
      keine:    { hund:-1, katze:1, kleintier:2, vogel:-1, fisch:3 },
      kind:     { hund:1,  katze:2, kleintier:2, vogel:1,  fisch:2 },
      etwas:    { hund:2,  katze:2, kleintier:2, vogel:2,  fisch:1 },
      erfahren: { hund:3,  katze:3, kleintier:2, vogel:3,  fisch:1 },
    };
    addWeighted(scores, erfahrungMap[a.erfahrung], 3);

    /* F11 – Kuscheln (Gewichtung 4) */
    const kuschelMap = {
      sehr_wichtig:{ hund:3,  katze:2, kleintier:1, vogel:1,  fisch:-2 },
      schoen:      { hund:2,  katze:2, kleintier:2, vogel:2,  fisch:1  },
      unwichtig:   { hund:1,  katze:1, kleintier:1, vogel:2,  fisch:3  },
    };
    addWeighted(scores, kuschelMap[a.kuscheln], 4);

    /* F12 – Budget (Gewichtung 2) */
    const budgetMap = {
      unter50:      { hund:-3, katze:-1, kleintier:2, vogel:-1, fisch:3 },
      fuenfzig_150: { hund:-1, katze:2,  kleintier:3, vogel:2,  fisch:3 },
      ein50_300:    { hund:3,  katze:3,  kleintier:2, vogel:3,  fisch:2 },
      kein_limit:   { hund:3,  katze:3,  kleintier:2, vogel:3,  fisch:2 },
    };
    addWeighted(scores, budgetMap[a.budget], 2);

    /* F13 – Charakter (Gewichtung 4) */
    const charakterMap = {
      treue:         { hund:3, katze:1, kleintier:1, vogel:2, fisch:0 },
      selbststaendig:{ hund:1, katze:3, kleintier:2, vogel:1, fisch:3 },
      verspielt:     { hund:3, katze:2, kleintier:3, vogel:2, fisch:-1},
      ruhe:          { hund:1, katze:3, kleintier:2, vogel:1, fisch:3 },
    };
    addWeighted(scores, charakterMap[a.charakter], 4);

    /* F14 – Allergie (Gewichtung 5 – Ausschlusslogik) */
    if (a.allergie === 'stark') {
      scores.hund    = Math.min(scores.hund,    -50);
      scores.katze   = Math.min(scores.katze,   -50);
      scores.kleintier = Math.min(scores.kleintier, -30);
    } else if (a.allergie === 'leicht') {
      scores.hund  -= 10;
      scores.katze -= 10;
    }

    return scores;
  }

  function addWeighted(scores, map, weight) {
    if (!map) return;
    for (const [art, val] of Object.entries(map)) {
      if (scores[art] !== undefined) scores[art] += val * weight;
    }
  }

  /* ─────────────────────────────────────────
     STUFE 2 – RASSENRANKING
  ───────────────────────────────────────── */
  function berechneRasseScore(tier, a) {
    let score = 0;

    const platzmapping = { klein_ohne: 'klein', wohnung_balkon: 'mittel', haus_garten: 'gross', haus_grosser_garten: 'gross' };
    const platz = platzmapping[a.wohnsituation] || 'mittel';
    if (tier.platzbedarf === platz) score += 10;
    else if (tier.platzbedarf === 'klein' && platz !== 'klein') score += 5;
    else if (tier.platzbedarf === 'gross' && platz === 'klein') score -= 15;

    const aktivmapping = { ruhig: 'niedrig', moderat: 'mittel', aktiv: 'hoch', outdoor: 'sehr_hoch' };
    const nutzerAktiv = aktivmapping[a.aktivitaet] || 'mittel';
    if (tier.aktivitaet === nutzerAktiv) score += 12;
    else if (Math.abs(['niedrig','mittel','hoch','sehr_hoch'].indexOf(tier.aktivitaet) -
             ['niedrig','mittel','hoch','sehr_hoch'].indexOf(nutzerAktiv)) === 1) score += 5;
    else score -= 5;

    if (a.erfahrung === 'keine' && tier.erfahrung_noetig === 'hoch') score -= 15;
    if (a.erfahrung === 'erfahren' && tier.erfahrung_noetig === 'gering') score += 3;

    if (a.allergie === 'leicht' && tier.allergierisiko === 'hoch') score -= 20;
    if (a.allergie === 'stark' && tier.allergierisiko !== 'kein') score -= 50;

    if (a.geraeusche === 'viel_ruhe' && tier.laerm_level === 'hoch') score -= 12;
    if (a.geraeusche === 'nachbarn' && tier.laerm_level === 'hoch') score -= 20;
    if (a.geraeusche === 'kein_problem' && tier.laerm_level === 'hoch') score += 5;

    if (a.kuscheln === 'sehr_wichtig' && tier.kuschelfaktor === 'sehr_hoch') score += 10;
    if (a.kuscheln === 'sehr_wichtig' && tier.kuschelfaktor === 'kein') score -= 10;
    if (a.kuscheln === 'unwichtig' && tier.kuschelfaktor === 'sehr_hoch') score -= 3;

    if (a.stunden_weg === 'ueber8' && tier.einzelhaltung === 'nein' && tier.art === 'hund') score -= 20;

    return score;
  }

  /* ─────────────────────────────────────────
     SUPABASE API
  ───────────────────────────────────────── */
  async function fetchTiereByArt(art) {
    const url = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?art=eq.${encodeURIComponent(art)}&select=*`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    if (!res.ok) throw new Error(`Supabase Fehler: ${res.status}`);
    return res.json();
  }

  /* ─────────────────────────────────────────
     GEOCODING – PLZ → Koordinaten
  ───────────────────────────────────────── */
  async function geocodePLZ(plz) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=de&format=json&limit=1`;
      const res = await fetch(url, {
        headers: { 'Accept-Language': 'de', 'User-Agent': 'PfotenfindER/1.0' }
      });
      const data = await res.json();
      if (data && data[0]) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch (e) {
      console.warn('Geocoding fehlgeschlagen:', e);
    }
    return null;
  }

  /* ─────────────────────────────────────────
     ENTFERNUNG – Haversine Formel
  ───────────────────────────────────────── */
  function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2)**2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
  }
  function toRad(deg) { return deg * Math.PI / 180; }

  /* ─────────────────────────────────────────
     ERGEBNIS MODAL RENDERN
  ───────────────────────────────────────── */
  function zeigeErgebnis({ top3, tierartScores, empfohleneTierart, wunschtier, wunschWegAktiv, wunschtierResult }) {
    const tierartLabel = {
      hund: 'Hund', katze: 'Katze', kleintier: 'Kleintier', vogel: 'Vogel', fisch: 'Fisch'
    };
    const tierartEmoji = {
      hund: '🐶', katze: '🐱', kleintier: '🐹', vogel: '🐦', fisch: '🐟'
    };

    let html = '';

    /* ── Modal Header ── */
    html += `
      <div class="modal-header">
        <div class="modal-eyebrow">Dein persönliches Ergebnis</div>
        <h2 class="modal-title" id="modalTitle">
          ${tierartEmoji[empfohleneTierart]} Dein Match: ${tierartLabel[empfohleneTierart]}
        </h2>
        <p class="modal-subtitle">
          Basierend auf deinen Antworten passt ein
          <strong>${tierartLabel[empfohleneTierart]}</strong> am besten zu deinem Lebensstil.
          Hier sind die drei besten Matches aus Tierheimen in deiner Nähe:
        </p>
      </div>`;

    /* ── Wunsch-Weg Banner ── */
    if (wunschWegAktiv && wunschtierResult) {
      html += `
        <div class="wunsch-banner">
          <h4>💭 Du hast dir einen ${tierartLabel[wunschtier]} gewünscht …</h4>
          <p>
            Unser Quiz empfiehlt dir eigentlich einen <strong>${tierartLabel[empfohleneTierart]}</strong>,
            weil das besser zu deinem aktuellen Lebensstil passt.
            Weiter unten zeigen wir dir aber auch, welcher ${tierartLabel[wunschtier]}
            am besten zu dir passen würde — wenn du diesen Weg gehen möchtest.
          </p>
        </div>`;
    }

    /* ── Top 3 ── */
    html += `<div class="top3-section">`;
    html += `<h3 class="top3-title">🏆 Deine Top 3 Empfehlungen</h3>`;
    html += `<div class="tier-cards">`;

    if (top3.length === 0) {
      html += `<p style="color:var(--text-light);font-size:.9rem;padding:16px 0;">
        Leider wurden keine passenden Tiere in deiner Nähe gefunden.
        Versuche die Umkreissuche zu erweitern oder besuche direkt ein Tierheim in deiner Nähe.
      </p>`;
    } else {
      top3.forEach((tier, i) => {
        const rank = i + 1;
        const tags = tier.charakteristiken
          ? tier.charakteristiken.split(',').map(t => t.trim()).slice(0, 4)
          : [];
        const distText = tier.distanzKm ? `${tier.distanzKm} km entfernt` : '';
        html += `
          <div class="tier-card rank-${rank}">
            <div class="tier-rank">${rank}</div>
            <img class="tier-img" src="${tier.bild_url || ''}" alt="${tier.name}"
                 onerror="this.src='https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200&q=60'">
            <div class="tier-info">
              <div class="tier-name">${tier.name}</div>
              <div class="tier-rasse">${tier.rasse} · ${tier.alter_text || ''} · ${tier.tierheim_seit} im Heim</div>
              <div class="tier-tags">
                ${tags.map(t => `<span class="tier-tag">${t}</span>`).join('')}
              </div>
              <div class="tier-meta">
                <span>🏠 ${tier.tierheim_stadt || ''}</span>
                ${distText ? `<span>📍 ${distText}</span>` : ''}
              </div>
            </div>
          </div>
          ${renderKontakt(tier)}`;
      });
    }

    html += `</div></div>`;

    /* ── Wunsch-Weg Sektion ── */
    if (wunschWegAktiv && wunschtierResult) {
      const t = wunschtierResult;
      const tags = t.charakteristiken
        ? t.charakteristiken.split(',').map(x => x.trim()).slice(0, 4)
        : [];
      html += `
        <div class="wunschweg-section">
          <h3 class="wunschweg-title">💭 Dein Wunsch-Weg: ${tierartLabel[wunschtier]}</h3>
          <p style="font-size:.92rem;color:var(--text-mid);margin-bottom:16px;line-height:1.6;">
            Wenn du dich trotz der Empfehlung für einen
            <strong>${tierartLabel[wunschtier]}</strong> entscheidest,
            wäre das hier das am besten passende Tier:
          </p>
          <div class="tier-cards">
            <div class="tier-card">
              <div class="tier-rank" style="background:var(--accent);color:var(--white);">💭</div>
              <img class="tier-img" src="${t.bild_url || ''}" alt="${t.name}"
                   onerror="this.src='https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200&q=60'">
              <div class="tier-info">
                <div class="tier-name">${t.name}</div>
                <div class="tier-rasse">${t.rasse} · ${t.alter_text || ''} · ${t.tierheim_seit} im Heim</div>
                <div class="tier-tags">
                  ${tags.map(x => `<span class="tier-tag">${x}</span>`).join('')}
                </div>
                <div class="tier-meta">
                  <span>🏠 ${t.tierheim_stadt || ''}</span>
                  ${t.distanzKm ? `<span>📍 ${t.distanzKm} km</span>` : ''}
                </div>
              </div>
            </div>
            ${renderKontakt(t)}
          </div>
          <div class="wunschweg-appell">
            ❤️ <strong>Ein Appell für das Tier:</strong>
            Wenn du dich für einen ${tierartLabel[wunschtier]} entscheidest, obwohl dein Lebensstil
            laut Quiz besser zu einem ${tierartLabel[empfohleneTierart]} passt, bitte denk dabei
            an das Wohl des Tieres. Tiere sind keine Dekoration — sie haben Bedürfnisse,
            die täglich erfüllt werden müssen. Sei bereit, deinen Alltag anzupassen,
            professionelle Hilfe in Anspruch zu nehmen und das Tier immer an erste Stelle zu setzen.
            <strong>Jede Adoption ist eine Verpflichtung — auf Lebenszeit.</strong>
          </div>
        </div>`;
    }

    /* ── Modal befüllen & öffnen ── */
    document.getElementById('modalContent').innerHTML = html;
    openModal();
  }

  function renderKontakt(tier) {
    const distBadge = tier.distanzKm
      ? `<span class="distance-badge">📍 ${tier.distanzKm} km</span>`
      : '';
    return `
      <div class="tier-contact">
        <span class="contact-name">🏠 ${tier.tierheim_name || ''}</span>
        ${distBadge}
        <div class="contact-links">
          ${tier.tierheim_telefon ? `<a href="tel:${tier.tierheim_telefon}" class="contact-btn contact-btn--phone">📞 ${tier.tierheim_telefon}</a>` : ''}
          ${tier.tierheim_email   ? `<a href="mailto:${tier.tierheim_email}" class="contact-btn contact-btn--mail">✉️ ${tier.tierheim_email}</a>` : ''}
          ${tier.tierheim_maps_url ? `<a href="${tier.tierheim_maps_url}" target="_blank" rel="noopener" class="contact-btn contact-btn--maps">🗺️ Karte</a>` : ''}
        </div>
      </div>`;
  }

  function zeigeError() {
    document.getElementById('modalContent').innerHTML = `
      <div class="error-box">
        <p>😔 Es ist ein Fehler aufgetreten. Bitte versuche es erneut.</p>
        <button onclick="App.closeModal(); location.reload();">Neu laden</button>
      </div>`;
    openModal();
  }

  /* ─────────────────────────────────────────
     MODAL
  ───────────────────────────────────────── */
  function openModal() {
    const overlay = document.getElementById('resultModal');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Scroll modal to top
    const inner = document.getElementById('modalInner');
    if (inner) inner.scrollTop = 0;
  }

  function closeModal() {
    document.getElementById('resultModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ─────────────────────────────────────────
     CHOICE CARDS – Event Delegation
  ───────────────────────────────────────── */
  function initChoiceCards() {
    document.addEventListener('click', e => {
      const card = e.target.closest('.choice-card');
      if (!card) return;
      const grid = card.closest('.choice-grid');
      if (!grid) return;

      // Deselect all in grid
      grid.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      // Sonstiges Freitext
      const question = grid.dataset.question;
      if (question === 'vorhandene_tiere') {
        const sInput = document.getElementById('sonstigesInput');
        if (sInput) {
          sInput.style.display = card.dataset.value === 'sonstiges' ? 'block' : 'none';
        }
      }

      // Antwort direkt speichern
      answers[question] = card.dataset.value;
    });
  }

  /* ─────────────────────────────────────────
     NAVBAR – Scroll & Burger
  ───────────────────────────────────────── */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('navBurger');
    const menu   = document.getElementById('mobileMenu');
    const links  = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);

      // Active nav link
      const sections = ['hero','fakten','quiz-section'];
      let current = 'hero';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) current = id;
      });
      links.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
      });
    });

    burger?.addEventListener('click', () => {
      menu?.classList.toggle('open');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(l => {
      l.addEventListener('click', () => menu?.classList.remove('open'));
    });

    // Close modal on overlay click
    document.getElementById('resultModal')?.addEventListener('click', e => {
      if (e.target.id === 'resultModal') closeModal();
    });

    // ESC to close modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    // PLZ – nur Zahlen erlauben
    document.getElementById('inputPlz')?.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  function init() {
    initChoiceCards();
    initNavbar();
    updateProgress();
  }

  /* ── Public API ── */
  return { nextStep, prevStep, submitQuiz, closeModal, init };

})();

/* ── Start ── */
document.addEventListener('DOMContentLoaded', App.init);
