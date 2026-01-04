# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Stretchout is a React Native stretching app built with Expo SDK 52. It runs completely offline using SQLite for data persistence and is compatible with Expo Go during development (no development build required).

## Development Commands

### Starting Development
```bash
npm install          # Install dependencies
npm start            # Start Expo dev server
npm run android      # Run on Android device/emulator
npm run ios          # Run on iOS device/simulator
npm run web          # Run web version
```

### Code Quality
```bash
npm run format       # Format and lint all JS/TS/TSX/JSON files
```

### Building

**Using EAS (Expo Application Services):**
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform [android | ios | all]
eas build --platform android --local  # Local build
```

**Generate native folders:**
```bash
npx expo prebuild                      # Both platforms
npx expo prebuild --platform android   # Android only
```

## Architecture

### Tech Stack
- **Framework:** Expo Router (file-based routing)
- **UI Library:** Tamagui v1.125.22 (React Native UI kit with web support)
- **Database:** expo-sqlite (SQLite3)
- **Navigation:** expo-router v4.0.17 (React Navigation wrapper)
- **Notifications:** expo-notifications
- **New Architecture:** Enabled (`"newArchEnabled": true`)

### Project Structure

```
app/                        # Expo Router file-based routing
  (tabs)/                   # Tab navigator group
    index.tsx               # Home screen (exercises & programs)
    two.tsx                 # Stats screen
    _layout.tsx             # Tab navigator configuration
  exercises/                # Exercise-related screens
    [id].tsx                # Individual exercise detail (dynamic route)
    exercise.tsx            # Exercise player screen
  programs/
    [id].tsx                # Program detail (dynamic route)
  _layout.tsx               # Root layout (Tamagui provider, fonts)
  modal.tsx                 # Modal screen
components/                 # Reusable React components
  ExerciseCard.tsx          # Exercise list item
  ExercisePlayer.tsx        # Exercise playback with timer controls
  ProgramCard.tsx           # Program list item
  CountdownTimer.tsx        # Timer component
  SetupNotification.tsx     # Notification permission setup
utils/                      # Utility functions and services
  db.ts                     # SQLite database operations
  supabase.ts               # Supabase client (not actively used)
  notificationPermission.ts # Notification permissions
  utils.ts                  # General utilities
assets/                     # Images, fonts, database
  collection.db             # SQLite database with exercises/programs
types.ts                    # TypeScript type definitions
tamagui.config.ts           # Tamagui configuration and styled components
```

### Key Architectural Patterns

**Database Initialization:**
- On first launch, `openDatabaseFirst()` copies `assets/collection.db` to `FileSystem.documentDirectory/SQLite/`
- Subsequent opens use `openDatabase()` which accesses the copied database
- Database schema includes `exercises`, `programs`, and `programs_exercises` (junction table)

**Routing:**
- Expo Router uses file-system based routing
- Dynamic routes use `[id].tsx` pattern
- Tab navigation defined in `app/(tabs)/_layout.tsx`
- Modal presentations supported via `Stack.Screen` presentation prop

**State Management:**
- Local React state with `useState` and `useEffect`
- No global state management library (Redux, Zustand, etc.)
- Database queries fetch fresh data on component mount

**UI Patterns:**
- Tamagui provides styled components and theming
- Custom styled components exported from `tamagui.config.ts`: `Container`, `Main`, `Title`, `Subtitle`
- Theme uses custom color scheme: `rgba(196, 176, 113, 0.55)` for primary color
- Animations configured: `bouncy`, `lazy`, `quick` (React Native spring animations)

**Path Aliases:**
- `~/*` maps to root directory (configured in `tsconfig.json`)
- Import examples: `~/components/ExerciseCard`, `~/utils/db`, `~/types`

## Important Configuration Details

**Android SDK Versions:**
- compileSdkVersion: 34
- targetSdkVersion: 34
- buildToolsVersion: 34.0.0

**iOS Deployment Target:** 15.1

**Expo Features:**
- Typed routes enabled (`experiments.typedRoutes`)
- TSConfig paths enabled (`experiments.tsconfigPaths`)
- Locked to portrait orientation

**Babel Configuration:**
- Uses `@tamagui/babel-plugin` for Tamagui component optimization
- Points to `./tamagui.config.ts`

**Package Resolutions:**
- `expo-modules-core` locked to `~1.11.0` due to build issues (see git history)
- `react-native-safe-area-context` excluded from expo install

## Database Schema

**Tables:**
- `exercises`: id, name, description, duration, img, sidechange (0|1)
- `programs`: id, name, description, img
- `programs_exercises`: program_id, exercise_id (junction table)

**Common Queries:**
- `getOneExercise(id)`: Fetch single exercise
- `getMultipleExercises(ids[])`: Fetch multiple exercises by ID array
- `getAllPrograms()`: Fetch all programs with calculated total duration
- `getOneProgramInfo(id)`: Fetch program metadata
- `getOneProgramExercises(id)`: Fetch all exercises in a program (via JOIN)
- `getOneProgram(id)`: Fetch program with calculated duration

**Warning:** Database queries use string interpolation (SQL injection risk). Consider using parameterized queries for production.

## Common Gotchas

1. **First Launch Database Setup:** Always call `openDatabaseFirst()` before any database operations on initial app launch
2. **Tamagui Babel Plugin:** Required for proper tree-shaking and performance. Already configured in `babel.config.js`
3. **Android Folder:** Generated by `expo prebuild`, not committed to git (see `.gitignore`)
4. **Expo Go Compatibility:** App is designed to run in Expo Go without development builds
5. **New Architecture:** React Native's new architecture is enabled, be mindful of compatibility when adding native modules
