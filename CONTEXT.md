# RouteWise — Project Context

## What This App Is

RouteWise is a React Native (Expo) mobile app for discovering and sharing hiking trails. It is a community-driven platform where outdoor enthusiasts can browse routes, read reviews, save favorites, and download maps for offline use.

## Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** `@react-navigation/native` — bottom tab navigator + stack navigator
- **Icons:** `@expo/vector-icons` (Ionicons)
- **Data:** Local dummy data in `data/dummyData.js` (no backend yet)

## Navigation Structure

```
App
└── Bottom Tab Navigator
    ├── Explore (Stack)
    │   ├── HomeScreen        — featured routes, categories, search entry
    │   ├── RouteBrowseScreen — filterable list of all routes
    │   └── RouteDetailsScreen — full route info (photos, reviews, warnings)
    ├── FavoritesScreen       — saved routes (scaffolded, not yet implemented)
    ├── DownloadsScreen       — offline map cache (scaffolded, not yet implemented)
    └── ProfileScreen         — user account (scaffolded, not yet implemented)
```

## Data Model

Each route object in `data/dummyData.js` has:

```js
{
  id, name, difficulty,   // 'Easy' | 'Moderate' | 'Hard'
  distance, estimatedTime, elevation,
  rating, reviewCount,
  surface,                // 'Gravel' | 'Paved' | 'Rocky' | 'Dirt' | 'Mixed'
  petFriendly,            // boolean
  description,
  imageUrl, photos,       // Unsplash URLs
  warnings,               // string[]
  reviews,                // [{ id, author, rating, comment, date }]
  ratingDistribution,     // [{ stars, percent }]
}
```

Filter options: `['All', 'Nearby', 'Popular', 'Easy', 'Moderate', 'Hard']`

Category pills: Easy, Moderate, Hard, Pet Friendly, Paved (each with an icon + color)

## Components

| File | Purpose |
|------|---------|
| `components/RouteCard.js` | Card UI for a single route — shown in browse/home lists |
| `components/OfflineDownloadModal.js` | Modal for caching a route map offline |
| `components/NavigationBar.js` | Horizontal scrollable category pill bar |

## Current State

- Core browsing flow is fully built: Home → Browse → Route Details
- Favorites, Downloads, and Profile tabs are scaffolded (screens exist, no logic yet)
- All data is local dummy data — no API or database connected
- No auth system yet
- No real offline/download logic yet

## Key Files

| Path | What it does |
|------|-------------|
| `App.js` | Root — wires up all navigators |
| `data/dummyData.js` | All route data, filter options, categories |
| `screens/HomeScreen.js` | Landing screen with featured routes + category nav |
| `screens/RouteBrowseScreen.js` | Filtered route list |
| `screens/RouteDetailsScreen.js` | Full route detail view |

## Repo

- GitHub: `https://github.com/Segzman/routewise`
- Default branch: `master` (merged from `main` — both branches are now unified)
- Local clone: `/Users/sekun/Downloads/routewise`
