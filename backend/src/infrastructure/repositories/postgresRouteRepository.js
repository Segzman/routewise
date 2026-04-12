// PostgreSQL implementation of RouteRepository — Infrastructure Layer
// Owner: Sekun

const RouteRepository = require('../../domain/repositories/routeRepository');
const Route = require('../../domain/entities/Route');
const pool = require('../../config/database');

class PostgresRouteRepository extends RouteRepository {
  _toEntity(row) {
    if (!row) return null;
    return new Route({
      id:            row.id,
      name:          row.name,
      difficulty:    row.difficulty,
      distance:      parseFloat(row.distance),
      estimatedTime: row.estimated_time,
      elevation:     row.elevation,
      rating:        parseFloat(row.rating),
      reviewCount:   row.review_count,
      surface:       row.surface,
      petFriendly:   row.pet_friendly,
      description:   row.description,
      imageUrl:      row.image_url,
      createdAt:     row.created_at,
      updatedAt:     row.updated_at,
    });
  }

  async findAll(filters = {}) {
    let q = 'SELECT * FROM routes WHERE 1=1';
    const params = [];
    let i = 1;

    if (filters.difficulty)          { q += ` AND difficulty = $${i++}`;    params.push(filters.difficulty); }
    if (filters.surface)             { q += ` AND surface = $${i++}`;       params.push(filters.surface); }
    if (filters.petFriendly != null) { q += ` AND pet_friendly = $${i++}`;  params.push(filters.petFriendly); }
    if (filters.minRating)           { q += ` AND rating >= $${i++}`;       params.push(filters.minRating); }

    const col   = ['rating','distance','review_count','name'].includes(filters.sortBy) ? filters.sortBy : 'rating';
    const order = filters.sortOrder === 'ASC' ? 'ASC' : 'DESC';
    q += ` ORDER BY ${col} ${order}`;

    const { rows } = await pool.query(q, params);
    return rows.map((r) => this._toEntity(r));
  }

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM routes WHERE id = $1', [id]);
    return this._toEntity(rows[0]);
  }

  async findByDifficulty(difficulty) {
    const { rows } = await pool.query(
      'SELECT * FROM routes WHERE difficulty = $1 ORDER BY rating DESC', [difficulty]
    );
    return rows.map((r) => this._toEntity(r));
  }

  async search(term) {
    const { rows } = await pool.query(
      `SELECT * FROM routes WHERE name ILIKE $1 OR description ILIKE $1 ORDER BY rating DESC`,
      [`%${term}%`]
    );
    return rows.map((r) => this._toEntity(r));
  }

  async create(data) {
    const { rows } = await pool.query(
      `INSERT INTO routes
        (name, difficulty, distance, estimated_time, elevation,
         rating, review_count, surface, pet_friendly, description, image_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [data.name, data.difficulty, data.distance, data.estimatedTime, data.elevation,
       data.rating || 0, data.reviewCount || 0, data.surface,
       data.petFriendly || false, data.description, data.imageUrl]
    );
    return this._toEntity(rows[0]);
  }

  async update(id, data) {
    const { rows } = await pool.query(
      `UPDATE routes SET
        name=$1, difficulty=$2, distance=$3, estimated_time=$4, elevation=$5,
        rating=$6, surface=$7, pet_friendly=$8, description=$9, image_url=$10
       WHERE id=$11 RETURNING *`,
      [data.name, data.difficulty, data.distance, data.estimatedTime, data.elevation,
       data.rating, data.surface, data.petFriendly, data.description, data.imageUrl, id]
    );
    return this._toEntity(rows[0]);
  }

  async delete(id) {
    const { rowCount } = await pool.query('DELETE FROM routes WHERE id = $1', [id]);
    return rowCount > 0;
  }
}

module.exports = PostgresRouteRepository;
