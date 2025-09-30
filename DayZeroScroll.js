import assert from 'node:assert/strict';

/**
 * Clamp a scroll position into the normalised progress range of 0 to 1.
 * The production code in `mika-scroll.html` expects a stable value even
 * when the browser reports scroll positions outside the theoretical
 * bounds (which can happen on overscroll). This helper guards against
 * those edge cases so downstream math does not explode.
 *
 * @param {number} scrollY - Current scroll position in pixels.
 * @param {number} totalScrollHeight - Total scrollable height in pixels.
 * @returns {number} A clamped, unit interval progress value.
 */
export function clampScrollProgress(scrollY, totalScrollHeight) {
  if (!Number.isFinite(scrollY) || !Number.isFinite(totalScrollHeight)) {
    throw new TypeError('Scroll inputs must be finite numbers.');
  }

  if (totalScrollHeight <= 0) {
    return 0;
  }

  const rawProgress = scrollY / totalScrollHeight;
  return Math.min(1, Math.max(0, rawProgress));
}

/**
 * Convert a normalised scroll progress value into the avatar transform
 * that powers the "glitch" choreography in the Mika Scroll experience.
 *
 * @param {number} scrollProgress - A clamped 0..1 scroll progress.
 * @returns {{ rotationY: number, positionY: number }}
 */
export function computeAvatarTransform(scrollProgress) {
  if (!Number.isFinite(scrollProgress)) {
    throw new TypeError('Scroll progress must be a finite number.');
  }

  const progress = Math.min(1, Math.max(0, scrollProgress));
  const rotationY = progress * Math.PI * 2;
  const positionY = (progress - 0.5) * -1;
  return { rotationY, positionY };
}

/**
 * Determine whether the Three.js material should remain in its wireframe
 * presentation or switch to the solid glitch effect. The production
 * implementation toggles the visual state once the viewer scrolls into
 * Section 2. We mirror that behaviour here in a pure function so it can
 * be unit tested.
 *
 * @param {number} scrollY - The current scroll position.
 * @param {{ section2Start: number }} thresholds - Scroll thresholds.
 * @returns {"wireframe" | "glitch"}
 */
export function resolveMaterialMode(scrollY, { section2Start }) {
  if (!Number.isFinite(scrollY) || !Number.isFinite(section2Start)) {
    throw new TypeError('Scroll thresholds must be finite numbers.');
  }

  return scrollY < section2Start ? 'wireframe' : 'glitch';
}

/**
 * Given a list of sections with start/end boundaries, find the active
 * section index for the current scroll position. The function assumes the
 * sections are sorted by their starting offset.
 *
 * @param {number} scrollY
 * @param {Array<{ start: number, end: number }>} sections
 * @returns {number} The index of the active section (defaults to last).
 */
export function getActiveSectionIndex(scrollY, sections) {
  if (!Number.isFinite(scrollY)) {
    throw new TypeError('Scroll position must be a finite number.');
  }

  if (!Array.isArray(sections) || sections.length === 0) {
    throw new TypeError('Sections must be a non-empty array.');
  }

  for (const section of sections) {
    if (!section || !Number.isFinite(section.start)) {
      throw new TypeError('Each section must define a finite start value.');
    }
    if (section.end != null && !Number.isFinite(section.end)) {
      throw new TypeError('Section end values must be finite numbers.');
    }
  }

  for (let index = 0; index < sections.length; index += 1) {
    const section = sections[index];
    const { start, end } = section;
    const effectiveEnd = end ?? Number.POSITIVE_INFINITY;

    if (scrollY >= start && scrollY < effectiveEnd) {
      return index;
    }
  }

  return sections.length - 1;
}

function runTest(name, fn) {
  try {
    fn();
    return { name, status: 'passed' };
  } catch (error) {
    return { name, status: 'failed', error };
  }
}

/**
 * Execute a focused unit test suite that validates the pure helpers used
 * to support the Day Zero scroll choreography. Each assertion mirrors a
 * real-world edge case observed while tuning the interactive experience.
 *
 * The function returns the test results so callers can integrate it with
 * wider tooling, and it throws if any assertion fails to preserve the
 * behaviour expected by automated pipelines.
 */
export function runDayZeroUnitTests() {
  const tests = [
    runTest('clampScrollProgress clamps negative input', () => {
      assert.equal(clampScrollProgress(-100, 500), 0);
    }),
    runTest('clampScrollProgress clamps values beyond total height', () => {
      assert.equal(clampScrollProgress(750, 500), 1);
    }),
    runTest('clampScrollProgress returns proportional value', () => {
      assert.equal(clampScrollProgress(125, 500), 0.25);
    }),
    runTest('clampScrollProgress handles zero total height', () => {
      assert.equal(clampScrollProgress(100, 0), 0);
    }),
    runTest('computeAvatarTransform respects rotation curve', () => {
      const { rotationY } = computeAvatarTransform(0.5);
      assert.equal(rotationY, Math.PI);
    }),
    runTest('computeAvatarTransform mirrors vertical easing', () => {
      const { positionY } = computeAvatarTransform(0.25);
      assert.equal(positionY, 0.25);
    }),
    runTest('resolveMaterialMode defaults to wireframe before section 2', () => {
      assert.equal(resolveMaterialMode(150, { section2Start: 200 }), 'wireframe');
    }),
    runTest('resolveMaterialMode enables glitch at section 2 and beyond', () => {
      assert.equal(resolveMaterialMode(250, { section2Start: 200 }), 'glitch');
    }),
    runTest('getActiveSectionIndex picks matching section', () => {
      const sections = [
        { start: 0, end: 400 },
        { start: 400, end: 800 },
        { start: 800 },
      ];
      assert.equal(getActiveSectionIndex(450, sections), 1);
    }),
    runTest('getActiveSectionIndex falls back to last section when beyond range', () => {
      const sections = [
        { start: 0, end: 400 },
        { start: 400, end: 800 },
        { start: 800 },
      ];
      assert.equal(getActiveSectionIndex(1200, sections), 2);
    }),
  ];

  const failed = tests.filter((test) => test.status === 'failed');

  for (const test of tests) {
    if (test.status === 'passed') {
      console.log(`✅ ${test.name}`);
    } else {
      console.error(`❌ ${test.name}`);
      console.error(test.error);
    }
  }

  if (failed.length > 0) {
    const error = new Error('Day Zero unit tests failed');
    error.failures = failed;
    throw error;
  }

  return tests;
}

export default {
  clampScrollProgress,
  computeAvatarTransform,
  resolveMaterialMode,
  getActiveSectionIndex,
  runDayZeroUnitTests,
};
