# Lottie Diagnostic Page

## Overview

The Lottie Diagnostic page (`diag-lottie.html`) is a comprehensive testing tool for Lottie animations with robust error handling and fallback support.

## Features

✅ **Robust Error Handling**: Automatically detects and handles CDN failures  
✅ **Fallback Support**: Gracefully degrades when resources fail to load  
✅ **Multiple Asset Paths**: Tries local assets first, then remote CDN  
✅ **Responsive Design**: Optimized for both mobile and desktop  
✅ **Interactive Controls**: Play, Pause, Stop, and Reload animations  
✅ **Diagnostic Information**: Real-time status and device information  
✅ **Professional UI**: Investor-ready presentation

## Usage

### Local Testing

1. Start a local web server:
   ```bash
   python3 -m http.server 8080
   ```

2. Open in browser:
   ```
   http://localhost:8080/docs/diag-lottie.html
   ```

### Deployment

The page is designed to work on GitHub Pages:
```
https://theavcfiles.github.io/Decrypt-The-Girl/docs/diag-lottie.html
```

## Animation Configuration

The page uses the Bloom Cinematic animation located at:
- Primary: `../assets/lottie/bloom-cinematic.json` (relative path)
- Fallback: `https://raw.githack.com/TheAVCfiles/Decrypt-The-Girl/main/assets/lottie/bloom-cinematic.json`

### Animation Details

- **Name**: bloom-cinematic
- **Version**: Lottie 5.7.6
- **Frame Rate**: 30 fps
- **Dimensions**: 1600x900
- **Duration**: 240 frames (8 seconds)
- **Markers**:
  - OPEN: Frames 0-90
  - PEAK: Frames 90-120
  - IDLE_LOOP: Frames 120-240

## Error Handling

The page handles multiple failure scenarios:

### CDN Failure
If the Lottie library fails to load from the CDN:
- Shows clear error message
- Displays fallback UI with static preview
- Disables animation controls (except Reload)

### Animation Load Failure
If the animation JSON fails to load:
- Tries primary path first
- Falls back to secondary CDN path
- Shows diagnostic error details
- Provides reload option

### JavaScript Disabled
The page provides a no-JavaScript fallback:
- Shows static content
- Displays informative message
- Maintains basic structure

## Controls

- **▶️ Play**: Start or resume animation playback
- **⏸️ Pause**: Pause animation at current frame
- **⏹️ Stop**: Stop and reset animation to start
- **🔄 Reload**: Reload animation and reset state

## Diagnostic Information

The diagnostic panel shows:
- **Library**: Lottie library version and status
- **Animation Source**: Path to current animation file
- **Renderer**: Rendering engine (SVG)
- **Status**: Current playback state
- **Device Type**: Mobile or Desktop detection
- **Screen Size**: Current viewport dimensions

## Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 13+)
- ✅ Chrome Mobile (Android 8+)

## Known Limitations

- CDN may be blocked by ad blockers or restrictive networks
- Fallback mode shows static preview instead of animation
- Some browser extensions may interfere with CDN resources

## Troubleshooting

### Animation not loading?
1. Check browser console for errors
2. Verify asset files exist in `assets/lottie/`
3. Try clicking the Reload button
4. Check if CDN is accessible
5. Disable ad blockers temporarily

### Controls not working?
- Ensure Lottie library loaded successfully
- Check diagnostic panel for library status
- Try reloading the page

### Mobile issues?
- Ensure viewport meta tag is present
- Check screen size in diagnostic panel
- Try landscape/portrait orientation

## Integration

To use this diagnostic tool for other animations:

1. Update the animation paths in the CONFIG object:
   ```javascript
   const CONFIG = {
       animationPaths: [
           '../assets/lottie/your-animation.json',
           'https://your-cdn.com/your-animation.json'
       ]
   };
   ```

2. Update the title and subtitle in the HTML
3. Test locally before deployment

## Support

For issues or questions:
- GitHub: https://github.com/TheAVCfiles/Decrypt-The-Girl
- Instagram: [@DeCrypt_The_Girl](https://instagram.com/DeCrypt_The_Girl)

## License

MIT License - Part of the Decrypt The Girl project by A.C. Van Cura
