# Pre-Build Checklist

Run these commands before building to ensure everything is configured correctly:

## 1. Verify Dependencies

```bash
cd /root/projects/apk
npm install
```

Expected: No errors, all packages installed successfully.

## 2. Check TypeScript

```bash
npm run typecheck
```

Expected: No errors (empty output or "no errors found").

## 3. Verify Expo Config

```bash
npx expo config --type public
```

Expected: Valid JSON config output without errors.

## 4. Test Metro Bundler (Optional)

```bash
npx expo start --no-dev --minify
```

Press `Ctrl+C` after Metro starts successfully. This validates that bundling works.

## 5. Build Debug APK

```bash
# Install/update EAS CLI
npm install -g eas-cli@latest

# Login to Expo
eas login

# Build
eas build --platform android --profile development
```

## Common Issues

### "Cannot find module 'react-native-paper'"
**Fixed**: Removed from app/_layout.tsx

### "Metro bundler failed"
**Fixed**: Added proper metro.config.js with NativeWind

### "Missing icon.png"
**Fixed**: Simplified app.json, icons not required for debug builds

### "Gradle build failed"
**Fixed**: Set explicit buildType: "apk" in eas.json

## Success Indicators

✅ TypeScript compiles without errors
✅ Metro config loads without warnings
✅ EAS build starts and uploads project
✅ Build completes and provides APK download link

## Current Configuration

- **Expo SDK**: 52
- **React Native**: 0.76.7
- **EAS CLI**: >= 12.0.0
- **Build Type**: APK (development profile)
- **Target**: Android

## Files Changed in This Fix

1. `app/_layout.tsx` - Removed PaperProvider
2. `types/native-modules.d.ts` - Removed Paper declarations
3. `app.json` - Simplified to minimum required
4. `app.config.js` - Created JS config alternative
5. `eas.json` - Simplified build profiles
6. `metro.config.js` - Updated NativeWind config
7. `babel.config.js` - Formatted properly
8. `tsconfig.json` - Added skipLibCheck
9. `.easignore` - Added to speed up uploads
10. `expo-env.d.ts` - Added Expo types reference