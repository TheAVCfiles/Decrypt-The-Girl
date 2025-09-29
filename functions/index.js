/**
 * Decrypt The Girl - Firebase Functions
 * HTTP Functions for server-side processing (Path B)
 */

const {onRequest} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

/**
 * Ledger HTTP Function
 * Handles server-side logging and data processing
 */
exports.ledger = onRequest({cors: true}, async (req, res) => {
  const startTime = Date.now();
  
  try {
    logger.info("Ledger function called", {
      method: req.method,
      path: req.path,
      query: req.query,
      headers: req.headers
    });

    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        return await handleLedgerGet(req, res);
      case 'POST':
        return await handleLedgerPost(req, res);
      default:
        res.status(405).json({
          error: 'Method not allowed',
          allowed: ['GET', 'POST']
        });
    }
  } catch (error) {
    logger.error("Ledger function error", error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  } finally {
    const duration = Date.now() - startTime;
    logger.info(`Ledger function completed in ${duration}ms`);
  }
});

/**
 * Handle GET requests to /ledger
 * Returns recent decryption activities
 */
async function handleLedgerGet(req, res) {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const snapshot = await db.collection('decryptions')
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .offset(offset)
      .get();

    const entries = [];
    snapshot.forEach(doc => {
      entries.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()?.toISOString()
      });
    });

    res.json({
      success: true,
      data: entries,
      meta: {
        count: entries.length,
        limit: limit,
        offset: offset,
        hasMore: entries.length === limit
      }
    });
  } catch (error) {
    logger.error("Error fetching ledger entries", error);
    throw error;
  }
}

/**
 * Handle POST requests to /ledger
 * Creates new ledger entries with server-side validation
 */
async function handleLedgerPost(req, res) {
  const { action, data = {} } = req.body;

  if (!action) {
    return res.status(400).json({
      error: 'Bad request',
      message: 'Action is required'
    });
  }

  try {
    // Server-side data enrichment
    const enrichedData = {
      action: action,
      ...data,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      serverProcessed: true,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      source: 'firebase-function'
    };

    // Add server-side validation based on action type
    if (action === 'unlock_cipher') {
      enrichedData.validated = validateCipherUnlock(data);
    } else if (action === 'deck_interest') {
      enrichedData.validated = validateDeckInterest(data);
    }

    const docRef = await db.collection('decryptions').add(enrichedData);
    
    logger.info("Ledger entry created", {
      id: docRef.id,
      action: action
    });

    res.json({
      success: true,
      id: docRef.id,
      action: action,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error("Error creating ledger entry", error);
    throw error;
  }
}

/**
 * Validate cipher unlock request
 */
function validateCipherUnlock(data) {
  const validCiphers = ['main_codebook', 'astro_finance', 'test_cipher'];
  const validDifficulties = ['easy', 'medium', 'hard'];
  
  return {
    cipher_id: validCiphers.includes(data.cipher_id),
    difficulty: validDifficulties.includes(data.difficulty),
    hasHint: typeof data.hint === 'string' && data.hint.length > 0
  };
}

/**
 * Validate deck interest request
 */
function validateDeckInterest(data) {
  const validDeckTypes = ['astro_finance', 'tarot', 'oracle'];
  const validInterestLevels = ['low', 'medium', 'high'];
  
  return {
    deck_type: validDeckTypes.includes(data.deck_type),
    interest_level: validInterestLevels.includes(data.interest_level),
    hasContext: typeof data.context === 'string'
  };
}

/**
 * Additional API function for general purpose endpoints
 */
exports.api = onRequest({cors: true}, async (req, res) => {
  logger.info("API function called", {
    method: req.method,
    path: req.path
  });

  // Simple health check endpoint
  if (req.path === '/health') {
    return res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'decrypt-the-girl-api'
    });
  }

  // Stats endpoint
  if (req.path === '/stats') {
    try {
      const snapshot = await db.collection('decryptions').get();
      const stats = {
        total_entries: snapshot.size,
        timestamp: new Date().toISOString()
      };
      
      return res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      logger.error("Error fetching stats", error);
      return res.status(500).json({
        error: 'Failed to fetch stats'
      });
    }
  }

  // Default response
  res.status(404).json({
    error: 'Endpoint not found',
    available: ['/health', '/stats']
  });
});