/**
 * Three.js - Local Stub Implementation
 * This is a minimal fallback when the full three.js library is unavailable
 * For production use, download the full library from: https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
 */

(function() {
  'use strict';
  
  // Create a minimal THREE namespace with stubs
  window.THREE = {
    Scene: function() {
      this.background = null;
      this.add = function() {};
      console.log('THREE stub: Scene created');
    },
    
    Color: function(color) {
      this.color = color;
      console.log('THREE stub: Color created');
    },
    
    PerspectiveCamera: function(fov, aspect, near, far) {
      this.position = { x: 0, y: 0, z: 0 };
      this.lookAt = function() {};
      console.log('THREE stub: PerspectiveCamera created');
    },
    
    WebGLRenderer: function(options) {
      this.setSize = function() {};
      this.render = function() {};
      this.setPixelRatio = function() {};
      console.log('THREE stub: WebGLRenderer created');
      return this;
    },
    
    BoxGeometry: function(w, h, d) {
      this.morphAttributes = { position: [] };
      this.attributes = { position: { count: 0, array: [] } };
      console.log('THREE stub: BoxGeometry created');
    },
    
    BufferAttribute: function(array, itemSize) {
      console.log('THREE stub: BufferAttribute created');
    },
    
    MeshNormalMaterial: function(options) {
      console.log('THREE stub: MeshNormalMaterial created');
    },
    
    Mesh: function(geometry, material) {
      this.position = { x: 0, y: 0, z: 0 };
      this.rotation = { x: 0, y: 0, z: 0 };
      this.morphTargetInfluences = [];
      console.log('THREE stub: Mesh created');
    },
    
    Clock: function() {
      this.getDelta = function() { return 0.016; };
      console.log('THREE stub: Clock created');
    },
    
    AnimationMixer: function(mesh) {
      this.update = function() {};
      this.clipAction = function() {
        return {
          play: function() {},
          setLoop: function() {},
          setEffectiveWeight: function() {}
        };
      };
      console.log('THREE stub: AnimationMixer created');
    },
    
    NumberKeyframeTrack: function(name, times, values) {
      console.log('THREE stub: NumberKeyframeTrack created');
    },
    
    AnimationClip: function(name, duration, tracks) {
      console.log('THREE stub: AnimationClip created');
    },
    
    LoopRepeat: 2200,
    
    // Utility to show that this is a stub
    isStub: true
  };
  
  console.log('THREE.js stub loaded. For full 3D rendering, use the complete three.js library.');
  console.log('Note: 3D visualization features will not be available with this stub.');
})();
