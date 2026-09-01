# Troubleshooting EAS Build Errors

## Common Build Errors and Solutions

### 1. Missing Assets Error
**Error**: `Error: Cannot find icon.png`

**Solution**: Assets are now optional. The updated `app.json` doesn't require icon/splash files for debug builds. If you still see this error, ensure you're using the latest commit.

### 2. Metro Bundler Error
**Error**: `Metro bundler failed` or `Unable to resolve module`

**Solution**: Added `metro.config.js` with NativeWind configuration. Pull latest changes.

### 3. Dependency Conflicts
**Error**: `Package @gorhom/bottom-sheet has unmet peer dependency`

**Solution**: Removed unused `@gorhom/bottom-sheet` and `react-native-paper` from dependencies. Updated `package.json` with minimal required packages.

### 4. Gradle Build Failed
**Error**: `Gradle build failed` or `Task :app:assembleDebug FAILED`

**Solution**: Updated `eas.json` to explicitly use APK build type and debug gradle command:
```json
"android": {
  "buildType": "apk",
  "gradleCommand": ":app:assembleDebug"
}
```

### 5. New Architecture Error
**Error**: `New Architecture is not supported`

**Solution**: If you encounter this, set `"newArchEnabled": false` in `app.json`. Current config has it enabled for better performance.

## Fixed Configuration

### What Was Changed:

1. **app.json**
   - Removed icon/splash requirements
   - Added `newArchEnabled: true`
   - Simplified adaptive icon config
   - Added EAS project ID auto-generation

2. **eas.json**
   - Added explicit Android build configuration
   - Set `buildType: "apk"` for all profiles
   - Added `gradleCommand: ":app:assembleDebug"` for development

3. **package.json**
   - Removed unused dependencies (`@gorhom/bottom-sheet`, `react-native-paper`, `expo-fetch`)
   - Added `react-native-svg` (required by lucide-react-native)
   - Added `@babel/core` as dev dependency

4. **metro.config.js** (NEW)
   - Added Metro bundler configuration
   - Integrated NativeWind CSS processing

## Build Commands After Fix

```bash
# Pull latest changes
cd /root/projects/apk
git pull origin main

# Install updated dependencies
npm install

# Build debug APK (cloud)
eas build --platform android --profile development

# Or build locally (requires Android SDK)
eas build --platform android --profile development --local
```

## If Build Still Fails

1. **Check EAS CLI version**:
   ```bash
   eas --version
   # Should be >= 10.0.0
   npm install -g eas-cli@latest
   ```

2. **Clear EAS cache**:
   ```bash
   eas build:cancel
   eas build --platform android --profile development --clear-cache
   ```

3. **Check Expo SDK compatibility**:
   ```bash
   npx expo-doctor
   ```

4. **View full build logs**:
   - Go to https://expo.dev/accounts/[your-account]/projects/openchat-universal/builds
   - Click on failed build
   - Check full error log

## Post to GitHub Issue

If build still fails, create an issue with:
- Full error log from EAS dashboard
- Output of `eas build:list`
- Output of `npx expo-doctor`