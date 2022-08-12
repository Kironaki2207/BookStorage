const {Sequelize} = require('sequelize')
let user = require('./db/models/model.user.js')
let post = require('./db/models/model.post.js')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_USER_PASSWORD,
  {
    host: 'localhost',
    dialect: process.env.SEQUELIZE_DIALECT,
  }
)

let dbUser = user(sequelize)
let dbPost = post(sequelize)

sequelize.sync().catch(err => console.log(err))

module.exports = {user: dbUser, post: dbPost}
