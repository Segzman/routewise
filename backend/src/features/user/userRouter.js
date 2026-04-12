// User Router — FR3: Favourites & Profile
// Owner: Aksheen
//
// Endpoints (all scoped under /api/user):
//   GET    /api/user/favourites          list saved routes
//   POST   /api/user/favourites          save a route  { routeId }
//   DELETE /api/user/favourites/:routeId remove a saved route
//   GET    /api/user/profile             get profile info
//
// Note: no auth yet — userId is hardcoded to 1 for demo purposes.

const { Router } = require('express');
const svc = require('./userService');

const router = Router();

const DEMO_USER_ID = 1; // replace with req.user.id once auth is added

router.get('/favourites', async (req, res, next) => {
  try {
    const routes = await svc.getFavourites(DEMO_USER_ID);
    res.json({ success: true, count: routes.length, data: routes.map((r) => r.toJSON()) });
  } catch (err) { next(err); }
});

router.post('/favourites', async (req, res, next) => {
  try {
    const { routeId } = req.body;
    if (!routeId) { res.status(400).json({ success: false, error: 'routeId is required' }); return; }
    await svc.addFavourite(DEMO_USER_ID, routeId);
    res.status(201).json({ success: true, message: 'Route saved to favourites' });
  } catch (err) { next(err); }
});

router.delete('/favourites/:routeId', async (req, res, next) => {
  try {
    await svc.removeFavourite(DEMO_USER_ID, req.params.routeId);
    res.json({ success: true, message: 'Route removed from favourites' });
  } catch (err) { next(err); }
});

router.get('/profile', async (req, res, next) => {
  try {
    const profile = await svc.getProfile(DEMO_USER_ID);
    res.json({ success: true, data: profile });
  } catch (err) { next(err); }
});

module.exports = router;
