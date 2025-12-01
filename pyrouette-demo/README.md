# Pyrouette Demo - Lottie Diagnostic Panel

A polished and accessible MVP for testing and displaying Lottie animations with comprehensive accessibility support and diagnostic capabilities.

## Features

### 🎨 Animation Display
- **Lazy Loading**: Animations are loaded efficiently on page initialization
- **Lottie Web Integration**: Uses the industry-standard lottie-web library (v5.12.2) from CDN
- **SVG Rendering**: High-quality, scalable animation rendering

### ♿ Accessibility
- **Reduced Motion Support**: Automatically detects and respects `prefers-reduced-motion` system preferences
- **Fallback Messages**: Clear, accessible messaging when animations are disabled
- **ARIA Labels**: Proper labeling for screen readers
  - SVG animations marked with `aria-hidden="true"` and `role="presentation"`
  - Status updates use `aria-live="polite"` for screen reader announcements
- **Keyboard Navigation**: All controls are fully keyboard accessible
- **Focus Indicators**: Clear visual indicators for keyboard navigation

### 🎮 Controls
- **Play**: Start or resume animation playback
- **Pause**: Pause the animation at the current frame
- **Reload**: Reset and reload the animation from the beginning

### 🎨 Theme Toggle
- **Dark Mode** (default): Easy on the eyes with a dark background
- **Light Mode**: Clean, bright interface for well-lit environments
- **Persistence**: Theme preference is saved to localStorage

### 📊 Diagnostic Information
- **Real-time Status**: Display of animation state (Playing, Paused, Loading, Error)
- **Frame Counter**: Shows current frame and total frames for debugging

## Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development)

### Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/TheAVCfiles/Decrypt-The-Girl.git
   cd Decrypt-The-Girl/pyrouette-demo
   ```

2. **Start a local server**:
   
   Using Python 3:
   ```bash
   python3 -m http.server 8080
   ```
   
   Using Node.js (http-server):
   ```bash
   npx http-server -p 8080
   ```

3. **Open in browser**:
   Navigate to `http://localhost:8080/diag-lottie.html`

## Usage

### Viewing the Demo

Simply open `diag-lottie.html` in your browser through a local web server. The animation will automatically load and begin playing.

### Using with Your Own Lottie Files

1. **Add your Lottie JSON file** to `assets/lottie/`:
   ```bash
   cp your-animation.json assets/lottie/
   ```

2. **Update the animation path** in `diag-lottie.html`:
   ```javascript
   animationInstance = lottie.loadAnimation({
     container: lottieContainer,
     renderer: 'svg',
     loop: true,
     autoplay: true,
     path: 'assets/lottie/your-animation.json'  // Update this line
   });
   ```

3. **Refresh the page** to see your animation

### Testing Reduced Motion

To test the reduced-motion fallback:

**On macOS**:
1. System Preferences → Accessibility → Display
2. Enable "Reduce motion"

**On Windows 10/11**:
1. Settings → Ease of Access → Display
2. Turn on "Show animations in Windows"

**On Linux (GNOME)**:
```bash
gsettings set org.gnome.desktop.interface enable-animations false
```

## File Structure

```
pyrouette-demo/
├── diag-lottie.html          # Main demo HTML file
├── README.md                 # This file
└── assets/
    └── lottie/
        ├── diag-lottie.json  # Example Lottie animation
        └── manifest.json     # Animation manifest (optional)
```

## Lottie JSON Format

The included `diag-lottie.json` is a simple, validated example animation. It includes all essential Lottie JSON keys:

- `v`: Lottie version (e.g., "5.7.4")
- `fr`: Frame rate (e.g., 30)
- `ip`: In-point frame (start frame, typically 0)
- `op`: Out-point frame (end frame)
- `w`: Width in pixels
- `h`: Height in pixels
- `layers`: Array of animation layers

### Creating Your Own Lottie Files

You can create Lottie animations using:
- **Adobe After Effects** with the [Bodymovin plugin](https://aescripts.com/bodymovin/)
- **LottieFiles Creator**: https://lottiefiles.com/creator
- **SVGator**: https://www.svgator.com/

### Validating Lottie Files

The repository includes a GitHub Actions workflow that automatically validates Lottie JSON files on pull requests. The validator checks for:
- Valid JSON syntax
- Required keys: `v`, `fr`, `ip`, `op`, `layers`
- Proper structure

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Animation doesn't load
- Ensure you're running the page through a web server (not `file://`)
- Check browser console for error messages
- Verify the JSON file path is correct
- Validate your Lottie JSON structure

### Controls don't work
- Check if reduced motion is enabled in your system settings
- Verify JavaScript is enabled in your browser
- Check browser console for errors

### Theme toggle doesn't persist
- Ensure localStorage is enabled in your browser
- Check for browser extensions that might block localStorage

## Contributing

When adding new Lottie animations:

1. Place JSON files in `assets/lottie/`
2. Ensure files follow the Lottie JSON format specification
3. The validation workflow will automatically check your files
4. Update this README if adding significant features

## License

This project is part of the Decrypt The Girl repository and is licensed under the MIT License.

## Resources

- [Lottie Documentation](https://airbnb.io/lottie/)
- [LottieFiles Community](https://lottiefiles.com/)
- [lottie-web GitHub](https://github.com/airbnb/lottie-web)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
