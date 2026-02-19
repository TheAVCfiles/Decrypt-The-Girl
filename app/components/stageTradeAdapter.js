const clamp01 = (value) => Math.min(1, Math.max(0, value ?? 0));

// Telemetry trace buffer for debugging and rollup
const telemetryBuffer = [];
const MAX_TELEMETRY_BUFFER = 100;

export function defaultTuning() {
  return {
    algoWeight: 0.4,
    transitWeight: 0.35,
    archetypeWeight: 0.2,
    bias: 0.05,
  };
}

/**
 * Capture a telemetry event with structured trace data.
 * Supports stage captures for day-zero debugging and rollup analysis.
 */
export function captureTrace(event, stage, details = {}) {
  const trace = {
    timestamp: Date.now(),
    timestampISO: new Date().toISOString(),
    event,
    stage,
    details,
  };

  telemetryBuffer.push(trace);
  if (telemetryBuffer.length > MAX_TELEMETRY_BUFFER) {
    telemetryBuffer.shift();
  }

  // Debug output for development
  if (typeof window !== 'undefined' && window.__STAGE_TRADE_DEBUG__) {
    console.log('[StageTrade Trace]', trace);
  }

  return trace;
}

/**
 * Retrieve telemetry traces for analysis or export.
 * Optionally filter by stage or event type.
 */
export function getTelemetryTraces(filters = {}) {
  let traces = [...telemetryBuffer];

  if (filters.stage) {
    traces = traces.filter(t => t.stage === filters.stage);
  }

  if (filters.event) {
    traces = traces.filter(t => t.event === filters.event);
  }

  if (filters.since) {
    const sinceTime = new Date(filters.since).getTime();
    traces = traces.filter(t => t.timestamp >= sinceTime);
  }

  return traces;
}

/**
 * Clear telemetry buffer (useful for testing or memory management).
 */
export function clearTelemetry() {
  telemetryBuffer.length = 0;
  captureTrace('telemetry_cleared', 'system', { reason: 'manual_clear' });
}

export function computeComposite({ algoScore, transits, archetypeScore, planetarySnapshot, tuning }) {
  captureTrace('compute_start', 'composite', { 
    algoScore, 
    transitCount: transits?.length, 
    archetypeScore 
  });

  const safeTuning = { ...defaultTuning(), ...(tuning || {}) };
  const transitSupport = (transits || []).reduce((sum, transit) => {
    const polarity = transit?.polarity ?? 0;
    const orbWeight = transit?.orb ? 1 / (1 + transit.orb) : 1;
    return sum + polarity * orbWeight;
  }, 0);

  const normalizedTransit = clamp01(transitSupport / Math.max((transits || []).length || 1, 1) + 0.5);
  const planetaryLift = clamp01(
    ((planetarySnapshot?.Sun?.intensity ?? 0) + (planetarySnapshot?.Moon?.intensity ?? 0) + (planetarySnapshot?.Jupiter?.intensity ?? 0)) / 3
  );

  const composite = clamp01(
    safeTuning.algoWeight * clamp01(algoScore) +
    safeTuning.transitWeight * clamp01((normalizedTransit + planetaryLift) / 2) +
    safeTuning.archetypeWeight * clamp01(archetypeScore) +
    safeTuning.bias
  );

  const result = {
    composite,
    rawTransit: {
      normalizedTransit,
      planetaryLift,
      transitSupport,
    },
  };

  captureTrace('compute_complete', 'composite', { 
    composite, 
    normalizedTransit, 
    planetaryLift 
  });

  return result;
}

export function produceChoreographyAndTrade({ composite, rawTransit, marketSnapshot, planetarySnapshot, archetype, tuning }) {
  captureTrace('orchestration_start', 'produce', { 
    composite, 
    archetype,
    marketConditions: {
      liquidity: marketSnapshot?.liquidity,
      volatility: marketSnapshot?.volatility,
    }
  });

  const normalizedComposite = clamp01(composite);
  const magnitude = Math.abs(normalizedComposite - 0.5) * 2;
  const side = normalizedComposite > 0.55 ? 'BUY' : normalizedComposite < 0.45 ? 'SELL' : 'HOLD';

  const choreography = {
    sequence: [
      { beat: 'alpha', layer: 'energy', action: 'pulse', intensity: normalizedComposite },
      { beat: 'beta', layer: 'capital', action: side.toLowerCase(), emphasis: magnitude },
      { beat: 'gamma', layer: 'destiny', action: 'align', hint: rawTransit?.normalizedTransit ?? 0 },
    ],
    meta: {
      archetype,
      tuning,
      planetarySnapshot,
      rawTransit,
    },
  };

  const tradeAction = {
    side,
    confidence: normalizedComposite,
    size: +(magnitude * (marketSnapshot?.liquidity ?? 0.5)).toFixed(3),
    rationale: `Composite ${normalizedComposite.toFixed(2)} with transit ${rawTransit?.normalizedTransit?.toFixed?.(2) ?? '0.00'}`,
  };

  captureTrace('orchestration_complete', 'produce', { 
    side, 
    confidence: normalizedComposite,
    tradeSize: tradeAction.size,
  });

  return { choreography, tradeAction };
}
