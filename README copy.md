# AI Chatbot with Multiple Personalities

Full-stack AI chatbot application with Angular 17 frontend and Node.js backend, powered by Google Gemini AI with 6 unique personality modes.

![Chatbot Demo](https://img.shields.io/badge/status-production--ready-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-Angular%2017-red)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-green)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-blue)

## 🎯 Features

- 🎭 **6 Personality Modes** - Polite, Friendly, Energetic, Mirror, Sarcastic, Professional
- 💬 **Real-time Chat** - Beautiful, full-screen responsive UI
- 🤖 **Google Gemini AI** - Free tier with 60 requests/minute
- 🔒 **Safety Filtering** - Content sanitization for inappropriate messages
- 📱 **Fully Responsive** - Optimized for desktop and mobile
- ⚡ **Modern Stack** - Angular 17 standalone + Express.js
- 🚀 **Deployment Ready** - Configured for Render, Netlify, Vercel

## 📁 Project Structure

```
Chatbot integration/
├── chatbot-api-server/         # Backend API
│   ├── server.js               # Express server with Gemini integration
│   ├── package.json            # Backend dependencies
│   ├── .env                    # Environment variables (not in git)
│   ├── .env.example            # Template for .env
│   ├── render.yaml             # Render deployment config
│   ├── README.md               # Backend documentation
│   ├── RENDER_DEPLOYMENT.md    # Deployment guide
│   ├── PERSONALITY_GUIDE.md    # Personality system details
│   └── FREE_API_GUIDE.md       # Alternative AI APIs
│
├── frontend/                   # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts           # Root component
│   │   │   └── chat/
│   │   │       ├── chat.component.ts      # Chat logic
│   │   │       ├── chat.component.html    # Chat UI
│   │   │       └── chat.component.css     # Chat styles
│   │   ├── main.ts             # Bootstrap application
│   │   ├── index.html          # HTML entry point
│   │   └── styles.css          # Global styles
│   ├── angular.json            # Angular configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── package.json            # Frontend dependencies
│   └── README.md               # Frontend documentation
│
├── DOCUMENTATION.md            # Comprehensive project docs
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js v22.19.0 or higher
- npm or yarn
- Google Gemini API key ([Get one free](https://aistudio.google.com/app/apikey))

### 1️⃣ Backend Setup

```powershell
cd chatbot-api-server
npm install
```

Create `.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3002
NODE_ENV=development
```

Start the server:
```powershell
npm start
```

Server runs on `http://localhost:3002`

📚 **Full backend docs**: [chatbot-api-server/README.md](./chatbot-api-server/README.md)

### 2️⃣ Frontend Setup

Open new terminal:
```powershell
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`

📚 **Full frontend docs**: [frontend/README.md](./frontend/README.md)

### 3️⃣ Start Chatting!

1. Open browser to `http://localhost:4200`
2. Select a personality from the dropdown
3. Type your message and hit Enter
4. Enjoy conversations with different AI personalities! 🎭

## � Personality Modes

- **Polite** - Formal, respectful, professional assistant
- **Friendly** - Casual, warm, like talking to a friend
- **Energetic** - Enthusiastic and upbeat with exclamation marks!
- **Mirror My Energy** - Adapts to your communication style
- **Sarcastic** - Witty responses with dry humor
- **Professional** - Business-focused, concise, and efficient

See [PERSONALITY_GUIDE.md](./chatbot-api-server/PERSONALITY_GUIDE.md) for detailed examples.

## 🚀 Deployment

### Backend Deployment (Render)

Complete guide: [chatbot-api-server/RENDER_DEPLOYMENT.md](./chatbot-api-server/RENDER_DEPLOYMENT.md)

**Quick steps:**
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository (root directory: `chatbot-api-server`)
4. Add environment variables
5. Deploy!

Your backend URL: `https://your-app.onrender.com`

### Frontend Deployment (Netlify/Vercel)

Complete guide: [frontend/README.md](./frontend/README.md)

**Quick steps:**
1. Update backend URL in `chat.component.ts`
2. Build: `npm run build`
3. Deploy `dist/frontend/browser/` to Netlify/Vercel

## 📦 API Reference

### POST `/api/chat`

**Request:**
```json
{
  "message": "Hello, how are you?",
  "personality": "friendly"
}
```

**Response:**
```json
{
  "reply": "Hey there! I'm doing great, thanks for asking! 😊"
}
```

**Personalities:** `polite`, `friendly`, `energetic`, `mirror`, `sarcastic`, `professional`

## �️ Tech Stack

**Frontend:**
- Angular 17 (Standalone Components)
- TypeScript 5.2
- RxJS 7.8
- Responsive CSS with Flexbox

**Backend:**
- Node.js v22.19.0
- Express.js 4.18
- Google Gemini API (gemini-2.5-flash)
- ES Modules

**Features:**
- Full-screen responsive layout
- Safety filtering for inappropriate content
- CORS configuration for production
- Environment-based configuration

## 📚 Documentation

- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Comprehensive project documentation
- **[chatbot-api-server/README.md](./chatbot-api-server/README.md)** - Backend API details
- **[frontend/README.md](./frontend/README.md)** - Frontend setup and deployment
- **[chatbot-api-server/RENDER_DEPLOYMENT.md](./chatbot-api-server/RENDER_DEPLOYMENT.md)** - Deploy backend to Render
- **[chatbot-api-server/PERSONALITY_GUIDE.md](./chatbot-api-server/PERSONALITY_GUIDE.md)** - Personality system guide
- **[chatbot-api-server/FREE_API_GUIDE.md](./chatbot-api-server/FREE_API_GUIDE.md)** - Free AI API alternatives

## 🐛 Troubleshooting

### Port Already in Use
```powershell
netstat -ano | findstr :3002
Stop-Process -Id <PID> -Force
```

### Cannot Connect to Backend
- Verify backend is running on port 3002
- Check CORS settings in `server.js`
- Update frontend API URL if backend URL changed

### Gemini API Errors
- Verify API key in `.env`
- Check quota: 60 req/min, 1,500 req/day (free tier)
- Get new key at https://aistudio.google.com/app/apikey

## 🔒 Security

- Never commit `.env` files
- Use environment variables for secrets
- Configure CORS for specific origins in production
- Implement rate limiting for production deployments
- Sanitize user inputs (already implemented)

## 📄 License

MIT License - See [DOCUMENTATION.md](./DOCUMENTATION.md) for details.

## 🎯 Features to Add

Future enhancements:
- ✅ Multiple personalities (DONE)
- ✅ Safety filtering (DONE)
- ✅ Responsive UI (DONE)
- ⬜ Message history persistence
- ⬜ User authentication
- ⬜ Multiple conversation threads
- ⬜ Streaming responses
- ⬜ Markdown rendering
- ⬜ Dark mode
- ⬜ Voice input/output

## 🤝 Project Architecture

```
┌─────────────────┐      HTTP POST       ┌──────────────────┐      REST API      ┌─────────────────┐
│                 │  ───────────────────▶ │                  │  ─────────────────▶│                 │
│  Angular 17     │    /api/chat         │  Express.js      │   Gemini API       │  Google Gemini  │
│  Frontend       │                      │  Backend         │                    │  AI Service     │
│  (Port 4200)    │ ◀─────────────────── │  (Port 3002)     │ ◀───────────────── │                 │
└─────────────────┘      JSON            └──────────────────┘      JSON          └─────────────────┘
```

---

**Happy Chatting! 🤖💬**

**Questions?** Check the detailed documentation in each folder's README or the comprehensive [DOCUMENTATION.md](./DOCUMENTATION.md).
