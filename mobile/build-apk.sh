
#!/bin/bash
cd "$(dirname "$0")"

# Install EAS CLI if not already installed
npm install -g eas-cli

# Login to Expo (will open browser for authentication)
npx eas login

# Build the APK
npx eas build -p android --profile production

echo "Build started! Follow the link provided above to monitor build progress."
echo "Once complete, you can download the APK from the provided URL."
