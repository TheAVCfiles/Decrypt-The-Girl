/**
 * Decrypt The Girl - Firebase Demo App
 * Client-side Firestore logging for Path A demonstration
 */

// Firebase configuration - Replace with your project config
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase (will be loaded from CDN in production)
let db;
let isFirebaseReady = false;

// Check if Firebase is loaded
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  isFirebaseReady = true;
  console.log('Firebase initialized successfully');
} else {
  console.warn('Firebase not loaded - running in demo mode');
}

/**
 * Log an action to Firestore
 * @param {string} action - The action performed
 * @param {Object} data - Additional data to log
 */
async function logToFirestore(action, data = {}) {
  const logEntry = {
    action: action,
    timestamp: new Date(),
    userAgent: navigator.userAgent,
    ...data
  };

  if (isFirebaseReady) {
    try {
      const docRef = await db.collection('decryptions').add(logEntry);
      console.log('Logged to Firestore:', docRef.id);
      showStatus(`Action logged: ${action}`, 'success');
      return docRef.id;
    } catch (error) {
      console.error('Error logging to Firestore:', error);
      showStatus('Failed to log action', 'error');
      return null;
    }
  } else {
    // Demo mode - just log to console
    console.log('Demo mode log:', logEntry);
    showStatus(`Demo: ${action} logged locally`, 'success');
    return 'demo-' + Date.now();
  }
}

/**
 * Handle unlock cipher button click
 */
async function unlockCipher() {
  console.log('Unlock cipher requested');
  
  const cipherData = {
    type: 'cipher_unlock',
    cipher_id: 'main_codebook',
    difficulty: 'medium',
    hint: 'The girl is the code'
  };

  await logToFirestore('unlock_cipher', cipherData);
}

/**
 * Handle deck interest button click  
 */
async function deckInterest() {
  console.log('Deck interest expressed');
  
  const deckData = {
    type: 'deck_interest',
    deck_type: 'astro_finance',
    interest_level: 'high',
    context: 'firebase_demo'
  };

  await logToFirestore('deck_interest', deckData);
}

/**
 * Show status message to user
 * @param {string} message - Message to display
 * @param {string} type - Type of message (success/error)
 */
function showStatus(message, type = 'success') {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
  statusEl.style.display = 'block';
  
  // Hide after 3 seconds
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 3000);
}

/**
 * Initialize the application
 */
function initApp() {
  console.log('Decrypt The Girl Firebase Demo initialized');
  
  // Log initial page load
  logToFirestore('page_load', {
    path: window.location.pathname,
    referrer: document.referrer || 'direct'
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}