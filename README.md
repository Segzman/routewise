# RouteWise

A community-based route intelligence and analytics platform: an Expo (React Native) mobile app powered by an Express + PostgreSQL REST API. Browse routes, search by name, view them on an interactive map, and share your own.

## Prerequisites

- Node.js 18+
- npm
- PostgreSQL (local instance or connection URL)
- [Expo Go](https://expo.dev/client) on a physical device, or an iOS/Android simulator (required for the map)

## Backend Setup

```bash
cd backend
npm install

# 1. Point at your database
export DATABASE_URL=postgres://localhost/routewise_db

# 2. Create schema + add coordinates (idempotent migrations)
npm run db:migrate

# 3. (Optional on a fresh DB) seed sample routes
npm run db:seed

# 4. Start the API
npm start          # http://localhost:3000
```

## App Setup

```bash
npm install
npm start          # Expo dev server
```

- **iOS Simulator**: press `i`
- **Android Emulator**: press `a`
- **Physical device**: scan the QR code with Expo Go

In development the app talks to `http://localhost:3000/api` (see `services/*.js`); run the backend before using the app.

## Project Structure

```
RouteWise/
├── App.js                              # Navigation (Stack + Bottom Tabs)
├── screens/
│   ├── HomeScreen.js                   # Landing: Explore + Share entry cards
│   ├── RouteBrowseScreen.js            # Searchable/filterable route list (API-backed)
│   ├── RouteDetailsScreen.js           # Full route info + map + share sheet
│   ├── ShareScreen.js                  # Submit a new route (POST /api/routes)
│   ├── FavoritesScreen.js              # Saved routes (API-backed favourites)
│   ├── DownloadsScreen.js              # Offline map cache (scaffolded)
│   └── ProfileScreen.js                # User profile (API-backed)
├── components/
│   ├── RouteCard.js                    # Reusable route list card
│   ├── RouteMap.js / RouteMap.web.js   # Interactive polyline map (native) / web fallback
│   ├── NavigationBar.js                # Category pill bar
│   └── OfflineDownloadModal.js         # Download confirmation dialog
├── services/                           # API clients (browseApi, routeApi, userApi)
└── backend/                            # Express + PostgreSQL (layered architecture)
    ├── src/index.js                    # Entry: mounts feature routers at /api/*
    ├── src/config/database.js          # pg pool (DATABASE_URL)
    ├── src/domain/                     # Route entity + repository interface
    ├── src/features/                   # browse / routes / user routers + services
    ├── src/infrastructure/             # postgresRouteRepository, migrations, seeds
    ├── src/middleware/                 # logger, errorHandler
    └── test-api.sh                     # curl smoke test (needs a running API + DATABASE_URL)
```

## Screens & Navigation

| Screen | Route Name | Description |
|--------|-----------|-------------|
| Home | `MainTabs > Explore > Home` | Landing with Explore + Share cards |
| Browse | `MainTabs > Explore > Browse` | Live search + difficulty filters |
| Route Details | `RouteDetails` | Stats, description, interactive map, favourites, share |
| Share Route | `RouteDetails > ShareRoute` | Name, difficulty, description, start/end coordinates → POST |
| Favorites | `MainTabs > Favorites` | Saved routes |
| Profile | `MainTabs > Profile` | User account |

## Backend API

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Liveness |
| GET | `/api/browse/` | All routes (filters: `difficulty`, `surface`, `petFriendly`, `minRating`, `sortBy`, `sortOrder`) |
| GET | `/api/browse/search?q=` | Search by name/description |
| GET | `/api/browse/difficulty/:level` | Filter by difficulty |
| GET | `/api/browse/beginner-friendly`, `/api/browse/dog-friendly` | Curated lists |
| GET | `/api/routes/:id` | One route (includes `coordinates`) |
| POST | `/api/routes` | Submit a route — requires `name`, `difficulty`, `description`, `coordinates:[{lat,lng}≥2]`; unmeasured fields default (distance `0`, surface `Mixed`, time `Not specified`) |
| PUT/DELETE | `/api/routes/:id` | Update / delete |
| GET/POST/DELETE | `/api/user/favourites`, `/api/user/profile` | Favourites + profile |

Routes are validated in the domain layer; invalid payloads return `400 { "success": false, error }`.

## Implemented Features

### Route Exploration (browse + search + map)
- [x] Home landing with trending routes and entry cards
- [x] Route list backed by the API with live search (name/description)
- [x] Filter chips: All, Easy, Moderate, Hard, Beginner Friendly, Dog Friendly
- [x] Route details: hero image, stats, difficulty badge
- [x] Add to Favourites (persists via the user API)
- [x] **Interactive map** on route details: `react-native-maps` polyline of the route's `coordinates` with start (green) / end (red) markers, pinch/zoom, auto-fit. Coordinates live in a `JSONB` column (migration `003_add_route_coordinates.sql`) and ship with seed data. Web exports show a fallback view (react-native-maps has no web support).

### Route Sharing
- [x] Share a Route form: name, difficulty, description, start + end coordinates, with front-end and backend validation
- [x] Submits to `POST /api/routes` and jumps to the new route's detail page
- [x] Native share sheet on route details (`Share.share`) with a route link (placeholder `routewise.app` URL until a real deployment exists)

### Not Yet Implemented
- [ ] Offline downloads (Downloads tab is scaffolded)
- [ ] Route photos/GPS file uploads on share
- [ ] Auth

## Tech Stack

- **Front end:** React Native via Expo SDK 55, `@react-navigation/native` (stack + bottom tabs), `@expo/vector-icons`, `react-native-maps`
- **Back end:** Express, `pg`, `cors`, `dotenv` — layered (router → service → repository → PostgreSQL)

## Color Palette

| Name | Hex |
|------|-----|
| Primary Blue | `#4A90E2` |
| Success Green | `#50C878` |
| Warning Red | `#E94B3C` |
| Background | `#F5F5F5` |
| Text | `#333333` |
| Border | `#E0E0E0` |

## Notes

- Map views require a real device or simulator — the iOS Simulator is supported by `react-native-maps` via `npx expo run:ios` or a development build; Expo Go also includes it.
- Shared routes are snapshots: coordinate paths are the entered start/end points; full GPS track import is future work.
- The share sheet's public link (`https://routewise.app/routes/:id`) is a placeholder until the app has a deployed URL/deep-link scheme.
