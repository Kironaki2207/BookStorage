const role = require('../db.js').role

class RoleService {
  constructor() {
    this.model = role
  }

  async findById(userId) {
    return this.model.findByPk(userId)
  }

  async add(userId, userRole) {
    return this.model.create({
      userid: userId,
      role: userRole,
    })
  }

  async edit(id, userRole) {
    this.model.update(
      {role: userRole},
      {
        where: {
          id: id,
        },
      }
    )
  }

  async delete(id) {
    this.model.destroy({
      where: {
        id: id,
      },
    })
  }

  async findAll() {
    return this.model.findAll()
  }
}
module.exports = {RoleService}
