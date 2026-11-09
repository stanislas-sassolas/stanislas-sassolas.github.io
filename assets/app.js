/* Small, local interactions. No analytics, remote scripts or automatic animation. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const root = document.documentElement;
  const english = Object.fromEntries([...document.querySelectorAll('[data-i]')].map(el => [el.dataset.i, el.innerHTML]));
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* Optional preferences. */ } }
  };
  const readData = name => JSON.parse(document.getElementById('embedded-' + name).textContent);
  let evidence, spanish, language = 'en';
  try { evidence = readData('evidence'); spanish = readData('es'); } catch { /* The HTML remains readable. */ }

  function syncPageLinks() {
    document.querySelectorAll('[data-case-link]').forEach(link => {
      const url = new URL(link.href, location.href);
      url.searchParams.set('theme', root.dataset.theme);
      url.searchParams.set('lang', language);
      link.href = url.href;
    });
    // Keep incoming preferences consistent if the visitor changes them, then reloads.
    try {
      const url = new URL(location.href);
      if (url.searchParams.has('theme')) url.searchParams.set('theme', root.dataset.theme);
      if (url.searchParams.has('lang')) url.searchParams.set('lang', language);
      if (url.href !== location.href) history.replaceState(null, '', url);
    } catch { /* Navigation context still travels in the links on local files. */ }
  }

  function setTheme(dark) {
    root.dataset.theme = dark ? 'dark' : 'light';
    $('meta[name="theme-color"]').content = dark ? '#191919' : '#ffffff';
    $('#theme img').src = 'assets/icons/' + (dark ? 'sun' : 'moon') + '.svg';
    $('#theme').setAttribute('aria-pressed', String(dark));
  }
  const incomingTheme = new URLSearchParams(location.search).get('theme');
  const initialTheme = ['dark', 'light'].includes(incomingTheme) ? incomingTheme : store.get('portfolio-theme');
  setTheme(initialTheme === 'dark');
  if (initialTheme) store.set('portfolio-theme', initialTheme);
  $('#theme').addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    setTheme(dark);
    store.set('portfolio-theme', dark ? 'dark' : 'light');
    syncPageLinks();
  });
  $('#year').textContent = new Date().getFullYear();

  function setLanguage(next) {
    if (next === 'es' && !spanish) return;
    language = next;
    const dictionary = next === 'es' ? spanish : english;
    document.querySelectorAll('[data-i]').forEach(el => {
      if (dictionary[el.dataset.i] !== undefined) el.innerHTML = dictionary[el.dataset.i];
    });
    root.lang = next;
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === next)));
    document.querySelectorAll('.cv-link').forEach(a => { a.href = 'cv/StanislasSassolas-CV-' + next.toUpperCase() + '.pdf'; });
    $('#theme').setAttribute('aria-label', next === 'es' ? 'Cambiar tema de color' : 'Switch color theme');
    $('#theme').title = $('#theme').getAttribute('aria-label');
    $('#velo-hour').setAttribute('aria-label', next === 'es' ? 'Hora de la semana de prueba' : 'Hour in the hold-out week');
    $('nav').setAttribute('aria-label', next === 'es' ? 'Navegación principal' : 'Main navigation');
    document.title = next === 'es' ? 'Stanislas Sassolas — IA & Datos' : 'Stanislas Sassolas — AI & Data';
    if ($('.portrait-link')) $('.portrait-link').setAttribute('aria-label', next === 'es' ? 'Más sobre Stanislas' : 'More about Stanislas');
    store.set('portfolio-language', next);
    $('#copy-status').textContent = '';
    syncPageLinks();
    if (evidence) { renderExample(); renderTraffic(); }
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

  function renderExample() {
    if (!evidence) return;
    const example = evidence.ragExamples[Number($('#example-select').value)] || evidence.ragExamples[0];
    $('#demo-question').textContent = example.question;
    $('#demo-answer').textContent = example.answer;
    $('#original-pdf').href = example.sourceUrl;
    $('#original-pdf').textContent = example.document.replace('alicorp_', 'Alicorp ') + ' · p. ' + example.page + ' ↗';
  }
  $('#example-select').addEventListener('change', renderExample);

  let geometry;
  function renderTraffic() {
    if (!evidence) return;
    const width = Math.max(180, Math.floor($('#velo-chart').clientWidth) || 560);
    const height = 190, left = 40, right = 8, top = 12, bottom = 30;
    const x = i => left + i / 167 * (width - left - right);
    const y = v => top + (40000 - v) / 42000 * (height - top - bottom);
    geometry = {x, y, top, bottom:height-bottom, width, left, right};
    const line = values => values.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(2) + ',' + y(v).toFixed(2)).join(' ');
    const label = language === 'es' ? 'Tráfico horario de bicicletas en Lyon, real y predicho, del 23 al 29 de abril de 2022.' : 'Hourly bike traffic in Lyon, actual and predicted, 23–29 April 2022.';
    let svg = '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + label + '"><title>' + label + '</title>';
    for (const value of [0, 20000, 40000]) {
      svg += '<line x1="' + left + '" x2="' + (width-right) + '" y1="' + y(value) + '" y2="' + y(value) + '" stroke="var(--line)"/>';
      svg += '<text x="' + (left-8) + '" y="' + (y(value)+4) + '" text-anchor="end" fill="var(--muted)" font-size="12">' + value/1000 + 'k</text>';
    }
    svg += '<path d="' + line(evidence.velo.a) + '" fill="none" stroke="var(--chart-actual)" stroke-width="1.7"/>';
    svg += '<path d="' + line(evidence.velo.p) + '" fill="none" stroke="var(--chart-predicted)" stroke-width="1.7" stroke-dasharray="4 3"/>';
    for (let day = 0; day < 7; day++) {
      svg += '<text x="' + x(day*24+12) + '" y="' + (height-8) + '" text-anchor="middle" fill="var(--muted)" font-size="12">' + (23+day) + '</text>';
    }
    svg += '<line id="traffic-cursor" stroke="var(--muted)" stroke-dasharray="2 3"/><circle id="traffic-actual" r="3.5" fill="var(--chart-actual)"/><circle id="traffic-predicted" r="3.5" fill="var(--chart-predicted)"/></svg>';
    $('#velo-chart').innerHTML = svg + '<div class="chart-tooltip" aria-hidden="true" hidden></div>';
    updateTraffic();
  }
  function updateTraffic() {
    if (!evidence || !geometry || !$('#traffic-cursor')) return;
    const i = Number($('#velo-hour').value), {x, y, top, bottom} = geometry;
    const cursor = $('#traffic-cursor');
    for (const [key, value] of Object.entries({x1:x(i),x2:x(i),y1:top,y2:bottom})) cursor.setAttribute(key,value);
    for (const [id, key] of [['traffic-actual','a'], ['traffic-predicted','p']]) {
      $('#' + id).setAttribute('cx',x(i));
      $('#' + id).setAttribute('cy',y(evidence.velo[key][i]));
    }
    const nf = new Intl.NumberFormat(language === 'es' ? 'es-PE' : 'en-US');
    const text = (23+Math.floor(i/24)) + (language === 'es' ? ' abr' : ' Apr') + ' · ' + String(i%24).padStart(2,'0') + ':00 — ' + (language === 'es' ? 'real ' : 'actual ') + nf.format(evidence.velo.a[i]) + ' / ' + (language === 'es' ? 'predicho ' : 'predicted ') + nf.format(evidence.velo.p[i]);
    $('#velo-readout').textContent = text;
    $('#velo-hour').setAttribute('aria-valuetext', text);
  }
  const chart = $('#velo-chart');
  function hideTooltip() {
    const tooltip = chart.querySelector('.chart-tooltip');
    if (tooltip) tooltip.hidden = true;
  }
  function exploreTraffic(event) {
    if (!evidence || !geometry) return;
    const svg = chart.querySelector('svg');
    if (!svg) return;
    const bounds = svg.getBoundingClientRect();
    const {width, left, right} = geometry;
    const position = (event.clientX - bounds.left) / bounds.width * width;
    const hour = Math.max(0, Math.min(167, Math.round((position - left) / (width - left - right) * 167)));
    $('#velo-hour').value = hour;
    updateTraffic();
    const tooltip = chart.querySelector('.chart-tooltip');
    const nf = new Intl.NumberFormat(language === 'es' ? 'es-PE' : 'en-US');
    const time = (23+Math.floor(hour/24)) + (language === 'es' ? ' abr' : ' Apr') + ' · ' + String(hour%24).padStart(2,'0') + ':00';
    tooltip.innerHTML = '<strong>' + time + '</strong><span>' + (language === 'es' ? 'Real' : 'Actual') + ' <b>' + nf.format(evidence.velo.a[hour]) + '</b></span><span>' + (language === 'es' ? 'Predicción' : 'Predicted') + ' <b>' + nf.format(evidence.velo.p[hour]) + '</b></span>';
    tooltip.hidden = false;
    const cursorX = event.clientX - bounds.left;
    const tooltipWidth = tooltip.getBoundingClientRect().width;
    const preferredX = cursorX > bounds.width / 2 ? cursorX - tooltipWidth - 12 : cursorX + 12;
    tooltip.style.left = Math.max(0, Math.min(bounds.width-tooltipWidth, preferredX)) + 'px';
  }
  // Hover is for a mouse; a touch selects once without blocking vertical scrolling.
  chart.addEventListener('pointermove', event => { if (event.pointerType === 'mouse') exploreTraffic(event); });
  chart.addEventListener('pointerdown', exploreTraffic);
  chart.addEventListener('pointerleave', hideTooltip);
  chart.addEventListener('pointercancel', hideTooltip);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') hideTooltip(); });
  $('#velo-hour').addEventListener('input', () => { hideTooltip(); updateTraffic(); });
  if ('ResizeObserver' in window) new ResizeObserver(entries => {
    if (entries[0].contentRect.width > 0) renderTraffic();
  }).observe($('#velo-chart'));
  else window.addEventListener('resize', renderTraffic);
  $('#velo-chart').closest('details').addEventListener('toggle', renderTraffic);

  $('#copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('stansasso@gmail.com');
      $('#copy-status').textContent = language === 'es' ? 'Copiado.' : 'Copied.';
    } catch {
      $('#copy-status').textContent = language === 'es' ? 'Selecciona y copia la dirección.' : 'Select and copy the address.';
    }
  });
  const requested = new URLSearchParams(location.search).get('lang') || store.get('portfolio-language');
  setLanguage(requested === 'es' ? 'es' : 'en');
})();
