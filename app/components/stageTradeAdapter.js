export const defaultTuning = () => ({
  energyWeight: 0.45,
  transitWeight: 0.35,
  archetypeWeight: 0.2,
  floor: 0.1,
  choreographyScale: 1.2,
  tradeRiskFactor: 0.8
});

export function computeComposite({ algoScore, transits, archetypeScore, planetarySnapshot, tuning }) {
  const transitScore = transits.reduce(
    (acc, transit) => acc + (transit.polarity || 0) / Math.max(1, transit.orb || 1),
    0
  );

  const planetaryWeight = Object.values(planetarySnapshot || {}).reduce(
    (acc, body) => acc + (body.intensity || 0),
    0
  );
  const normalizedPlanetary = planetaryWeight / Math.max(1, Object.keys(planetarySnapshot || {}).length);

  const composite =
    algoScore * tuning.energyWeight +
    transitScore * tuning.transitWeight +
    archetypeScore * tuning.archetypeWeight +
    normalizedPlanetary * tuning.floor;

  return {
    composite,
    rawTransit: transitScore
  };
}

export function produceChoreographyAndTrade({ composite, rawTransit, marketSnapshot, planetarySnapshot, archetype, tuning }) {
  const choreography = {
    pattern: archetype,
    energy: Math.max(0, Math.min(1, composite * tuning.choreographyScale)),
    tempo: (planetarySnapshot?.Moon?.phaseFactor || 0.5) * 120,
    transits: rawTransit
  };

  const tradeBias = composite + (marketSnapshot?.algoScore || 0) - (marketSnapshot?.volatility || 0);
  const tradeSignal = tradeBias >= 0.1 ? 'BUY' : tradeBias <= -0.1 ? 'SELL' : 'HOLD';

  const tradeAction = {
    signal: tradeSignal,
    confidence: Math.min(1, Math.abs(tradeBias)),
    allocation: Math.max(0.01, Math.min(0.1, Math.abs(composite) * tuning.tradeRiskFactor)),
    notes: `Derived from ${archetype} choreography`
  };

  return { choreography, tradeAction };
}
