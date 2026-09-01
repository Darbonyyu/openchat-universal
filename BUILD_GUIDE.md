# Building Debug APK

This guide explains how to build a debug APK for OpenChat Universal.

## Prerequisites

1. Install Node.js 20+
2. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```

## Local Build (Recommended for Debug)

### Step 1: Login to Expo

```bash
eas login
```

If you don't have an Expo account, create one at https://expo.dev

### Step 2: Configure EAS

The project already includes `eas.json` configuration. To initialize:

```bash
eas build:configure
```

### Step 3: Build Debug APK

```bash
eas build --platform android --profile development --local
```

This will:
- Build the APK locally on your machine
- Create a debug build with development tools
- Output the APK file to your current directory

**Note**: Local builds require Android SDK and Java installed. If you don't have these, remove `--local` flag to build in the cloud.

## Cloud Build

To build on Expo's servers (no local Android SDK required):

```bash
eas build --platform android --profile development
```

The build will run on Expo's infrastructure. Once complete, you'll get a download link for the APK.

## Build Profiles

The project includes three build profiles in `eas.json`:

### 1. Development
```bash
eas build --platform android --profile development
```
- Includes Expo development client
- Internal distribution
- For testing with hot reload

### 2. Preview
```bash
eas build --platform android --profile preview
```
- Internal distribution
- No development tools
- For QA/beta testing

### 3. Production
```bash
eas build --platform android --profile production
```
- Optimized release build
- Ready for Google Play Store

## Installing the APK

After build completes:

1. Download the APK file
2. Transfer to Android device via USB or cloud storage
3. Enable "Install from Unknown Sources" in device settings
4. Open the APK file on device to install

## Troubleshooting

### "No Android SDK found"
- Install Android Studio and SDK, or use cloud builds (remove `--local` flag)

### "Authentication failed"
- Run `eas login` again
- Check your Expo account credentials

### Build takes too long locally
- Use cloud builds instead: `eas build --platform android --profile development`

## GitHub Actions (Optional)

The repository includes a workflow for automated builds:

1. Add `EXPO_TOKEN` secret to your GitHub repository:
   - Get token: `eas whoami` then `eas login --token`
   - Add to GitHub: Settings → Secrets → Actions → New repository secret

2. Trigger build:
   - Go to Actions tab
   - Run "EAS Build" workflow
   - Select platform and profile

## Quick Commands

```bash
# Debug APK (cloud build)
eas build --platform android --profile development

# Debug APK (local build)
eas build --platform android --profile development --local

# Check build status
eas build:list

# Download latest build
eas build:download --platform android --profile development
```