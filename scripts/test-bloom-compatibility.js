#!/usr/bin/env node

/**
 * Test script to verify mobile compatibility of Bloom fallback assets
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MOBILE_MAX_SIZE_KB = 50;
const TABLET_MAX_SIZE_KB = 50;
const DESKTOP_MAX_SIZE_KB = 50;

function testFileSize(path, maxSizeKB, name) {
  if (!existsSync(path)) {
    console.error(`❌ ${name}: File not found: ${path}`);
    return false;
  }

  const stats = readFileSync(path);
  const sizeKB = stats.length / 1024;
  
  if (sizeKB <= maxSizeKB) {
    console.log(`✓ ${name}: ${sizeKB.toFixed(2)}KB (within ${maxSizeKB}KB limit)`);
    return true;
  } else {
    console.error(`❌ ${name}: ${sizeKB.toFixed(2)}KB (exceeds ${maxSizeKB}KB limit)`);
    return false;
  }
}

function testManifest(path) {
  if (!existsSync(path)) {
    console.error(`❌ Manifest: File not found: ${path}`);
    return false;
  }

  try {
    const manifest = JSON.parse(readFileSync(path, 'utf8'));
    
    // Check required fields
    const requiredFields = ['generated', 'version', 'maxFileSizeKB', 'assets', 'copyright', 'license'];
    const missingFields = requiredFields.filter(field => !manifest[field]);
    
    if (missingFields.length > 0) {
      console.error(`❌ Manifest: Missing required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    // Check assets
    if (!Array.isArray(manifest.assets) || manifest.assets.length === 0) {
      console.error(`❌ Manifest: No assets found`);
      return false;
    }
    
    console.log(`✓ Manifest: Valid with ${manifest.assets.length} assets`);
    
    // Verify each asset entry
    let allAssetsValid = true;
    manifest.assets.forEach(asset => {
      const requiredAssetFields = ['name', 'dimensions', 'quality', 'sizeKB'];
      const missingAssetFields = requiredAssetFields.filter(field => asset[field] === undefined);
      
      if (missingAssetFields.length > 0) {
        console.error(`  ❌ Asset ${asset.name || 'unknown'}: Missing fields: ${missingAssetFields.join(', ')}`);
        allAssetsValid = false;
      } else if (asset.sizeKB > manifest.maxFileSizeKB) {
        console.error(`  ❌ Asset ${asset.name}: Size ${asset.sizeKB.toFixed(2)}KB exceeds limit ${manifest.maxFileSizeKB}KB`);
        allAssetsValid = false;
      } else {
        console.log(`  ✓ Asset ${asset.name}: ${asset.sizeKB.toFixed(2)}KB @ ${asset.dimensions.width}x${asset.dimensions.height}`);
      }
    });
    
    return allAssetsValid;
  } catch (error) {
    console.error(`❌ Manifest: Invalid JSON - ${error.message}`);
    return false;
  }
}

console.log('='.repeat(60));
console.log('Mobile Compatibility Test for Bloom Fallback Assets');
console.log('='.repeat(60));

const distDir = join(__dirname, '..', 'dist', 'bloom-fallbacks');
const results = [];

console.log('\n📏 File Size Tests:');
results.push(testFileSize(
  join(distDir, 'bloom-fallback-mobile.jpg'),
  MOBILE_MAX_SIZE_KB,
  'Mobile asset'
));

results.push(testFileSize(
  join(distDir, 'bloom-fallback-tablet.jpg'),
  TABLET_MAX_SIZE_KB,
  'Tablet asset'
));

results.push(testFileSize(
  join(distDir, 'bloom-fallback-desktop.jpg'),
  DESKTOP_MAX_SIZE_KB,
  'Desktop asset'
));

console.log('\n📋 Manifest Test:');
results.push(testManifest(join(distDir, 'manifest.json')));

console.log('\n' + '='.repeat(60));
const passed = results.filter(r => r).length;
const total = results.length;

if (passed === total) {
  console.log(`✅ All tests passed (${passed}/${total})`);
  console.log('='.repeat(60));
  process.exit(0);
} else {
  console.log(`❌ Some tests failed (${passed}/${total} passed)`);
  console.log('='.repeat(60));
  process.exit(1);
}
