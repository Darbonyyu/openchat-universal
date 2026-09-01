# Assets Directory

This directory should contain app icons and splash screens.

For quick testing, EAS Build will generate default assets automatically.

## Production Assets

For production builds, add:
- `icon.png` - 1024x1024px app icon
- `adaptive-icon.png` - 1024x1024px Android adaptive icon
- `splash.png` - 2048x2048px splash screen
- `favicon.png` - 48x48px web favicon

## Generate Assets

Use Expo's asset generator:
```bash
npx expo-asset-generator icon.png
```

Or create manually following Expo guidelines:
https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/