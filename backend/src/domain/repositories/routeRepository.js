// Repository interface — Domain Layer (abstract contract)
// Owner: Sekun

class RouteRepository {
  async findAll(filters = {})       { throw new Error('findAll() must be implemented'); }
  async findById(id)                { throw new Error('findById() must be implemented'); }
  async findByDifficulty(difficulty){ throw new Error('findByDifficulty() must be implemented'); }
  async search(term)                { throw new Error('search() must be implemented'); }
  async create(data)                { throw new Error('create() must be implemented'); }
  async update(id, data)            { throw new Error('update() must be implemented'); }
  async delete(id)                  { throw new Error('delete() must be implemented'); }
}

module.exports = RouteRepository;
