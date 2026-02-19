# Vendor Assets - Local Dependencies

This directory contains local implementations and stubs for external dependencies, enabling the project to run without relying on external CDNs or APIs.

## Directory Structure

```
assets/vendor/
├── css/
│   └── tailwind-minimal.css    # Minimal Tailwind utilities subset
└── js/
    ├── lottie-stub.js          # Lottie Web API stub
    └── three-stub.js           # Three.js API stub
```

## Purpose

These vendor assets serve as **fallback implementations** that:
- Enable offline-first functionality
- Reduce external dependencies
- Improve performance and reliability
- Maintain privacy by avoiding third-party tracking

## Components

### 1. Tailwind Minimal CSS (`css/tailwind-minimal.css`)

A lightweight subset of Tailwind CSS utilities containing only the classes used in this project:
- Layout utilities (flexbox, positioning, sizing)
- Typography utilities (font sizes, weights, colors)
- Responsive breakpoints (md, lg)
- Custom utilities (gradients, selection colors)

**Usage**: Replace `<script src="https://cdn.tailwindcss.com"></script>` with:
```html
<link rel="stylesheet" href="assets/vendor/css/tailwind-minimal.css">
```

### 2. Lottie Web Stub (`js/lottie-stub.js`)

A minimal implementation of the Lottie Web API that:
- Provides compatible method signatures
- Shows placeholder content when animations aren't available
- Prevents JavaScript errors when full library isn't loaded
- Logs stub calls for debugging

**Usage**: Replace CDN script tag with:
```html
<script src="assets/vendor/js/lottie-stub.js"></script>
```

**Note**: This is a stub implementation for graceful degradation. For full animation features, you can optionally download the complete Lottie library from:
- https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js

### 3. Three.js Stub (`js/three-stub.js`)

A minimal implementation of the Three.js API that:
- Provides compatible class constructors
- Prevents JavaScript errors in pages using Three.js
- Logs creation of 3D objects for debugging
- Includes `isStub` flag for detection

**Usage**: Replace CDN script tag with:
```html
<script src="assets/vendor/js/three-stub.js"></script>
```

**Note**: This is a stub for graceful degradation. For full 3D rendering, you can optionally download the complete Three.js library from:
- https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js

## Offline-First Strategy

The project employs an **offline-first architecture**:

1. **Local Data Sources**:
   - Lottie animations stored in `assets/lottie/`
   - Ephemeris data with built-in fallbacks in `scripts/day-zero-scroll.js`
   - Local storage for user data in `crown-signal-node.html`

2. **Graceful Degradation**:
   - External APIs are optional enhancements
   - All core functionality works offline
   - User-friendly messages when external services unavailable

3. **Self-Contained Deployment**:
   - GitHub Pages hosting (no external hosting dependencies)
   - Local Python server for development (`python3 -m http.server`)
   - Docker-ready architecture

## Production Enhancements (Optional)

For production deployments, you can optionally enhance these stubs by:

1. **Downloading Full Libraries**: Replace stubs with complete libraries for full functionality
2. **Using npm/yarn**: Install packages locally: `npm install lottie-web three`
3. **Build Pipeline**: Use bundlers (webpack, rollup) to optimize assets
4. **Service Workers**: Add offline caching for enhanced performance

## Development

To test with local vendor assets:

```bash
# Start local development server
python3 -m http.server 8080

# Or use npm script
npm start
```

Visit `http://localhost:8080` to see pages using local vendor assets.

## Maintenance

When updating vendor assets:
1. Document changes in this README
2. Update version comments in stub files
3. Test all pages that use the modified assets
4. Verify graceful degradation still works

## License

Vendor stubs are part of this project and follow the same MIT license.

For full library licenses:
- Tailwind CSS: MIT License
- Lottie Web: MIT License
- Three.js: MIT License
