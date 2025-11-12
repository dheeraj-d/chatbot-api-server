# API Quick Reference

## Base URL
- **Local**: `http://localhost:3002`
- **Production**: `https://your-app.onrender.com`

## Endpoints

### 1. Health Check
```
GET /
```

**Response (200 OK):**
```json
{
  "status": "OK",
  "message": "Chatbot API Server is running",
  "version": "1.0.0",
  "timestamp": "2025-11-12T10:30:45.123Z",
  "environment": "development",
  "endpoints": {
    "chat": "POST /api/chat",
    "health": "GET /health"
  }
}
```

---

### 2. Health Monitor
```
GET /health
```

**Response (200 OK):**
```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": "2025-11-12T10:30:45.123Z"
}
```

---

### 3. Chat
```
POST /api/chat
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "personality": "friendly"
}
```

**Parameters:**
- `message` (string, required): User message (max 2000 characters)
- `personality` (string, optional): One of:
  - `polite` - Formal and respectful
  - `friendly` - Casual and warm (default)
  - `energetic` - Enthusiastic with exclamation marks
  - `mirror` - Matches user's style
  - `sarcastic` - Witty with dry humor
  - `professional` - Business-focused

**Success Response (200 OK):**
```json
{
  "reply": "Hey there! I'm doing great, thanks for asking! How about you? 😊"
}
```

**Error Responses:**

**400 Bad Request** - Invalid input:
```json
{
  "error": "Message is required"
}
```
```json
{
  "error": "Message too long. Maximum 2000 characters."
}
```
```json
{
  "error": "Invalid personality",
  "validPersonalities": ["polite", "friendly", "energetic", "mirror", "sarcastic", "professional"]
}
```

**429 Too Many Requests** - Rate limit exceeded:
```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 45
}
```

**500 Internal Server Error** - Server error:
```json
{
  "error": "An error occurred processing your request"
}
```

**503 Service Unavailable** - AI service down:
```json
{
  "error": "AI service unavailable. Please try again later."
}
```

**504 Gateway Timeout** - Request timeout:
```json
{
  "error": "Request timeout. Please try again."
}
```

---

## Rate Limits
- **30 requests per minute per IP address**
- Window: 60 seconds
- Applies to all endpoints

---

## CORS
- **Development**: All origins allowed
- **Production**: Only configured origins from `ALLOWED_ORIGINS`

---

## Examples

### PowerShell
```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:3002/health"

# Chat request
$body = @{
    message = "What is the capital of France?"
    personality = "professional"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3002/api/chat" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### cURL
```bash
# Health check
curl http://localhost:3002/health

# Chat request
curl -X POST http://localhost:3002/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the capital of France?",
    "personality": "professional"
  }'
```

### JavaScript (Fetch)
```javascript
// Health check
const health = await fetch('http://localhost:3002/health');
const data = await health.json();
console.log(data);

// Chat request
const response = await fetch('http://localhost:3002/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'What is the capital of France?',
    personality: 'professional'
  })
});

const result = await response.json();
console.log(result.reply);
```

### Python (requests)
```python
import requests

# Health check
health = requests.get('http://localhost:3002/health')
print(health.json())

# Chat request
response = requests.post('http://localhost:3002/api/chat', json={
    'message': 'What is the capital of France?',
    'personality': 'professional'
})

print(response.json()['reply'])
```

---

## HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid input (missing/invalid message or personality) |
| 403 | Forbidden | CORS violation |
| 404 | Not Found | Invalid endpoint |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | AI service unavailable |
| 504 | Gateway Timeout | Request took too long |

---

## Testing

### Test All Personalities
```powershell
$personalities = @('polite', 'friendly', 'energetic', 'mirror', 'sarcastic', 'professional')

foreach ($personality in $personalities) {
    Write-Host "`n=== Testing $personality ===" -ForegroundColor Cyan
    $body = @{
        message = "Hello! How are you?"
        personality = $personality
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:3002/api/chat" `
      -Method POST `
      -ContentType "application/json" `
      -Body $body
    
    Write-Host $response.reply -ForegroundColor Green
}
```

### Test Rate Limiting
```powershell
Write-Host "Sending 31 requests to test rate limit..." -ForegroundColor Yellow

1..31 | ForEach-Object {
    try {
        Invoke-RestMethod -Uri "http://localhost:3002/health" -ErrorAction Stop
        Write-Host "Request $_: OK" -ForegroundColor Green
    } catch {
        Write-Host "Request $_: BLOCKED (Rate limited)" -ForegroundColor Red
        $_.Exception.Response.StatusCode
    }
}
```

---

## Troubleshooting

### Cannot connect
- Ensure server is running: Look for startup banner in terminal
- Check port: `netstat -ano | findstr :3002`
- Verify firewall allows port 3002

### CORS error
- Check `ALLOWED_ORIGINS` environment variable
- Verify your frontend URL matches exactly
- Check browser console for actual origin

### Rate limited
- Wait 60 seconds before retrying
- Check `retryAfter` field in error response
- Consider increasing limit for your use case

### AI not responding
- Verify `GEMINI_API_KEY` is set correctly
- Check API quota at https://aistudio.google.com
- Free tier: 60 req/min, 1,500 req/day

---

## Need Help?

- **Backend README**: See `README.md` in chatbot-api-server folder
- **Deployment Guide**: See `RENDER_DEPLOYMENT.md`
- **Production Guide**: See `PRODUCTION_READY.md`
- **Main Docs**: See `../DOCUMENTATION.md`
