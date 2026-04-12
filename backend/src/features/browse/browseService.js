// Browse Service — FR1: Route Discovery
// Owner: Saad
//
// Business logic for searching and filtering routes.
// Called by browseRouter; uses the shared PostgresRouteRepository.

const PostgresRouteRepository = require('../../infrastructure/repositories/postgresRouteRepository');

const repo = new PostgresRouteRepository();

const VALID_DIFFICULTIES = ['Easy', 'Moderate', 'Hard'];

async function getAllRoutes(filters = {}) {
  return repo.findAll({
    sortBy: 'rating',
    sortOrder: 'DESC',
    ...filters,
  });
}

async function searchRoutes(term) {
  if (!term || !term.trim()) throw new Error('Search term is required');
  return repo.search(term);
}

async function getRoutesByDifficulty(difficulty) {
  if (!VALID_DIFFICULTIES.includes(difficulty))
    throw new Error(`Difficulty must be one of: ${VALID_DIFFICULTIES.join(', ')}`);
  return repo.findByDifficulty(difficulty);
}

async function getBeginnerFriendlyRoutes() {
  const routes = await repo.findAll({ difficulty: 'Easy', sortBy: 'rating', sortOrder: 'DESC' });
  return routes.filter((r) => r.isBeginnerFriendly());
}

async function getDogFriendlyRoutes() {
  const routes = await repo.findAll({ petFriendly: true, sortBy: 'rating', sortOrder: 'DESC' });
  return routes.filter((r) => r.isDogFriendly());
}

module.exports = { getAllRoutes, searchRoutes, getRoutesByDifficulty, getBeginnerFriendlyRoutes, getDogFriendlyRoutes };
