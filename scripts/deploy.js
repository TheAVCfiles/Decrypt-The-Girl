#!/usr/bin/env node

/**
 * Lightweight deployment helper script. The project relies on GitHub Actions
 * for the actual build and publish steps, but we expose local npm scripts so
 * contributors can trigger the appropriate workflow contextually. This script
 * simply normalises the requested target and prints guidance for maintainers.
 */

const args = process.argv.slice(2);
const requestedTarget = args[0] || '';

const validTargets = new Set([
  'default',
  'app1',
  'app2',
  'app3',
  'app4',
  'app5',
  'app6',
  'app7',
  'app8',
  'app9',
  'app10',
]);

const fallbackTarget = 'default';
const target = validTargets.has(requestedTarget) ? requestedTarget : fallbackTarget;

if (!validTargets.has(requestedTarget) && requestedTarget !== '') {
  console.warn(`Unknown deploy target "${requestedTarget}". Falling back to "${fallbackTarget}".`);
}

const workflowHint =
  target === 'default'
    ? 'main GitHub Pages deployment workflow'
    : `GitHub Pages deployment workflow for ${target}`;

console.log(`Deployment target: ${target}`);
console.log(
  `This project deploys via the ${workflowHint}. Trigger the corresponding GitHub Action to publish updates.`,
);
console.log('Local deployment is not required because builds are handled in CI.');
