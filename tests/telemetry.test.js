import assert from 'node:assert/strict';
import { 
  captureTrace, 
  getTelemetryTraces, 
  clearTelemetry,
  computeComposite,
  produceChoreographyAndTrade,
  defaultTuning
} from '../app/stage-trade/stageTradeAdapter.js';

import {
  captureDayZeroTrace,
  getDayZeroTraces,
  clearDayZeroTelemetry,
  clampScrollProgress,
  computeAvatarTransform,
  resolveMaterialMode,
  getActiveSectionIndex
} from '../DayZeroScroll.js';

/**
 * Test suite for telemetry and trace capture functionality.
 * Validates that stage-trade and day-zero debugging systems work correctly.
 */
function runTelemetryTests() {
  const tests = [];

  // Test 1: Stage-trade telemetry capture
  tests.push({
    name: 'captureTrace records events correctly',
    fn: () => {
      clearTelemetry();
      const trace = captureTrace('test_event', 'test_stage', { detail: 'value' });
      assert.ok(trace.timestamp);
      assert.equal(trace.event, 'test_event');
      assert.equal(trace.stage, 'test_stage');
      assert.deepEqual(trace.details, { detail: 'value' });
    }
  });

  // Test 2: Telemetry retrieval
  tests.push({
    name: 'getTelemetryTraces retrieves captured events',
    fn: () => {
      clearTelemetry();
      captureTrace('event1', 'stage1', { data: 1 });
      captureTrace('event2', 'stage1', { data: 2 });
      captureTrace('event1', 'stage2', { data: 3 });
      
      const allTraces = getTelemetryTraces();
      assert.equal(allTraces.length, 4); // Including the clear event
      
      const stage1Traces = getTelemetryTraces({ stage: 'stage1' });
      assert.equal(stage1Traces.length, 2);
      
      const event1Traces = getTelemetryTraces({ event: 'event1' });
      assert.equal(event1Traces.length, 2);
    }
  });

  // Test 3: Telemetry buffer limit
  tests.push({
    name: 'Telemetry buffer respects maximum size',
    fn: () => {
      clearTelemetry();
      // Fill buffer beyond limit
      for (let i = 0; i < 105; i++) {
        captureTrace(`event_${i}`, 'test', { index: i });
      }
      const traces = getTelemetryTraces();
      // Should not exceed MAX_TELEMETRY_BUFFER (100) + 1 clear event
      assert.ok(traces.length <= 101);
    }
  });

  // Test 4: ComputeComposite generates telemetry
  tests.push({
    name: 'computeComposite generates telemetry traces',
    fn: () => {
      clearTelemetry();
      const result = computeComposite({
        algoScore: 0.7,
        transits: [{ polarity: 1, orb: 2 }],
        archetypeScore: 0.5,
        planetarySnapshot: {
          Sun: { intensity: 0.8 },
          Moon: { intensity: 0.6 },
          Jupiter: { intensity: 0.5 }
        },
        tuning: defaultTuning()
      });
      
      const traces = getTelemetryTraces({ stage: 'composite' });
      assert.ok(traces.length >= 2); // start and complete events
      assert.ok(result.composite);
      assert.ok(result.rawTransit);
    }
  });

  // Test 5: ProduceChoreographyAndTrade generates telemetry
  tests.push({
    name: 'produceChoreographyAndTrade generates orchestration traces',
    fn: () => {
      clearTelemetry();
      const result = produceChoreographyAndTrade({
        composite: 0.7,
        rawTransit: { normalizedTransit: 0.5, planetaryLift: 0.3, transitSupport: 0.4 },
        marketSnapshot: { liquidity: 0.8, volatility: 0.3 },
        planetarySnapshot: { Sun: { intensity: 0.8 } },
        archetype: 'test_archetype',
        tuning: defaultTuning()
      });
      
      const traces = getTelemetryTraces({ stage: 'produce' });
      assert.ok(traces.length >= 2); // start and complete events
      assert.ok(result.choreography);
      assert.ok(result.tradeAction);
      assert.equal(result.tradeAction.side, 'BUY'); // 0.7 > 0.55
    }
  });

  // Test 6: Day-zero telemetry capture
  tests.push({
    name: 'captureDayZeroTrace records day-zero events',
    fn: () => {
      clearDayZeroTelemetry();
      const trace = captureDayZeroTrace('scroll_routine', 'start', { scrollY: 100 });
      assert.ok(trace.timestamp);
      assert.equal(trace.routine, 'scroll_routine');
      assert.equal(trace.stage, 'start');
    }
  });

  // Test 7: Day-zero scroll generates telemetry
  tests.push({
    name: 'clampScrollProgress generates day-zero traces on edge cases',
    fn: () => {
      clearDayZeroTelemetry();
      
      // Test clamping
      clampScrollProgress(-50, 500);
      let traces = getDayZeroTraces({ stage: 'clamping' });
      assert.ok(traces.length > 0);
      
      // Test zero height edge case
      clearDayZeroTelemetry();
      clampScrollProgress(100, 0);
      traces = getDayZeroTraces({ stage: 'edge_case' });
      assert.ok(traces.length > 0);
    }
  });

  // Test 8: Avatar transform telemetry
  tests.push({
    name: 'computeAvatarTransform generates telemetry',
    fn: () => {
      clearDayZeroTelemetry();
      const result = computeAvatarTransform(0.5);
      const traces = getDayZeroTraces({ routine: 'computeAvatarTransform' });
      assert.ok(traces.length >= 2); // start and complete
      assert.ok(result.rotationY);
      assert.ok(Number.isFinite(result.positionY));
    }
  });

  // Test 9: Material mode telemetry
  tests.push({
    name: 'resolveMaterialMode generates telemetry',
    fn: () => {
      clearDayZeroTelemetry();
      const mode = resolveMaterialMode(150, { section2Start: 200 });
      const traces = getDayZeroTraces({ routine: 'resolveMaterialMode' });
      assert.ok(traces.length >= 2);
      assert.equal(mode, 'wireframe');
    }
  });

  // Test 10: Active section telemetry
  tests.push({
    name: 'getActiveSectionIndex generates telemetry',
    fn: () => {
      clearDayZeroTelemetry();
      const sections = [
        { start: 0, end: 400 },
        { start: 400, end: 800 },
        { start: 800 }
      ];
      const index = getActiveSectionIndex(450, sections);
      const traces = getDayZeroTraces({ routine: 'getActiveSectionIndex' });
      assert.ok(traces.length >= 2);
      assert.equal(index, 1);
    }
  });

  // Run all tests
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      test.fn();
      console.log(`✅ ${test.name}`);
      passed++;
    } catch (error) {
      console.error(`❌ ${test.name}`);
      console.error(error);
      failed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`);

  if (failed > 0) {
    throw new Error(`${failed} telemetry tests failed`);
  }

  return { passed, failed };
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTelemetryTests();
}

export { runTelemetryTests };
