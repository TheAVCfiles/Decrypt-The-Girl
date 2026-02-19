/**
 * Lottie Web - Local Stub Implementation
 * This is a minimal fallback implementation when the full lottie-web library is unavailable
 * For production use, download the full library from: https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js
 */

(function() {
  'use strict';
  
  window.lottie = {
    /**
     * Stub implementation of loadAnimation
     * Shows a placeholder message when animation data is unavailable
     */
    loadAnimation: function(config) {
      const container = config.container;
      
      if (!container) {
        console.warn('Lottie stub: No container provided');
        return {
          play: function() {},
          stop: function() {},
          pause: function() {},
          destroy: function() {}
        };
      }
      
      // Create a placeholder message
      container.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px;
          background: linear-gradient(135deg, rgba(138, 124, 255, 0.1), rgba(99, 102, 241, 0.1));
          border-radius: 8px;
          text-align: center;
        ">
          <div style="font-size: 48px; margin-bottom: 16px; opacity: 0.6;">✨</div>
          <div style="font-size: 16px; color: #666; margin-bottom: 8px;">Animation Placeholder</div>
          <div style="font-size: 12px; color: #999;">Full Lottie library not loaded. Using local stub.</div>
        </div>
      `;
      
      // Return a basic animation API stub
      return {
        play: function() {
          console.log('Lottie stub: play() called');
        },
        stop: function() {
          console.log('Lottie stub: stop() called');
        },
        pause: function() {
          console.log('Lottie stub: pause() called');
        },
        setSpeed: function(speed) {
          console.log('Lottie stub: setSpeed(' + speed + ') called');
        },
        setDirection: function(direction) {
          console.log('Lottie stub: setDirection(' + direction + ') called');
        },
        goToAndStop: function(value, isFrame) {
          console.log('Lottie stub: goToAndStop() called');
        },
        goToAndPlay: function(value, isFrame) {
          console.log('Lottie stub: goToAndPlay() called');
        },
        destroy: function() {
          console.log('Lottie stub: destroy() called');
        },
        getDuration: function(inFrames) {
          return 0;
        },
        addEventListener: function(name, callback) {
          console.log('Lottie stub: addEventListener(' + name + ') called');
        },
        removeEventListener: function(name, callback) {
          console.log('Lottie stub: removeEventListener(' + name + ') called');
        }
      };
    },
    
    /**
     * Stub for setQuality
     */
    setQuality: function(quality) {
      console.log('Lottie stub: setQuality(' + quality + ') called');
    },
    
    /**
     * Stub for destroy
     */
    destroy: function() {
      console.log('Lottie stub: destroy() called');
    }
  };
  
  console.log('Lottie stub loaded - animations will show placeholder content.');
  console.log('For full animation functionality, download the complete lottie-web library.');
})();
