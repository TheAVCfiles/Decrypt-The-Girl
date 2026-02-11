import React, { useMemo, useState } from 'react';
import StageTradePanel from './StageTradePanel';
import { computeComposite, produceChoreographyAndTrade, defaultTuning } from './stageTradeAdapter';

const BALLET_SIGNALS = {
  ARABESQUE: { signal: 'BUY', strength: 0.72 },
  PIROUETTE: { signal: 'SELL', strength: 0.58 },
  PAS_DE_CHAT: { signal: 'HOLD', strength: 0.35 },
  GRAND_JETE: { signal: 'BUY', strength: 0.9 },
};

const createBaseLayers = () => ({
  blocking: { formation: null },
  timing: { counts: 0, tempo: 0 },
  energy: { level: 0.5, sentiment: 'neutral', volatility: 0.25 },
  memory: { performanceCount: 0, heatLevel: 0, lastPerformed: null },
  capital: { signal: 'HOLD', strength: 0, position: 0 },
  destiny: { transitScore: 0, alignment: 'neutral' },
});

const buildStage = () => [
  { notation: 'A1', layers: createBaseLayers(), currentMovement: null },
  { notation: 'B2', layers: createBaseLayers(), currentMovement: null },
  { notation: 'C3', layers: createBaseLayers(), currentMovement: null },
  { notation: 'D4', layers: createBaseLayers(), currentMovement: null },
];

const layerRenderer = {
  capital: (square) => `${square.layers.capital.signal} @ ${square.layers.capital.position.toFixed(2)}`,
  energy: (square) => `${square.layers.energy.sentiment} (${square.layers.energy.level.toFixed(2)})`,
  destiny: (square) => `${square.layers.destiny.alignment} (${square.layers.destiny.transitScore.toFixed(2)})`,
};

const BalletRubikTrader = () => {
  const [stage, setStage] = useState(buildStage());
  const [executedTrades, setExecutedTrades] = useState([]);
  const [currentTempo, setCurrentTempo] = useState(96);
  const [totalCapital, setTotalCapital] = useState(100000);
  const [marketSentiment, setMarketSentiment] = useState(0.52);
  const [lastAudit, setLastAudit] = useState(null);
  const [tuning, setTuning] = useState(defaultTuning());
  const [activeLayer, setActiveLayer] = useState('capital');
  const [viewMode, setViewMode] = useState('grid');

  const executeMovement = async (squareId, movementKey) => {
    const movement = BALLET_SIGNALS[movementKey];
    if (!movement) return;

    const square = stage[squareId];
    const marketSnapshot = {
      algoScore: square.layers.energy.level || 0.5,
      liquidity: 1 - square.layers.energy.volatility || 0.6,
      correlation: (square.layers.capital.position > 0 ? 0.6 : 0.3),
      volatility: square.layers.energy.volatility || 0.3,
      newsflow: square.layers.destiny.transitScore || marketSentiment || 0.5,
    };

    const planetarySnapshot = {
      Sun: { intensity: 1.0, conjunction: marketSentiment > 0.7 ? 1 : 0 },
      Moon: { intensity: 0.9, phaseFactor: (currentTempo % 120) / 120 },
      Jupiter: { intensity: marketSentiment > 0.6 ? 0.6 : 0.2 },
      Saturn: { intensity: 0.1 },
      Uranus: { intensity: 0.2 },
    };

    const transits = [];
    if (planetarySnapshot.Sun.conjunction) {
      transits.push({ type: 'Conjunction', orb: 1.2, daysSince: 0, polarity: 1 });
    }
    transits.push({ type: movement.signal === 'BUY' ? 'Trine' : 'Square', orb: 3.2, daysSince: 1, polarity: movement.signal === 'BUY' ? 1 : -1 });

    const archetypeScore = (movement.strength || 0.5) * 0.25;

    const comp = computeComposite({
      algoScore: marketSnapshot.algoScore,
      transits,
      archetypeScore,
      planetarySnapshot,
      tuning,
    });

    const { composite, rawTransit } = comp;

    const out = produceChoreographyAndTrade({
      composite,
      rawTransit,
      marketSnapshot,
      planetarySnapshot,
      archetype: movementKey,
      tuning,
    });

    setStage((prevStage) => {
      const newStage = prevStage.map((sq) => ({ ...sq, layers: JSON.parse(JSON.stringify(sq.layers)), currentMovement: sq.currentMovement }));
      const sq = newStage[squareId];

      sq.layers.blocking.formation = movementKey;
      sq.layers.timing.counts = 8;
      sq.layers.timing.tempo = currentTempo;
      sq.layers.energy.level = movement.strength;
      sq.layers.energy.sentiment = movement.signal === 'BUY' ? 'bullish' : movement.signal === 'SELL' ? 'bearish' : 'neutral';
      sq.layers.energy.volatility = movement.strength;
      sq.layers.memory.performanceCount = (sq.layers.memory.performanceCount || 0) + 1;
      sq.layers.memory.heatLevel = Math.min(sq.layers.memory.performanceCount, 10);
      sq.layers.memory.lastPerformed = new Date().toISOString();
      sq.layers.capital.signal = movement.signal;
      sq.layers.capital.strength = movement.strength;

      const positionSize = (totalCapital * 0.02) * movement.strength;
      if (movement.signal === 'BUY') {
        sq.layers.capital.position = (sq.layers.capital.position || 0) + positionSize;
      } else if (movement.signal === 'SELL') {
        sq.layers.capital.position = (sq.layers.capital.position || 0) - positionSize;
      }

      sq.layers.destiny.transitScore = planetarySnapshot.Moon.phaseFactor;
      sq.layers.destiny.alignment = planetarySnapshot.Moon.phaseFactor > 0.7 ? 'favorable' : 'neutral';

      sq.currentMovement = movementKey;

      if (movement.signal !== 'HOLD') {
        setExecutedTrades((prev) => [{
          timestamp: new Date().toLocaleTimeString(),
          square: sq.notation,
          movement: movementKey,
          signal: movement.signal,
          strength: movement.strength,
          position: positionSize.toFixed(2),
        }, ...prev].slice(0, 10));
      }

      return newStage;
    });

    try {
      if (typeof window !== 'undefined' && typeof window.applyChoreography === 'function') {
        window.applyChoreography(out.choreography);
      } else {
        console.warn('applyChoreography not found. choreography:', out.choreography);
      }
    } catch (err) {
      console.error('Error applying choreography', err);
    }

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
      tuningVersion: tuning,
    };

    setLastAudit(audit);
    console.debug('StageTrade audit', audit);
  };

  const exportLastAudit = () => {
    if (!lastAudit) {
      alert('No audit event recorded yet — execute a movement first.');
      return;
    }
    const blob = new Blob([JSON.stringify(lastAudit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stageEvent_${lastAudit.eventId}.json`;
    a.click();
  };

  const layerSummary = useMemo(() => layerRenderer[activeLayer] || (() => 'n/a'), [activeLayer]);

  return (
    <div className="ballet-rubik">
      <header className="hero">
        <div>
          <p className="eyebrow">Ballet Rubik Trader</p>
          <h2>Stage ↔ Trade bridge</h2>
          <p className="lede">Compose movements, route to MoleculeStudio, and observe audit trail.</p>
        </div>
        <div className="modes">
          <label>
            View mode
            <select value={viewMode} onChange={(event) => setViewMode(event.target.value)}>
              <option value="grid">Grid</option>
              <option value="cube">Cube</option>
            </select>
          </label>
          <label>
            Active layer
            <select value={activeLayer} onChange={(event) => setActiveLayer(event.target.value)}>
              <option value="capital">Capital</option>
              <option value="energy">Energy</option>
              <option value="destiny">Destiny</option>
            </select>
          </label>
        </div>
      </header>

      <div className="controls">
        <label>
          Tempo
          <input type="number" value={currentTempo} onChange={(event) => setCurrentTempo(parseInt(event.target.value, 10) || 0)} />
        </label>
        <label>
          Total capital
          <input type="number" value={totalCapital} onChange={(event) => setTotalCapital(parseFloat(event.target.value) || 0)} />
        </label>
        <label>
          Market sentiment
          <input type="number" step="0.01" value={marketSentiment} onChange={(event) => setMarketSentiment(parseFloat(event.target.value) || 0)} />
        </label>
        <button type="button" onClick={exportLastAudit}>Export last audit</button>
      </div>

      <div className="layout">
        <div className={`stage ${viewMode}`}>
          {stage.map((square, index) => (
            <div key={square.notation} className="square">
              <div className="meta">
                <strong>{square.notation}</strong>
                <span>{square.currentMovement || '—'}</span>
              </div>
              <div className="layer">{layerSummary(square)}</div>
              <div className="actions">
                {Object.keys(BALLET_SIGNALS).map((key) => (
                  <button key={key} type="button" onClick={() => executeMovement(index, key)}>
                    {key}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <StageTradePanel
            tuning={tuning}
            onTuningChange={setTuning}
            onChoreography={(choreography) => {
              if (typeof window !== 'undefined' && window.applyChoreography) {
                window.applyChoreography(choreography);
              } else {
                console.warn('applyChoreography not found — choreography available in console.');
                console.log('Choreography:', choreography);
              }
            }}
          />

          <section className="executed">
            <header>
              <h3>Executed trades</h3>
              <p className="hint">Most recent first</p>
            </header>
            <ul>
              {executedTrades.length === 0 && <li className="hint">No trades yet.</li>}
              {executedTrades.map((trade) => (
                <li key={`${trade.timestamp}-${trade.square}`}>
                  <strong>{trade.signal}</strong> {trade.movement} on {trade.square} · size {trade.position}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <style jsx>{`
        .ballet-rubik {
          display: grid;
          gap: 16px;
          font-family: system-ui, -apple-system, Segoe UI, sans-serif;
          color: #0d0d0d;
        }

        .hero {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }

        .eyebrow {
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0;
          color: #7c3aed;
        }

        .lede {
          margin: 4px 0 0;
          color: #374151;
        }

        .modes {
          display: flex;
          gap: 12px;
        }

        .controls {
          display: grid;
          gap: 8px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }

        .controls label {
          display: grid;
          gap: 4px;
          font-weight: 600;
        }

        input, select, button {
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
        }

        button {
          cursor: pointer;
          background: #111827;
          color: #fff;
          border: none;
        }

        .layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        }

        .stage {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
        }

        .stage.cube {
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

        .square {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 12px;
          display: grid;
          gap: 8px;
        }

        .meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .layer {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          color: #2563eb;
        }

        .actions {
          display: grid;
          gap: 6px;
        }

        .panel {
          display: grid;
          gap: 16px;
        }

        .executed ul {
          margin: 0;
          padding-left: 16px;
          display: grid;
          gap: 6px;
        }

        .hint {
          color: #6b7280;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default BalletRubikTrader;
