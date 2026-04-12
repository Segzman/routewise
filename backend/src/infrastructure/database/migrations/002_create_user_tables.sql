-- User tables migration — FR3: Favourites & Profile
-- Owner: Aksheen

CREATE TABLE IF NOT EXISTS users (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL DEFAULT 'RouteWise User',
    email      VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed a demo user so favourites work before auth is implemented
INSERT INTO users (id, name, email)
VALUES (1, 'Demo User', 'demo@routewise.app')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS favourites (
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    route_id   INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    saved_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, route_id)
);

CREATE INDEX IF NOT EXISTS idx_favourites_user ON favourites(user_id);
