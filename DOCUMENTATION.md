# AI Chatbot Application - Complete Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Installation Guide](#installation-guide)
5. [Configuration](#configuration)
6. [Usage Guide](#usage-guide)
7. [API Documentation](#api-documentation)
8. [Personality System](#personality-system)
9. [Customization](#customization)
10. [Troubleshooting](#troubleshooting)
11. [Development](#development)
12. [Deployment](#deployment)
13. [Security Considerations](#security-considerations)
14. [Performance Optimization](#performance-optimization)
15. [License](#license)

---

## Overview

### What is This Application?

The AI Chatbot Application is a modern, full-stack conversational AI interface built with **Angular 17** (frontend) and **Node.js/Express** (backend). It integrates with **Google's Gemini API** (free tier) to provide intelligent, context-aware responses with multiple personality modes.

### Key Highlights

- 🎭 **6 Personality Modes**: Polite, Friendly, Energetic, Mirror, Sarcastic, Professional
- 🆓 **Free AI Backend**: Uses Google Gemini API (60 requests/min, 1,500/day)
- 🎨 **Modern UI**: Responsive, gradient design with smooth animations
- 🔒 **Safe Content**: Built-in filtering for inappropriate content
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight**: Optimized bundle size and loading times

### Tech Stack

**Frontend:**
- Angular 17 (Standalone Components)
- TypeScript 5.2
- RxJS 7.8
- CSS3 with modern features

**Backend:**
- Node.js v18+
- Express.js 4.18
- Google Gemini API
- ES Modules

---

## Features

### Core Functionality

1. **Real-time Chat Interface**
   - Send messages and receive AI-generated responses
   - Message history displayed in conversation format
   - User and bot message bubbles with distinct styling
   - Loading indicators during AI processing

2. **Personality Switching**
   - Dropdown selector to choose from 6 personalities
   - System notifications when personality changes
   - Each personality adjusts AI behavior and response style
   - Temperature-based creativity control

3. **Responsive Design**
   - Full-screen layout on desktop
   - Optimized for tablets and mobile devices
   - Touch-friendly controls
   - Adaptive font sizes and spacing

4. **Error Handling**
   - Graceful error messages
   - Connection status indicators
   - API failure fallbacks
   - User-friendly error descriptions

### Advanced Features

- **Mirror Personality Safety**: Sanitizes inappropriate content while maintaining energy
- **Dynamic Temperature Adjustment**: Each personality uses optimal AI settings
- **Keyboard Shortcuts**: Press Enter to send messages
- **Auto-scroll**: Message container automatically scrolls to latest message
- **Message Persistence**: Chat history maintained during session

---

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Angular)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  App Component                                        │  │
│  │  ├── Chat Component                                   │  │
│  │  │   ├── Message Display                             │  │
│  │  │   ├── Personality Selector                        │  │
│  │  │   ├── Input Box                                   │  │
│  │  │   └── HTTP Service (Angular HttpClient)          │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP POST /api/chat
                            │ { message, personality }
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express Server (Port 3002)                          │  │
│  │  ├── CORS Middleware                                 │  │
│  │  ├── JSON Parser                                     │  │
│  │  ├── /api/chat Endpoint                             │  │
│  │  │   ├── Personality System Prompts                 │  │
│  │  │   ├── Temperature Config                         │  │
│  │  │   ├── Mirror Fallback Generator                  │  │
│  │  │   └── Error Handler                              │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS POST
                            │ Authorization: Bearer <API_KEY>
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Google Gemini API (generativelanguage.googleapis.com)              │
│  Model: gemini-2.5-flash                                    │
│  Free Tier: 60 req/min, 1,500 req/day                      │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
Chatbot integration/
│
├── backend/                          # Node.js Express server
│   ├── node_modules/                 # Backend dependencies
│   ├── .env                          # Environment variables (not in git)
│   ├── .env.example                  # Environment template
│   ├── .gitignore                    # Git ignore rules
│   ├── package.json                  # Backend dependencies & scripts
│   ├── package-lock.json             # Dependency lock file
│   └── server.js                     # Express server & API logic
│
├── frontend/                         # Angular application
│   ├── .angular/                     # Angular build cache
│   ├── node_modules/                 # Frontend dependencies
│   ├── src/
│   │   ├── app/
│   │   │   ├── chat/
│   │   │   │   ├── chat.component.css      # Chat component styles
│   │   │   │   ├── chat.component.html     # Chat component template
│   │   │   │   └── chat.component.ts       # Chat component logic
│   │   │   └── app.component.ts            # Root component
│   │   ├── assets/                   # Static assets
│   │   ├── index.html                # HTML entry point
│   │   ├── main.ts                   # Angular bootstrap
│   │   └── styles.css                # Global styles
│   ├── .gitignore                    # Git ignore rules
│   ├── angular.json                  # Angular CLI configuration
│   ├── package.json                  # Frontend dependencies & scripts
│   ├── package-lock.json             # Dependency lock file
│   ├── tsconfig.json                 # TypeScript configuration
│   └── tsconfig.app.json             # App-specific TypeScript config
│
├── FREE_API_GUIDE.md                 # Guide to free AI API alternatives
├── PERSONALITY_GUIDE.md              # Personality system documentation
└── README.md                         # Quick start guide
```

---

## Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js (v9.0+ recommended)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))
- **Google Account**: To obtain a free Gemini API key

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd "Chatbot integration"
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file from template
copy .env.example .env

# Edit .env file and add your Gemini API key
notepad .env
```

**In `.env` file:**
```env
# Get your free Gemini API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=AIzaSy...your_actual_key_here

# Server port
PORT=3002
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### Step 4: Get Your Free Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key (starts with `AIzaSy...`)
5. Paste it into `backend/.env` file

---

## Configuration

### Backend Configuration

**File:** `backend/.env`

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | - | ✅ Yes |
| `PORT` | Server port number | 3002 | ❌ No |

**Example:**
```env
GEMINI_API_KEY=AIzaSyD5lWbUfl39TBYzexDLYbvHkRIfGPyEWck
PORT=3002
```

### Frontend Configuration

**File:** `frontend/src/app/chat/chat.component.ts`

| Configuration | Location | Default | Description |
|--------------|----------|---------|-------------|
| API URL | `private apiUrl` | `http://localhost:3002/api/chat` | Backend API endpoint |
| Default Personality | `selectedPersonality` | `'friendly'` | Initial personality mode |

**To Change API URL:**
```typescript
private apiUrl = 'http://your-domain.com:3002/api/chat';
```

### Personality System Configuration

**File:** `backend/server.js`

Personalities are defined in the `PERSONALITIES` object:

```javascript
const PERSONALITIES = {
  polite: "System prompt for polite mode...",
  friendly: "System prompt for friendly mode...",
  // ... other personalities
};
```

**Temperature Settings:**
```javascript
const temperature = personality === "energetic" ? 1.2 : 
                   personality === "professional" ? 0.3 : 
                   personality === "sarcastic" ? 1.0 : 0.9;
```

- **Low (0.3)**: More focused, consistent responses (Professional)
- **Medium (0.9)**: Balanced creativity (Default)
- **High (1.2)**: More creative, varied responses (Energetic)

---

## Usage Guide

### Starting the Application

#### Option 1: Manual Start (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

#### Option 2: Using npm Scripts

**Backend:**
```bash
cd backend
npm start          # Production mode
npm run dev        # Development mode with auto-reload
```

**Frontend:**
```bash
cd frontend
npm start          # Starts dev server on port 4200
```

### Accessing the Application

1. Open your browser
2. Navigate to: `http://localhost:4200`
3. The chatbot interface will load

### Using the Chat Interface

#### Sending Messages

1. **Type your message** in the input box at the bottom
2. **Press Enter** or click the **"Send"** button
3. Wait for the AI response (loading indicator shows progress)
4. Response appears in the chat with a bot avatar (🤖)

#### Changing Personalities

1. **Click the dropdown** at the top of the chat
2. **Select a personality** from the list:
   - 🎩 **Polite** - Professional & Respectful
   - 😊 **Friendly** - Warm & Casual (Default)
   - ⚡ **Energetic** - Enthusiastic & Excited
   - 🪞 **Mirror** - Matches Your Energy
   - 😏 **Sarcastic** - Witty & Playful
   - 💼 **Professional** - Business Focused
3. A **system notification** confirms the change
4. All subsequent messages use the new personality

#### Example Conversations

**Friendly Mode:**
```
User: What's the capital of France?
Bot: Hey! The capital of France is Paris. It's a beautiful city with 
     amazing art, food, and history!
```

**Professional Mode:**
```
User: What's the capital of France?
Bot: Capital: Paris, France
     Population: 2.2M (city proper)
     Status: National capital and largest city
```

**Energetic Mode:**
```
User: What's the capital of France?
Bot: It's PARIS! Such an AMAZING city! The Eiffel Tower, the Louvre, 
     incredible food! Have you been there?! It's FANTASTIC!
```

---

## API Documentation

### Base URL

```
http://localhost:3002
```

### Endpoints

#### POST `/api/chat`

Send a message to the AI chatbot and receive a response.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Hello! How are you?",
  "personality": "friendly"
}
```

**Request Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `message` | string | ✅ Yes | - | User's message to the AI |
| `personality` | string | ❌ No | `"friendly"` | Personality mode to use |

**Valid Personality Values:**
- `"polite"`
- `"friendly"`
- `"energetic"`
- `"mirror"`
- `"sarcastic"`
- `"professional"`

**Success Response (200 OK):**
```json
{
  "reply": "Hello! I'm doing great, thanks for asking! How can I help you today?"
}
```

**Error Responses:**

**400 Bad Request** - Missing message:
```json
{
  "error": "Message is required"
}
```

**500 Internal Server Error** - API key not configured:
```json
{
  "error": "API key not configured"
}
```

**500 Internal Server Error** - Gemini API error:
```json
{
  "error": "You exceeded your current quota, please check your plan and billing details."
}
```

### Example API Calls

#### Using cURL:

```bash
curl -X POST http://localhost:3002/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me a joke",
    "personality": "sarcastic"
  }'
```

#### Using JavaScript (Fetch):

```javascript
const response = await fetch('http://localhost:3002/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'What is JavaScript?',
    personality: 'professional'
  })
});

const data = await response.json();
console.log(data.reply);
```

#### Using PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:3002/api/chat" `
  -Method POST `
  -Body (@{message="Hello"; personality="energetic"} | ConvertTo-Json) `
  -ContentType "application/json"
```

---

## Personality System

### Overview

The personality system allows the chatbot to respond in different styles and tones, making interactions more engaging and context-appropriate.

### How It Works

1. **System Prompts**: Each personality has a unique instruction set that guides the AI
2. **Temperature Control**: Creativity level adjusted per personality
3. **Safety Filtering**: Mirror mode includes content sanitization
4. **Consistent Behavior**: Same personality throughout conversation

### Personality Details

#### 🎩 Polite - Professional & Respectful

**Use Case:** Formal inquiries, professional settings, customer service

**Characteristics:**
- Uses formal language ("Good day", "Thank you for your inquiry")
- Very courteous and respectful
- Well-structured, complete sentences
- Addresses users with respect

**Temperature:** 0.9 (Balanced)

**Example:**
```
User: Can you help me?
Bot: Good day! I would be delighted to assist you. Please let me know 
     what information or support you require, and I shall do my utmost 
     to provide helpful guidance.
```

#### 😊 Friendly - Warm & Casual (Default)

**Use Case:** General conversations, casual interactions, everyday use

**Characteristics:**
- Casual, approachable language
- Like talking to a friend
- Uses contractions ("I'm", "you're")
- Warm and welcoming tone

**Temperature:** 0.9 (Balanced)

**Example:**
```
User: What's the weather like?
Bot: Hey! I actually don't have access to real-time weather data, but 
     you can check weather.com or your local weather app for the most 
     accurate info! Is there anything else I can help with?
```

#### ⚡ Energetic - Enthusiastic & Excited

**Use Case:** Motivational content, exciting news, energetic discussions

**Characteristics:**
- Lots of exclamation marks!
- Shows excitement and enthusiasm
- Upbeat and positive
- Matches high-energy inputs

**Temperature:** 1.2 (High creativity)

**Example:**
```
User: I got promoted!
Bot: OH WOW! That's ABSOLUTELY AMAZING! CONGRATULATIONS! You must have 
     worked SO hard for this! I'm SO EXCITED for you! This is FANTASTIC 
     news! Tell me more! 🎉
```

#### 🪞 Mirror - Matches Your Energy

**Use Case:** Adaptive conversations, mirroring user's communication style

**Characteristics:**
- Adapts to user's tone (formal/casual)
- Matches capitalization and punctuation
- Mimics energy level
- **Safe**: Filters inappropriate content

**Temperature:** 0.9 (Balanced)

**Safety Features:**
- Replaces insults with neutral words ("there", "friend")
- Maintains energy without repeating harmful content
- Falls back to sanitized version if AI refuses

**Examples:**
```
User: hey there!
Bot: hey! how's it going?

User: HELLO!!!
Bot: HEY THERE!!! WHAT'S UP!!!

User: Good afternoon, could you assist me?
Bot: Good afternoon! Of course, I'd be happy to assist you.
```

#### 😏 Sarcastic - Witty & Playful

**Use Case:** Casual conversations, humor, playful interactions

**Characteristics:**
- Dry humor and wit
- Playful sass
- Still helpful and informative
- Clever responses

**Temperature:** 1.0 (Creative)

**Example:**
```
User: What's 2+2?
Bot: Oh wow, pulling out the big questions now, aren't we? It's 4. 
     I hope that wasn't too complicated. Need me to explain addition too?
```

#### 💼 Professional - Business Focused

**Use Case:** Business inquiries, technical questions, formal reports

**Characteristics:**
- Clear and concise
- Structured responses
- Bullet points and lists
- Efficiency-focused
- Business-appropriate language

**Temperature:** 0.3 (Low, focused)

**Example:**
```
User: What is cloud computing?
Bot: Cloud Computing Definition:
     - On-demand delivery of IT resources
     - Internet-based access
     - Pay-as-you-go pricing model
     
     Key Benefits:
     1. Scalability
     2. Cost efficiency
     3. Global accessibility
     4. Automatic updates
```

---

## Customization

### Adding New Personalities

**File:** `backend/server.js`

1. **Add personality definition:**

```javascript
const PERSONALITIES = {
  // ... existing personalities
  
  custom: "You are a [describe behavior]. [Add specific instructions].",
};
```

2. **Update frontend dropdown:**

**File:** `frontend/src/app/chat/chat.component.ts`

```typescript
personalities = [
  // ... existing personalities
  
  { value: 'custom', label: '✨ Custom', description: 'Your Description' }
];
```

3. **Optional: Add custom temperature:**

```javascript
const temperature = personality === "custom" ? 1.5 : 
                   personality === "energetic" ? 1.2 : 
                   // ... rest of logic
```

### Customizing UI Colors

**File:** `frontend/src/styles.css`

**Background Gradient:**
```css
body {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

**Message Bubbles:**

**File:** `frontend/src/app/chat/chat.component.css`

```css
.user p {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}

.bot p {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

### Changing AI Model

**File:** `backend/server.js`

Replace the Gemini model URL:

```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
  // Change to: gemini-2.5-pro, gemini-2.0-flash, etc.
);
```

**Available Gemini Models:**
- `gemini-2.5-flash` - Fast, efficient (Current)
- `gemini-2.5-pro` - More powerful, slower
- `gemini-2.0-flash` - Older version
- See [Google AI documentation](https://ai.google.dev/models/gemini) for full list

### Adjusting Rate Limits

The backend doesn't currently implement rate limiting. To add:

**Install rate-limit package:**
```bash
cd backend
npm install express-rate-limit
```

**Add to server.js:**
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Troubleshooting

### Common Issues

#### 1. "Unable to connect to the remote server"

**Symptoms:**
- Frontend shows error message
- No response from chatbot

**Causes:**
- Backend server not running
- Port mismatch
- Firewall blocking connection

**Solutions:**
```bash
# Check if backend is running
netstat -ano | findstr :3002

# Restart backend
cd backend
node server.js

# Verify API URL in frontend matches backend port
# frontend/src/app/chat/chat.component.ts
private apiUrl = 'http://localhost:3002/api/chat';
```

#### 2. "API key not configured"

**Symptoms:**
- 500 Internal Server Error
- Message about API key

**Solutions:**
1. Ensure `.env` file exists in `backend/` directory
2. Verify `GEMINI_API_KEY` is set:
```env
GEMINI_API_KEY=AIzaSy...your_key
```
3. Restart backend server after changes
4. Check for typos in environment variable name

#### 3. "You exceeded your current quota"

**Symptoms:**
- Error about quota or billing
- Chatbot responses fail after working initially

**Solutions:**
1. Check your [Google AI Studio quota](https://makersuite.google.com/)
2. Wait for quota reset (resets daily)
3. Upgrade to paid plan if needed
4. Use alternative free API (see `FREE_API_GUIDE.md`)

#### 4. "No response" or Empty Messages

**Symptoms:**
- Bot returns "No response"
- Empty message bubbles

**Causes:**
- Gemini safety filters triggered
- Inappropriate content in prompt
- API returning no content

**Solutions:**
- Automatic fallback implemented for Mirror mode
- Rephrase your question
- Check console logs for details:
```javascript
// Backend logs show:
console.log('Mirror fallback used.');
```

#### 5. Port Already in Use (EADDRINUSE)

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3002
```

**Solutions:**

**Windows (PowerShell):**
```powershell
# Find process using port 3002
netstat -ano | findstr :3002

# Kill the process (replace PID with actual number)
Stop-Process -Id <PID> -Force

# Or kill all node processes
Get-Process node | Stop-Process -Force
```

**Linux/Mac:**
```bash
# Find process
lsof -i :3002

# Kill process
kill -9 <PID>

# Or
pkill node
```

#### 6. Angular Build Errors

**Symptoms:**
- Compilation errors
- Module not found

**Solutions:**
```bash
cd frontend

# Clear cache
rm -rf .angular node_modules

# Reinstall dependencies
npm install

# Rebuild
npm start
```

#### 7. CORS Errors

**Symptoms:**
- "CORS policy blocked"
- Browser console shows CORS error

**Solutions:**

Backend already has CORS enabled, but if you deploy:

**File:** `backend/server.js`
```javascript
import cors from "cors";

app.use(cors({
  origin: 'http://your-frontend-domain.com',
  credentials: true
}));
```

### Debug Mode

**Enable Backend Logging:**

**File:** `backend/server.js`

Add after the endpoint:
```javascript
app.post("/api/chat", async (req, res) => {
  console.log('Received request:', req.body); // Add this
  
  try {
    const { message, personality = "friendly" } = req.body;
    console.log('Processing:', { message, personality }); // Add this
    
    // ... rest of code
    
    console.log('Sending response:', { reply }); // Add before res.json()
    res.json({ reply });
  } catch (error) {
    console.error("Detailed error:", error); // Enhanced logging
  }
});
```

**Enable Frontend Logging:**

**File:** `frontend/src/app/chat/chat.component.ts`

```typescript
async sendMessage() {
  console.log('Sending message:', this.userInput); // Add this
  
  try {
    const response: any = await firstValueFrom(
      this.http.post(this.apiUrl, { 
        message: userMessage,
        personality: this.selectedPersonality 
      })
    );
    console.log('Received response:', response); // Add this
  }
}
```

---

## Development

### Development Workflow

#### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Start with auto-reload (if using nodemon)
npm run dev

# Or manual restart
node server.js
```

**Recommended tools:**
- **nodemon**: Auto-restart on file changes
  ```bash
  npm install --save-dev nodemon
  # Update package.json script:
  "dev": "nodemon server.js"
  ```

#### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server with hot reload
npm start

# Production build
npm run build

# Build with watch mode
npm run watch
```

### Testing the API

#### Using Postman:

1. Create new POST request
2. URL: `http://localhost:3002/api/chat`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "message": "Test message",
  "personality": "friendly"
}
```

#### Using VS Code REST Client:

Create `test.http`:
```http
### Test Friendly Personality
POST http://localhost:3002/api/chat
Content-Type: application/json

{
  "message": "Hello!",
  "personality": "friendly"
}

### Test Professional Personality
POST http://localhost:3002/api/chat
Content-Type: application/json

{
  "message": "What is AI?",
  "personality": "professional"
}
```

### Code Style Guidelines

#### Backend (JavaScript/Node.js):

- Use ES6+ features
- Async/await for asynchronous operations
- Descriptive variable names
- Comment complex logic
- Handle errors gracefully

**Example:**
```javascript
// Good
async function processMessage(message, personality) {
  try {
    const response = await callGeminiAPI(message, personality);
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Bad
function process(m, p) {
  callAPI(m, p).then(r => r);
}
```

#### Frontend (TypeScript/Angular):

- Follow Angular style guide
- Use TypeScript types
- Component-based architecture
- Reactive programming with RxJS

**Example:**
```typescript
// Good
interface Message {
  from: string;
  text: string;
}

async sendMessage(): Promise<void> {
  const response: ChatResponse = await this.chatService.send(message);
}

// Bad
sendMessage() {
  this.service.send(msg).then(r => this.messages.push(r));
}
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-personality

# Make changes
git add .
git commit -m "feat: add custom personality mode"

# Push to remote
git push origin feature/new-personality

# Create pull request
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

---

## Deployment

### Production Deployment

#### Backend Deployment (Node.js)

**Option 1: Traditional VPS/Server**

1. **Install Node.js on server:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Transfer files:**
```bash
scp -r backend/ user@your-server:/var/www/chatbot-backend/
```

3. **Install dependencies:**
```bash
ssh user@your-server
cd /var/www/chatbot-backend
npm install --production
```

4. **Set environment variables:**
```bash
export GEMINI_API_KEY=your_key
export PORT=3002
```

5. **Use PM2 for process management:**
```bash
npm install -g pm2
pm2 start server.js --name chatbot-backend
pm2 save
pm2 startup
```

**Option 2: Deploy to Heroku**

1. Install Heroku CLI
2. Create `Procfile`:
```
web: node server.js
```

3. Deploy:
```bash
cd backend
heroku create your-app-name
heroku config:set GEMINI_API_KEY=your_key
git push heroku main
```

**Option 3: Deploy to Render/Railway**

1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Add environment variable: `GEMINI_API_KEY`

#### Frontend Deployment (Angular)

**Option 1: Static Hosting (Netlify/Vercel)**

1. **Build production bundle:**
```bash
cd frontend
npm run build
```

2. **Deploy dist folder:**
```bash
# Netlify
npx netlify-cli deploy --prod --dir=dist/chatbot-angular/browser

# Vercel
npx vercel --prod
```

3. **Update API URL:**

Before building, update `chat.component.ts`:
```typescript
private apiUrl = 'https://your-backend-domain.com/api/chat';
```

**Option 2: Traditional Web Server (Nginx)**

1. **Build:**
```bash
npm run build
```

2. **Copy to server:**
```bash
scp -r dist/chatbot-angular/browser/* user@server:/var/www/html/
```

3. **Nginx config:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Environment-Specific Configuration

**Development:**
```env
GEMINI_API_KEY=dev_key
PORT=3002
NODE_ENV=development
```

**Production:**
```env
GEMINI_API_KEY=prod_key
PORT=80
NODE_ENV=production
```

### HTTPS Setup

**Using Let's Encrypt (Certbot):**

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

**Express HTTPS:**
```javascript
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('/path/to/privkey.pem'),
  cert: fs.readFileSync('/path/to/fullchain.pem')
};

https.createServer(options, app).listen(443);
```

---

## Security Considerations

### API Key Security

**✅ DO:**
- Store API keys in `.env` files
- Add `.env` to `.gitignore`
- Use environment variables in production
- Rotate keys periodically
- Use separate keys for dev/prod

**❌ DON'T:**
- Commit API keys to Git
- Expose keys in frontend code
- Share keys in public channels
- Use production keys in development

### Backend Security Best Practices

1. **Rate Limiting:**
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});

app.use('/api/', limiter);
```

2. **Input Validation:**
```javascript
if (!message || typeof message !== 'string' || message.length > 5000) {
  return res.status(400).json({ error: 'Invalid message' });
}
```

3. **Helmet for Security Headers:**
```bash
npm install helmet
```

```javascript
import helmet from 'helmet';
app.use(helmet());
```

4. **CORS Configuration:**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));
```

### Content Security

**Current Implementation:**
- Mirror personality sanitizes inappropriate content
- Replaces insults with neutral words
- Maintains safety guidelines

**Enhanced Filtering (Optional):**

```javascript
import Filter from 'bad-words';
const filter = new Filter();

if (filter.isProfane(message)) {
  return res.status(400).json({ 
    error: 'Please keep the conversation respectful' 
  });
}
```

### HTTPS/SSL

**Production Requirements:**
- Always use HTTPS in production
- Obtain SSL certificate (Let's Encrypt free)
- Redirect HTTP to HTTPS
- Use secure cookies

---

## Performance Optimization

### Backend Optimization

1. **Caching (Optional):**
```javascript
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 });

// Cache similar queries
const cacheKey = `${message}_${personality}`;
const cached = cache.get(cacheKey);
if (cached) return res.json({ reply: cached });

// After getting response
cache.set(cacheKey, reply);
```

2. **Compression:**
```bash
npm install compression
```

```javascript
import compression from 'compression';
app.use(compression());
```

3. **Request Timeout:**
```javascript
const timeout = 30000; // 30 seconds

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), timeout);

const response = await fetch(url, {
  signal: controller.signal
});
```

### Frontend Optimization

1. **Lazy Loading:**
```typescript
// Already using standalone components
// Implement lazy routes if adding more features
```

2. **Production Build:**
```bash
ng build --configuration production
# Outputs optimized bundle to dist/
```

3. **Bundle Analysis:**
```bash
npm install --save-dev webpack-bundle-analyzer
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

### Monitoring

**Backend Monitoring:**
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});
```

**Error Tracking:**
- Implement Sentry or similar service
- Log errors to external service
- Monitor API response times

---

## License

This project is licensed under the MIT License.

### MIT License

```
Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Appendix

### Useful Links

- [Angular Documentation](https://angular.io/docs)
- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Express.js Guide](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### FAQ

**Q: Can I use OpenAI instead of Gemini?**
A: Yes! The backend supports OpenAI. Set `OPENAI_API_KEY` in `.env` and remove `GEMINI_API_KEY`.

**Q: How many messages can I send per day?**
A: Gemini free tier: 1,500 requests/day, 60/minute.

**Q: Can I deploy this commercially?**
A: Yes, but review Google's [Generative AI Terms](https://ai.google.dev/terms) and ensure compliance.

**Q: How do I add more languages?**
A: The chatbot responds in the language you use. To force a language, modify the personality prompt to include: "Always respond in [language]"

**Q: Can I save chat history?**
A: Currently no persistence. To add, implement database storage (MongoDB, PostgreSQL) and save messages in the `/api/chat` endpoint.

---

## Support

### Getting Help

- **Issues**: Open an issue on GitHub
- **Questions**: Check FAQ above
- **Community**: Join discussions

### Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## Changelog

### Version 1.0.0 (Current)

- ✅ Initial release
- ✅ 6 personality modes
- ✅ Google Gemini integration
- ✅ Responsive full-screen design
- ✅ Mirror personality safety filtering
- ✅ Comprehensive documentation

### Planned Features

- 🔄 Message history persistence
- 🔄 User authentication
- 🔄 Multiple conversation threads
- 🔄 File upload support
- 🔄 Markdown rendering
- 🔄 Dark mode
- 🔄 Voice input/output

---

**Built with ❤️ using Angular, Node.js, and Google Gemini API**

*Last Updated: November 11, 2025*
