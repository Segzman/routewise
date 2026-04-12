-- Seed data for routes table
-- Owner: Sekun

INSERT INTO routes (name, difficulty, distance, estimated_time, elevation, rating, review_count, surface, pet_friendly, description, image_url) VALUES
('Rattlesnake Ridge Trail', 'Moderate', 8.2,  '2h 30m', 420,  4.5, 128, 'Gravel', true,  'A scenic ridge trail with panoramic views of the valley. Steady elevation gain with rewarding summit views.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'),
('Lakeside Loop',           'Easy',     4.1,  '1h 10m', 30,   4.7, 214, 'Paved',  true,  'A relaxing paved loop around the lake. Perfect for families and casual walkers.',                              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'),
('Black Peak Challenge',    'Hard',     14.6, '5h 00m', 1100, 4.2, 87,  'Rocky',  false, 'A demanding mountain trail for experienced hikers. Technical scrambling sections and exposed ridgelines.',     'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800'),
('Cedar Forest Walk',       'Easy',     3.0,  '50m',    15,   4.6, 310, 'Dirt',   true,  'A shaded walk through ancient cedar forest. Peaceful escape with rich wildlife.',                             'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800'),
('Summit Crossing',         'Moderate', 11.3, '3h 45m', 680,  4.3, 156, 'Mixed',  false, 'A classic mountain traverse connecting two summits with sweeping alpine views.',                               'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800'),
('River Valley Path',       'Easy',     4.1,  '1h 45m', 80,   4.6, 203, 'Gravel', true,  'Easy riverside walk with gentle slopes. Several rest areas and informational signs about local ecology.',     'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800');
