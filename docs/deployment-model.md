# RouteWise Deployment Model — Visual Paradigm Guide
<!-- Owner: Aksheen -->

## Nodes

| Node | Type | Stereotype | Contains |
|------|------|------------|---------|
| User's Mobile Device | Device | `<<mobile device>>` | RouteWise Mobile App |
| Application Server | Node | `<<server>>` | Backend API (Node.js) |
| Database Server | Node | `<<database server>>` | PostgreSQL Database |

## Communication Paths

| From | To | Protocol | Port | Stereotype |
|------|----|----------|------|------------|
| Mobile App | Backend API | HTTP/HTTPS | 3000 | `<<REST>>` |
| Backend API | PostgreSQL | PG Wire Protocol | 5432 | `<<JDBC>>` |

## Layout

```
┌──────────────────────┐
│  User's Mobile Device│
│  ┌────────────────┐  │
│  │ RouteWise App  │  │
│  │ (React Native) │  │
│  └────────────────┘  │
└──────────┬───────────┘
           │ HTTP/HTTPS (port 3000)  <<REST>>
┌──────────▼───────────┐
│  Application Server  │
│  ┌────────────────┐  │
│  │  Backend API   │  │
│  │  (Node.js)     │  │
│  └────────────────┘  │
└──────────┬───────────┘
           │ PG Wire Protocol (port 5432)  <<JDBC>>
┌──────────▼───────────┐
│  Database Server     │
│  ┌────────────────┐  │
│  │  PostgreSQL DB │  │
│  └────────────────┘  │
└──────────────────────┘
```

## Creating in Visual Paradigm

1. Diagrams → New → **Deployment Diagram** → name it "RouteWise Deployment Model"
2. Add **Device** node → label "User's Mobile Device" → stereotype `mobile device`
3. Add **Node** → label "Application Server" → stereotype `server`
4. Add **Node** → label "Database Server" → stereotype `database server`
5. Drag **Artifact** inside each node (Mobile App / Backend API / PostgreSQL Database)
6. Draw **Association** lines between nodes:
   - Mobile ↔ App Server → stereotype `REST`, label `HTTP/HTTPS (port 3000)`
   - App Server ↔ DB Server → stereotype `JDBC`, label `PG Wire Protocol (port 5432)`
7. Right-click diagram → Specification → paste the description below

### Diagram Description (paste into VP)

```
RouteWise Deployment Model — Elaboration Release

Mobile App (React Native/Expo) runs on the user's device and communicates
with the Backend API over HTTP/HTTPS REST calls on port 3000.

The Backend API (Node.js/Express) implements a layered architecture:
  Application Logic Layer — controllers, services
  Domain Layer           — Route entity, RouteRepository interface
  Infrastructure Layer   — PostgresRouteRepository, pg pool

The Backend API talks to PostgreSQL (port 5432) via the node-pg driver.
All route data is stored in the `routes` table.
```

## Grading Checklist

- [ ] All three nodes shown with correct stereotypes
- [ ] Artifacts placed inside the correct nodes
- [ ] Both communication paths with protocol labels
- [ ] Diagram description filled in
- [ ] Exported from VP and included in submission
