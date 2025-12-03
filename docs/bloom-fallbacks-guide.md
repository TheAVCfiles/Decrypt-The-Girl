# Bloom Fallback Assets - User Guide

## Overview

The Bloom Fallback Assets system provides automatically generated, mobile-optimized visual fallback images for the Day Zero Scroll component. These assets are designed to maintain visual continuity when live ephemeris feeds are unavailable.

## Quick Start

### Generate Assets Locally

```bash
# Install dependencies
npm install

# Generate Bloom fallback assets
npm run generate:bloom

# Verify mobile compatibility
npm run test:bloom
```

Generated assets will be saved to `dist/bloom-fallbacks/` directory.

## Features

### Autosize Encoding

The generation script automatically adjusts JPEG quality to ensure each asset stays within the 50KB file size limit:

- **Initial Quality**: 0.92 (92%)
- **Minimum Quality**: 0.60 (60%)
- **Quality Step**: 0.05 (5% decrease per iteration)
- **Max File Size**: 50KB (mobile-optimized)

The algorithm will:
1. Generate the image at the initial quality setting
2. Check if the file size is within the limit
3. If too large, reduce quality by 5% and try again
4. Repeat until the size constraint is met or minimum quality is reached

### Responsive Sizes

Three optimized sizes are generated to support different device categories:

| Device   | Dimensions  | Target Use Case                |
|----------|-------------|--------------------------------|
| Mobile   | 800 × 600   | Smartphones, small screens     |
| Tablet   | 1200 × 900  | Tablets, medium screens        |
| Desktop  | 1600 × 1200 | Desktop computers, large screens |

### Visual Design

Each asset features:
- **Cosmic gradients** with purple/violet color schemes
- **Ethereal bloom effects** for visual depth
- **Typography overlay** with "Day Zero Scroll" title
- **Professional appearance** matching the project aesthetic

## Generated Files

After running `npm run generate:bloom`, you'll find:

```
dist/bloom-fallbacks/
├── bloom-fallback-mobile.jpg    # Mobile device asset
├── bloom-fallback-tablet.jpg    # Tablet device asset
├── bloom-fallback-desktop.jpg   # Desktop device asset
└── manifest.json                # Metadata and generation info
```

### Manifest File

The `manifest.json` contains:
- Generation timestamp
- Version information
- Asset specifications (dimensions, quality, file size)
- Copyright and licensing information

Example:
```json
{
  "generated": "2024-12-01T17:30:57.606Z",
  "version": "1.0.0",
  "maxFileSizeKB": 50,
  "assets": [
    {
      "name": "bloom-fallback-mobile",
      "dimensions": { "width": 800, "height": 600 },
      "quality": 0.92,
      "sizeKB": 32.48
    }
  ],
  "copyright": "© 2024 A.C. Van Cura",
  "license": "MIT",
  "attribution": "Decrypt The Girl - Interactive Poetic Codebook"
}
```

## GitHub Actions Workflow

### Automated Release Process

The `build-bloom-fallbacks.yml` workflow automatically:

1. **Generates assets** when triggered
2. **Creates packages** in TAR.GZ and ZIP formats
3. **Generates checksums** for verification (SHA-256)
4. **Creates draft releases** with all artifacts
5. **Generates SLSA provenance** for supply chain security

### Triggering a Release

**Option 1: Manual Workflow Dispatch**
```bash
# Via GitHub UI:
# 1. Go to Actions → Build and Release Bloom Fallbacks
# 2. Click "Run workflow"
# 3. Select release type (draft/prerelease/release)
```

**Option 2: Tag-Based Release**
```bash
# Create and push a tag
git tag bloom-v1.0.0
git push origin bloom-v1.0.0
```

### Release Artifacts

Each release includes:
- `bloom-fallbacks-{version}.tar.gz` - TAR.GZ archive
- `bloom-fallbacks-{version}.zip` - ZIP archive
- `bloom-checksums.txt` - SHA-256 checksums
- `BLOOM_ASSETS_LICENSE.md` - Asset license
- SLSA provenance file for verification

## Verification

### Verify Downloaded Assets

```bash
# Download the checksums file from the release
# Then verify the assets:
sha256sum -c bloom-checksums.txt
```

### Local Testing

```bash
# Run the compatibility test suite
npm run test:bloom
```

This will verify:
- File sizes are within mobile-friendly limits (≤50KB)
- Image dimensions are correct
- Manifest file is valid and complete

## Licensing

### Generated Assets
The generated Bloom fallback assets are licensed under a **proprietary license** to protect intellectual property rights. See [BLOOM_ASSETS_LICENSE.md](../BLOOM_ASSETS_LICENSE.md) for details.

Key points:
- ✅ **Personal & Non-Commercial Use**: Allowed with attribution
- ⚠️ **Commercial Use**: Requires separate licensing
- 📝 **Attribution Required**: Must credit the project and author
- 🚫 **No Modifications**: Assets cannot be altered without permission

### Generation Software
The scripts and tools used to generate the assets are licensed under the [MIT License](../LICENSE).

## Configuration

### Customizing Generation

Edit `scripts/generate-bloom-fallbacks.js` to customize:

```javascript
const CONFIG = {
  outputDir: join(__dirname, '..', 'dist', 'bloom-fallbacks'),
  maxFileSizeKB: 50,              // Maximum file size
  initialQuality: 0.92,           // Starting quality
  minQuality: 0.6,                // Minimum quality threshold
  qualityStep: 0.05,              // Quality reduction per iteration
  dimensions: {
    mobile: { width: 800, height: 600 },
    tablet: { width: 1200, height: 900 },
    desktop: { width: 1600, height: 1200 }
  }
};
```

### Color Schemes

Customize the visual appearance by modifying the color schemes in the generator:

```javascript
const colorSchemes = {
  cosmos: {
    center: 'rgba(30, 20, 60, 1)',
    mid: 'rgba(50, 40, 90, 1)',
    outer: 'rgba(20, 16, 40, 1)',
    edge: 'rgba(14, 16, 26, 1)'
  }
  // Add more schemes...
};
```

## Troubleshooting

### Generation Fails

**Issue**: Canvas module not found
```
Solution: npm install
```

**Issue**: System dependencies missing (Linux)
```bash
sudo apt-get update
sudo apt-get install -y libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

### File Size Too Large

If assets consistently exceed the 50KB limit:
1. Reduce `initialQuality` in CONFIG
2. Decrease image dimensions
3. Lower `minQuality` threshold (may affect visual quality)

### Workflow Fails

Check the GitHub Actions logs for:
- Node.js version compatibility (requires ≥14)
- System dependency installation
- Canvas module compilation errors

## Integration

### Using Assets in Your Project

```html
<!-- Responsive picture element -->
<picture>
  <source media="(min-width: 1200px)" srcset="bloom-fallback-desktop.jpg">
  <source media="(min-width: 800px)" srcset="bloom-fallback-tablet.jpg">
  <img src="bloom-fallback-mobile.jpg" alt="Day Zero Scroll Fallback">
</picture>
```

### Day Zero Scroll Integration

The Day Zero Scroll component can use these assets as fallbacks when the ephemeris feed is unavailable. See the component documentation for integration details.

## Support

For questions, issues, or licensing inquiries:

- **GitHub Issues**: [Decrypt-The-Girl Issues](https://github.com/TheAVCfiles/Decrypt-The-Girl/issues)
- **Instagram**: [@DeCrypt_The_Girl](https://instagram.com/DeCrypt_The_Girl)
- **Commercial Licensing**: [Ko-fi Commissions](https://ko-fi.com/decryptthegirl/commissions)

---

**Copyright © 2024 A.C. Van Cura**  
Part of the [Decrypt The Girl](https://theavcfiles.github.io/Decrypt-The-Girl/) project
