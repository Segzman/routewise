// Route API service — FR2: Route Details
// Owner: Saad

const BASE = __DEV__ ? 'http://localhost:3000/api/routes' : 'https://your-api.com/api/routes';

async function _req(path, options = {}) {
  const res  = await fetch(`${BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Request failed');
  return json.data;
}

export const getRouteById = (id)       => _req(`/${id}`);
export const createRoute  = (data)     => _req('/', { method: 'POST', body: JSON.stringify(data) });
export const updateRoute  = (id, data) => _req(`/${id}`, { method: 'PUT',  body: JSON.stringify(data) });
export const deleteRoute  = (id)       => _req(`/${id}`, { method: 'DELETE' });
