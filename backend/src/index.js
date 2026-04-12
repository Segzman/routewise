// Backend entry point — mounts all feature routers
// Owner: Sekun

require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const errorHandler = require('./middleware/errorHandler');
const logger       = require('./middleware/logger');

// Feature routers — each owned by a different team member
const browseRouter = require('./features/browse/browseRouter'); // Sekun  — FR1: Route Discovery
const routeRouter  = require('./features/routes/routeRouter');  // Saad   — FR2: Route Details
const userRouter   = require('./features/user/userRouter');     // Aksheen — FR3: Favourites & Profile

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

// Mount feature routers at their own paths — zero overlap
app.use('/api/browse', browseRouter);
app.use('/api/routes', routeRouter);
app.use('/api/user',   userRouter);

app.get('/health', (req, res) => res.json({ status: 'OK', message: 'RouteWise API running' }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`RouteWise API running on port ${PORT}`);
  console.log(`  Browse:  http://localhost:${PORT}/api/browse`);
  console.log(`  Routes:  http://localhost:${PORT}/api/routes`);
  console.log(`  User:    http://localhost:${PORT}/api/user`);
});
