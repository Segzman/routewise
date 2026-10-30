-- Add map coordinates (array of {lat, lng} waypoints) to routes
-- Owner: Sekun

ALTER TABLE routes
    ADD COLUMN IF NOT EXISTS coordinates JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Seed coordinates for existing routes (start -> end waypoint path)
UPDATE routes SET coordinates = '[{"lat":47.4431,"lng":-121.7925},{"lat":47.4342,"lng":-121.7776},{"lat":47.4278,"lng":-121.7669}]'::jsonb WHERE name = 'Rattlesnake Ridge Trail';
UPDATE routes SET coordinates = '[{"lat":47.5301,"lng":-122.0335},{"lat":47.5330,"lng":-122.0300},{"lat":47.5355,"lng":-122.0265},{"lat":47.5308,"lng":-122.0240},{"lat":47.5301,"lng":-122.0335}]'::jsonb WHERE name = 'Lakeside Loop';
UPDATE routes SET coordinates = '[{"lat":48.5682,"lng":-120.9103},{"lat":48.5715,"lng":-120.8995},{"lat":48.5749,"lng":-120.8871},{"lat":48.5772,"lng":-120.8764}]'::jsonb WHERE name = 'Black Peak Challenge';
UPDATE routes SET coordinates = '[{"lat":47.4305,"lng":-121.8420},{"lat":47.4320,"lng":-121.8355},{"lat":47.4338,"lng":-121.8280},{"lat":47.4346,"lng":-121.8203}]'::jsonb WHERE name = 'Cedar Forest Walk';
UPDATE routes SET coordinates = '[{"lat":47.7458,"lng":-121.1263},{"lat":47.7520,"lng":-121.1140},{"lat":47.7581,"lng":-121.1018},{"lat":47.7640,"lng":-121.0898}]'::jsonb WHERE name = 'Summit Crossing';
UPDATE routes SET coordinates = '[{"lat":47.4845,"lng":-121.7830},{"lat":47.4820,"lng":-121.7760},{"lat":47.4798,"lng":-121.7690},{"lat":47.4775,"lng":-121.7622}]'::jsonb WHERE name = 'River Valley Path';
