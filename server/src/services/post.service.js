const post = require('../db.js').post

class PostService {
  constructor() {
    this.model = post
  }

  async findBy(key, value) {
    return User.findOne({where: {[key]: value}})
  }
  async findById(userId) {
    return this.model.findByPk(userId)
  }

  async add(title, bookURL, author, userId) {
    return this.model.create({
      title: title,
      bookURL: bookURL,
      userId: userId,
      author: author,
    })
  }
  async adds(bookURL) {
    return this.model.create({
      bookURL: bookURL,
    })
  }
  async delete(id) {
    this.model.destroy({
      where: {
        id: id,
      },
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
  async findAll() {
    return this.model.findAll()
  }
}
module.exports = {PostService}
