import React, { useEffect, useState } from 'react';
import { defaultTuning } from './stageTradeAdapter';

const numberField = (value) => (Number.isFinite(value) ? value : 0);

const StageTradePanel = ({ tuning, onTuningChange, onChoreography }) => {
  const [localTuning, setLocalTuning] = useState(tuning || defaultTuning());

  useEffect(() => {
    setLocalTuning(tuning || defaultTuning());
  }, [tuning]);

  const updateField = (field, value) => {
    const updated = { ...localTuning, [field]: value };
    setLocalTuning(updated);
    onTuningChange?.(updated);
  };

  const handleChoreographyPreview = () => {
    const choreography = {
      sequence: [
        { beat: 'alpha', layer: 'energy', action: 'calibrate', intensity: numberField(localTuning.algoWeight) },
        { beat: 'beta', layer: 'capital', action: 'balance', emphasis: numberField(localTuning.transitWeight) },
        { beat: 'gamma', layer: 'destiny', action: 'align', emphasis: numberField(localTuning.archetypeWeight) },
      ],
      meta: { tuning: localTuning, note: 'Dev preview choreography' },
    };

    onChoreography?.(choreography);
  };

  return (
    <section className="stage-trade-panel">
      <header>
        <h3>Stage Trade Panel</h3>
        <p className="hint">Dev / tuning UI for choreography + trade bridge</p>
      </header>

      <div className="field">
        <label htmlFor="algoWeight">Algo Weight</label>
        <input
          id="algoWeight"
          type="number"
          step="0.05"
          min="0"
          max="1"
          value={numberField(localTuning.algoWeight)}
          onChange={(event) => updateField('algoWeight', parseFloat(event.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="transitWeight">Transit Weight</label>
        <input
          id="transitWeight"
          type="number"
          step="0.05"
          min="0"
          max="1"
          value={numberField(localTuning.transitWeight)}
          onChange={(event) => updateField('transitWeight', parseFloat(event.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="archetypeWeight">Archetype Weight</label>
        <input
          id="archetypeWeight"
          type="number"
          step="0.05"
          min="0"
          max="1"
          value={numberField(localTuning.archetypeWeight)}
          onChange={(event) => updateField('archetypeWeight', parseFloat(event.target.value))}
        />
      </div>

      <div className="field">
        <label htmlFor="bias">Bias</label>
        <input
          id="bias"
          type="number"
          step="0.01"
          min="-1"
          max="1"
          value={numberField(localTuning.bias)}
          onChange={(event) => updateField('bias', parseFloat(event.target.value))}
        />
      </div>

      <button type="button" className="preview" onClick={handleChoreographyPreview}>
        Preview Choreography
      </button>

      <style jsx>{`
        .stage-trade-panel {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          background: #fafafa;
          display: grid;
          gap: 12px;
        }

        .stage-trade-panel h3 {
          margin: 0 0 4px;
        }

        .hint {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        label {
          font-weight: 600;
        }

        input {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .preview {
          padding: 10px 12px;
          border: none;
          background: #222;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }

        .preview:hover {
          background: #111;
        }
      `}</style>
    </section>
  );
};

export default StageTradePanel;
