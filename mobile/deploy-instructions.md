
# Deploying the Truenat Mobile App as APK

## Prerequisites
- An Expo account (create one at https://expo.dev/signup)
- Internet connection

## Steps to Build the APK

1. Navigate to the mobile directory:
   ```
   cd mobile
   ```

2. Run the build script:
   ```
   npm run build:apk
   ```
   or
   ```
   ./build-apk.sh
   ```

3. If prompted, log in to your Expo account through the browser.

4. Wait for the build to complete. The EAS build service will compile your app in the cloud.

5. When the build is finished, you'll receive a URL where you can download the APK.

6. Share this APK file with users who need to install the Truenat Mobile Dashboard app.

## Installing the APK on Android Devices

1. Download the APK file to the Android device.
2. Open the file and allow installation from unknown sources if prompted.
3. Follow the on-screen instructions to complete the installation.
4. Open the app from the home screen or app drawer.

## Notes

- The APK is not published to the Google Play Store using this method.
- For proper distribution, consider publishing through the Google Play Store.
- Each build creates a new version of the APK that you can distribute.
