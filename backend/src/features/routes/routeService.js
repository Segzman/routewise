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
  if (!Array.isArray(data.coordinates) || data.coordinates.length < 2)
    throw new Error('Route coordinates are required (start and end point)');
  return repo.create({
    ...data,
    distance:      data.distance      ?? 0,  // unmeasured until reassessed
    estimatedTime: data.estimatedTime || 'Not specified',
    elevation:     data.elevation     ?? 0,
    surface:       data.surface       || 'Mixed',
    petFriendly:   data.petFriendly   ?? false,
  });
}

async function updateRoute(id, data) {
  const route = await getRouteById(id); // throws 404 if missing
  return repo.update(id, { ...data, coordinates: data.coordinates ?? route.coordinates });
}

async function deleteRoute(id) {
  await getRouteById(id);
  return repo.delete(id);
}

module.exports = { getRouteById, createRoute, updateRoute, deleteRoute };
