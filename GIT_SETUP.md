# Setup Backend Repository

This guide will help you create a separate GitHub repository for the backend API server.

## Step 1: Navigate to Backend Directory

```powershell
cd "C:\Users\dheer\projects\angular\Chatbot integration\chatbot-api-server"
```

## Step 2: Create .gitignore

```powershell
@"
# Node modules
node_modules/

# Environment variables
.env

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Testing
coverage/
.nyc_output/
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

## Step 3: Initialize Git

```powershell
git init
```

## Step 4: Stage and Commit Files

```powershell
git add .
git commit -m "Initial commit: AI Chatbot API Server with Google Gemini"
```

## Step 5: Create GitHub Repository

### Option A: Using GitHub CLI (Easiest)

```powershell
# Public repository
gh repo create chatbot-api-server --public --source=. --remote=origin --push --description "Express.js API server with Google Gemini AI and multiple personality modes"

# OR Private repository
gh repo create chatbot-api-server --private --source=. --remote=origin --push --description "Express.js API server with Google Gemini AI and multiple personality modes"
```

### Option B: Manual Setup

1. Go to https://github.com/new
2. Repository name: `chatbot-api-server`
3. Description: "Express.js API server with Google Gemini AI and multiple personality modes"
4. Choose Public or Private
5. **DO NOT** initialize with README
6. Click "Create repository"

7. Then run:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/chatbot-api-server.git
git branch -M main
git push -u origin main
```

## Step 6: Add Repository Badges (Optional)

Update README.md with badges:

```markdown
# Chatbot API Server

![Node.js](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-4.18-blue)
![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-blue)
![License](https://img.shields.io/badge/license-MIT-green)
```

## Step 7: Deploy to Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub
4. Select `chatbot-api-server` repository
5. Configure:
   - **Name**: chatbot-api-server
   - **Root Directory**: (leave empty, already at root)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Health Check Path**: `/health`

6. Add Environment Variables:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `NODE_ENV`: production
   - `ALLOWED_ORIGINS`: Your frontend URL (e.g., https://your-frontend.netlify.app)
   - `PORT`: 3002

7. Click "Create Web Service"

## Step 8: Get Your Backend URL

After deployment, your backend will be available at:
```
https://chatbot-api-server-xxxx.onrender.com
```

Test it:
```powershell
Invoke-RestMethod -Uri "https://chatbot-api-server-xxxx.onrender.com/health"
```

## Repository Structure

```
chatbot-api-server/
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── RENDER_DEPLOYMENT.md
├── PERSONALITY_GUIDE.md
├── FREE_API_GUIDE.md
├── PRODUCTION_READY.md
└── API_REFERENCE.md
```

## Quick Commands

```powershell
# Check status
git status

# Pull latest
git pull origin main

# Make changes and push
git add .
git commit -m "Your commit message"
git push origin main

# View remote
git remote -v
```

## Important Notes

- ✅ `.env` is in `.gitignore` - never commit it!
- ✅ Use `.env.example` to show required variables
- ✅ Add your Gemini API key in Render dashboard, not in code
- ✅ Update `ALLOWED_ORIGINS` after deploying frontend

## Next Steps

1. ✅ Create backend repository (you're here!)
2. ⬜ Deploy to Render
3. ⬜ Create frontend repository
4. ⬜ Update frontend with backend URL
5. ⬜ Deploy frontend

---

**Backend Repository Created!** 🎉

Repository URL: `https://github.com/YOUR_USERNAME/chatbot-api-server`
