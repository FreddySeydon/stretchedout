

# Stretchout App
This is a simple stretching app made in react native using the expo framework.
All dependencies are Expo managed workflow compatible and the whole app runs in Expo Go during development without the need for a development build.
It is completely offline using sqlite3 as a database.

## How to start dev

 1. Clone Repo
 2. Install dependencies: `npm install`
 3. Run dev server: `npm start`
 4. Get the Expo Go App: [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&pli=1) | [iOS](https://apps.apple.com/us/app/expo-go/id982107779)
 5. Scan the QR-Code from the terminal window with the Expo Go App (Android) or the Camera (iOS).

## How to build
To build using EAS:
1. Install the eas cli: `npm install -g eas-cli`
2. Login to eas with your expo.dev account: `eas login`
3. Configure the build: `eas build:configure`
4. Start the build process on expo servers: `eas build --platform [android | ios | all]`
5. You can start a local build by adding the `--local` flag

To get the native build files from expo run prebuild.
To generate the folders for android and iOS:

    npx expo prebuild

or specify platform with flags:

    npx expo prebuild --platform android
