// Route Router — FR2: Route Details
// Owner: Saad
//
// Endpoints:
//   GET    /api/routes/:id    get one route
//   POST   /api/routes        create a route
//   PUT    /api/routes/:id    update a route
//   DELETE /api/routes/:id    delete a route

const { Router } = require('express');
const svc = require('./routeService');

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const route = await svc.getRouteById(req.params.id);
    res.json({ success: true, data: route.toJSON() });
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const route = await svc.createRoute(req.body);
    res.status(201).json({ success: true, data: route.toJSON() });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const route = await svc.updateRoute(req.params.id, req.body);
    res.json({ success: true, data: route.toJSON() });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await svc.deleteRoute(req.params.id);
    res.json({ success: true, message: 'Route deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
