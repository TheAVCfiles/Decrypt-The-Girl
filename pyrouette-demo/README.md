# PyRouette Studio Composer - Amped Prototype

An interactive choreography composition tool with advanced touch controls, timeline playback, and kinetic interactions.

## Features

### 🎯 Interactive Controls
- **Pinch-to-Zoom**: Multi-touch gesture support for zooming in/out
- **Kinetic Panning**: Smooth momentum-based panning with inertia
- **Double-Tap Zoom**: Quick zoom toggle between 100% and 200%
- **Mouse Wheel Zoom**: Desktop-friendly zoom with precise control
- **Drag & Pan**: Click and drag to navigate the canvas

### ⏱️ Timeline Controls
- **Play/Pause/Stop**: Standard playback controls
- **Timeline Scrubbing**: Visual timeline with keyframe markers
- **Rewind**: Quick return to start
- **Progress Indicator**: Real-time playback position

### 🎨 Composition Tools
- **Pattern Library**: Pre-built choreography patterns
  - Classic Pirouette
  - Grand Arabesque
  - Grand Jeté
  - Fouetté Turn
  - Passé Position
- **Dancer Markers**: Visual representation of performers on stage
- **Grid Overlay**: Reference grid for spatial awareness

### 📱 Responsive Design
- **Mobile-First**: Optimized for touch devices
- **Desktop Support**: Full mouse and keyboard functionality
- **Adaptive Layout**: Sidebar collapses on smaller screens
- **Touch Feedback**: Visual confirmation of touch interactions

### 🎛️ Interface Elements
- **Zoom Controls**: Easy access to zoom in/out/reset
- **Info Panel**: Real-time display of zoom level and pan position
- **Status Indicators**: Visual feedback for app state
- **Loading States**: Smooth transitions when loading patterns

## Technical Implementation

### Technologies Used
- **Vanilla JavaScript (ES6+)**: No dependencies, pure web standards
- **CSS3**: Modern styling with CSS variables and flexbox
- **HTML5**: Semantic markup and accessibility features

### Interaction System
The prototype implements a comprehensive interaction system:

```javascript
- Touch Events: touchstart, touchmove, touchend
- Mouse Events: mousedown, mousemove, mouseup, wheel
- Gesture Recognition: Pinch, pan, double-tap
- Kinetic Scrolling: Momentum-based deceleration
- Transform Management: CSS transforms for performance
```

### State Management
```javascript
- Zoom: 0.25x to 4x range
- Pan: X/Y offset tracking
- Timeline: 5-minute composition duration
- Velocity: Kinetic scroll momentum
```

## Usage

### Opening the Prototype
1. Open `index.html` in a modern web browser
2. Or use a local server:
   ```bash
   python3 -m http.server 8080
   # Navigate to http://localhost:8080/pyrouette-demo/
   ```

### Navigation
- **Desktop**: Click and drag to pan, mouse wheel to zoom
- **Mobile**: Touch and drag to pan, pinch to zoom, double-tap to quick zoom
- **Zoom Controls**: Use the +/− buttons in the bottom-right corner

### Timeline
- Click **Play** to start timeline playback
- Use **Pause** to temporarily stop
- Click **Stop** to reset to beginning
- **Rewind** to jump back to start

### Pattern Library
- Click on any pattern in the sidebar to load it
- Patterns include duration information
- Loading simulation demonstrates async operations

## Architecture

### Component Structure
```
PyRouetteStudio (Main Class)
├── State Management
│   ├── Zoom & Pan
│   ├── Timeline
│   └── UI State
├── Event Handlers
│   ├── Mouse Events
│   ├── Touch Events
│   └── Gesture Recognition
├── Animation Loop
│   ├── Kinetic Scrolling
│   └── Timeline Updates
└── UI Updates
    ├── Transform Updates
    └── Display Refreshes
```

### Key Classes
- **PyRouetteStudio**: Main application controller
  - Manages all state and interactions
  - Coordinates between UI and canvas
  - Handles touch and mouse events
  - Controls timeline playback

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Touch Devices**: iOS Safari, Android Chrome
- **Desktop**: Full mouse and keyboard support

## Future Enhancements

- [ ] Save/Load compositions
- [ ] Export to video/JSON
- [ ] Advanced keyframe editing
- [ ] Pattern customization
- [ ] Multi-dancer synchronization
- [ ] Audio track integration
- [ ] Collaborative editing
- [ ] Performance optimization for large compositions

## Placeholder Assets

This prototype uses placeholder elements:
- **Dancer Markers**: Colored circles representing performers
- **Grid Overlay**: Visual reference grid
- **Pattern Library**: Sample choreography patterns
- **Timeline Keyframes**: Example timing markers

Final integration will replace these with actual choreography data and assets.

## Development Notes

### Performance Considerations
- CSS transforms for hardware acceleration
- RequestAnimationFrame for smooth animations
- Event throttling for touch/mouse handlers
- Minimal DOM manipulation

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support (in progress)
- Screen reader compatible

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## License

Part of the Decrypt The Girl project.
MIT License - See main repository LICENSE file.

## Credits

**A.C. Van Cura** - Creator and Developer

---

*This is an "Amped" prototype demonstrating advanced interaction patterns for stakeholder review and final integration planning.*
