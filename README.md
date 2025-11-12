# Chatbot API Server

Express.js backend server with Google Gemini AI integration and multiple personality modes.

## Features

- 🤖 Google Gemini AI integration (gemini-2.5-flash model)
- 🎭 6 personality modes (polite, friendly, energetic, mirror, sarcastic, professional)
- 🔒 Safety filtering for inappropriate content
- 🌐 CORS-enabled for frontend integration
- ⚡ RESTful API design

## Prerequisites

- Node.js v22.19.0 or higher
- npm or yarn
- Google Gemini API key (free tier available)

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:
Create a `.env` file in this directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3002
NODE_ENV=development
```

3. **Get a Gemini API Key**:
   - Go to https://aistudio.google.com/app/apikey
   - Click "Create API Key"
   - Copy the key to your `.env` file

## Running Locally

```bash
# Development
npm start

# Or with Node directly
node server.js
```

Server will start on `http://localhost:3002`

## API Endpoints

### POST /api/chat

Send a message to the chatbot with a specific personality.

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
  "reply": "Hey there! I'm doing great, thanks for asking! How about you? 😊"
}
```

**Available Personalities:**
- `polite` - Formal and respectful
- `friendly` - Casual and warm
- `energetic` - Enthusiastic with exclamation marks
- `mirror` - Matches user's communication style
- `sarcastic` - Witty with dry humor
- `professional` - Business-appropriate and concise

## Project Structure

```
chatbot-api-server/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── .env                   # Environment variables (create this)
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
├── render.yaml           # Render.com deployment config
├── README.md             # This file
├── RENDER_DEPLOYMENT.md  # Deployment guide
├── PERSONALITY_GUIDE.md  # Personality system details
└── FREE_API_GUIDE.md     # Alternative AI APIs
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Required |
| `PORT` | Server port | 3002 |
| `NODE_ENV` | Environment (development/production) | development |

## Testing the API

### Using PowerShell (Windows):
```powershell
$body = @{
    message = "Hello!"
    personality = "friendly"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3002/api/chat" -Method POST -ContentType "application/json" -Body $body
```

### Using curl (Mac/Linux):
```bash
curl -X POST http://localhost:3002/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!","personality":"friendly"}'
```

## Deployment

See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed deployment instructions to Render.com.

**Quick Deploy:**
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy!

## Personality System

Each personality has:
- Custom system prompt
- Unique temperature setting (0.3 - 1.2)
- Safety filtering (especially for mirror mode)

See [PERSONALITY_GUIDE.md](./PERSONALITY_GUIDE.md) for detailed examples and behavior.

## Error Handling

The server includes comprehensive error handling:
- API key validation
- Content safety filtering
- Rate limit handling
- Fallback responses for mirror mode

## Security

- CORS configured for specific origins in production
- Environment variables for sensitive data
- Input validation and sanitization
- Rate limiting recommended for production

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3002
netstat -ano | findstr :3002

# Kill the process (replace PID)
Stop-Process -Id <PID> -Force
```

### API Key Issues
- Verify key is correct in `.env`
- Check Gemini API quota at https://aistudio.google.com
- Free tier: 60 requests/minute, 1,500 requests/day

### CORS Errors
Update `server.js` CORS configuration to include your frontend URL.

## License

MIT License - See root project for details.

## Related Documentation

- [Render Deployment Guide](./RENDER_DEPLOYMENT.md)
- [Personality System Guide](./PERSONALITY_GUIDE.md)
- [Free API Alternatives](./FREE_API_GUIDE.md)
- [Main Documentation](../DOCUMENTATION.md)

## Support

For issues or questions, please refer to the main documentation or create an issue in the repository.
