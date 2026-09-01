# OpenChat Universal

Mobile AI chat client with universal provider support.

## Features

- **Universal Connector**: Connect any AI provider (OpenAI, Anthropic, Gemini, Ollama, custom endpoints)
- **Auto-Detection**: Automatically detects API format and discovers available models
- **Secure Storage**: API keys stored in device secure storage
- **Chat History**: SQLite-based persistent chat history
- **Markdown Support**: Rich formatting for AI responses

## Tech Stack

- React Native + Expo SDK 52+
- TypeScript (strict mode)
- Expo Router (file-based routing)
- NativeWind (Tailwind CSS)
- Zustand (state management)
- expo-sqlite (local database)
- expo-secure-store (encrypted key storage)

## Supported Providers

- OpenAI-compatible (OpenAI, Kimi, DeepSeek, Groq, vLLM, etc.)
- Anthropic Claude
- Google Gemini
- OpenRouter
- Ollama (local models)
- Custom endpoints

## Setup

```bash
npm install
npx expo start
```

## Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build debug APK
eas build --platform android --profile development
```

## Architecture

### Provider Adapter Pattern

The app uses a universal adapter pattern that:
1. Detects provider format from Base URL
2. Fetches available models
3. Adapts request/response formats
4. Handles provider-specific authentication

### Storage

- **AsyncStorage**: Non-sensitive settings (provider configs without keys)
- **SecureStore**: API keys and sensitive credentials
- **SQLite**: Chat message history

## License

MIT