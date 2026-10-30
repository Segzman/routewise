#!/bin/bash
# Smoke test for all three feature routers
# Owner: Saad

BASE="http://localhost:3000"

echo "=== RouteWise API Tests ==="

echo -e "\n--- Health ---"
curl -s "$BASE/health" | python3 -m json.tool

echo -e "\n--- FR1: Browse (Sekun) ---"
curl -s "$BASE/api/browse/"                        | python3 -m json.tool
curl -s "$BASE/api/browse/search?q=lake"           | python3 -m json.tool
curl -s "$BASE/api/browse/difficulty/Easy"         | python3 -m json.tool
curl -s "$BASE/api/browse/beginner-friendly"       | python3 -m json.tool
curl -s "$BASE/api/browse/dog-friendly"            | python3 -m json.tool

echo -e "\n--- FR2: Route Details (Saad) ---"
curl -s "$BASE/api/routes/1"                       | python3 -m json.tool

echo -e "\n--- FR2: Share a route (submit new) ---"
curl -s -X POST "$BASE/api/routes"                 \
     -H "Content-Type: application/json"           \
     -d '{"name":"Shared Test Ridge","difficulty":"Easy","description":"Submitted from ShareScreen smoke test","coordinates":[{"lat":47.6,"lng":-122.3},{"lat":47.61,"lng":-122.29}]}' | python3 -m json.tool

echo -e "\n--- FR2: Share validation (missing coordinates) ---"
curl -s -X POST "$BASE/api/routes"                 \
     -H "Content-Type: application/json"           \
     -d '{"name":"Bad Route","difficulty":"Easy","description":"no coordinates"}' | python3 -m json.tool

# clean up the smoke-test row (keep the DB tidy on repeat runs)
BASE_DB="${DATABASE_URL:-postgres://localhost/routewise_db}"
psql "$BASE_DB" -c "DELETE FROM routes WHERE name = 'Shared Test Ridge'" > /dev/null

echo -e "\n--- FR3: User / Favourites (Aksheen) ---"
curl -s "$BASE/api/user/profile"                   | python3 -m json.tool
curl -s "$BASE/api/user/favourites"                | python3 -m json.tool
curl -s -X POST "$BASE/api/user/favourites" \
     -H "Content-Type: application/json" \
     -d '{"routeId":1}'                            | python3 -m json.tool
curl -s "$BASE/api/user/favourites"                | python3 -m json.tool
curl -s -X DELETE "$BASE/api/user/favourites/1"   | python3 -m json.tool

echo -e "\n=== Done ==="
