# OpenChat Universal

Universal mobile AI chat client for iOS/Android. Connect any AI provider - OpenAI, Anthropic, Gemini, Ollama, custom endpoints.

## Features

- **Universal AI Connector** - Auto-detects API format and models
- **Secure Storage** - API keys encrypted in device secure storage
- **Chat History** - SQLite persistent storage
- **Markdown Support** - Rich text rendering for AI responses
- **Multi-Provider** - OpenAI, Anthropic, Gemini, Ollama, OpenRouter, custom

## Tech Stack

- React Native + Expo SDK 52
- TypeScript (strict mode)
- Expo Router (file-based routing)
- NativeWind (Tailwind CSS)
- Zustand (state + persistence)
- expo-sqlite (local database)
- expo-secure-store (encrypted keys)

## Quick Start

### Option 1: Cloud Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli@latest

# Login to Expo
eas login

# Clone and build
git clone https://github.com/Darbonyyu/openchat-universal.git
cd openchat-universal
npm install
eas build --platform android --profile development
```

Wait 5-15 minutes, download APK from the provided link.

### Option 2: Local Development

```bash
npm install
npx expo start
```

Scan QR code with Expo Go app on Android/iOS.

## Build Profiles

- **development** - Debug APK with dev tools
- **preview** - Internal testing build
- **production** - Release build for stores

## Project Structure

```
app/
  _layout.tsx      # Root layout with SQLite & routing
  index.tsx        # Chat screen
  connect.tsx      # Provider connection screen
lib/
  provider-adapters.ts  # Universal API adapter
  database.ts           # SQLite schema & queries
  secrets.ts            # SecureStore wrapper
store/
  useAppStore.ts   # Zustand state + persistence
types/
  provider.ts      # TypeScript interfaces
  native-modules.d.ts  # Third-party types
```

## How It Works

1. User enters Base URL + API key
2. App detects provider format (OpenAI/Anthropic/Gemini/Ollama)
3. Fetches available models from provider
4. Saves config (key encrypted in SecureStore)
5. Messages stored in SQLite
6. Markdown rendered for AI responses

## Supported Providers

**OpenAI-Compatible:**
- OpenAI
- OpenRouter
- Groq
- DeepSeek
- Kimi
- Together AI
- Perplexity
- Custom vLLM/LocalAI

**Native Support:**
- Anthropic Claude
- Google Gemini
- Ollama (local)

## Documentation

- [BUILD_GUIDE.md](./BUILD_GUIDE.md) - Detailed build instructions
- [QUICK_START.md](./QUICK_START.md) - Fast track to APK
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common errors
- [PRE_BUILD_CHECKLIST.md](./PRE_BUILD_CHECKLIST.md) - Verify before building

## Development

```bash
# Type check
npm run typecheck

# Start Metro bundler
npm start

# Build for Android
eas build --platform android --profile development

# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile development
```

## Repository

https://github.com/Darbonyyu/openchat-universal

## License

MIT