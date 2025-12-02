const clamp01 = (value) => Math.min(1, Math.max(0, value ?? 0));

export function defaultTuning() {
  return {
    algoWeight: 0.4,
    transitWeight: 0.35,
    archetypeWeight: 0.2,
    bias: 0.05,
  };
}

export function computeComposite({ algoScore, transits, archetypeScore, planetarySnapshot, tuning }) {
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

  return {
    composite,
    rawTransit: {
      normalizedTransit,
      planetaryLift,
      transitSupport,
    },
  };
}

export function produceChoreographyAndTrade({ composite, rawTransit, marketSnapshot, planetarySnapshot, archetype, tuning }) {
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

  return { choreography, tradeAction };
}
