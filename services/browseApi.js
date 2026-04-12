// Browse API service — FR1: Route Discovery
// Owner: Saad

const BASE = __DEV__ ? 'http://localhost:3000/api/browse' : 'https://your-api.com/api/browse';

async function _get(path) {
  const res  = await fetch(`${BASE}${path}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Request failed');
  return json.data;
}

export function getAllRoutes(filters = {}) {
  const q = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined))
  ).toString();
  return _get(q ? `/?${q}` : '/');
}

export function searchRoutes(term) {
  return _get(`/search?q=${encodeURIComponent(term)}`);
}

export function getRoutesByDifficulty(difficulty) {
  return _get(`/difficulty/${encodeURIComponent(difficulty)}`);
}

export function getBeginnerFriendlyRoutes() { return _get('/beginner-friendly'); }
export function getDogFriendlyRoutes()       { return _get('/dog-friendly'); }
