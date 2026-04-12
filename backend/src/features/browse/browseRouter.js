// Browse Router — FR1: Route Discovery
// Owner: Saad
//
// Endpoints:
//   GET /api/browse              list all routes (supports ?difficulty, ?surface, ?petFriendly, ?minRating)
//   GET /api/browse/search       search by name/description (?q=)
//   GET /api/browse/difficulty/:difficulty
//   GET /api/browse/beginner-friendly
//   GET /api/browse/dog-friendly

const { Router } = require('express');
const svc = require('./browseService');

const router = Router();

function send(res, next, fn) {
  fn.then((data) => res.json({ success: true, count: Array.isArray(data) ? data.length : undefined, data: Array.isArray(data) ? data.map((r) => r.toJSON()) : data }))
    .catch(next);
}

// List / filter
router.get('/', (req, res, next) => {
  const { difficulty, surface, minRating, sortBy, sortOrder } = req.query;
  const petFriendly = req.query.petFriendly !== undefined ? req.query.petFriendly === 'true' : undefined;
  const filters = Object.fromEntries(
    Object.entries({ difficulty, surface, petFriendly, sortBy, sortOrder,
      minRating: minRating !== undefined ? parseFloat(minRating) : undefined })
      .filter(([, v]) => v !== undefined)
  );
  send(res, next, svc.getAllRoutes(filters));
});

// Search — must be before /:param routes
router.get('/search', (req, res, next) => send(res, next, svc.searchRoutes(req.query.q)));
router.get('/beginner-friendly', (req, res, next) => send(res, next, svc.getBeginnerFriendlyRoutes()));
router.get('/dog-friendly',      (req, res, next) => send(res, next, svc.getDogFriendlyRoutes()));
router.get('/difficulty/:difficulty', (req, res, next) => send(res, next, svc.getRoutesByDifficulty(req.params.difficulty)));

module.exports = router;
