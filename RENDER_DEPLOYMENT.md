# Deploying Backend to Render

This guide walks you through deploying your chatbot backend to Render.com.

## Prerequisites

- GitHub account
- Render account (free tier available at https://render.com)
- Your Gemini API key

## Step 1: Push Your Code to GitHub

1. **Initialize Git repository** (if not already done):
```bash
cd "C:\Users\dheer\projects\angular\Chatbot integration"
git init
```

2. **Create a `.gitignore` file** in the root directory (if not exists):
```
node_modules/
.env
.DS_Store
*.log
.angular/
dist/
```

3. **Commit your code**:
```bash
git add .
git commit -m "Initial commit - chatbot backend"
```

4. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it something like `chatbot-backend`
   - Don't initialize with README (you already have code)
   - Click "Create repository"

5. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/chatbot-backend.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Render

### Option A: Deploy via Dashboard (Recommended)

1. **Log in to Render**: Go to https://dashboard.render.com

2. **Create New Web Service**:
   - Click "New +" button
   - Select "Web Service"

3. **Connect Your Repository**:
   - Click "Connect GitHub" or "Connect GitLab"
   - Authorize Render to access your repositories
   - Select your `chatbot-backend` repository

4. **Configure the Service**:
   - **Name**: `chatbot-backend` (or your preferred name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend` (important!)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free` (or choose paid tier for better performance)

5. **Add Environment Variables**:
   Click "Advanced" and add these environment variables:
   
   | Key | Value |
   |-----|-------|
   | `PORT` | `3002` |
   | `NODE_ENV` | `production` |

6. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait for the deployment to complete (usually 2-5 minutes)

### Option B: Deploy via render.yaml (Blueprint)

The `render.yaml` file is already created in your backend directory.

1. **Push render.yaml to GitHub** (if not already):
```bash
git add backend/render.yaml
git commit -m "Add Render blueprint"
git push
```

2. **Create from Blueprint**:
   - Go to Render Dashboard
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will detect `render.yaml` automatically
   - Click "Apply"
   - Manually add the `GEMINI_API_KEY` in the dashboard (it's not synced for security)

## Step 3: Get Your Backend URL

After deployment completes:

1. Your backend URL will be something like:
   ```
   https://chatbot-backend-xxxx.onrender.com
   ```

2. **Test your API** using PowerShell:
```powershell
Invoke-RestMethod -Uri "https://chatbot-backend-xxxx.onrender.com/api/chat" -Method POST -ContentType "application/json" -Body '{"message":"Hello","personality":"friendly"}' | ConvertTo-Json
```

## Step 4: Update Frontend to Use Production Backend

1. **Open** `frontend/src/app/chat/chat.component.ts`

2. **Update the API URL**:
```typescript
sendMessage() {
  if (!this.userInput.trim()) return;

  const userMessage = this.userInput.trim();
  this.messages.push({ text: userMessage, isUser: true });
  this.userInput = '';

  this.isLoading = true;
  
  // Use environment variable or update this URL directly
  const apiUrl = 'https://chatbot-backend-xxxx.onrender.com/api/chat';  // Replace with your Render URL
  
  firstValueFrom(
    this.http.post<{ reply: string }>(apiUrl, {
      message: userMessage,
      personality: this.selectedPersonality
    })
  )
  // ... rest of the code
}
```

3. **Or better - Create environment files**:

Create `frontend/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3002/api/chat'
};
```

Create `frontend/src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://chatbot-backend-xxxx.onrender.com/api/chat'  // Your Render URL
};
```

Then in `chat.component.ts`:
```typescript
import { environment } from '../../environments/environment';

// In sendMessage():
const apiUrl = environment.apiUrl;
```

## Step 5: Update CORS Settings

After you know your frontend URL (if deploying to Netlify/Vercel):

1. **Update** `backend/server.js` CORS configuration:
```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'http://localhost:4200',
        'https://your-frontend-app.netlify.app',  // Add your actual frontend URL
        'https://chatbot-backend-xxxx.onrender.com'  // Your Render backend URL
      ]
    : '*',
  credentials: true
};
```

2. **Commit and push**:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

3. Render will automatically redeploy with the new changes.

## Important Notes

### Free Tier Limitations
- **Spin Down**: Free tier services spin down after 15 minutes of inactivity
- **Cold Start**: First request after spin down may take 30-60 seconds
- **Monthly Hours**: 750 hours/month (enough for one service running 24/7)

### Keeping Your Service Awake (Optional)
If you want to prevent cold starts, you can:

1. **Upgrade to Paid Tier** ($7/month) - No spin down
2. **Use a Ping Service** (not recommended for free tier):
   - UptimeRobot: https://uptimerobot.com
   - Set it to ping your backend every 10 minutes
   - Note: This may violate Render's free tier terms

### Monitoring Your Service

In Render Dashboard:
- View **Logs** to see console output
- Check **Metrics** for performance data
- View **Events** for deployment history

## Troubleshooting

### Issue: "Service Unavailable" or 503 Error
**Solution**: Wait 30-60 seconds for the service to wake up from cold start.

### Issue: "Cannot connect to backend"
**Solution**: 
- Check if the service is running in Render Dashboard
- Verify the URL is correct (no trailing slash)
- Check CORS settings in `server.js`

### Issue: "API Key Invalid"
**Solution**:
- Go to Render Dashboard → Your Service → Environment
- Verify `GEMINI_API_KEY` is set correctly
- Redeploy if needed

### Issue: Port Binding Error
**Solution**: Render provides `PORT` environment variable automatically. Make sure your `server.js` uses:
```javascript
const PORT = process.env.PORT || 3002;
app.listen(PORT, '0.0.0.0', () => { ... });
```

## Testing Your Deployment

### Test 1: Health Check (Add this to server.js)
```javascript
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Chatbot Backend is running',
    timestamp: new Date().toISOString()
  });
});
```

Visit: `https://chatbot-backend-xxxx.onrender.com/`

### Test 2: API Endpoint
```powershell
# Using PowerShell
$body = @{
    message = "Hello, how are you?"
    personality = "friendly"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://chatbot-backend-xxxx.onrender.com/api/chat" -Method POST -ContentType "application/json" -Body $body
```

### Test 3: All Personalities
Test each personality mode:
- polite
- friendly
- energetic
- mirror
- sarcastic
- professional

## Next Steps

1. ✅ Backend deployed on Render
2. ⬜ Deploy frontend to Netlify/Vercel (optional)
3. ⬜ Set up custom domain (optional, requires paid plan)
4. ⬜ Add monitoring and analytics
5. ⬜ Implement rate limiting for production

## Cost Estimation

- **Free Tier**: $0/month (with limitations)
- **Starter Plan**: $7/month (no spin down, better performance)
- **Standard Plan**: $25/month (more resources)

## Security Recommendations

1. **Never commit `.env` file** to Git
2. **Rotate API keys** regularly
3. **Enable rate limiting** in production
4. **Monitor API usage** to avoid quota issues
5. **Use HTTPS only** (Render provides this automatically)

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Your App Documentation: See `DOCUMENTATION.md`

---

**Congratulations!** Your chatbot backend is now live on Render! 🎉
