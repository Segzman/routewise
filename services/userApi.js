// User API service — FR3: Favourites & Profile
// Owner: Aksheen

const BASE = __DEV__ ? 'http://localhost:3000/api/user' : 'https://your-api.com/api/user';

async function _req(path, options = {}) {
  const res  = await fetch(`${BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Request failed');
  return json.data ?? json;
}

export const getFavourites       = ()         => _req('/favourites');
export const addFavourite        = (routeId)  => _req('/favourites', { method: 'POST',   body: JSON.stringify({ routeId }) });
export const removeFavourite     = (routeId)  => _req(`/favourites/${routeId}`, { method: 'DELETE' });
export const getProfile          = ()         => _req('/profile');
