# Free AI API Alternatives Guide

## 🆓 Recommended: Google Gemini (FREE)

**Generous free tier with no credit card required!**

### Get Your Free API Key:
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

### Free Tier Limits:
- ✅ **60 requests per minute**
- ✅ **1,500 requests per day**
- ✅ **No credit card required**
- ✅ **Unlimited free usage within limits**

---

## 🎯 Other Free Alternatives

### 1. **Hugging Face Inference API** (FREE)
- URL: https://huggingface.co/settings/tokens
- Free tier: Unlimited requests with rate limits
- Models: Many open-source LLMs available
- Best for: Testing and small projects

### 2. **Cohere** (FREE)
- URL: https://dashboard.cohere.com/api-keys
- Free tier: 100 requests/minute
- Good for: Production-ready applications

### 3. **Anthropic Claude** (Trial Credits)
- URL: https://console.anthropic.com/
- Free tier: $5 in trial credits
- Best for: High-quality responses

### 4. **Mistral AI** (FREE)
- URL: https://console.mistral.ai/
- Free tier: Limited requests
- Best for: European compliance needed

---

## 📝 Setup Instructions (Using Gemini)

1. **Get your Gemini API key** from the link above

2. **Update your `.env` file:**
   ```env
   GEMINI_API_KEY=AIzaSy... (your actual key)
   PORT=3002
   ```

3. **Restart the backend server**

4. **Test the chatbot** - it will automatically use Gemini!

---

## 💡 The backend now supports BOTH:
- **Gemini API** (if `GEMINI_API_KEY` is set) - FREE ✅
- **OpenAI API** (if only `OPENAI_API_KEY` is set) - Paid

Priority: Gemini > OpenAI (if both are set, Gemini will be used)

---

## 🚀 Next Steps

1. Get your free Gemini API key
2. Add it to the `.env` file
3. Restart the server
4. Start chatting for FREE! 🎉
