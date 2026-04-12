// User Service — FR3: Favourites & Profile
// Owner: Aksheen
//
// Business logic for saving/removing favourite routes and fetching profile data.
// Uses the favourites table (migration: 002_create_user_tables.sql).

const pool = require('../../config/database');
const PostgresRouteRepository = require('../../infrastructure/repositories/postgresRouteRepository');

const repo = new PostgresRouteRepository();

// --- Favourites ---

async function getFavourites(userId) {
  const { rows } = await pool.query(
    `SELECT r.* FROM routes r
     JOIN favourites f ON f.route_id = r.id
     WHERE f.user_id = $1
     ORDER BY f.saved_at DESC`,
    [userId]
  );
  // Re-use the repo's mapper via a findAll that matches these IDs
  if (rows.length === 0) return [];
  return rows.map((row) => repo._toEntity(row));
}

async function addFavourite(userId, routeId) {
  // Confirm route exists before saving
  const { rows: routeCheck } = await pool.query('SELECT id FROM routes WHERE id = $1', [routeId]);
  if (routeCheck.length === 0) throw new Error(`Route with id ${routeId} not found`);

  await pool.query(
    `INSERT INTO favourites (user_id, route_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, route_id) DO NOTHING`,
    [userId, routeId]
  );
}

async function removeFavourite(userId, routeId) {
  await pool.query('DELETE FROM favourites WHERE user_id = $1 AND route_id = $2', [userId, routeId]);
}

// --- Profile (stub — no auth yet, returns mock data) ---

async function getProfile(userId) {
  return {
    id: userId,
    name: 'RouteWise User',
    joinedDate: '2026-01-01',
    totalRoutes: 0,
    note: 'Auth not yet implemented — profile data is mocked.',
  };
}

module.exports = { getFavourites, addFavourite, removeFavourite, getProfile };
