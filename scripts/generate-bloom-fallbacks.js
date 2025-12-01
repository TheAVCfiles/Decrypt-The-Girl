#!/usr/bin/env node

/**
 * Bloom Fallback Asset Generator
 * 
 * Generates visual fallback assets for the Day Zero Scroll component
 * with automatic size encoding to stay within mobile-friendly file limits.
 * 
 * Copyright (c) 2024 A.C. Van Cura
 * Licensed under MIT License
 */

import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  outputDir: join(__dirname, '..', 'dist', 'bloom-fallbacks'),
  maxFileSizeKB: 50, // Mobile-friendly max file size
  initialQuality: 0.92,
  minQuality: 0.6,
  qualityStep: 0.05,
  dimensions: {
    mobile: { width: 800, height: 600 },
    tablet: { width: 1200, height: 900 },
    desktop: { width: 1600, height: 1200 }
  }
};

/**
 * Generate a Bloom effect gradient background
 */
function generateBloomGradient(ctx, width, height, colorScheme) {
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, Math.max(width, height) / 1.5
  );
  
  gradient.addColorStop(0, colorScheme.center);
  gradient.addColorStop(0.4, colorScheme.mid);
  gradient.addColorStop(0.7, colorScheme.outer);
  gradient.addColorStop(1, colorScheme.edge);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Add ethereal glow effects
 */
function addBloomEffects(ctx, width, height) {
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = 0.3;
  
  // Add multiple bloom spots
  const bloomSpots = [
    { x: width * 0.3, y: height * 0.3, radius: width * 0.15 },
    { x: width * 0.7, y: height * 0.5, radius: width * 0.12 },
    { x: width * 0.5, y: height * 0.7, radius: width * 0.18 }
  ];
  
  bloomSpots.forEach(spot => {
    const bloomGradient = ctx.createRadialGradient(
      spot.x, spot.y, 0,
      spot.x, spot.y, spot.radius
    );
    bloomGradient.addColorStop(0, 'rgba(140, 109, 255, 0.8)');
    bloomGradient.addColorStop(0.5, 'rgba(140, 109, 255, 0.3)');
    bloomGradient.addColorStop(1, 'rgba(140, 109, 255, 0)');
    
    ctx.fillStyle = bloomGradient;
    ctx.fillRect(0, 0, width, height);
  });
  
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1.0;
}

/**
 * Add overlay text
 */
function addOverlayText(ctx, width, height, text, subtitle) {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Title
  ctx.font = `bold ${Math.floor(height * 0.08)}px Georgia, serif`;
  ctx.fillStyle = 'rgba(245, 246, 255, 0.95)';
  ctx.shadowColor = 'rgba(140, 109, 255, 0.6)';
  ctx.shadowBlur = 20;
  ctx.fillText(text, width / 2, height * 0.4);
  
  // Subtitle
  ctx.shadowBlur = 10;
  ctx.font = `${Math.floor(height * 0.04)}px Georgia, serif`;
  ctx.fillStyle = 'rgba(245, 246, 255, 0.7)';
  ctx.fillText(subtitle, width / 2, height * 0.55);
  
  // Reset shadow
  ctx.shadowBlur = 0;
}

/**
 * Encode canvas to JPEG with automatic quality adjustment
 */
function encodeWithAutosize(canvas, maxSizeKB) {
  let quality = CONFIG.initialQuality;
  let buffer = null;
  let attempts = 0;
  const maxAttempts = 20;
  
  while (attempts < maxAttempts) {
    buffer = canvas.toBuffer('image/jpeg', { quality });
    const sizeKB = buffer.length / 1024;
    
    console.log(`  Attempt ${attempts + 1}: Quality ${quality.toFixed(2)}, Size ${sizeKB.toFixed(2)}KB`);
    
    if (sizeKB <= maxSizeKB) {
      console.log(`  ✓ Target size achieved: ${sizeKB.toFixed(2)}KB at quality ${quality.toFixed(2)}`);
      return { buffer, quality, sizeKB };
    }
    
    quality -= CONFIG.qualityStep;
    if (quality < CONFIG.minQuality) {
      console.warn(`  ⚠ Minimum quality reached. Final size: ${sizeKB.toFixed(2)}KB`);
      return { buffer, quality: CONFIG.minQuality, sizeKB };
    }
    
    attempts++;
  }
  
  return { buffer, quality, sizeKB: buffer.length / 1024 };
}

/**
 * Generate a single Bloom fallback asset
 */
function generateBloomAsset(name, width, height, colorScheme, text, subtitle) {
  console.log(`\nGenerating ${name}...`);
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Generate the visual
  generateBloomGradient(ctx, width, height, colorScheme);
  addBloomEffects(ctx, width, height);
  addOverlayText(ctx, width, height, text, subtitle);
  
  // Encode with autosize
  const result = encodeWithAutosize(canvas, CONFIG.maxFileSizeKB);
  
  // Save to file
  const outputPath = join(CONFIG.outputDir, `${name}.jpg`);
  writeFileSync(outputPath, result.buffer);
  
  console.log(`  ✓ Saved: ${outputPath}`);
  
  return {
    name,
    path: outputPath,
    dimensions: { width, height },
    quality: result.quality,
    sizeKB: result.sizeKB
  };
}

/**
 * Main generation function
 */
function generateAllAssets() {
  console.log('='.repeat(60));
  console.log('Bloom Fallback Asset Generator');
  console.log('='.repeat(60));
  console.log(`Output directory: ${CONFIG.outputDir}`);
  console.log(`Max file size: ${CONFIG.maxFileSizeKB}KB`);
  console.log('='.repeat(60));
  
  // Create output directory
  mkdirSync(CONFIG.outputDir, { recursive: true });
  
  const colorSchemes = {
    cosmos: {
      center: 'rgba(30, 20, 60, 1)',
      mid: 'rgba(50, 40, 90, 1)',
      outer: 'rgba(20, 16, 40, 1)',
      edge: 'rgba(14, 16, 26, 1)'
    },
    twilight: {
      center: 'rgba(60, 40, 80, 1)',
      mid: 'rgba(40, 30, 70, 1)',
      outer: 'rgba(25, 20, 50, 1)',
      edge: 'rgba(14, 16, 26, 1)'
    },
    midnight: {
      center: 'rgba(40, 30, 70, 1)',
      mid: 'rgba(30, 25, 55, 1)',
      outer: 'rgba(20, 18, 40, 1)',
      edge: 'rgba(14, 16, 26, 1)'
    }
  };
  
  const assets = [];
  
  // Generate mobile assets
  const mobileScheme = colorSchemes.cosmos;
  assets.push(generateBloomAsset(
    'bloom-fallback-mobile',
    CONFIG.dimensions.mobile.width,
    CONFIG.dimensions.mobile.height,
    mobileScheme,
    'Day Zero Scroll',
    'Ephemeris Intelligence Brief'
  ));
  
  // Generate tablet assets
  const tabletScheme = colorSchemes.twilight;
  assets.push(generateBloomAsset(
    'bloom-fallback-tablet',
    CONFIG.dimensions.tablet.width,
    CONFIG.dimensions.tablet.height,
    tabletScheme,
    'Day Zero Scroll',
    'Ephemeris Intelligence Brief'
  ));
  
  // Generate desktop assets
  const desktopScheme = colorSchemes.midnight;
  assets.push(generateBloomAsset(
    'bloom-fallback-desktop',
    CONFIG.dimensions.desktop.width,
    CONFIG.dimensions.desktop.height,
    desktopScheme,
    'Day Zero Scroll',
    'Ephemeris Intelligence Brief'
  ));
  
  // Generate metadata
  const metadata = {
    generated: new Date().toISOString(),
    version: '1.0.0',
    maxFileSizeKB: CONFIG.maxFileSizeKB,
    assets: assets.map(a => ({
      name: a.name,
      dimensions: a.dimensions,
      quality: a.quality,
      sizeKB: a.sizeKB
    })),
    copyright: '© 2024 A.C. Van Cura',
    license: 'MIT',
    attribution: 'Decrypt The Girl - Interactive Poetic Codebook'
  };
  
  const metadataPath = join(CONFIG.outputDir, 'manifest.json');
  writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('Generation Complete!');
  console.log('='.repeat(60));
  console.log(`Total assets generated: ${assets.length}`);
  console.log(`Metadata saved: ${metadataPath}`);
  console.log('='.repeat(60) + '\n');
  
  return { assets, metadata };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    generateAllAssets();
  } catch (error) {
    console.error('Error generating Bloom fallback assets:', error);
    process.exit(1);
  }
}

export { generateAllAssets, CONFIG };
