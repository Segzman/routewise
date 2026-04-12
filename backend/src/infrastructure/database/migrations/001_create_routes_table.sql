-- RouteWise database schema
-- Owner: Sekun

CREATE TABLE IF NOT EXISTS routes (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    difficulty   VARCHAR(50)  NOT NULL CHECK (difficulty IN ('Easy', 'Moderate', 'Hard')),
    distance     DECIMAL(5,2) NOT NULL,
    estimated_time VARCHAR(50) NOT NULL,
    elevation    INTEGER      NOT NULL,
    rating       DECIMAL(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER      DEFAULT 0,
    surface      VARCHAR(50)  NOT NULL CHECK (surface IN ('Gravel', 'Paved', 'Rocky', 'Dirt', 'Mixed')),
    pet_friendly BOOLEAN      DEFAULT false,
    description  TEXT         NOT NULL,
    image_url    VARCHAR(500),
    created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_routes_difficulty ON routes(difficulty);
CREATE INDEX IF NOT EXISTS idx_routes_rating     ON routes(rating);
CREATE INDEX IF NOT EXISTS idx_routes_surface    ON routes(surface);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = CURRENT_TIMESTAMP; RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS routes_updated_at ON routes;
CREATE TRIGGER routes_updated_at
    BEFORE UPDATE ON routes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
