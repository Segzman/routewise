// RouteWise - Dummy Data for UI Prototype
// All data is hardcoded for demonstration purposes

export const routes = [
  {
    id: '1',
    name: 'Lakeshore Trail',
    description:
      'A scenic waterfront trail along the lakeshore with paved paths. Perfect for families and casual walkers. Enjoy stunning views of the water and surrounding parkland throughout the journey.',
    distance: '5.2 km',
    elevationGain: '120m',
    estimatedTime: '1.5h',
    difficulty: 'Easy',
    rating: 4.5,
    reviewCount: 324,
    surface: 'Paved',
    petFriendly: true,
    imageUrl: 'https://via.placeholder.com/400x250/4A90E2/ffffff?text=Lakeshore+Trail',
    photos: [
      'https://via.placeholder.com/150x150/4A90E2/ffffff?text=Photo+1',
      'https://via.placeholder.com/150x150/7B68EE/ffffff?text=Photo+2',
      'https://via.placeholder.com/150x150/50C878/ffffff?text=Photo+3',
      'https://via.placeholder.com/150x150/F39C12/ffffff?text=Photo+4',
    ],
    warnings: [
      { id: '1', text: 'Muddy sections after rain', date: '2026-03-10' },
      { id: '2', text: 'Busy on weekends', date: '2026-03-08' },
    ],
    waypoints: [
      { id: '1', name: 'Trailhead', lat: 43.6532, lng: -79.3832 },
      { id: '2', name: 'Viewpoint', lat: 43.6542, lng: -79.3842 },
      { id: '3', name: 'Rest Area', lat: 43.6552, lng: -79.3852 },
      { id: '4', name: 'End Point', lat: 43.6562, lng: -79.3862 },
    ],
    ratingDistribution: { 5: 68, 4: 25, 3: 5, 2: 1, 1: 1 },
    downloadSize: '~45 MB',
  },
  {
    id: '2',
    name: 'Mountain Peak Loop',
    description:
      'Challenging climb with rewarding panoramic views at the summit. Steep sections require good fitness. The summit offers breathtaking 360-degree views on clear days.',
    distance: '8.1 km',
    elevationGain: '450m',
    estimatedTime: '3h',
    difficulty: 'Hard',
    rating: 4.8,
    reviewCount: 156,
    surface: 'Rocky Trail',
    petFriendly: false,
    imageUrl: 'https://via.placeholder.com/400x250/E94B3C/ffffff?text=Mountain+Peak',
    photos: [
      'https://via.placeholder.com/150x150/E94B3C/ffffff?text=Summit',
      'https://via.placeholder.com/150x150/F39C12/ffffff?text=Trail',
      'https://via.placeholder.com/150x150/9B59B6/ffffff?text=Views',
    ],
    warnings: [
      { id: '1', text: 'Steep sections - use caution', date: '2026-03-12' },
      { id: '2', text: 'No water sources on trail', date: '2026-03-11' },
    ],
    waypoints: [
      { id: '1', name: 'Parking', lat: 43.7000, lng: -79.4000 },
      { id: '2', name: 'Ridge Start', lat: 43.7025, lng: -79.4025 },
      { id: '3', name: 'Summit', lat: 43.7050, lng: -79.4050 },
    ],
    ratingDistribution: { 5: 85, 4: 12, 3: 2, 2: 1, 1: 0 },
    downloadSize: '~62 MB',
  },
  {
    id: '3',
    name: 'Forest Valley Trail',
    description:
      'Peaceful woodland path through dense forest. Great for nature lovers and birdwatching. The trail meanders through old-growth trees with excellent canopy cover.',
    distance: '3.5 km',
    elevationGain: '50m',
    estimatedTime: '1h',
    difficulty: 'Moderate',
    rating: 4.2,
    reviewCount: 89,
    surface: 'Dirt Path',
    petFriendly: true,
    imageUrl: 'https://via.placeholder.com/400x250/50C878/ffffff?text=Forest+Trail',
    photos: [
      'https://via.placeholder.com/150x150/50C878/ffffff?text=Woods',
      'https://via.placeholder.com/150x150/27AE60/ffffff?text=Creek',
      'https://via.placeholder.com/150x150/1ABC9C/ffffff?text=Bridge',
    ],
    warnings: [],
    waypoints: [
      { id: '1', name: 'Entrance', lat: 43.6000, lng: -79.5000 },
      { id: '2', name: 'Creek Crossing', lat: 43.6020, lng: -79.5020 },
      { id: '3', name: 'Clearing', lat: 43.6040, lng: -79.5040 },
    ],
    ratingDistribution: { 5: 45, 4: 40, 3: 10, 2: 3, 1: 2 },
    downloadSize: '~28 MB',
  },
  {
    id: '4',
    name: 'Riverside Walk',
    description:
      'A flat, easy walk along the river banks. Ideal for beginners and families with young children. Multiple benches and picnic areas along the way.',
    distance: '2.8 km',
    elevationGain: '15m',
    estimatedTime: '45m',
    difficulty: 'Easy',
    rating: 4.0,
    reviewCount: 212,
    surface: 'Gravel Path',
    petFriendly: true,
    imageUrl: 'https://via.placeholder.com/400x250/3498DB/ffffff?text=Riverside+Walk',
    photos: [
      'https://via.placeholder.com/150x150/3498DB/ffffff?text=River',
      'https://via.placeholder.com/150x150/5DADE2/ffffff?text=Bridge',
    ],
    warnings: [
      { id: '1', text: 'Flooding possible during spring', date: '2026-03-05' },
    ],
    waypoints: [
      { id: '1', name: 'Start', lat: 43.6500, lng: -79.3700 },
      { id: '2', name: 'Picnic Area', lat: 43.6510, lng: -79.3720 },
      { id: '3', name: 'End', lat: 43.6520, lng: -79.3740 },
    ],
    ratingDistribution: { 5: 40, 4: 45, 3: 10, 2: 3, 1: 2 },
    downloadSize: '~22 MB',
  },
  {
    id: '5',
    name: 'Sunset Bluff Trail',
    description:
      'A moderate trail leading to a spectacular bluff with panoramic sunset views. The final 500m is steep but the views are absolutely worth it.',
    distance: '6.4 km',
    elevationGain: '280m',
    estimatedTime: '2h',
    difficulty: 'Moderate',
    rating: 4.6,
    reviewCount: 178,
    surface: 'Mixed (Paved + Dirt)',
    petFriendly: true,
    imageUrl: 'https://via.placeholder.com/400x250/F39C12/ffffff?text=Sunset+Bluff',
    photos: [
      'https://via.placeholder.com/150x150/F39C12/ffffff?text=Bluff',
      'https://via.placeholder.com/150x150/E67E22/ffffff?text=Sunset',
      'https://via.placeholder.com/150x150/D35400/ffffff?text=View',
    ],
    warnings: [
      { id: '1', text: 'Slippery when wet', date: '2026-03-09' },
    ],
    waypoints: [
      { id: '1', name: 'Trailhead', lat: 43.6800, lng: -79.4200 },
      { id: '2', name: 'Lookout Point', lat: 43.6820, lng: -79.4220 },
      { id: '3', name: 'Summit Bluff', lat: 43.6840, lng: -79.4240 },
    ],
    ratingDistribution: { 5: 70, 4: 22, 3: 5, 2: 2, 1: 1 },
    downloadSize: '~38 MB',
  },
];

// Sample reviews data
export const reviews = [
  {
    id: '1',
    routeId: '1',
    userName: 'Alex M.',
    rating: 5,
    comment: 'Beautiful trail! The waterfront views are stunning. Great for a morning jog.',
    date: '2026-03-10',
    avatar: 'https://via.placeholder.com/40x40/4A90E2/ffffff?text=A',
  },
  {
    id: '2',
    routeId: '1',
    userName: 'Sarah K.',
    rating: 4,
    comment: 'Nice easy walk. Can get crowded on weekends but still enjoyable.',
    date: '2026-03-08',
    avatar: 'https://via.placeholder.com/40x40/E94B3C/ffffff?text=S',
  },
  {
    id: '3',
    routeId: '2',
    userName: 'Mike R.',
    rating: 5,
    comment: 'Absolutely worth the effort. The summit views are incredible!',
    date: '2026-03-12',
    avatar: 'https://via.placeholder.com/40x40/50C878/ffffff?text=M',
  },
];

// Filter options for browse screen
export const filterOptions = ['All', 'Nearby', 'Popular', 'Easy', 'Moderate', 'Hard'];
