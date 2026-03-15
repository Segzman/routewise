export const filterOptions = ['All', 'Nearby', 'Popular', 'Easy', 'Moderate', 'Hard'];

export const routes = [
  {
    id: 'r1',
    name: 'Rattlesnake Ridge Trail',
    difficulty: 'Moderate',
    distance: '8.2 km',
    estimatedTime: '2h 30m',
    rating: 4.5,
    reviewCount: 128,
    surface: 'Gravel',
    petFriendly: true,
    description: 'A scenic ridge trail with panoramic views of the valley. Steady elevation gain with rewarding summit views.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    elevation: '420 m',
    warnings: ['Steep sections near the summit', 'Limited water sources — bring extra'],
    photos: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400',
      'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400',
    ],
    reviews: [
      { id: 'rv1', author: 'Alex M.', rating: 5, comment: 'Stunning views at the top!', date: 'Mar 2026' },
      { id: 'rv2', author: 'Jordan T.', rating: 4, comment: 'Great trail, gets busy on weekends.', date: 'Feb 2026' },
    ],
    ratingDistribution: [
      { stars: 5, percent: 65 }, { stars: 4, percent: 20 },
      { stars: 3, percent: 10 }, { stars: 2, percent: 3 }, { stars: 1, percent: 2 },
    ],
  },
  {
    id: 'r2',
    name: 'Lakeside Loop',
    difficulty: 'Easy',
    distance: '4.1 km',
    estimatedTime: '1h 10m',
    rating: 4.7,
    reviewCount: 214,
    surface: 'Paved',
    petFriendly: true,
    description: 'A relaxing paved loop around the lake. Perfect for families and casual walkers.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    elevation: '30 m',
    warnings: ['Busy on weekday mornings', 'Watch for cyclists'],
    photos: [
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400',
    ],
    reviews: [
      { id: 'rv3', author: 'Sam K.', rating: 5, comment: 'Perfect morning walk!', date: 'Mar 2026' },
    ],
    ratingDistribution: [
      { stars: 5, percent: 75 }, { stars: 4, percent: 18 },
      { stars: 3, percent: 5 }, { stars: 2, percent: 1 }, { stars: 1, percent: 1 },
    ],
  },
  {
    id: 'r3',
    name: 'Black Peak Challenge',
    difficulty: 'Hard',
    distance: '14.6 km',
    estimatedTime: '5h 00m',
    rating: 4.2,
    reviewCount: 87,
    surface: 'Rocky',
    petFriendly: false,
    description: 'A demanding mountain trail for experienced hikers. Technical scrambling sections and exposed ridgelines.',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
    elevation: '1,100 m',
    warnings: ['Requires scrambling experience', 'Do not attempt in wet conditions'],
    photos: [
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400',
    ],
    reviews: [
      { id: 'rv4', author: 'Chris R.', rating: 4, comment: 'Epic challenge. Go prepared.', date: 'Jan 2026' },
    ],
    ratingDistribution: [
      { stars: 5, percent: 45 }, { stars: 4, percent: 35 },
      { stars: 3, percent: 12 }, { stars: 2, percent: 5 }, { stars: 1, percent: 3 },
    ],
  },
  {
    id: 'r4',
    name: 'Cedar Forest Walk',
    difficulty: 'Easy',
    distance: '3.0 km',
    estimatedTime: '50m',
    rating: 4.6,
    reviewCount: 310,
    surface: 'Dirt',
    petFriendly: true,
    description: 'A shaded walk through ancient cedar forest. Peaceful escape with rich wildlife.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    elevation: '15 m',
    warnings: ['Muddy after rain'],
    photos: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400',
    ],
    reviews: [
      { id: 'rv5', author: 'Priya L.', rating: 5, comment: 'So peaceful!', date: 'Mar 2026' },
    ],
    ratingDistribution: [
      { stars: 5, percent: 72 }, { stars: 4, percent: 20 },
      { stars: 3, percent: 6 }, { stars: 2, percent: 1 }, { stars: 1, percent: 1 },
    ],
  },
  {
    id: 'r5',
    name: 'Summit Crossing',
    difficulty: 'Moderate',
    distance: '11.3 km',
    estimatedTime: '3h 45m',
    rating: 4.3,
    reviewCount: 156,
    surface: 'Mixed',
    petFriendly: false,
    description: 'A classic mountain traverse connecting two summits with sweeping alpine views.',
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800',
    elevation: '680 m',
    warnings: ['Snow possible May–June', 'Bears active in summer — carry spray'],
    photos: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
    ],
    reviews: [
      { id: 'rv6', author: 'Dana W.', rating: 4, comment: 'Meadow section is gorgeous.', date: 'Feb 2026' },
    ],
    ratingDistribution: [
      { stars: 5, percent: 50 }, { stars: 4, percent: 30 },
      { stars: 3, percent: 12 }, { stars: 2, percent: 5 }, { stars: 1, percent: 3 },
    ],
  },
];

export const featuredRoutes = routes.filter((r) => ['r1', 'r2', 'r3'].includes(r.id));

export const categories = [
  { id: 'c1', label: 'Easy', icon: 'leaf-outline', color: '#50C878' },
  { id: 'c2', label: 'Moderate', icon: 'trending-up-outline', color: '#F39C12' },
  { id: 'c3', label: 'Hard', icon: 'flame-outline', color: '#E94B3C' },
  { id: 'c4', label: 'Pet Friendly', icon: 'paw-outline', color: '#9B59B6' },
  { id: 'c5', label: 'Paved', icon: 'navigate-outline', color: '#3498DB' },
];