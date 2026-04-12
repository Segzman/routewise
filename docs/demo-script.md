# RouteWise Demo Script (3–5 min)
<!-- Owner: Aksheen -->

## 1. Intro (30 s)
> "Hi, I'm [name]. This is RouteWise — a community hiking trail app.
> For the Elaboration Release we wired up a real backend and PostgreSQL database
> using a layered architecture with Domain-Driven Design."

## 2. Architecture Diagram (30 s)
*[Show VP diagram]*
> "Four layers:
> - UI (React Native)
> - Application Logic (controllers + services)
> - Domain (Route entity + repository interface)
> - Infrastructure (PostgreSQL implementation)
> 
> This separates concerns so each layer is independently testable."

## 3. Deployment Diagram (30 s)
*[Show VP deployment diagram]*
> "Three nodes — mobile device, app server, database server.
> Mobile calls the API over REST; API talks to Postgres over port 5432."

## 4. Backend Live Demo (60 s)
*[Terminal]*

```bash
# Start docker DB + backend
cd deployment && docker-compose up -d
cd ../backend && npm run dev

# Smoke test
curl http://localhost:3000/health
curl http://localhost:3000/api/routes
curl "http://localhost:3000/api/routes/search?q=lake"
```

> "Data is coming from PostgreSQL — not hardcoded. Let me show a filter:"

```bash
curl http://localhost:3000/api/routes/beginner-friendly
```

## 5. Mobile App Demo (90 s)
*[Expo app on simulator or phone]*

- Open app → Home screen
- Tap **Browse** → tap **Easy** filter chip
  > "This calls `GET /api/routes/difficulty/Easy` — backend queries the DB."
- Tap a route → Details screen
  > "This calls `GET /api/routes/:id` — all four layers fire in sequence."
- Tap **Beginner Friendly**
  > "Business logic in the service filters by `isBeginnerFriendly()` — 
  >  that's our domain entity method, not a raw SQL flag."

## 6. Code Walkthrough (30 s)
*[VS Code — backend/src/]*

```
controllers/routeController.js   ← handles HTTP, calls service
services/routeService.js         ← business rules, calls repo
domain/entities/Route.js         ← entity + validation + business methods
infrastructure/repositories/     ← SQL lives here only
```

> "Notice: SQL never leaks above the infrastructure layer."

## 7. Wrap-up (20 s)
> "This demonstrates our architecturally significant story — route search
> with real DB integration — touching all four layers end-to-end.
> The system is ready for the next sprint: GPS upload, user auth, reviews."
