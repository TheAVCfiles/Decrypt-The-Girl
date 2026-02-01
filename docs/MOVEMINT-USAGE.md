# MoveMint Card – Usage Documentation

## 🌀 Overview

**MoveMint** is a dramatic, cipher-themed motion tracking component from the [Decrypt The Girl](https://github.com/TheAVCfiles/Decrypt-The-Girl) project. It transforms fitness tracking into a mystical somatic signal experience with poetic language, dark cosmic aesthetics, and zero dependencies.

## 📍 Live Demo

**[https://theavcfiles.github.io/Decrypt-The-Girl/docs/movemint-card.html](https://theavcfiles.github.io/Decrypt-The-Girl/docs/movemint-card.html)**

## 🚀 Quick Start

### Option 1: Direct File Usage (Standalone)

1. **Download the file:**
   ```bash
   curl -O https://raw.githubusercontent.com/TheAVCfiles/Decrypt-The-Girl/main/docs/movemint-card.html
   ```

2. **Open in browser:**
   ```bash
   open movemint-card.html
   # Or use a local server (recommended):
   python3 -m http.server 8080
   # Navigate to http://localhost:8080/movemint-card.html
   ```

3. **That's it!** The component is fully self-contained with no dependencies.

### Option 2: Embed in Your Site

#### Simple iframe Embed

```html
<iframe 
  src="https://theavcfiles.github.io/Decrypt-The-Girl/docs/movemint-card.html"
  width="100%"
  height="800px"
  style="border: none; max-width: 500px; margin: 0 auto; display: block;"
  title="MoveMint - The Body as Signal">
</iframe>
```

#### Extract & Customize

Since MoveMint is a single HTML file with embedded CSS and JavaScript, you can extract specific sections:

1. **Copy the entire HTML file** to your project
2. **Modify the metrics configuration** in the JavaScript section (line ~500-520):

```javascript
const CONFIG = {
  updateInterval: 3000, // Update frequency in ms
  animationDuration: 1000, // Animation speed
  metricsConfig: {
    steps: { min: 8000, max: 12000, increment: 50 },
    calories: { min: 500, max: 800, increment: 10 },
    duration: { min: 30, max: 90, increment: 5 },
    streak: { min: 1, max: 30, increment: 1 }
  }
};
```

3. **Customize the theme** by editing CSS variables (line ~26-44):

```css
:root {
  --luxe-deep: #0a0a0f;
  --luxe-ink: #1a1a2e;
  --luxe-accent: #9778ff;
  --luxe-cipher: #c77dff;
  --luxe-signal: #9d4edd;
  /* ... more variables ... */
}
```

## 🎨 Customization Guide

### 1. Change the Theme Colors

Edit the CSS variables in the `:root` selector to match your brand:

```css
:root {
  --luxe-accent: #your-primary-color;
  --luxe-cipher: #your-secondary-color;
  --luxe-signal: #your-tertiary-color;
}
```

### 2. Modify Metric Labels

Update the HTML content (line ~410-470) to change labels:

```html
<div class="metric-label">Your Custom Label</div>
```

### 3. Change Icons

Replace emoji icons with your own:

```html
<span class="metric-icon" aria-hidden="true">🎯</span>
```

Or use icon fonts (Font Awesome, Material Icons, etc.):

```html
<span class="metric-icon" aria-hidden="true">
  <i class="fas fa-running"></i>
</span>
```

### 4. Integrate Real Data

Replace the random metric generation with your actual data source:

```javascript
// Instead of random values, fetch from your API:
async function updateMetric(metricName) {
  const response = await fetch('/api/metrics/' + metricName);
  const data = await response.json();
  const element = metricElements[metricName];
  animateValue(element, currentValue, data.value, 1000);
}
```

### 5. Customize the CTA Button

Update button text and action (line ~480):

```html
<button class="cta-button" aria-label="Your custom action">
  Your Button Text
</button>
```

And the click handler (line ~590-605):

```javascript
ctaButton.addEventListener('click', function() {
  // Your custom action
  window.location.href = '/your-signup-page';
});
```

## 🔧 Technical Specifications

### File Details
- **Size**: ~19KB (uncompressed)
- **Lines**: 675+
- **Dependencies**: Zero (pure vanilla JS)
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: Fully responsive (375px+)

### Features
- **Dynamic Metrics**: Animated value updates with cubic easing
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Responsive**: Mobile-first design with breakpoints
- **Dark Theme**: Cosmic purple gradient background
- **Zero Build**: No compilation or transpilation needed

### Performance
- **First Load**: <100ms (excluding network)
- **Animation**: 60fps smooth transitions
- **Memory**: <5MB footprint
- **No External Requests**: All assets inline

## 📦 Integration Examples

### React/Next.js

```jsx
// components/MoveMintCard.jsx
export default function MoveMintCard() {
  return (
    <iframe
      src="/movemint-card.html"
      className="w-full max-w-md mx-auto border-0"
      style={{ height: '800px' }}
      title="MoveMint Card"
    />
  );
}
```

### Vue.js

```vue
<template>
  <iframe
    src="/movemint-card.html"
    class="movemint-iframe"
    title="MoveMint Card"
  />
</template>

<style scoped>
.movemint-iframe {
  width: 100%;
  max-width: 500px;
  height: 800px;
  border: none;
  margin: 0 auto;
}
</style>
```

### WordPress

Add to your page/post using the HTML block:

```html
<div style="max-width: 500px; margin: 40px auto;">
  <iframe 
    src="https://theavcfiles.github.io/Decrypt-The-Girl/docs/movemint-card.html"
    width="100%"
    height="800px"
    style="border: none;"
    title="MoveMint - The Body as Signal">
  </iframe>
</div>
```

### Static HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Fitness App</title>
</head>
<body>
  <header>
    <h1>My Fitness Dashboard</h1>
  </header>
  
  <main>
    <iframe 
      src="./movemint-card.html"
      width="100%"
      height="800px"
      style="border: none; max-width: 500px; margin: 0 auto; display: block;"
      title="MoveMint Card">
    </iframe>
  </main>
</body>
</html>
```

## 🎯 Use Cases

### 1. **Fitness/Wellness Apps**
- Drop-in motion tracking dashboard
- Gamified activity visualization
- Poetic approach to health metrics

### 2. **Art/Poetry Projects**
- Interactive digital art installations
- Somatic code experiments
- Narrative-driven experiences

### 3. **Educational Demos**
- Teaching vanilla JavaScript
- CSS animation examples
- Accessibility best practices

### 4. **Personal Portfolios**
- Showcase technical + creative skills
- Interactive resume component
- Design system demonstration

## 📋 Best Practices

### 1. **Attribution**
Always include attribution when using MoveMint:

```html
<!-- In your HTML footer or credits page -->
<footer>
  <p>MoveMint component by <a href="https://github.com/TheAVCfiles/Decrypt-The-Girl">A.C. Van Cura</a></p>
</footer>
```

### 2. **Accessibility**
- Keep all ARIA labels intact
- Test with screen readers
- Maintain keyboard navigation
- Respect `prefers-reduced-motion`

### 3. **Performance**
- Use local copy for production (don't hotlink)
- Consider lazy loading if below the fold
- Optimize metric update frequency for your use case

### 4. **Customization**
- Modify CSS variables instead of hardcoded values
- Keep semantic HTML structure
- Test responsive breakpoints after changes

## 🔐 License & Attribution

### Personal/Educational Use
✅ **FREE** with attribution required

**Required Attribution:**
```
MoveMint by A.C. Van Cura (Decrypt The Girl)
https://github.com/TheAVCfiles/Decrypt-The-Girl
```

### Commercial Use
⚠️ **Contact author for commercial licensing**

Commercial use includes:
- Integration into paid products/services
- Use in client projects (agencies/freelancers)
- Distribution as part of commercial themes/templates
- Use in revenue-generating applications

**For commercial licensing:**
- Open an issue: [GitHub Issues](https://github.com/TheAVCfiles/Decrypt-The-Girl/issues)
- Explain your use case
- Negotiate terms

### What's NOT Allowed
❌ Removing copyright notices
❌ Claiming as your own work
❌ Redistributing without attribution
❌ Commercial use without permission
❌ Sublicensing or selling as-is

### What IS Allowed
✅ Personal projects with attribution
✅ Educational use
✅ Non-profit organizations
✅ Open source projects (with attribution)
✅ Portfolio demonstrations
✅ Learning and experimentation

## 🆘 Support & Questions

### Documentation
- **Main README**: [Decrypt The Girl](https://github.com/TheAVCfiles/Decrypt-The-Girl)
- **This Guide**: You're reading it!
- **Live Demo**: [MoveMint Card](https://theavcfiles.github.io/Decrypt-The-Girl/docs/movemint-card.html)

### Get Help
1. **Check existing issues**: [GitHub Issues](https://github.com/TheAVCfiles/Decrypt-The-Girl/issues)
2. **Open a new issue**: For bugs or feature requests
3. **Discussions**: For questions and ideas

### Contributing
Want to improve MoveMint? See [CONTRIBUTING.md](../CONTRIBUTING.md)

## 📊 Changelog

### v1.0.0 (2024-12-01)
- Initial dramatic cipher-themed release
- Zero-dependency implementation
- Full accessibility support
- Responsive mobile-first design
- Dark cosmic purple aesthetic

### v1.1.0 (2026-02-01)
- Added comprehensive usage documentation
- Enhanced licensing clarification
- Commercial use terms defined
- Integration examples added

## 💡 Tips & Tricks

### Disable Auto-Updates
If you want static metrics:

```javascript
// Comment out this line in the init() function:
// const updateTimer = setInterval(updateAllMetrics, CONFIG.updateInterval);
```

### Change Update Speed
```javascript
const CONFIG = {
  updateInterval: 5000, // Update every 5 seconds instead of 3
  // ...
};
```

### Use Custom Fonts
Add to the `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Then update the CSS:

```css
body {
  font-family: 'Your Font', sans-serif;
}
```

### Make it Fullscreen
```css
.movemint-card {
  max-width: 100%;
  height: 100vh;
  border-radius: 0;
}
```

---

## 🌟 Credits

**Created by**: A.C. Van Cura  
**Project**: [Decrypt The Girl](https://github.com/TheAVCfiles/Decrypt-The-Girl)  
**License**: MIT (with commercial use restrictions)  
**Year**: 2024-2026

---

*"The body is a cipher. Every movement writes code. Decrypt yourself."*
