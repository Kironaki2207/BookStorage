const user = require('../db.js').user

class UserService {
  constructor() {
    this.model = user
  }

  async findBy(key, value) {
    return this.model.findOne({where: {[key]: value}})
  }
  async findById(userId) {
    return this.model.findByPk(userId)
  }

  async add(username, email, password) {
    return this.model.create({
      username: username,
      email: email,
      password: password,
    })
  }

  async edit(id, data, key) {
    this.model.update(
      {[key]: data},
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
module.exports = {UserService}
