# Quick Start: Build Debug APK

## Option 1: Cloud Build (Easiest - No Setup Required)

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login to Expo (create free account if needed)
eas login

# 3. Build debug APK on Expo's servers
cd /root/projects/apk
eas build --platform android --profile development

# Wait 5-15 minutes, then download the APK from the link provided
```

## Option 2: Use Pre-configured Project

The repository is already configured with:
- ✅ `eas.json` with development/preview/production profiles
- ✅ GitHub Actions workflow for automated builds
- ✅ All dependencies and configuration

Simply run:
```bash
eas build --platform android --profile development
```

## What You Get

- **Debug APK** with Expo development tools
- **Universal AI connector** supporting OpenAI, Anthropic, Gemini, Ollama
- **Secure storage** for API keys
- **SQLite chat history**
- **Markdown rendering**

## Next Steps

1. Install APK on Android device
2. Open app
3. Tap "Connect a provider"
4. Enter Base URL and API key
5. Start chatting!

## Repository

https://github.com/Darbonyyu/openchat-universal

## Support

See BUILD_GUIDE.md for detailed instructions and troubleshooting.