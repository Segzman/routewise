# RouteWise — React Native UI Prototype

A community-based route intelligence and analytics platform. This is a UI-focused prototype with hardcoded dummy data showcasing two functional areas: **Route Exploration** and **Route Sharing**.

## Prerequisites

- Node.js 18+
- npm or yarn
- [Expo Go](https://expo.dev/client) app on your iOS/Android device, **or** an iOS/Android simulator

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the Expo dev server
npm start
# or
npx expo start
```

Then:
- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Physical device**: Scan the QR code with Expo Go

## Project Structure

```
RouteWise/
├── App.js                          # Navigation setup (Stack + Bottom Tabs)
├── screens/
│   ├── HomeScreen.js               # Landing page with two action cards
│   ├── RouteBrowseScreen.js        # Searchable/filterable route list
│   ├── RouteDetailsScreen.js       # Full route details (most important screen)
│   ├── RouteMapScreen.js           # Full-screen map with waypoints
│   ├── UploadRouteScreen.js        # Route creation form
│   ├── ShareRouteScreen.js         # Route sharing options
│   └── ProfileScreen.js            # User profile (placeholder)
├── components/
│   ├── RouteCard.js                # Reusable route list card
│   ├── OfflineDownloadModal.js     # Download confirmation dialog
│   └── NavigationBar.js           # Bottom tab bar component
└── data/
    └── dummyData.js                # All hardcoded route data (5 routes)
```

## Screens & Navigation

| Screen | Route Name | Description |
|--------|-----------|-------------|
| Home | `MainTabs > Home` | Landing with Explore + Share cards |
| Explore | `MainTabs > Explore` | Browse routes with search + filter |
| Route Details | `RouteDetails` | Full route info, stats, map, reviews |
| Route Map | `RouteMap` | Full-screen map with waypoint nav |
| Upload Route | `UploadRoute` | Create new route form |
| Share Route | `ShareRoute` | Share options + invite users |
| Profile | `MainTabs > Profile` | User profile placeholder |

## Implemented Features

### Route Exploration
- [x] Home landing with stats bar and trending routes
- [x] Route list with live search (filters by name/description)
- [x] Filter chips (All, Nearby, Popular, Easy, Moderate, Hard)
- [x] Pull-to-refresh with loading simulation
- [x] Route cards with difficulty badge, stats, tags
- [x] Route details: hero image, stats bar, collapsible map section
- [x] Photos gallery (horizontal scroll)
- [x] Expandable warnings section
- [x] Star ratings with distribution bars
- [x] Offline download modal with WiFi toggle
- [x] Add to Favorites (toggle with visual feedback)
- [x] Full-screen map with terrain/satellite toggle
- [x] Zoom controls + re-center
- [x] Waypoint markers with tap popup
- [x] Navigation progress bottom sheet

### Route Sharing
- [x] Multi-step upload form with progress indicator
- [x] Difficulty + surface type selector chips
- [x] Pet friendly toggle
- [x] Mock GPS file picker
- [x] Mock photo upload counter
- [x] Save as Draft
- [x] Visibility options (Public / Friends / Private)
- [x] Generate shareable link
- [x] Copy link + native share sheet
- [x] Add recipients with autocomplete suggestions
- [x] Personal message field

## Tech Stack

- **React Native** via Expo SDK
- **@react-navigation/native** — navigation container
- **@react-navigation/native-stack** — stack navigation
- **@react-navigation/bottom-tabs** — tab bar
- **@expo/vector-icons** (Ionicons) — icons
- **react-native-screens** + **react-native-safe-area-context** — navigation dependencies

## Color Palette

| Name | Hex |
|------|-----|
| Primary Blue | `#4A90E2` |
| Success Green | `#50C878` |
| Warning Red | `#E94B3C` |
| Caution Orange | `#F39C12` |
| Background | `#F5F5F5` |
| Text | `#333333` |
| Border | `#E0E0E0` |

## Notes

- All data is hardcoded in `data/dummyData.js` — no backend or API calls
- Map views use placeholder images (real maps would use `react-native-maps`)
- All button interactions show alerts or navigate — no data persistence
- Tested on iOS simulator with Expo Go
