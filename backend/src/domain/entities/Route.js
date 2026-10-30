// Route domain entity with validation and business logic
// Owner: Sekun

const VALID_DIFFICULTIES = ['Easy', 'Moderate', 'Hard'];
const VALID_SURFACES = ['Gravel', 'Paved', 'Rocky', 'Dirt', 'Mixed'];

class Route {
  constructor({ id, name, difficulty, distance, estimatedTime, elevation,
    rating, reviewCount, surface, petFriendly, description, imageUrl,
    coordinates, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.distance = distance;
    this.estimatedTime = estimatedTime;
    this.elevation = elevation;
    this.rating = rating;
    this.reviewCount = reviewCount;
    this.surface = surface;
    this.petFriendly = petFriendly;
    this.description = description;
    this.imageUrl = imageUrl;
    this.coordinates = coordinates ?? [];
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this._validate();
  }

  _validate() {
    if (!this.name || !this.name.trim()) throw new Error('Route name is required');
    if (!VALID_DIFFICULTIES.includes(this.difficulty))
      throw new Error(`Difficulty must be one of: ${VALID_DIFFICULTIES.join(', ')}`);
    if (this.distance == null || this.distance < 0) throw new Error('Distance must be a non-negative number');
    if (this.rating < 0 || this.rating > 5) throw new Error('Rating must be between 0 and 5');
    if (!VALID_SURFACES.includes(this.surface))
      throw new Error(`Surface must be one of: ${VALID_SURFACES.join(', ')}`);
    this._validateCoordinates(this.coordinates);
  }

  _validateCoordinates(coords) {
    if (coords.length === 0) return; // legacy rows may have no coordinates yet
    if (coords.length < 2)
      throw new Error('Coordinates must contain at least 2 {lat, lng} points');
    for (const point of coords) {
      const { lat, lng } = point || {};
      if (typeof lat !== 'number' || typeof lng !== 'number' ||
          lat < -90 || lat > 90 || lng < -180 || lng > 180)
        throw new Error('Invalid coordinates: each point needs numeric lat (-90..90) and lng (-180..180)');
    }
  }

  isBeginnerFriendly() {
    return this.difficulty === 'Easy' && this.distance < 5;
  }

  isDogFriendly() {
    return this.petFriendly && this.surface !== 'Rocky';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      difficulty: this.difficulty,
      distance: this.distance,
      estimatedTime: this.estimatedTime,
      elevation: this.elevation,
      rating: this.rating,
      reviewCount: this.reviewCount,
      surface: this.surface,
      petFriendly: this.petFriendly,
      description: this.description,
      imageUrl: this.imageUrl,
      coordinates: this.coordinates,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Route;
