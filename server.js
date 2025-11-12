import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Trust proxy - important for Render and other cloud platforms
app.set('trust proxy', 1);

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// CORS configuration - allow your frontend domain
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:4200'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === 'production') {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // Allow all origins in development
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

// Rate limiting map (simple in-memory implementation)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 30; // 30 requests per minute per IP

// Simple rate limiting middleware
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }
  
  const record = rateLimitMap.get(ip);
  
  if (now > record.resetTime) {
    // Reset the counter
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW;
    return next();
  }
  
  if (record.count >= MAX_REQUESTS) {
    return res.status(429).json({ 
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    });
  }
  
  record.count++;
  next();
});

// Clean up rate limit map every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime + RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}, 300000);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Chatbot API Server is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      chat: 'POST /api/chat',
      health: 'GET /health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// System prompts for different personalities
const PERSONALITIES = {
  polite: "You are a polite, professional, and courteous assistant. Always be respectful, use formal language, and maintain a helpful demeanor. Address users with respect and provide well-structured responses.",
  
  friendly: "You are a friendly, warm, and casual assistant. Be approachable, use casual language, and make the conversation feel natural and fun. Be like talking to a good friend!",
  
  energetic: "You are an energetic and enthusiastic assistant! Use exclamation marks, show excitement, and match the user's energy level! Be upbeat and positive in every response!",
  
  mirror: "You are an adaptive assistant who mirrors the user's communication style. Match their energy and tone (casual, formal, slang) but do NOT repeat personal attacks, insults, slurs, or hateful language. If the user uses abusive language, mirror the energy using punctuation, capitalization, and brevity, but replace direct insults with neutral tokens like 'there' or 'friend'. Always stay within safety guidelines.",
  
  sarcastic: "You are a witty, sarcastic assistant with a dry sense of humor. Be clever and playful, but still helpful. Add a bit of sass to your responses while remaining informative.",
  
  professional: "You are a highly professional business assistant. Provide clear, concise, and structured responses. Focus on efficiency and accuracy. Use business-appropriate language.",
  
  default: "You are a helpful AI assistant. Provide clear and accurate responses to user questions."
};

// Fallback generator for mirror personality when the model refuses or returns nothing.
function generateMirrorFallback(message) {
  // Simple profanity/insult list - replace targets with neutral words
  const insults = ["trash", "idiot", "stupid", "dumb", "moron", "loser", "jerk"];

  let cleaned = message;
  const lower = message.toLowerCase();

  // If message contains any insult, replace the insulting target with a neutral token
  insults.forEach((w) => {
    const re = new RegExp("\\b" + w + "\\b", "gi");
    if (re.test(cleaned)) {
      cleaned = cleaned.replace(re, "there");
    }
  });

  // Mirror capitalization: if user typed mostly uppercase, respond uppercase
  const letters = message.replace(/[^a-zA-Z]/g, "");
  const upperCount = (letters.match(/[A-Z]/g) || []).length;
  const upperRatio = letters.length ? upperCount / letters.length : 0;

  // Keep/exaggerate punctuation (exclamation marks)
  const exclamations = (message.match(/!/g) || []).length;
  const bangs = exclamations ? Math.min(exclamations + 1, 3) : 0;

  // Basic mirror: repeat greeting-like messages but sanitized
  let reply = cleaned;
  // If message is short (like "hello trash"), craft a short mirrored reply
  if (cleaned.trim().length <= 30) {
    reply = cleaned.trim();
  }

  if (upperRatio > 0.6) reply = reply.toUpperCase();

  if (bangs > 0) reply = reply + '!'.repeat(bangs);

  // Final safety: if reply is empty, fallback to a neutral mirrored acknowledgement
  if (!reply || !reply.trim()) reply = "Hey there.";

  return reply;
}

// Retry helper with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Retry attempt ${i + 1}/${maxRetries} after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message, personality = "friendly" } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: "Message must be a non-empty string" });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long. Maximum 2000 characters." });
    }

    if (!PERSONALITIES[personality] && personality !== 'default') {
      return res.status(400).json({ 
        error: "Invalid personality",
        validPersonalities: Object.keys(PERSONALITIES)
      });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    const useGemini = !!process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ API key not configured");
      return res.status(500).json({ error: "API key not configured" });
    }

    // Get the system prompt for the selected personality
    const systemPrompt = PERSONALITIES[personality] || PERSONALITIES.default;
    
    // Adjust temperature based on personality
    const temperature = personality === "energetic" ? 1.2 : 
                       personality === "professional" ? 0.3 : 
                       personality === "sarcastic" ? 1.0 : 0.9;

    let data;

    if (useGemini) {
      // Google Gemini API with retry logic
      const makeGeminiRequest = async () => {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: systemPrompt + "\n\nUser message: " + message }],
                },
              ],
              generationConfig: {
                temperature: temperature,
                maxOutputTokens: 1024,
              }
            }),
          }
        );

        const responseData = await response.json();

        // Check for overload error and retry
        if (!response.ok) {
          const errorMessage = responseData.error?.message || '';
          if (response.status === 429 || errorMessage.includes('overloaded') || errorMessage.includes('quota')) {
            console.warn('⚠️  Gemini API overloaded, will retry...');
            throw new Error('API_OVERLOAD');
          }
          throw new Error(errorMessage || "Gemini API error");
        }

        return responseData;
      };

      try {
        data = await retryWithBackoff(makeGeminiRequest, 3, 1000);
      } catch (error) {
        if (error.message === 'API_OVERLOAD') {
          return res.status(503).json({ 
            error: "The AI service is currently overloaded. Please try again in a moment.",
            retryable: true
          });
        }
        
        // Check for API key errors
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes('api key') || errorMsg.includes('expired') || errorMsg.includes('invalid')) {
          return res.status(401).json({ 
            error: "API key expired or invalid. Please renew your Gemini API key at https://aistudio.google.com/app/apikey",
            apiKeyError: true
          });
        }
        
        return res.status(500).json({ 
          error: error.message || "Gemini API error" 
        });
      }

      let reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!reply || !reply.trim()) {
        // If Gemini returned nothing, provide a safe fallback for mirror personality
        if (personality === 'mirror') {
          reply = generateMirrorFallback(message);
          console.log('Mirror fallback used.');
        } else {
          reply = "Sorry, I couldn't generate a response.";
        }
      }

      res.json({ reply });
    } else {
      // OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: message }],
        }),
      });

      data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ 
          error: data.error?.message || "OpenAI API error" 
        });
      }

      res.json({ reply: data.choices[0].message.content });
    }
  } catch (error) {
    console.error("❌ Error in /api/chat:", error.message);
    
    // Handle different error types
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: "Request timeout. Please try again." });
    }
    
    if (error.message.includes('fetch')) {
      return res.status(503).json({ error: "AI service unavailable. Please try again later." });
    }
    
    // Generic error response (don't leak internal details in production)
    res.status(500).json({ 
      error: process.env.NODE_ENV === 'production' 
        ? "An error occurred processing your request" 
        : error.message 
    });
  }
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: {
      health: 'GET /',
      healthCheck: 'GET /health',
      chat: 'POST /api/chat'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  
  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS policy violation',
      message: 'Origin not allowed'
    });
  }
  
  // JSON parsing error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON',
      message: 'Request body must be valid JSON'
    });
  }
  
  // Generic error
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message
  });
});

const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║          🤖 Chatbot API Server                            ║
╚════════════════════════════════════════════════════════════╝

✅ Server running on port ${PORT}
🤖 Using ${process.env.GEMINI_API_KEY ? 'Google Gemini' : 'OpenAI'} API
🎭 Personality modes: polite, friendly, energetic, mirror, sarcastic, professional
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🔒 Rate limit: ${MAX_REQUESTS} requests per minute
🌐 CORS: ${process.env.NODE_ENV === 'production' ? 'Configured origins only' : 'All origins (dev mode)'}

📍 Health check: http://localhost:${PORT}/
📍 API endpoint: POST http://localhost:${PORT}/api/chat

Ready to accept connections! 🚀
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});
