// Route Service — FR2: Route Details
// Owner: Saad
//
// Business logic for individual route CRUD.
// Called by routeRouter; uses the shared PostgresRouteRepository.

const PostgresRouteRepository = require('../../infrastructure/repositories/postgresRouteRepository');

const repo = new PostgresRouteRepository();

async function getRouteById(id) {
  const route = await repo.findById(id);
  if (!route) throw new Error(`Route with id ${id} not found`);
  return route;
}

async function createRoute(data) {
  return repo.create(data);
}

async function updateRoute(id, data) {
  await getRouteById(id); // throws 404 if missing
  return repo.update(id, data);
}

async function deleteRoute(id) {
  await getRouteById(id);
  return repo.delete(id);
}

module.exports = { getRouteById, createRoute, updateRoute, deleteRoute };
