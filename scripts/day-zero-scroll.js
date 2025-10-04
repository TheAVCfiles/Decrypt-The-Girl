(function (global) {
  'use strict';

  const STYLE_ID = 'day-zero-scroll-style';

  const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeZone: 'UTC'
  });

  const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
    timeStyle: 'short',
    timeZone: 'UTC'
  });

  const FALLBACK_ENTRIES = [
    {
      timestamp: '2024-09-21T03:44:00Z',
      body: 'Moon',
      sign: '28° Gemini',
      aspect: 'Trine Sun',
      summary: 'A bright point of synthesis ripples through the collective feed, synchronising instinct with identity.',
      metadata: [
        { label: 'House', value: 'XI – The Broadcast' },
        { label: 'Speed', value: '12.88° / day' }
      ]
    },
    {
      timestamp: '2024-09-22T15:01:00Z',
      body: 'Mercury',
      sign: '14° Virgo',
      aspect: 'Station Direct',
      summary: 'Data corridors clear as Mercury pivots forward. Comm logs stabilise and details sharpen.',
      metadata: [
        { label: 'House', value: 'I – Signal Core' },
        { label: 'Declination', value: "1°18' S" }
      ]
    },
    {
      timestamp: '2024-09-23T04:21:00Z',
      body: 'Sun',
      sign: '00° Libra',
      aspect: 'Ingress Equinox',
      summary: 'World axis alignment. The Day Zero corridor opens as the Sun crosses into Libra at zero degrees.',
      metadata: [
        { label: 'Longitude', value: "180° 00'" },
        { label: 'Node', value: 'South Node 24° Libra' }
      ]
    },
    {
      timestamp: '2024-09-24T10:35:00Z',
      body: 'Mars',
      sign: '02° Cancer',
      aspect: 'Square North Node',
      summary: 'Pressure builds on forward motion. Adjust tactical posture to accommodate emotional variables.',
      metadata: [
        { label: 'House', value: 'IV – Deep Archive' },
        { label: 'Speed', value: '0.52° / day' }
      ]
    },
    {
      timestamp: '2024-09-26T18:08:00Z',
      body: 'Venus',
      sign: '19° Leo',
      aspect: 'Opposition Saturn',
      summary: 'A heart-core transmission meets boundary protocols. Stabilise the signal with patience and presence.',
      metadata: [
        { label: 'House', value: 'III – Local Mesh' },
        { label: 'Direction', value: 'Direct' }
      ]
    },
    {
      timestamp: '2024-09-28T02:14:00Z',
      body: 'Jupiter',
      sign: '15° Gemini',
      aspect: 'Trine Moon',
      summary: 'Collective optimism expands through the network. Amplify transmissions that nourish shared imagination.',
      metadata: [
        { label: 'Latitude', value: "0°12' N" },
        { label: 'Retrograde', value: 'Yes' }
      ]
    }
  ];

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .dzs-shell {
        width: 100%;
      }

      .dzs {
        --dzs-surface: rgba(14, 16, 26, 0.9);
        --dzs-border: rgba(255, 255, 255, 0.08);
        --dzs-foreground: #f5f6ff;
        --dzs-muted: rgba(245, 246, 255, 0.7);
        --dzs-accent: #8c6dff;
        --dzs-accent-soft: rgba(140, 109, 255, 0.18);
        --dzs-highlight: rgba(140, 109, 255, 0.42);
        background: var(--dzs-surface);
        border: 1px solid var(--dzs-border);
        border-radius: 20px;
        padding: clamp(1.5rem, 2vw + 1rem, 2.75rem);
        display: flex;
        flex-direction: column;
        gap: clamp(1.5rem, 1.6vw + 1rem, 2.5rem);
        color: var(--dzs-foreground);
        box-shadow: 0 40px 90px -60px rgba(43, 33, 123, 0.75);
        backdrop-filter: blur(18px);
      }

      .dzs__header {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .dzs__eyebrow {
        font-size: 0.75rem;
        letter-spacing: 0.35em;
        text-transform: uppercase;
        color: var(--dzs-muted);
      }

      .dzs__title {
        margin: 0;
        font-size: clamp(1.8rem, 2.6vw, 2.6rem);
        font-weight: 600;
      }

      .dzs__subtitle {
        margin: 0;
        color: var(--dzs-muted);
        line-height: 1.6;
        max-width: 60ch;
      }

      .dzs__filter-group {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        align-self: flex-start;
      }

      .dzs__filter-label {
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--dzs-muted);
      }

      .dzs__filter {
        appearance: none;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 999px;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        color: var(--dzs-foreground);
        min-width: 12rem;
        position: relative;
      }

      .dzs__filter:focus {
        outline: 2px solid var(--dzs-highlight);
        outline-offset: 2px;
      }

      @media (min-width: 768px) {
        .dzs__header {
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;
        }

        .dzs__filter-group {
          align-items: flex-end;
        }
      }

      .dzs__status {
        margin: 0;
        font-size: 0.85rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--dzs-muted);
        display: none;
      }

      .dzs__status--visible {
        display: block;
      }

      .dzs__status[data-variant="warning"] {
        color: #fbc687;
      }

      .dzs__status[data-variant="error"] {
        color: #ff8a80;
      }

      .dzs__timeline {
        list-style: none;
        margin: 0;
        padding: 0 0 0 1.75rem;
        position: relative;
      }

      .dzs__timeline::before {
        content: '';
        position: absolute;
        inset: 0;
        left: 0.5rem;
        width: 1px;
        background: linear-gradient(180deg, rgba(140, 109, 255, 0.25) 0%, rgba(140, 109, 255, 0) 100%);
      }

      .dzs__item {
        position: relative;
        margin-bottom: clamp(1.5rem, 2.1vw, 2.5rem);
      }

      .dzs__marker {
        position: absolute;
        top: 0.8rem;
        left: -1.35rem;
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 999px;
        background: var(--dzs-accent);
        box-shadow: 0 0 0 6px var(--dzs-accent-soft);
      }

      .dzs__card {
        margin-left: 0.5rem;
        background: rgba(10, 12, 22, 0.82);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 18px;
        padding: clamp(1rem, 1.1vw + 0.75rem, 1.5rem) clamp(1rem, 1.6vw, 1.75rem);
        backdrop-filter: blur(16px);
      }

      .dzs__timestamp {
        margin: 0;
        font-size: 0.8rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--dzs-muted);
      }

      .dzs__body {
        margin: 0.35rem 0 0;
        font-size: 1.3rem;
        font-weight: 600;
      }

      .dzs__aspect {
        margin: 0.1rem 0 0;
        color: var(--dzs-muted);
        font-style: italic;
        letter-spacing: 0.02em;
      }

      .dzs__summary {
        margin: 1rem 0 0;
        line-height: 1.7;
        color: rgba(245, 246, 255, 0.88);
      }

      .dzs__meta {
        display: grid;
        gap: 0.6rem;
        margin: 1.25rem 0 0;
        padding: 0;
      }

      .dzs__meta div {
        display: grid;
        grid-template-columns: minmax(6rem, 7rem) 1fr;
        gap: 0.75rem;
        font-size: 0.85rem;
      }

      .dzs__meta dt {
        margin: 0;
        font-weight: 500;
        color: var(--dzs-muted);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .dzs__meta dd {
        margin: 0;
        color: var(--dzs-foreground);
      }

      .dzs__footer {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        padding-top: 1.25rem;
        font-size: 0.75rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--dzs-muted);
        display: grid;
        gap: 0.5rem;
      }

      .dzs__footer-note strong {
        color: var(--dzs-foreground);
      }

      @media (max-width: 640px) {
        .dzs__meta div {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function parseJsonAttribute(attributeValue) {
    if (!attributeValue) {
      return undefined;
    }

    try {
      return JSON.parse(attributeValue);
    } catch (error) {
      console.warn('DayZeroScroll: unable to parse JSON attribute', error);
      return undefined;
    }
  }

  function normaliseEntry(raw) {
    if (!raw) {
      return null;
    }

    const result = Object.assign({}, raw);
    const timestamp = result.timestamp || result.datetime || result.date || result.time || null;
    let date = null;

    if (timestamp) {
      date = new Date(timestamp);
      if (Number.isNaN(date.getTime())) {
        date = null;
      }
    }

    const metaMap = new Map();

    function pushMeta(label, value) {
      if (!label || value === null || value === undefined || value === '') {
        return;
      }

      const key = label.trim();
      if (!key || metaMap.has(key)) {
        return;
      }

      metaMap.set(key, String(value));
    }

    const metaSource = Array.isArray(result.metadata) ? result.metadata : [];
    metaSource.forEach(function (item) {
      if (item && item.label && item.value !== undefined) {
        pushMeta(item.label, item.value);
      }
    });

    pushMeta('Sign', result.sign || result.zodiac || result.signName);
    pushMeta('Aspect', result.aspect || result.event || result.configuration);
    pushMeta('Degree', result.degree || result.longitude || result.lng);
    pushMeta('House', result.house);
    pushMeta('Speed', result.speed);
    pushMeta('Direction', result.direction);
    pushMeta('Phase', result.phase || result.moonPhase);
    pushMeta('Retrograde', result.retrograde);

    if (result.coordinates) {
      pushMeta('Right Ascension', result.coordinates.rightAscension || result.coordinates.ra);
      pushMeta('Declination', result.coordinates.declination || result.coordinates.dec);
    }

    pushMeta('Latitude', result.latitude || result.lat);
    pushMeta('Node', result.node || result.lunarNode);

    const meta = Array.from(metaMap.entries()).map(function (entry) {
      return { label: entry[0], value: entry[1] };
    });

    return {
      id: result.id || result.eventId || [result.body || result.planet || 'body', timestamp || Date.now()].join('-'),
      body: result.body || result.planet || 'Unknown Body',
      aspect: result.aspect || result.event || result.configuration || '',
      summary: result.summary || result.description || result.text || '',
      timestamp: date ? date.toISOString() : null,
      date: date,
      displayDate: date ? DATE_FORMATTER.format(date) : null,
      displayTime: date ? TIME_FORMATTER.format(date) : null,
      meta: meta,
      raw: result
    };
  }

  function DayZeroScrollCore(root, options) {
    this.root = root;
    this.options = Object.assign({
      title: 'Day Zero Scroll',
      subtitle: 'Tracking the celestial alignments leading into the Day Zero moment.',
      eyebrow: 'Ephemeris Intelligence Brief',
      loadingMessage: 'Decrypting ephemeris feed…',
      emptyMessage: 'No alignments available for the selected filter.',
      ephemerisUrl: null,
      fallbackEntries: null,
      entries: null
    }, options || {});
    this.state = {
      filter: 'all'
    };
    this.entries = [];
    this.usedFallback = false;
    injectStyles();
    this.buildShell();
    this.load();
  }

  DayZeroScrollCore.prototype.buildShell = function buildShell() {
    this.root.classList.add('dzs-shell');
    this.root.innerHTML = '';

    this.container = document.createElement('section');
    this.container.className = 'dzs';
    this.root.appendChild(this.container);

    this.header = document.createElement('header');
    this.header.className = 'dzs__header';

    const headerText = document.createElement('div');
    const eyebrow = document.createElement('p');
    eyebrow.className = 'dzs__eyebrow';
    eyebrow.textContent = this.options.eyebrow;
    headerText.appendChild(eyebrow);

    const title = document.createElement('h2');
    title.className = 'dzs__title';
    title.textContent = this.options.title;
    headerText.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'dzs__subtitle';
    subtitle.textContent = this.options.subtitle;
    headerText.appendChild(subtitle);

    this.header.appendChild(headerText);

    const filterGroup = document.createElement('div');
    filterGroup.className = 'dzs__filter-group';

    const filterLabel = document.createElement('span');
    filterLabel.className = 'dzs__filter-label';
    filterLabel.textContent = 'Filter by body';
    filterGroup.appendChild(filterLabel);

    this.filterSelect = document.createElement('select');
    this.filterSelect.className = 'dzs__filter';
    this.filterSelect.setAttribute('aria-label', 'Filter ephemeris entries by planetary body');
    filterGroup.appendChild(this.filterSelect);

    this.header.appendChild(filterGroup);
    this.container.appendChild(this.header);

    this.statusElement = document.createElement('p');
    this.statusElement.className = 'dzs__status';
    this.statusElement.setAttribute('role', 'status');
    this.container.appendChild(this.statusElement);

    this.timeline = document.createElement('ol');
    this.timeline.className = 'dzs__timeline';
    this.timeline.setAttribute('role', 'list');
    this.container.appendChild(this.timeline);

    this.footer = document.createElement('footer');
    this.footer.className = 'dzs__footer';

    this.footerNote = document.createElement('p');
    this.footerNote.className = 'dzs__footer-note';
    this.footerNote.textContent = 'Times are shown in Coordinated Universal Time. Use for narrative intelligence only.';
    this.footer.appendChild(this.footerNote);

    this.container.appendChild(this.footer);

    const self = this;
    this.filterSelect.addEventListener('change', function (event) {
      self.state.filter = event.target.value;
      self.renderTimeline();
    });
  };

  DayZeroScrollCore.prototype.setStatus = function setStatus(message, variant) {
    if (!message) {
      this.statusElement.textContent = '';
      this.statusElement.classList.remove('dzs__status--visible');
      this.statusElement.removeAttribute('data-variant');
      return;
    }

    this.statusElement.textContent = message;
    this.statusElement.classList.add('dzs__status--visible');
    if (variant) {
      this.statusElement.setAttribute('data-variant', variant);
    } else {
      this.statusElement.removeAttribute('data-variant');
    }
  };

  DayZeroScrollCore.prototype.load = async function load() {
    this.setStatus(this.options.loadingMessage, 'info');
    let entries = Array.isArray(this.options.entries) ? this.options.entries : null;
    let usedExternal = false;

    if (!entries && this.options.ephemerisUrl) {
      try {
        const response = await fetch(this.options.ephemerisUrl, {
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.status);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          entries = data;
        } else if (data && Array.isArray(data.entries)) {
          entries = data.entries;
        } else if (data && Array.isArray(data.data)) {
          entries = data.data;
        }

        usedExternal = Array.isArray(entries) && entries.length > 0;
      } catch (error) {
        console.warn('DayZeroScroll: unable to load ephemeris feed', error);
        this.setStatus('Live ephemeris feed unavailable. Loading cached sequence…', 'warning');
      }
    }

    if (!entries || entries.length === 0) {
      entries = Array.isArray(this.options.fallbackEntries) && this.options.fallbackEntries.length > 0
        ? this.options.fallbackEntries
        : FALLBACK_ENTRIES;
      this.usedFallback = true;
    } else if (!usedExternal) {
      this.usedFallback = false;
    }

    this.entries = entries
      .map(normaliseEntry)
      .filter(function (entry) { return entry !== null; })
      .sort(function (a, b) {
        if (!a.date && !b.date) { return 0; }
        if (!a.date) { return 1; }
        if (!b.date) { return -1; }
        return a.date.getTime() - b.date.getTime();
      });

    if (this.entries.length === 0) {
      this.setStatus(this.options.emptyMessage, 'info');
      this.timeline.innerHTML = '';
      return;
    }

    this.populateFilter();
    this.renderTimeline();

    if (this.usedFallback) {
      this.setStatus('Displaying cached ephemeris sample.', 'warning');
    } else {
      this.setStatus('Ephemeris feed synchronised.', 'info');
    }
  };

  DayZeroScrollCore.prototype.populateFilter = function populateFilter() {
    const uniqueBodies = Array.from(new Set(this.entries.map(function (entry) { return entry.body; })))
      .filter(function (value) { return Boolean(value); })
      .sort(function (a, b) { return a.localeCompare(b); });

    this.filterSelect.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All bodies';
    this.filterSelect.appendChild(allOption);

    uniqueBodies.forEach((function (body) {
      const option = document.createElement('option');
      option.value = body;
      option.textContent = body;
      this.filterSelect.appendChild(option);
    }).bind(this));
  };

  DayZeroScrollCore.prototype.getFilteredEntries = function getFilteredEntries() {
    if (this.state.filter === 'all') {
      return this.entries;
    }

    return this.entries.filter((function (entry) {
      return entry.body === this.state.filter;
    }).bind(this));
  };

  DayZeroScrollCore.prototype.buildMetaSegments = function buildMetaSegments(entry) {
    const segments = [];
    (entry.meta || []).forEach(function (item) {
      if (!item || !item.label || item.value === undefined || item.value === '') {
        return;
      }

      segments.push({ label: item.label, value: item.value });
    });

    if (entry.displayTime && !segments.some(function (item) { return item.label === 'Exact'; })) {
      segments.unshift({ label: 'Exact', value: entry.displayTime + ' UTC' });
    }

    return segments;
  };

  DayZeroScrollCore.prototype.renderTimeline = function renderTimeline() {
    const entries = this.getFilteredEntries();
    this.timeline.innerHTML = '';

    if (entries.length === 0) {
      this.setStatus(this.options.emptyMessage, 'info');
      return;
    }

    this.setStatus('', null);

    entries.forEach((function (entry) {
      const item = document.createElement('li');
      item.className = 'dzs__item';

      const marker = document.createElement('div');
      marker.className = 'dzs__marker';
      marker.setAttribute('aria-hidden', 'true');
      item.appendChild(marker);

      const card = document.createElement('article');
      card.className = 'dzs__card';

      const header = document.createElement('header');
      header.className = 'dzs__card-header';

      const timestamp = document.createElement('p');
      timestamp.className = 'dzs__timestamp';
      if (entry.displayDate && entry.displayTime) {
        timestamp.textContent = entry.displayDate + ' · ' + entry.displayTime + ' UTC';
      } else if (entry.displayDate) {
        timestamp.textContent = entry.displayDate;
      } else {
        timestamp.textContent = 'Timeless alignment';
      }
      header.appendChild(timestamp);

      const body = document.createElement('h3');
      body.className = 'dzs__body';
      body.textContent = entry.body;
      header.appendChild(body);

      if (entry.aspect) {
        const aspect = document.createElement('p');
        aspect.className = 'dzs__aspect';
        aspect.textContent = entry.aspect;
        header.appendChild(aspect);
      }

      card.appendChild(header);

      if (entry.summary) {
        const summary = document.createElement('p');
        summary.className = 'dzs__summary';
        summary.textContent = entry.summary;
        card.appendChild(summary);
      }

      const metaSegments = this.buildMetaSegments(entry);
      if (metaSegments.length > 0) {
        const dl = document.createElement('dl');
        dl.className = 'dzs__meta';

        metaSegments.forEach(function (segment) {
          const row = document.createElement('div');
          const dt = document.createElement('dt');
          dt.textContent = segment.label;
          row.appendChild(dt);

          const dd = document.createElement('dd');
          dd.textContent = segment.value;
          row.appendChild(dd);

          dl.appendChild(row);
        });

        card.appendChild(dl);
      }

      item.appendChild(card);
      this.timeline.appendChild(item);
    }).bind(this));

    this.refreshFooter();
  };

  DayZeroScrollCore.prototype.refreshFooter = function refreshFooter() {
    this.footer.innerHTML = '';

    const primary = document.createElement('p');
    primary.className = 'dzs__footer-note';
    primary.innerHTML = '<strong>UTC Reference:</strong> Align local strategy with the Coordinated Universal Time stamps above.';
    this.footer.appendChild(primary);

    const secondary = document.createElement('p');
    secondary.className = 'dzs__footer-note';
    secondary.textContent = this.usedFallback
      ? 'Live feed unreachable. Displaying curated sample alignments for briefing continuity.'
      : 'Live ephemeris feed active. Cross-check against mission analytics before deployment.';
    this.footer.appendChild(secondary);
  };

  function parseConfigFromElement(element) {
    const configAttr = element.getAttribute('data-config');
    const entriesAttr = element.getAttribute('data-entries');

    const config = parseJsonAttribute(configAttr) || {};
    const entries = parseJsonAttribute(entriesAttr);

    if (entries) {
      config.entries = entries;
    }

    const fallbackAttr = element.getAttribute('data-fallback');
    const fallbackEntries = parseJsonAttribute(fallbackAttr);
    if (fallbackEntries) {
      config.fallbackEntries = fallbackEntries;
    }

    if (element.getAttribute('data-title')) {
      config.title = element.getAttribute('data-title');
    }

    if (element.getAttribute('data-subtitle')) {
      config.subtitle = element.getAttribute('data-subtitle');
    }

    if (element.getAttribute('data-eyebrow')) {
      config.eyebrow = element.getAttribute('data-eyebrow');
    }

    if (!config.ephemerisUrl) {
      config.ephemerisUrl = element.getAttribute('data-ephemeris-url') || element.getAttribute('ephemeris-url');
    }

    return config;
  }

  function DayZeroScroll(options) {
    const config = Object.assign({}, options || {});
    const target = config.target || document.createElement('div');
    delete config.target;

    new DayZeroScrollCore(target, config);
    return target;
  }

  DayZeroScroll.autoInitialize = function autoInitialize(root) {
    const scope = root || document;
    const nodes = scope.querySelectorAll('[data-day-zero-scroll]');
    nodes.forEach(function (node) {
      if (node.__dayZeroScrollInitialised) {
        return;
      }

      const config = parseConfigFromElement(node);
      config.target = node;
      DayZeroScroll(config);
      node.__dayZeroScrollInitialised = true;
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      DayZeroScroll.autoInitialize();
    });
  } else {
    DayZeroScroll.autoInitialize();
  }

  if (global.customElements && !global.customElements.get('day-zero-scroll')) {
    class DayZeroScrollElement extends HTMLElement {
      connectedCallback() {
        if (this.__dayZeroScrollInitialised) {
          return;
        }

        const config = parseConfigFromElement(this);
        config.target = this;
        DayZeroScroll(config);
        this.__dayZeroScrollInitialised = true;
      }
    }

    global.customElements.define('day-zero-scroll', DayZeroScrollElement);
  }

  global.DayZeroScroll = DayZeroScroll;
})(typeof window !== 'undefined' ? window : this);
