# Telemetry and Debugging Tests

This directory contains tests for the telemetry and trace capture functionality used in Decrypt-The-Girl.

## Overview

The telemetry system provides comprehensive debugging and monitoring capabilities for:
- **Stage-Trade Operations**: Choreography and trade orchestration in the Ballet Rubik Trader
- **Day-Zero Routines**: Scroll choreography, rendering, and rollup/collapse-sub routines

## Running Tests

```bash
# Run all tests
npm test

# Run only telemetry tests
npm run test:telemetry
```

## Telemetry Systems

### Stage-Trade Telemetry

Located in: `app/stage-trade/stageTradeAdapter.js` and `app/components/stageTradeAdapter.js`

**Functions:**
- `captureTrace(event, stage, details)` - Capture a stage-trade event
- `getTelemetryTraces(filters)` - Retrieve traces with optional filtering
- `clearTelemetry()` - Clear the telemetry buffer

**Usage Example:**
```javascript
import { captureTrace, getTelemetryTraces } from './app/stage-trade/stageTradeAdapter.js';

// Enable debug output in browser
window.__STAGE_TRADE_DEBUG__ = true;

// Traces are automatically captured by computeComposite and produceChoreographyAndTrade
const traces = getTelemetryTraces({ stage: 'composite' });
console.log('Composite traces:', traces);
```

**Trace Events:**
- `compute_start` / `compute_complete` - Composite calculation lifecycle
- `orchestration_start` / `orchestration_complete` - Choreography and trade production
- `telemetry_cleared` - Buffer cleared

### Day-Zero Telemetry

Located in: `DayZeroScroll.js`

**Functions:**
- `captureDayZeroTrace(routine, stage, details)` - Capture a day-zero debug event
- `getDayZeroTraces(filters)` - Retrieve day-zero traces
- `clearDayZeroTelemetry()` - Clear the day-zero buffer

**Usage Example:**
```javascript
import { getDayZeroTraces } from './DayZeroScroll.js';

// Enable debug output
globalThis.__DAY_ZERO_DEBUG__ = true;

// Traces are automatically captured by scroll routines
const scrollTraces = getDayZeroTraces({ routine: 'clampScrollProgress' });
console.log('Scroll traces:', scrollTraces);
```

**Trace Events:**
- `clampScrollProgress` - Clamping events and edge cases
- `computeAvatarTransform` - Avatar transform calculations
- `resolveMaterialMode` - Material mode transitions
- `getActiveSectionIndex` - Section matching and fallbacks

## Trace Structure

All traces follow this structure:
```javascript
{
  timestamp: 1234567890,           // Unix timestamp in milliseconds
  timestampISO: '2026-02-19T...',  // ISO 8601 timestamp
  event: 'compute_start',          // Stage-trade: event name
  routine: 'clampScrollProgress',  // Day-zero: routine name
  stage: 'composite',              // Execution stage
  details: {                       // Event-specific details
    composite: 0.7,
    normalizedTransit: 0.5
  }
}
```

## Filtering Traces

Both telemetry systems support filtering:

```javascript
// Filter by stage
getTelemetryTraces({ stage: 'composite' });

// Filter by event
getTelemetryTraces({ event: 'compute_start' });

// Filter by time
getTelemetryTraces({ since: '2026-02-19T09:00:00Z' });

// Combine filters
getDayZeroTraces({ 
  routine: 'clampScrollProgress', 
  stage: 'edge_case' 
});
```

## Buffer Management

Both systems maintain circular buffers:
- **Stage-Trade**: Maximum 100 traces
- **Day-Zero**: Maximum 200 traces

Older traces are automatically removed when buffers are full.

## Debug Mode

Enable debug mode to see traces in the console:

```javascript
// Browser environment (stage-trade)
window.__STAGE_TRADE_DEBUG__ = true;

// Node.js/Browser environment (day-zero)
globalThis.__DAY_ZERO_DEBUG__ = true;
```

## Production Use

Telemetry is production-safe:
- No performance impact when debug mode is disabled
- Minimal memory footprint with circular buffers
- Safe to deploy without removing instrumentation

## Test Coverage

The test suite validates:
1. ✅ Trace capture and retrieval
2. ✅ Buffer size limits
3. ✅ Filtering capabilities
4. ✅ Integration with computational routines
5. ✅ Edge case detection
6. ✅ Orchestration lifecycle tracking

All tests must pass before deployment.
