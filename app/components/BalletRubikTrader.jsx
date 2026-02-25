import React, { useMemo, useState } from 'react';
import { computeComposite, produceChoreographyAndTrade, defaultTuning } from './stageTradeAdapter';

const BALLET_SIGNALS = {
  arabesque: { signal: 'BUY', strength: 0.8 },
  plié: { signal: 'SELL', strength: 0.5 },
  relevé: { signal: 'HOLD', strength: 0.3 }
};

const createInitialStage = () => {
  const baseLayers = () => ({
    blocking: { formation: 'still' },
    timing: { counts: 0, tempo: 120 },
    energy: { level: 0.5, sentiment: 'neutral', volatility: 0.3 },
    memory: { performanceCount: 0, heatLevel: 0, lastPerformed: null },
    capital: { position: 0, signal: 'HOLD', strength: 0 },
    destiny: { transitScore: 0, alignment: 'neutral' }
  });

  return [
    { notation: 'A1', layers: baseLayers(), currentMovement: null },
    { notation: 'B2', layers: baseLayers(), currentMovement: null },
    { notation: 'C3', layers: baseLayers(), currentMovement: null }
  ];
};

const BalletRubikTrader = () => {
  const [stage, setStage] = useState(createInitialStage());
  const [executedTrades, setExecutedTrades] = useState([]);
  const [marketSentiment, setMarketSentiment] = useState(0.5);
  const [currentTempo, setCurrentTempo] = useState(120);
  const [totalCapital, setTotalCapital] = useState(100000);
  const [lastAudit, setLastAudit] = useState(null);
  const [tuning, setTuning] = useState(defaultTuning());

  const stageSummary = useMemo(
    () => stage.map(square => `${square.notation}: ${square.layers.capital.position.toFixed(2)}`).join(' | '),
    [stage]
  );

  const executeMovement = async (squareId, movementKey) => {
    const movement = BALLET_SIGNALS[movementKey];
    if (!movement) return;

    // Build quick marketSnapshot from current UI and square context
    const square = stage[squareId];
    const marketSnapshot = {
      algoScore: square.layers.energy.level || 0.5,
      liquidity: 1 - square.layers.energy.volatility || 0.6,
      correlation: square.layers.capital.position > 0 ? 0.6 : 0.3,
      volatility: square.layers.energy.volatility || 0.3,
      newsflow: square.layers.destiny.transitScore || marketSentiment || 0.5
    };

    // Build simple planetarySnapshot (swap with AgonAstroCipher later)
    const planetarySnapshot = {
      Sun: { intensity: 1.0, conjunction: marketSentiment > 0.7 ? 1 : 0 },
      Moon: { intensity: 0.9, phaseFactor: (currentTempo % 120) / 120 },
      Jupiter: { intensity: marketSentiment > 0.6 ? 0.6 : 0.2 },
      Saturn: { intensity: 0.1 },
      Uranus: { intensity: 0.2 }
    };

    // Build demo transits
    const transits = [];
    if (planetarySnapshot.Sun.conjunction) {
      transits.push({ type: 'Conjunction', orb: 1.2, daysSince: 0, polarity: 1 });
    }
    // add a trine or square to vary signal
    transits.push({ type: movement.signal === 'BUY' ? 'Trine' : 'Square', orb: 3.2, daysSince: 1, polarity: movement.signal === 'BUY' ? 1 : -1 });

    // Archetype score: simple mapping from movement strength
    const archetypeScore = (movement.strength || 0.5) * 0.25; // maps into -0.5..0.5 space if needed; here positive bias for buys

    // Compute composite and tradeAction
    const comp = computeComposite({
      algoScore: marketSnapshot.algoScore,
      transits,
      archetypeScore,
      planetarySnapshot,
      tuning
    });

    const { composite, rawTransit } = comp;

    const out = produceChoreographyAndTrade({
      composite,
      rawTransit,
      marketSnapshot,
      planetarySnapshot,
      archetype: movementKey,
      tuning
    });

    // Now apply movement to layers exactly as before (keeps your internal state),
    // but we will also record choreography and tradeAction in the layer records.
    setStage(prevStage => {
      const newStage = prevStage.map(sq => ({ ...sq, layers: JSON.parse(JSON.stringify(sq.layers)), currentMovement: sq.currentMovement }));
      const sq = newStage[squareId];

      // LAYER 1: BLOCKING (spatial update)
      sq.layers.blocking.formation = movementKey;

      // LAYER 2: TIMING (sync to tempo)
      sq.layers.timing.counts = 8;
      sq.layers.timing.tempo = currentTempo;

      // LAYER 3: ENERGY (sentiment from movement type)
      sq.layers.energy.level = movement.strength;
      sq.layers.energy.sentiment = movement.signal === 'BUY' ? 'bullish' : movement.signal === 'SELL' ? 'bearish' : 'neutral';
      sq.layers.energy.volatility = movement.strength;

      // LAYER 4: MEMORY (log performance)
      sq.layers.memory.performanceCount = (sq.layers.memory.performanceCount || 0) + 1;
      sq.layers.memory.heatLevel = Math.min(sq.layers.memory.performanceCount, 10);
      sq.layers.memory.lastPerformed = new Date().toISOString();

      // LAYER 5: CAPITAL (generate trading signal)
      // Use standardized tradeAction.side from adapter
      sq.layers.capital.signal = out.tradeAction.side;
      sq.layers.capital.strength = out.tradeAction.confidence;

      const positionSize = totalCapital * out.tradeAction.size; // Use adapter-calculated size
      if (out.tradeAction.side === 'BUY') {
        sq.layers.capital.position = (sq.layers.capital.position || 0) + positionSize;
      } else if (out.tradeAction.side === 'SELL') {
        sq.layers.capital.position = (sq.layers.capital.position || 0) - positionSize;
      }

      // LAYER 6: DESTINY
      sq.layers.destiny.transitScore = planetarySnapshot.Moon.phaseFactor;
      sq.layers.destiny.alignment = planetarySnapshot.Moon.phaseFactor > 0.7 ? 'favorable' : 'neutral';

      sq.currentMovement = movementKey;

      // record executedTrades with standardized tradeAction data
      if (out.tradeAction.side !== 'HOLD') {
        setExecutedTrades(prev => [
          {
            timestamp: new Date().toLocaleTimeString(),
            square: sq.notation,
            movement: movementKey,
            signal: out.tradeAction.side,
            strength: out.tradeAction.confidence,
            position: positionSize.toFixed(2),
            rationale: out.tradeAction.rationale
          },
          ...prev
        ].slice(0, 10));
      }

      return newStage;
    });

    // Apply choreography to MoleculeStudio or fallback console
    try {
      if (typeof window.applyChoreography === 'function') {
        window.applyChoreography(out.choreography); // primary path
      } else {
        console.warn('applyChoreography not found. choreography:', out.choreography);
      }
    } catch (err) {
      console.error('Error applying choreography', err);
    }

    // Store audit event for export & verification
    const audit = {
      eventId: `evt_${Date.now()}`,
      timestampISO: new Date().toISOString(),
      square: stage[squareId].notation,
      movement: movementKey,
      marketSnapshot,
      planetarySnapshot,
      transits,
      composite,
      rawTransit,
      choreography: out.choreography,
      tradeAction: out.tradeAction,
      tuningVersion: tuning // in prod: store a hash/version id
    };

    setLastAudit(audit);
    // Optionally persist to server here (POST /audit)
    console.debug('StageTrade audit', audit);
  };

  return (
    <section>
      <h2>Ballet Rubik Trader</h2>
      <p>Stage summary: {stageSummary}</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {stage.map((square, idx) => (
          <div key={square.notation} style={{ border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px' }}>
            <h3>{square.notation}</h3>
            <p>Current: {square.currentMovement || 'none'}</p>
            <p>Position: {square.layers.capital.position.toFixed(2)}</p>
            {Object.keys(BALLET_SIGNALS).map(key => (
              <button key={key} onClick={() => executeMovement(idx, key)} style={{ marginRight: '0.25rem' }}>
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h4>Executed Trades</h4>
        <ul>
          {executedTrades.map(trade => (
            <li key={`${trade.timestamp}-${trade.square}`}>
              [{trade.timestamp}] {trade.square} – {trade.movement} ({trade.signal}) size {trade.position}
            </li>
          ))}
        </ul>
      </div>
      {lastAudit && (
        <div>
          <h4>Last Audit</h4>
          <pre style={{ background: '#f5f5f5', padding: '0.5rem' }}>{JSON.stringify(lastAudit, null, 2)}</pre>
        </div>
      )}
      <div>
        <h4>Controls</h4>
        <label>
          Market Sentiment
          <input type="range" min="0" max="1" step="0.05" value={marketSentiment} onChange={e => setMarketSentiment(parseFloat(e.target.value))} />
        </label>
        <label>
          Tempo
          <input type="number" value={currentTempo} onChange={e => setCurrentTempo(parseInt(e.target.value, 10) || 0)} />
        </label>
        <label>
          Total Capital
          <input type="number" value={totalCapital} onChange={e => setTotalCapital(parseFloat(e.target.value) || 0)} />
        </label>
        <button onClick={() => setTuning(defaultTuning())}>Reset Tuning</button>
      </div>
    </section>
  );
};

export default BalletRubikTrader;
